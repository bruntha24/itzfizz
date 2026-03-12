Setup Instructions
1. Create a Vite React Project
# Create a new Vite project with React & TypeScript
npm create vite@latest itzfizz
# Select:
# • Project name: my-project
# • Framework: React
# • Variant: TypeScript
cd my-project
2. Install Dependencies
npm install

This installs all runtime and dev dependencies.

3. Install Tailwind CSS
# Install Tailwind and its dependencies
npm install -D tailwindcss postcss autoprefixer
# Initialize Tailwind configuration files
npx tailwindcss init -p

This creates tailwind.config.js and postcss.config.js.

4. Configure Tailwind

Update tailwind.config.js to scan your files:

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
5. Add Tailwind Directives to CSS

In your src/index.css or src/main.css:

@tailwind base;
@tailwind components;
@tailwind utilities;
6. Run the Development Server
npm run dev

Open the URL shown (usually http://localhost:5173) to see your app running with Tailwind styling.


For smoother animations, install GSAP:

npm install gsap