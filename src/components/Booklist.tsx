"use client"

import { useBookContext } from "@/context/appContext";
import { ArrowUp,SmileySad } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    imageLinks: {
      smallThumbnail: string
    }
  };
}

export default function BookList() {

  const [books, setBooks] = useState<Book[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const { searchValue } = useBookContext();

  const fetchBooks = useCallback(async () => {
    const apiUrl = "https://www.googleapis.com/books/v1/volumes";
    const queryParams = `?q=${encodeURIComponent(searchValue)}&startIndex=${startIndex}&maxResults=10`;

    try {
      const response = await fetch(apiUrl + queryParams);
      const data = await response.json();
      setBooks(data.items);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, [searchValue, startIndex]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleLoadMore = () => {
    setStartIndex((prevStartIndex) => prevStartIndex + 10);
  };

  return (
    <div className="w-5/6 mx-auto">
      {
        books ? 
        <div className="flex flex-col gap-5">
            {
              books.map((book) => (
                <div key={book.id} className="flex items-start gap-10 p-10 rounded-2xl bg-violet-200">
                  <Image src={book.volumeInfo.imageLinks?.smallThumbnail} width={100} height={100} alt=""/>
                  <div className="flex flex-col w-full my-2">
                    <h1 className="font-bold">{book.volumeInfo.title}</h1>
                    <p>{book.volumeInfo.description?.substring(0, 200) + "..."}</p>
                    <button className="self-end px-5 py-1 mt-2 text-white bg-pink-500 rounded-md">see more</button>
                  </div> 
                </div>
              ))
            }
          <button onClick={handleLoadMore}>Load More</button>
        </div> 
        : 
        !books && searchValue !== "" ? 
        <div className="flex flex-col items-center gap-5 mx-auto my-5">
          <SmileySad  size={100} className="text-logopink-100"/>
          <h1 className="font-black text-center text-white uppercase">No book found!</h1>
        </div>
        :
        <div className="flex flex-col items-center gap-5 mx-auto my-5">
          <div className="arrowAnimation">
            <ArrowUp  size={100} className="text-logopink-100"/>
          </div>
          <h1 className="font-black text-center text-white uppercase">Get started by searching for a title!</h1>
        </div>
      }
    </div>
  );
};
