import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Avatar_Page from './pages/Avatar_Page';

function App() {

  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";
  const isAvatarPage = location.pathname === "/avatar";

  return (
    <div 
      className={` w-full ${
        isLoginPage || isSignUpPage ? "h-185 bg-gray-100" : "h-full bg-white"
      }`}
    >
      <div className="w-full text-center">
        {isLoginPage ? (
          <main>
            <LoginPage />
          </main>
        ) : isSignUpPage ? (
          <main>
            <SignUpPage />
          </main>
        ) : isAvatarPage ? (
          <main>
            <Avatar_Page />
          </main>
        ) : (
          <>
            <Header />
            <main>
              <Outlet/>
            </main>
            <Footer />
          </>
        )}
      </div>
    </div>
  )
}

export default App
