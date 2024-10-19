# githubProfileFinder

A Next.js application that uses the GitHub API to find GitHub profiles. This application allows users to search for GitHub users by username and view their profile information, including public repositories.

## Features

- **Profile Search:** Users can enter a GitHub username to fetch and display the user's profile and repositories.
- **Dynamic Routing:** Each user's profile can be accessed through a unique URL, e.g., `/user/octocat`.
- **Error Handling:** User-friendly error messages for scenarios such as user not found, no repositories, or API request failures.
- **Dark Mode:** A toggle to switch between light and dark themes for a better user experience.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Ayomide0123/github_profile_finder.git
    cd github_profile_finder
    ```

2. Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying the files in the `app` directory. The page auto-updates as you edit the files.

## Dark Mode Toggle

The application features a dark mode toggle that allows users to switch between light and dark themes. When the button is clicked, the application checks if the "dark" class is currently applied to the document. If it is, dark mode is enabled; if not, light mode is used. This toggle enhances the user experience by providing a comfortable viewing option for users in low-light environments.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
