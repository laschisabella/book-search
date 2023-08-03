"use client"

import { useBookContext } from '../context/appContext';

export default function SearchBar() {
  const { searchValue, setSearchValue } = useBookContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="flex justify-center">
      <input 
        type="text" 
        value={searchValue} 
        onChange={handleChange}
        placeholder='Search for a book...'
        className='w-4/6 p-5 rounded-2xl outline-violet-600'
      />
    </div>
  );
}