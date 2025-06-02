# Crop Comment

A modern feedback collection application built with React, TypeScript, and Zustand for state management. This application allows users to submit feedback items and categorize them using hashtags.

## 🚀 Features

- **Feedback Management**: Add, view, and manage feedback items
- **Hashtag System**: Categorize and filter feedback using hashtags
- **Modern UI**: Built with a clean and responsive design
- **Type Safety**: Full TypeScript support for better development experience
- **State Management**: Utilizes Zustand for efficient state management

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: CSS Modules
- **Build Tool**: Vite
- **Linting**: ESLint
- **Icons**: Radix UI Icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ts_crop_comment
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── feedback/        # Feedback-related components
│   ├── hashtag/         # Hashtag-related components
│   └── layout/          # Layout components
├── contexts/            # React contexts
├── stores/              # Zustand stores
├── lib/                 # Utility functions and constants
└── main.tsx             # Application entry point
```

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview the production build locally

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
