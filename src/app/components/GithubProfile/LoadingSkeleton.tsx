// ProfileSkeleton component to display a loading state for user profile
export function ProfileSkeleton() {
  return (
    <div className="mt-8 w-full max-w-md bg-white p-4 rounded-md shadow-md animate-pulse dark:bg-gray-800"> {/* Dark mode background */}
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full dark:bg-gray-600"></div> {/* Dark mode for profile image */}
        <div className="ml-4 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-24 dark:bg-gray-600"></div> {/* Dark mode for text placeholder */}
          <div className="h-4 bg-gray-300 rounded w-40 dark:bg-gray-600"></div> {/* Dark mode for text placeholder */}
          <div className="h-4 bg-gray-300 rounded w-32 dark:bg-gray-600"></div> {/* Dark mode for text placeholder */}
          <div className="h-4 bg-gray-300 rounded w-20 dark:bg-gray-600"></div> {/* Dark mode for text placeholder */}
        </div>
      </div>
    </div>
  );
}

// RepoListSkeleton component to display a loading state for repository list
export function RepoListSkeleton() {
  return (
    <div className="mt-8 w-full max-w-lg bg-white p-4 rounded-md shadow-md animate-pulse dark:bg-gray-800"> {/* Dark mode background */}
      <h3 className="text-lg font-bold dark:text-white">Repositories</h3> {/* Dark mode for heading */}
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="border-b py-2 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-48 dark:bg-gray-600"></div> {/* Dark mode for text placeholder */}
          <div className="h-4 bg-gray-300 rounded w-64 dark:bg-gray-600"></div> {/* Dark mode for text placeholder */}
          <div className="h-4 bg-gray-300 rounded w-32 dark:bg-gray-600"></div> {/* Dark mode for text placeholder */}
        </div>
      ))}
    </div>
  );
}
