import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home_PageMain from './pages/Home_PageMain.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Avatar_Page from './pages/Avatar_Page.jsx'
import ShopPage from './pages/Shop_Page.jsx'
import CollectionsPage from './pages/Collection_Page.jsx'
import ProfilePage from './pages/Profile_Page.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
    {
      path: '/',
      element: <Home_PageMain/>
    },
    {
      path: '/login',
      element: <LoginPage/>
    },
    {
      path: '/signup',
      element: <SignUpPage/>
    },
    {
      path: '/avatar',
      element: <Avatar_Page/>
    },
    {
      path: '/profile',
      element: <ProfilePage/>
    },
    {
      path: '/shop',
      element: <ShopPage/>
    },
    {
      path: '/collections',
      element: <CollectionsPage/>
    }
  ]}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
