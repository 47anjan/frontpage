# Frontpage

## An blog app built using Next.js 14 server components.

Welcome to your feature-rich blog app built with Next.js, TypeScript, Prisma, and more! 🚀

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/anjankarmakar10/frontpage.git
   ```

2. Navigate to the project directory:

   ```bash
   cd frontpage
   ```

3. Create a `.env.local` file in the root of the project.

4. Set the following environment variables in your `.env.local` file (You need to create a [OAuth App](https://github.com/settings/developers) for GITHUB_ID and GITHUB_SECRET):

   ```env
   DATABASE_URL=your-mongodb-url
   NEXTAUTH_URL=http://localhost:3000/
   NEXTAUTH_SECRET=your-nextauth-secret
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   ```

   Replace the values after the equal sign (`=`) with your actual configuration.

5. Install dependencies:

   ```bash
   npm install
   ```

6. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see your blog app!

## Features

- Read & Create Blogs
- Manage Your Blogs (update, delete, publish, draft)
- Bookmark Your Favorites
- Markdown Support
- Cloudinary Integration for Images
- Authentication with NextAuth
- Exciting New Features Coming Soon!

Feel free to explore, contribute, and share your thoughts through your blog app!

Happy coding! 🚀✨

```

Make sure to customize the URLs, secrets, and other values according to your actual configuration. Users who want to run your project locally will find these instructions helpful.
```
