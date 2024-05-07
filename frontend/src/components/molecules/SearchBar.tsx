import React from 'react'
import SearchInput from '../atoms/SearchInput'
import { useSearch } from '../../context/SearchProvider';

const SearchBar: React.FC = () => {
    /** Search hook declaration */
    const { setSearch } = useSearch();

    /** Event to handle search */
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    return (
        <div className='flex flex-col items-center p-4'>
            <SearchInput handleSearch={handleSearch} />
        </div>
    )
}

export default SearchBar
