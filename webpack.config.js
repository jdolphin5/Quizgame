const path = require('path');

module.exports = {
  entry: './src/index.tsx', // The entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // The output directory for bundled files
    filename: 'bundle.js', // The name of the bundled file
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add the .ts and .tsx extensions
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Process TypeScript and TypeScript React files
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },

    ],
  },
};
