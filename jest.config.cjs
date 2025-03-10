module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.cjs'], // Asegúrate de usar .js si estás utilizando require
  preset: 'ts-jest',
  transformIgnorePatterns: [
    '/node_modules/(?!(module-to-transform|another-module-to-transform)/)' // Ajusta según las necesidades
  ],
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "\\.(css|less)$": "identity-obj-proxy"
  },
};
