import React from 'react';

export default function SearchResults ({ data, handleSelectedItem }) {
    if (!data || data.length === 0) {
        return <p className="text-gray-500">No results found.</p>;
    }

    return (
        <div className="mt-5">
            <h2 className="text-white">Search Results</h2>
            <ul className="list-none p-0">
                {data.slice(0, 15).map((item, index) => (
                    <li className="p-2 mb-1 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:bg-gray-200" key={index} onClick={() => handleSelectedItem(item.id)}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};