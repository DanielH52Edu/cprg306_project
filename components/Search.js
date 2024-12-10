import React, { useState, useEffect, useCallback } from 'react';
import SearchResults from './SearchResults';
import axios from 'axios';

const Search = ({ handleSelectedItem }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [prevSearchTerm, setPrevSearchTerm] = useState('');

    const getSearchResult = useCallback(async (term) => {
        if (term === prevSearchTerm) {
            return;
        }
        setPrevSearchTerm(term);
        const res = await axios.get(`https://api.xivtools.co/item/search?name=${term}`);
        const newData = res.data;

        // Filter out duplicates
        const uniqueData = newData.filter(newItem =>
            !originalData.some(existingItem => existingItem.id === newItem.id)
        );

        setOriginalData(prevData => [...prevData, ...uniqueData]);
    }, [prevSearchTerm, originalData]);

    useEffect(() => {
        const filterData = () => {
            const filtered = originalData.filter(item =>
                item.name.includes(searchTerm) ||
                item.plural.includes(searchTerm) ||
                item.singular.includes(searchTerm)
            );
            setFilteredData(filtered);

            if (filtered.length < 25) {
                getSearchResult(searchTerm);
            }
        };

        filterData();
    }, [searchTerm, originalData, getSearchResult]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="w-max">
            <p className="text-white">Example: Everseeker&rsquo;s Pickaxe</p>
            <input
                type="text"
                className="search-input"
                placeholder={"Search for an item..."}
                value={searchTerm}
                onChange={handleInputChange}
            />
            {searchTerm && <SearchResults data={filteredData} handleSelectedItem={handleSelectedItem} />}
        </div>
    );
};

export default Search;