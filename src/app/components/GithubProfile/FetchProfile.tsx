"use client";
import React, { useEffect, useState } from 'react';
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
  // State variables to manage user input, profile, repositories, and loading status
  const [username, setUsername] = useState('');           // Input username
  const [searchTerm, setSearchTerm] = useState('');       // Term used to search for a GitHub profile
  const [profile, setProfile] = useState(null);           // GitHub profile data
  const [repos, setRepos] = useState<Repo[]>([]);         // List of repositories
  const [loading, setLoading] = useState(false);          // Loading state
  const [error, setError] = useState('');                 // Error message
  const [totalRepos, setTotalRepos] = useState(0);        // Total number of repositories
  const [currentPage, setCurrentPage] = useState(1);      // Current page for repo pagination
  const reposPerPage = 10;                                // Number of repos displayed per page
  const [darkMode, setDarkMode] = useState<boolean>(false); // State to manage dark mode

  // Fetches repositories for the given username and page number
  const fetchRepos = async (username: string, page: number) => {
    try {
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${reposPerPage}&page=${page}`
      );
      const reposData = await reposResponse.json();

      if (reposResponse.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Please try again later.");
      }

      setRepos(reposData);            // Set repos in state
      setCurrentPage(page);           // Update the current page number

      if (reposData.length === 0) {
        setError("This user has no public repositories."); // Error message if no repos are found
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Error fetching repositories'); // Handle any errors during fetch
    }
  };

  // Effect hook to fetch user profile when searchTerm changes
  useEffect(() => {
    if (!searchTerm) return;

    const fetchGitHubUser = async () => {
      setLoading(true);            // Set loading state to true
      setProfile(null);            // Clear previous profile data
      setRepos([]);                // Clear previous repo data
      setCurrentPage(1);           // Reset current page
      setError('');                // Clear any previous errors

      try {
        const profileResponse = await fetch(`https://api.github.com/users/${searchTerm}`);

        if (!profileResponse.ok) {
          if (profileResponse.status === 404) {
            throw new Error("GitHub user not found. Please check the username.");
          }
          throw new Error("Error fetching data from GitHub.");
        }

        const profileData = await profileResponse.json();
        setProfile(profileData);                    // Set the profile data
        setTotalRepos(profileData.public_repos);    // Set the total number of public repos

        await fetchRepos(searchTerm, 1);            // Fetch the first page of repos
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Error fetching data'); // Handle errors if they occur
      } finally {
        setLoading(false);           // Set loading state to false when done
      }
    };

    fetchGitHubUser();
  }, [searchTerm]);

  // Handles the form submission when searching for a user
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim() !== '') {
      setSearchTerm(username);      // Set the search term to the username entered
    }
  };

  // Loads repositories for the given page
  const loadRepos = async (page: number) => {
    setLoading(true);
    await fetchRepos(searchTerm, page); // Fetch the repos for the selected page
    setLoading(false);
  };

  // Calculate the total number of pages for pagination
  const totalPages = Math.ceil(totalRepos / reposPerPage);

  // Toggle dark mode by adding/removing the 'dark' class on the <html> element
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
        className={`mt-4 p-2 rounded-md ${
          darkMode ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Form for searching GitHub profiles */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-4 p-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
          placeholder="Enter GitHub username"
        />
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white dark:bg-yellow-500 rounded-md">
          Search
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
        error && <ErrorMessage message={error} /> // Display error message if present
      )}
    </div>
  );
}
