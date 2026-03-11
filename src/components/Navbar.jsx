import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Search, User, X } from "lucide-react";
import SearchBar from "./SearchBar";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

  const handleFindStore = () => {
    // You can change 'USA' to a specific city like 'New York' or 'Los Angeles'
    const region = "USA";
    const searchQuery = encodeURIComponent(`Nike Stores in ${region}`);
    const mapUrl = `https://www.google.com/maps/search/${searchQuery}`;

    // Opens in a new tab
    window.open(mapUrl, "_blank");
  };

  return (
    <>
      {/* --- MOBILE SEARCH OVERLAY --- */}
      <div
        className={`fixed inset-0 bg-white z-[200] transition-transform duration-300 ease-in-out ${isSearchOpen ? "translate-y-0" : "-translate-y-full"
          } md:hidden`}
      >
        <div className="flex items-center gap-4 px-4 h-16 border-b border-gray-100">
          <div className="flex-1">
            <SearchBar autoFocus={isSearchOpen} />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-xs font-bold uppercase text-gray-400 mb-4">Trending Now</h3>
          <ul className="space-y-4 font-medium text-lg">
            <li><Link to="/shop/jordan" onClick={() => setIsSearchOpen(false)}>Jordan Retro</Link></li>
            <li><Link to="/shop/new-arrivals" onClick={() => setIsSearchOpen(false)}>New Arrivals</Link></li>
          </ul>
        </div>
      </div>

      <header className="relative w-full bg-white z-[100] border-b border-gray-100">
        {/* Top Utility (Desktop Only) */}
        <div className="hidden sm:flex bg-[#f5f5f5] px-10 py-1.5 justify-between items-center text-[12px] font-medium text-black">
          <div className="flex gap-5 items-center">
            {/* Jordan Brand Logo */}
            <Link to="/collection?category=Jordan" className="hover:opacity-70 transition-opacity">
              <img
                src="/jordan.png"
                alt="Jordan"
                className="h-6 w-auto object-contain"
              />
            </Link>

            {/* LeBron / Nike Basketball Logo */}
            <Link to="/collection?category=Lebron" className="hover:opacity-70 transition-opacity">
              <img
                src="/lebron.png"
                alt="LeBron"
                className="h-5 w-auto object-contain"
              />
            </Link>
          </div>
          <ul className="flex gap-4 items-center">
            <li>
              <button
                onClick={handleFindStore}
                className="hover:opacity-70 cursor-pointer"
              >
                Find a Store
              </button>
            </li>
            <span className="h-3 w-[1px] bg-gray-300"></span>
            <li><Link to="/help" className="hover:opacity-70">Help</Link></li>
            <span className="h-3 w-[1px] bg-gray-300"></span>
            <li><Link to="/signin" className="hover:opacity-70">Sign In</Link></li>

          </ul>
        </div>

        {/* Main Navbar */}
        <nav className="flex items-center justify-between px-4 md:px-10 h-16 bg-white">
          <div className="flex-1">
            <Link to="/" className="inline-block outline-none">
              <img
                src="/logo.png"
                alt="Nike Home"
                className="h-6 md:h-14 w-auto object-contain hover:opacity-70 transition-opacity"
              />

              {/* SEO-Friendly Hidden Text */}
              <span className="sr-only">Nike Home</span>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-1 md:gap-3 flex-1">
            {/* Desktop Search */}
            <div className="hidden md:block w-full max-w-[220px]">
              <SearchBar />
            </div>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <Search size={22} />
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart size={22} />
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile User Icon (since bottom nav is gone) */}
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User size={22} />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;