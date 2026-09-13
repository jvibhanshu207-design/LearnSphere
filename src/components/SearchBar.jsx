import React, { useRef } from "react";
import { Search, X } from "lucide-react";
import "../styles/components/SearchBar.css";

export const SearchBar = ({ value, onChange, placeholder = "Search...", className = "" }) => {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClear = () => {
    onChange("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`search-bar-wrapper ${className}`}>
      <Search
        size={18}
        onClick={handleIconClick}
        className="search-bar-icon"
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-bar-input"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="search-bar-clear"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
