"use client"

import { useBookContext } from '../context/appContext';

export default function SearchBar() {
  const { searchValue, setSearchValue } = useBookContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <input 
      type="text" 
      value={searchValue} 
      onChange={handleChange}
      placeholder='Search for a book...'
      className='w-4/6 px-5 py-3 mx-auto rounded-2xl outline-violet-600'
    />
  );
}