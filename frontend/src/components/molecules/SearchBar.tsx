import React from 'react'
import SearchInput from '../atoms/SearchInput'

const SearchBar: React.FC = () => {

    /** Event to handle search, @uninplemented */
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => console.log('searching...')

    return (
        <div className='flex flex-col items-center p-4'>
            <SearchInput handleSearch={handleSearch} />
        </div>
    )
}

export default SearchBar
