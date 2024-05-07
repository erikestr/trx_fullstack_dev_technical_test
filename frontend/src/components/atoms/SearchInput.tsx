import React from 'react'
import search_icon from './../../assets/icons/search.svg'

interface SearchInputProps {
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>)  => void
}

const SearchInput: React.FC<SearchInputProps> = ({ handleSearch }) => {
    return (
        <div className='relative w-full'>
            <button className='absolute top-1/2 left-1 transform -translate-y-1/2 hover:bg-gray-shade-400 rounded-full w-8 h-8 p-2'>
                <img src={search_icon} alt='Search' />
            </button>
            <input
                type='text'
                className='w-full pl-10 py-2 px-2 focus:ring-2 focus:ring-base rounded-xl focus:outline-none bg-gray-shade-100'
                placeholder='Search...'
                onChange={handleSearch}
            />
        </div>
    )
}

export default SearchInput
