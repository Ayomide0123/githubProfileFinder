import Link from "next/link";
import Image from "next/image";
import { CiLocationOn  } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";

interface ProfileProps {
  profile: {
    avatar_url: string; // URL for the user's avatar image
    login: string; // GitHub username
    bio: string | null; // User's bio
    location: string | null; // User's location
    public_repos: number; // Number of public repositories
  };
}

export default function Profile({ profile }: ProfileProps) {
  return (
    // Main container for the profile card with dark mode support
    <div className="mt-8 w-full max-w-lg bg-white p-4 rounded-md shadow-md dark:bg-gray-800">
      <div className="flex items-center gap-2">
        {/* Profile avatar */}
        <Image
          src={profile.avatar_url}
          alt={profile.login}
          width={70}
          height={70}
          className="rounded-full"
        />

        <div className="ml-4">
          {/* User's GitHub username */}
          <Link href={`/user/${profile.login}`} className="text-blue-500">
            <h2 className="text-lg font-semibold text-black dark:text-white mb-3">
              {profile.login}
            </h2>
          </Link>
          {/* User's location, fallback text if none is provided */}
          <div className="grid grid-cols-[auto,1fr] gap-2">
  {/* Location */}
  <CiLocationOn className="text-gray-800 dark:text-gray-300" size={18} />
  <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
    {profile.location || "No location available"}
  </p>

  {/* Bio */}
  <CiUser className="text-gray-800 dark:text-gray-300" size={18} />
  <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
    {profile.bio || "No bio available"}
  </p>

  {/* Public Repositories */}
  <CiFolderOn className="text-gray-800 dark:text-gray-300" size={18} />
  <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
    Public Repositories: {profile.public_repos}
  </p>
</div>

        </div>
      </div>
    </div>
  );
}
