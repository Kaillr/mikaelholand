import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import AboutMePage from './pages/AboutMePage'
import PortfolioPage from './pages/PortfolioPage'

const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/aboutme',
      element: <AboutMePage />
    },
    {
      path: '/portfolio',
      element: <PortfolioPage />,
    },
])

export default function App() {
  return <RouterProvider router={router}/>
}