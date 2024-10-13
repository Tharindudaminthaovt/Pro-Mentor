import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

	return defineConfig({
		plugins: [react(), tsconfigPaths(), nodePolyfills()],
		server: {
			port: Number(process.env.VITE_PORT),
			host: process.env.VITE_HOST,
		},
		resolve: {
			alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
		},
		optimizeDeps: {
			exclude: ['js-big-decimal'],
		},
	})
}
