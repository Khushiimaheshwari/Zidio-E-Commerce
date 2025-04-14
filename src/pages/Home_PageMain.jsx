import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, User, ChevronRight } from 'lucide-react';

const Home_PageMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  
  // Marvel-themed color scheme
  const colors = {
    primary: '#ED1D24', // Marvel red
    secondary: '#0D47A1', // Deep blue
    accent: '#FFD700', // Gold
    dark: '#202020',
    light: '#FFFFFF'
  };

  // Featured hero banners
  const heroImages = [
    {
      title: "MARVEL HEROES COLLECTION",
      subtitle: "Suit up with the latest Avengers-inspired styles",
      cta: "SHOP NOW",
      bgClass: "bg-red-600"
    },
    {
      title: "SPIDERMAN STREETWEAR",
      subtitle: "Swing into style with our exclusive Spidey collection",
      cta: "DISCOVER",
      bgClass: "bg-blue-800"
    },
    {
      title: "IRON MAN PREMIUM LINE",
      subtitle: "Tech-inspired clothing for the modern hero",
      cta: "EXPLORE",
      bgClass: "bg-yellow-600"
    }
  ];

  // Clothing categories
  const categories = [
    { name: "T-Shirts", icon: "/api/placeholder/120/120", count: 42 },
    { name: "Hoodies", icon: "/api/placeholder/120/120", count: 28 },
    { name: "Jackets", icon: "/api/placeholder/120/120", count: 16 },
    { name: "Accessories", icon: "/api/placeholder/120/120", count: 35 }
  ];

  // Featured products
  const featuredProducts = [
    { 
      name: "Captain America Shield Tee", 
      price: 29.99, 
      image: "/api/placeholder/240/300",
      tag: "Bestseller"  
    },
    { 
      name: "Thor Thunder Hoodie", 
      price: 49.99, 
      image: "/api/placeholder/240/300",
      tag: "New"
    },
    { 
      name: "Black Panther Jacket", 
      price: 79.99, 
      image: "/api/placeholder/240/300",
      tag: "Limited"
    },
    { 
      name: "Hulk Graphic Sweatshirt", 
      price: 39.99, 
      image: "/api/placeholder/240/300",
      tag: "Sale"
    }
  ];

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 z-20 pt-16">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-6 py-8">
              <a href="#" className="text-white text-xl hover:text-red-500 transition-colors">Home</a>
              <a href="#" className="text-white text-xl hover:text-red-500 transition-colors">Shop</a>
              <a href="#" className="text-white text-xl hover:text-red-500 transition-colors">Collections</a>
              <a href="#" className="text-white text-xl hover:text-red-500 transition-colors">About</a>
              <a href="#" className="text-white text-xl hover:text-red-500 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      )}
      
      {/* Hero Slider */}
      <div className={`relative ${heroImages[heroImageIndex].bgClass} text-white py-16 md:py-32 overflow-hidden transition-all duration-500`}>
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">{heroImages[heroImageIndex].title}</h2>
            <p className="text-lg md:text-xl mb-8">{heroImages[heroImageIndex].subtitle}</p>
            <button className="bg-white text-gray-900 hover:bg-gray-200 font-bold py-3 px-8 transition-colors">
              {heroImages[heroImageIndex].cta}
            </button>
          </div>
        </div>
        
        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {heroImages.map((_, index) => (
            <button 
              key={index}
              onClick={() => setHeroImageIndex(index)}
              className={`w-3 h-3 rounded-full ${index === heroImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
            />
          ))}
        </div>
      </div>
      
      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">SHOP BY CATEGORY</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <a 
                href="#" 
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-gray-100 aspect-square flex items-center justify-center">
                  <img src={category.icon} alt={category.name} className="w-20 h-20 object-contain" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  <p className="text-sm">{category.count} items</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">FEATURED PRODUCTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover object-center" />
                  {product.tag && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs uppercase font-bold py-1 px-2 rounded">
                      {product.tag}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button className="bg-white text-gray-900 py-2 px-4 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg text-gray-900">{product.name}</h3>
                  <p className="text-red-500 font-bold mt-1">${product.price}</p>
                  <button className="mt-3 w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-red-500 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#" className="inline-flex items-center text-red-500 font-bold hover:text-red-600 transition-colors">
              View All Products <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Collection Banner */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">THE AVENGERS COLLECTION</h2>
              <p className="text-lg mb-6">Assemble your wardrobe with our exclusive Avengers-inspired collection. Premium quality clothing for everyday heroes.</p>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 transition-colors">
                SHOP THE COLLECTION
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="/api/placeholder/500/300" alt="Avengers Collection" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Free shipping on all orders over $50</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600">100% secure payment methods</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">JOIN OUR NEWSLETTER</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-l sm:rounded-r-none mb-2 sm:mb-0 focus:outline-none"
            />
            <button className="bg-red-500 text-white font-bold py-3 px-6 rounded-r sm:rounded-l-none hover:bg-red-600 transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      
    </div>
  );
};

export default Home_PageMain;