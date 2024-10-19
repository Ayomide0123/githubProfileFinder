import { FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
}

interface RepoListProps {
  repos: Repo[];
  totalPages: number;
  currentPage: number;
  loadRepos: (page: number) => void;
}

export default function RepoList({ repos, totalPages, currentPage, loadRepos }: RepoListProps) {
  return (
    <div className="mt-8 w-full max-w-lg bg-white p-4 rounded-md shadow-md dark:bg-gray-800">
      <h3 className="text-lg font-bold dark:text-white">Repositories</h3>

      {/* Map over the repositories and display their details */}
      {repos.map((repo) => (
        <div key={repo.id} className="border-b py-4 dark:border-gray-700">
          {/* Repo name (Link) */}
          <a href={repo.html_url} target="_blank" className="font-bold text-blue-500 dark:text-blue-300">
            {repo.name}
          </a>

          {/* Repo description */}
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            {repo.description || 'No description'}
          </p>

          {/* Star and Fork details with proper alignment */}
          <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
            {/* Stars */}
            <div className="flex items-center mr-4">
              <FaStar className="text-gray-800 dark:text-gray-300 mr-1" size={14} />
              <span>{repo.stargazers_count}</span>
            </div>
            {/* Forks */}
            <div className="flex items-center">
              <FaCodeFork className="text-gray-800 dark:text-gray-300 mr-1" size={14} />
              <span>{repo.forks_count}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination buttons for navigating between pages */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => loadRepos(page)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-600 dark:text-white'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
