import { useState } from 'react';
import { Heart, Trash2, ShoppingCart, ChevronLeft } from 'lucide-react';

export default function WishlistPage() {
  const initialWishlistItems = [
    {
      id: 1,
      name: "Urban Oversized Tee",
      type: "Oversized",
      price: 29.99,
      image: "/api/placeholder/300/350",
      color: "Black",
      size: "XL"
    },
    {
      id: 2,
      name: "Vintage Acid Wash T-Shirt",
      type: "Acid Wash",
      price: 34.99,
      image: "/api/placeholder/300/350",
      color: "Blue",
      size: "L"
    },
    {
      id: 3,
      name: "Graphic Print Street Art",
      type: "Graphic Printed",
      price: 27.99,
      image: "/api/placeholder/300/350",
      color: "White",
      size: "M"
    },
    {
      id: 4,
      name: "Essential Solid Crewneck",
      type: "Solid Color",
      price: 19.99,
      image: "/api/placeholder/300/350",
      color: "Navy",
      size: "L"
    },
    {
      id: 5,
      name: "Classic Polo",
      type: "Polo T-Shirts",
      price: 39.99,
      image: "/api/placeholder/300/350",
      color: "Green",
      size: "M"
    },
    {
      id: 6,
      name: "Summer Sleeveless",
      type: "Sleeveless",
      price: 24.99,
      image: "/api/placeholder/300/350",
      color: "Gray",
      size: "L"
    },
    {
      id: 7,
      name: "Casual Long Sleeve",
      type: "Long Sleeve",
      price: 32.99,
      image: "/api/placeholder/300/350",
      color: "Burgundy",
      size: "XL"
    },
    {
      id: 8,
      name: "Button Henley",
      type: "Henley",
      price: 29.99,
      image: "/api/placeholder/300/350",
      color: "Tan",
      size: "M"
    },
    {
      id: 9,
      name: "Lightweight Hooded Tee",
      type: "Hooded",
      price: 36.99,
      image: "/api/placeholder/300/350",
      color: "Black",
      size: "L"
    },
    {
        id: 10,
        name: "Oversized Tee",
        type: "Oversized",
        price: 18.99,
        image: "/api/placeholder/300/350",
        color: "Blue",
        size: "L"
      }
  ];

  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [activeFilter, setActiveFilter] = useState('All');
  
  // All available t-shirt types
  const tShirtTypes = ['All', 'Oversized', 'Acid Wash', 'Graphic Printed', 'Solid Color', 'Polo T-Shirts', 'Sleeveless', 'Long Sleeve', 'Henley', 'Hooded'];

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Filter the wishlist items based on the active filter
  const filteredItems = activeFilter === 'All' 
    ? wishlistItems 
    : wishlistItems.filter(item => item.type === activeFilter);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const moveToCart = (id) => {
    alert(`Item ${id} moved to cart!`);
    removeFromWishlist(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8 justify-between">
          <h1 className="text-4xl text-center font-bold text-gray-900">My Wishlist</h1>
          <button className="flex text-gray-600 hover:text-gray-800 mr-4">
            <ChevronLeft size={20} />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Filter options */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-6">Filter by Type</h2>
          <div className="flex flex-wrap gap-2">
            {tShirtTypes.map((type) => (
              <button 
                key={type} 
                className={`px-4 py-2 rounded-full ${
                  activeFilter === type 
                    ? 'bg-black text-white' 
                    : 'bg-white border border-gray-300 hover:bg-gray-100'
                } text-sm transition-colors`}
                onClick={() => handleFilterChange(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Filter results count */}
        <div className="mb-6 text-gray-600">
          Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} 
          {activeFilter !== 'All' ? ` in ${activeFilter}` : ''}
        </div>

        {/* Wishlist Items */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-64 object-cover"
                  />
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Heart size={20} className="text-red-500 fill-red-500" />
                  </button>
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white px-3 py-1 text-xs">
                    {item.type}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">Type: {item.type}</p>
                  <div className="flex items-center mb-2">
                    <div className="mr-2">
                      <span className="text-sm text-gray-600">Color: </span>
                      <span className="font-medium">{item.color}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Size: </span>
                      <span className="font-medium">{item.size}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="font-bold text-gray-900">${item.price.toFixed(2)}</p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button 
                        onClick={() => moveToCart(item.id)}
                        className="flex items-center bg-black text-white py-2 px-3 rounded-md hover:bg-gray-800"
                      >
                        <ShoppingCart size={16} className="mr-1" />
                        <span className="text-sm">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {wishlistItems.length === 0 
                ? "Your wishlist is empty" 
                : `No ${activeFilter} items in your wishlist`}
            </h2>
            <p className="text-gray-600 mb-6">
              {wishlistItems.length === 0 
                ? "Browse our collection and add your favorite items!" 
                : "Try selecting a different category or browse more items"}
            </p>
            <div className="flex justify-center gap-4">
              {wishlistItems.length > 0 && (
                <button 
                  onClick={() => setActiveFilter('All')}
                  className="bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300"
                >
                  View All Items
                </button>
              )}
              <button className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800">
                Shop Men's T-Shirts
              </button>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {filteredItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative">
                    <img 
                      src={`/api/placeholder/250/300`} 
                      alt={`Recommendation ${i}`}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                      <Heart size={18} className="text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm">Recommended T-Shirt {i}</h3>
                    <p className="text-gray-900 font-bold mt-1">$24.99</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}