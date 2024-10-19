import Link from "next/link";

interface ProfileProps {
  profile: {
    avatar_url: string;         // URL for the user's avatar image
    login: string;              // GitHub username
    bio: string | null;         // User's bio
    location: string | null;    // User's location
    public_repos: number;       // Number of public repositories
  };
}

export default function Profile({ profile }: ProfileProps) {
  return (
    // Main container for the profile card with dark mode support
    <div className="mt-8 w-full max-w-md bg-white p-4 rounded-md shadow-md dark:bg-gray-800">
      <div className="flex items-center">
        {/* Profile avatar */}
        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          {/* User's GitHub username */}
          <Link href={`/user/${profile.login}`} className="text-blue-500">
            <h2 className="text-xl font-bold text-black dark:text-white">{profile.login}</h2>
          </Link>
          {/* User's bio, fallback text if none is provided */}
          <p className="text-gray-800 dark:text-gray-300">{profile.bio || 'No bio available'}</p>
          {/* User's location, fallback text if none is provided */}
          <p className="text-gray-800 dark:text-gray-300">{profile.location || 'No location available'}</p>
          {/* Display the number of public repositories */}
          <p className="text-gray-800 dark:text-gray-300">Public Repos: {profile.public_repos}</p>
        </div>
      </div>
    </div>
  );
}
