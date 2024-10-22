import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root.tsx'
import ErrorPage from './error-page.tsx'
import LoginPage from './pages/LoginPage.tsx'
import ChannelsPage from './pages/ChannelsPage.tsx'

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root/>,
		errorElement: <ErrorPage/>,
		children: [
			{
				path: "",
				element: <ChannelsPage/>
			},
			{
				path: 'login',
				element: <LoginPage/>
			}
		]
	},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
