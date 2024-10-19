// Define the structure of a GitHub repository object
interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
}

// Define the props that RepoList component will receive
interface RepoListProps {
  repos: Repo[];                      // Array of repositories
  totalPages: number;                 // Total number of pages for pagination
  currentPage: number;                // Current page being displayed
  loadRepos: (page: number) => void;  // Function to load repositories for a specific page
}

// RepoList component to display the list of repositories
export default function RepoList({ repos, totalPages, currentPage, loadRepos }: RepoListProps) {
  return (
    <div className="mt-8 w-full max-w-lg bg-white p-4 rounded-md shadow-md dark:bg-gray-800">
      <h3 className="text-lg font-bold dark:text-white">Repositories</h3>

      {/* Map over the repositories and display their details */}
      {repos.map((repo) => (
        <div key={repo.id} className="border-b py-2 dark:border-gray-700">
          <a href={repo.html_url} target="_blank" className="text-blue-500 dark:text-blue-300">
            {repo.name}
          </a>
          <p className="text-gray-700 dark:text-gray-300">{repo.description || 'No description'}</p>
          <p className="text-gray-600 dark:text-gray-400">
            ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
          </p>
        </div>
      ))}

      {/* Pagination buttons for navigating between pages */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => loadRepos(page)} // Load repositories for the selected page
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 dark:text-white'
              }`}
            >
              {page} {/* Display the page number */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
