// SearchContext.tsx
import React, { createContext, useContext, useState } from 'react'

interface SearchContextType {
  searchTerm: string
  setSearch: (term: string) => void
}

// Create the context
const SearchContext = createContext<SearchContextType | undefined>(undefined)

// Create a hook to use the SearchContext
export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

// Create the provider
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  /** Declaring state for search term */
  const [searchTerm, setSearchTerm] = useState('')

  /** Set search term */
  const setSearch = (term: string) => setSearchTerm(term)

  return (
    <SearchContext.Provider value={{ searchTerm, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}
