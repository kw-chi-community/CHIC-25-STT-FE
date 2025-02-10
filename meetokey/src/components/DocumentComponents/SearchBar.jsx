import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                className="w-full border px-4 py-2 rounded"
                placeholder="검색 (주제 또는 세부 내용)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
