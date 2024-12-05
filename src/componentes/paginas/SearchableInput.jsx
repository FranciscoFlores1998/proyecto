import React, { useState, useEffect } from 'react';

export function SearchableInput({ placeholder, data, onSelect, searchKeys, selectedVolunteers }) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (search) {
      const filtered = data
        .filter(item => !selectedVolunteers.some(v => v.id === item.id)) // Excluir voluntarios ya seleccionados
        .filter(item => 
          searchKeys.some(key => 
            item[key].toLowerCase().includes(search.toLowerCase())
          )
        );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [search, data, searchKeys, selectedVolunteers]);

  return (
    <div className="searchable-input">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
      />
      {results.length > 0 && (
        <div className="search-results">
          {results.map((item,index) => (
            <div key={item.id} onClick={() => {
              onSelect(item);
              setSearch('');
            }}>
              <div className={`sin-borde ${index % 2 === 0 ? 'even' : 'odd'}`}>{item.nombre} - {item.rut} - {item.claveRadial}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

