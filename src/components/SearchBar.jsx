import React, { useRef } from "react";
import { Search, X } from "lucide-react";

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
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "400px"
      }}
      className={className}
    >
      <Search
        size={18}
        onClick={handleIconClick}
        style={{
          position: "absolute",
          left: "14px",
          color: "var(--text-secondary)",
          cursor: "pointer"
        }}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 40px 10px 42px",
          borderRadius: "var(--border-radius-md)",
          border: "1px solid var(--border-light)",
          backgroundColor: "#f8fafc",
          color: "var(--text-primary)",
          fontSize: "0.9rem",
          transition: "var(--transition-smooth)"
        }}
        className="search-input-field"
      />
      {value && (
        <X
          size={18}
          onClick={handleClear}
          style={{
            position: "absolute",
            right: "14px",
            color: "var(--text-secondary)",
            cursor: "pointer"
          }}
        />
      )}
    </div>
  );
};
export default SearchBar;
