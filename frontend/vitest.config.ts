{
  "extends": "./vite.config.ts",
  "plugins": [
    "@vitejs/plugin-react"
  ],
  "test": {
    "globals": true,
    "environment": "jsdom",
    "setupFiles": "./src/test/setup.ts",
    "include": ["./src/**/*.test.ts", "./src/**/*.test.tsx"],
    "exclude": ["./src/e2e/**", "./node_modules/**"],
    "coverage": {
      "provider": "v8",
      "reporter": ["text", "json", "html", "lcov"],
      "exclude": ["node_modules/", "src/test/", "**/*.d.ts", "**/*.config.*"],
      "all": true,
      "lines": 80,
      "functions": 80,
      "branches": 75,
      "statements": 80
    }
  }
}
