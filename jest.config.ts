export default {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	preset: 'ts-jest',
	testPathIgnorePatterns: ['/node_modules/', 'dist/']
};
