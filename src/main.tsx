import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root.tsx'
import ErrorPage from './error-page.tsx'
import ChatRoomsPage from './pages/ChatRoomsPage.tsx'
import LoginPage from './pages/LoginPage.tsx'

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root/>,
		errorElement: <ErrorPage/>,
		children: [
			{
				path: "",
				element: <ChatRoomsPage/>
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
