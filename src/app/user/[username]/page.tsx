"use client"; // Ensures the component is rendered on the client side
import Link from "next/link";
import ErrorMessage from "../../components/GithubProfile/ErrorMessage";
import { ProfileSkeleton } from "../../components/GithubProfile/LoadingSkeleton";
import Profile from "../../components/GithubProfile/Profile";
import { useParams } from "next/navigation"; // Hook to access dynamic route parameters
import { useEffect, useState } from "react"; // Import hooks for fetching data and managing state

interface Error {
  message: string;
}

const UserProfile = () => {
  // Get the username from the dynamic route
  const params = useParams();
  const username = params.username as string;

  // State to store the GitHub profile data
  const [profile, setProfile] = useState(null);
  // State to manage loading and error messages
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // State to manage dark mode
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Fetch GitHub profile data when the username changes
  useEffect(() => {
    const fetchGitHubProfile = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset any previous errors

      try {
        // Make a request to the GitHub API for the user's profile
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (!response.ok) {
          throw new Error("User not found"); // Handle case where user is not found
        }

        const data = await response.json(); // Parse the JSON response
        setProfile(data); // Set the profile data in the state
      } catch (err) {
        const error = err as Error;
        setError(error.message); // Set any errors that occur
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchGitHubProfile(); // Call the function to fetch data
  }, [username]); // Effect runs when the `username` changes

  // Toggle dark mode state
  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDarkMode = html.classList.contains('dark');
    setDarkMode(isDarkMode);
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`mt-4 p-2 rounded-md ${
          darkMode ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <h1 className="text-2xl font-bold mt-4">GitHub Profile for {username}</h1>

      {/* Display profile skeleton or profile based on loading state */}
      {loading ? (
        <ProfileSkeleton />
      ) : profile ? (
        <Profile profile={profile} />
      ) : (
        error && <ErrorMessage message={error} /> // Display error message if present
      )}

      <Link href={"/"} className="text-blue-500">
        <h2 className="text-xl font-bold mt-5">Go back to the Home Page</h2>
      </Link>
    </div>
  );
};

export default UserProfile;
