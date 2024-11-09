// tailwind.config.js
import flowbite from 'flowbite/plugin';

export default {
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}', 
    'node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}', // Include Flowbite React content
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite,  // Correctly include Flowbite as a plugin
  ],
}
