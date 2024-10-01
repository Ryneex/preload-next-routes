# Preload Next Routes

this is a Next.js plugin that preloads all routes in development mode, enabling faster navigation through your project. This plugin helps streamline your development workflow by reducing loading times when switching between routes.

## Installation

To install the plugin, you can use npm or yarn:

```bash
npm install preload-next-routes --save-dev
```

or

```bash
yarn add preload-next-routes --dev
```

## Usage

To use the plugin, import it in your Next.js configuration file (`next.config.js` or `next.config.ts`) and wrap your existing configuration:

```js
// next.config.js

import withPNR from "preload-nextjs-routes"

// Your existing Next.js config
const nextConfig = {}

// Merge PNR config with Next.js config
export default withPNR(nextConfig)
```

## Features

-   **Development Mode**: Routes are preloaded only in development mode, ensuring that your production build remains unaffected.
-   **Dynamic Route Detection**: Automatically detects and preloads routes based on your file structure.

## How It Works

When running your Next.js application in development mode, PNR will:

1. Check if the application is running in development and if the runtime is set to Node.js.
2. Preload each route by fetching them, providing you with feedback on the console about the number of routes found and their preloading status.
