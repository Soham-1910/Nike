// src/components/SearchBar.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../assets/index"; // Adjust path as needed
import { useSearchStore } from "../store/useSearchStore";

const SearchBar = ({ autoFocus = false }) => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, setIsSearchOpen } = useSearchStore();
  const [displayQuery, setDisplayQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // 1. Debounce Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(displayQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [displayQuery, setSearchQuery]);

  // 2. Focus logic for mobile overlay
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // 3. Fuzzy Search Filtering
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products
      .filter((p) => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [searchQuery]);

  // 4. Click Outside to Close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 5. Keyboard & Interaction Handlers
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        handleSelect(suggestions[selectedIndex]._id);
      } else if (displayQuery) {
        handleSearchSubmit(displayQuery);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const handleSearchSubmit = (query) => {
    setShowDropdown(false);
    setIsSearchOpen(false); // Close mobile overlay
    navigate(`/search/${query}`);
  };

  const handleSelect = (id) => {
    setShowDropdown(false);
    setIsSearchOpen(false); // Close mobile overlay
    navigate(`/product/${id}`);
  };

  return (
    <div ref={containerRef} className="relative w-full group">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={displayQuery}
          onChange={(e) => {
            setDisplayQuery(e.target.value);
            setShowDropdown(true);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          className="w-full bg-[#f5f5f5] rounded-full py-2 px-10 text-sm outline-none focus:bg-[#ebebeb] transition-all"
        />
        <svg className="absolute left-3 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>

      {/* Instant Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[1000]">
          {suggestions.map((item, index) => (
            <div
              key={item._id}
              onClick={() => handleSelect(item._id)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                selectedIndex === index ? "bg-gray-100" : "bg-white"
              }`}
            >
              <img src={item.image[0]} alt="" className="w-12 h-12 object-cover rounded-md bg-gray-50" />
              <div className="flex-1">
                <p className="text-sm font-bold text-black truncate">{item.name}</p>
                <p className="text-xs text-gray-500">${item.price}</p>
              </div>
            </div>
          ))}
          <div 
            onClick={() => handleSearchSubmit(displayQuery)}
            className="p-3 bg-gray-50 text-center text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          >
            See all results for "{displayQuery}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;