import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import '@/assets/styles/index.scss'
import GlobalProvider from './context/global.context.tsx'

// ------REDUX-----
import { Provider } from 'react-redux'
import { store } from './application/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<GlobalProvider>
				<App />
			</GlobalProvider>
		</Provider>
	</BrowserRouter>
)
