module.exports = {
	root: true,
	env: { browser: true, es2020: true, node: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
	parser: '@typescript-eslint/parser',
	plugins: [
		'react-refresh',
		'@typescript-eslint',
		'react',
		'prettier',
		'unused-imports',
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'prettier/prettier': [
			'warn',
			{
				endOfLine: 'auto',
			},
		],
		'sort-imports': [
			'warn',
			{
				ignoreDeclarationSort: true,
			},
		],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'off',
		'unused-imports/no-unused-vars': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
	settings: {
		react: { version: 'detect' },
	},
}
