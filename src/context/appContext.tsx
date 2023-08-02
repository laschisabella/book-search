"use client"
import { createContext, useState, useContext, ReactNode } from 'react';

interface bookContextI {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const BookContext = createContext<bookContextI>({} as bookContextI);

export function BookContextProvider({ children }: { children: ReactNode }) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <BookContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBookContext() {
  return useContext(BookContext);
}
