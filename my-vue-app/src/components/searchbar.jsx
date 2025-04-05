import React from 'react';

function SearchBar({ searchQuery, onSearch }) {
  return (
    <input
      type="text"
      placeholder="Notlarda ara..."
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
      style={{
        width: '100%',
        padding: '0.75rem',
        fontSize: '1rem',
        marginBottom: '1.5rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    />
  );
}

export default SearchBar;
