// import React from 'react'
// import Container from '../Container/Container'
// import { Link, useNavigate } from 'react-router-dom'

// function Header() {

//     const navigate = useNavigate();

//     return (
        // <header className='flex w-full bg-blue-200'>
        //     <Container>
        //         <nav className='flex justify-between'>
        //             <div>
        //                 <Link>
        //                     <img src="" alt="Logo" />
        //                 </Link>
        //             </div>
        //             <ul>
        //                 {/* If not logged In */}
        //                 <li>
        //                     <button 
        //                     onClick={ () => navigate("/login")}>
        //                         Login
        //                     </button>
        //                 </li>

        //                 {/* If not logged In */}
        //                 <li>
        //                     {/* Logout */}
        //                 </li>
        //             </ul> 
        //         </nav>
        //     </Container>
        // </header>
import React, { useState } from 'react'
import Container from '../Container/Container'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    
    // For demo purposes, assuming user is not logged in
    const isLoggedIn = false;
    // Mock cart count
    const cartCount = 3;

    return (
        <header className='sticky top-0 z-10 w-full bg-gray-900 text-white shadow-md'>
            <Container>
                <nav className='flex items-center justify-between py-4'>
                    {/* Mobile menu button */}
                    <button 
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            {/* Replace with your actual logo or use text */}
                            <h1 className="text-2xl font-bold text-red-500">MARVEL<span className="text-white">WEAR</span></h1>
                        </Link>
                    </div>
                    
                    {/* Desktop navigation */}
                    <ul className="hidden md:flex items-center space-x-8">
                        <li>
                            <Link to="/" className="hover:text-red-500 transition-colors font-medium">Home</Link>
                        </li>
                        <li>
                            <Link to="/shop" className="hover:text-red-500 transition-colors font-medium">Shop</Link>
                        </li>
                        <li>
                            <Link to="/collections" className="hover:text-red-500 transition-colors font-medium">Collections</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-red-500 transition-colors font-medium">About</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-red-500 transition-colors font-medium">Contact</Link>
                        </li>
                    </ul>
                    
                    {/* Right side icons and buttons */}
                    <ul className="flex items-center space-x-4">
                        <li>
                            <button className="hover:text-red-500 transition-colors">
                                <Search size={20} />
                            </button>
                        </li>
                        <li>
                            {isLoggedIn ? (
                                <button 
                                    className="hover:text-red-500 transition-colors"
                                    onClick={() => navigate("/account")}
                                >
                                    <User size={20} />
                                </button>
                            ) : (
                                <button 
                                    className="hover:text-red-500 transition-colors px-4 py-1 border border-red-500 rounded-md"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </button>
                            )}
                        </li>
                        <li>
                            <button 
                                className="relative hover:text-red-500 transition-colors"
                                onClick={() => navigate("/cart")}
                            >
                                <ShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </li>
                    </ul>
                </nav>
            </Container>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 text-white">
                    <Container>
                        <ul className="py-4 space-y-4">
                            <li>
                                <Link 
                                    to="/" 
                                    className="block hover:text-red-500 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/shop" 
                                    className="block hover:text-red-500 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/collections" 
                                    className="block hover:text-red-500 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Collections
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/about" 
                                    className="block hover:text-red-500 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/contact" 
                                    className="block hover:text-red-500 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                            </li>
                            {!isLoggedIn && (
                                <li>
                                    <button 
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors w-full text-left"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            navigate("/login");
                                        }}
                                    >
                                        Login
                                    </button>
                                </li>
                            )}
                        </ul>
                    </Container>
                </div>
            )}
        </header>
    )
}

export default Header;
