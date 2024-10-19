"use client";
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Profile from './Profile';
import RepoList from './RepoList';
import { ProfileSkeleton, RepoListSkeleton } from './LoadingSkeleton';
import ErrorMessage from './ErrorMessage';

// Interface to define the structure of a GitHub repository object
interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
}
interface Error {
  message: string;
}

export default function FetchProfile() {
  const [username, setUsername] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalRepos, setTotalRepos] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 30;
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const fetchRepos = async (username: string, page: number) => {
    try {
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${reposPerPage}&page=${page}`
      );
      const reposData = await reposResponse.json();

      if (reposResponse.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Please try again later.");
      }

      setRepos(reposData);
      setCurrentPage(page);

      if (reposData.length === 0) {
        setError("This user has no public repositories.");
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Error fetching repositories');
    }
  };

  useEffect(() => {
    if (!searchTerm) return;

    const fetchGitHubUser = async () => {
      setLoading(true);
      setProfile(null);
      setRepos([]);
      setCurrentPage(1);
      setError('');

      try {
        const profileResponse = await fetch(`https://api.github.com/users/${searchTerm}`);

        if (!profileResponse.ok) {
          if (profileResponse.status === 404) {
            throw new Error("GitHub user not found. Please check the username.");
          }
          throw new Error("Error fetching data from GitHub.");
        }

        const profileData = await profileResponse.json();
        setProfile(profileData);
        setTotalRepos(profileData.public_repos);

        await fetchRepos(searchTerm, 1);
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubUser();
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim() !== '') {
      setSearchTerm(username);
    }
  };

  const loadRepos = async (page: number) => {
    setLoading(true);
    await fetchRepos(searchTerm, page);
    setLoading(false);
  };

  const totalPages = Math.ceil(totalRepos / reposPerPage);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDarkMode = html.classList.contains('dark');
    setDarkMode(isDarkMode);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-black dark:text-white">GitHub Profile Finder</h1>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`mt-4 p-2 rounded-md ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Form for searching GitHub profiles */}
      <form onSubmit={handleSearch} className="w-96 flex items-center justify-between p-2 mt-4 border border-slate-950 dark:border-white rounded-full">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 bg-transparent text-black dark:text-white focus:outline-none"
          placeholder="Enter GitHub username"
        />
        <button
          type="submit"
          className="p-2 text-white bg-transparent rounded-r-full flex justify-center items-center focus:outline-none"
          aria-label="Search GitHub profile"
        >
          <FiSearch className="text-gray-800 dark:text-gray-300" size={24} />
        </button>
      </form>

      {/* Display profile skeleton or profile based on loading state */}
      {loading ? (
        <ProfileSkeleton />
      ) : (
        profile && <Profile profile={profile} />
      )}

      {/* Display repo list skeleton or list of repos based on loading state */}
      {loading ? (
        <RepoListSkeleton />
      ) : repos.length > 0 ? (
        <RepoList
          repos={repos}
          totalPages={totalPages}
          currentPage={currentPage}
          loadRepos={loadRepos}
        />
      ) : (
        error && <ErrorMessage message={error} />
      )}
    </div>
  );
}
