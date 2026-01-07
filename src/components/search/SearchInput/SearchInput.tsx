import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass } from '@phosphor-icons/react';
import './SearchInput.css';

export const SearchInput: React.FC = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form className="vids-search-input" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Rechercher sur Vids..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">
                <MagnifyingGlass size={20} />
            </button>
        </form>
    );
};

export default SearchInput;
