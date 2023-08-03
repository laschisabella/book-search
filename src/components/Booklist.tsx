"use client"

import { useBookContext } from "@/context/appContext";
import { ArrowUp,SmileySad } from "@phosphor-icons/react";
import { useEffect, useState, useCallback } from "react";
import BookItem from "./BookItem";
import spinner from "public/spinner.png"
import Image from "next/image";
import debounce from "lodash.debounce";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    authors: string[]
    imageLinks: {
      thumbnail: string
    }
  };
}

export default function BookList() {

  const [books, setBooks] = useState<Book[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const { searchValue } = useBookContext();
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = useCallback(
    debounce(async () => {
      setIsLoading(true);

      const apiUrl = "https://www.googleapis.com/books/v1/volumes";
      const queryParams = `?q=${encodeURIComponent(searchValue)}&startIndex=${startIndex}&maxResults=5`;

      try {
        const response = await fetch(apiUrl + queryParams);
        const data = await response.json();

        if (data.items && Array.isArray(data.items)) {
          if (startIndex === 0) {
            setBooks(data.items);
          } else {
            setBooks((prevBooks) => [...prevBooks, ...data.items]);
          }
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500), [searchValue, startIndex]); // 500ms delay

  useEffect(() => {
    setBooks([]);
    fetchBooks();
  }, [fetchBooks]);

  const handleLoadMore = () => {
    setStartIndex((prevStartIndex) => prevStartIndex + 5);
    fetchBooks();
  };

  return (
    <div className="w-5/6 mx-auto my-5">
      {
        books.length > 0 ? 
        <div className="flex flex-col gap-5">
          {books.map((book) => <BookItem key={book.id} book={book}/>)}
          <button onClick={handleLoadMore} className="p-5 font-bold uppercase bg-logopink-100 text-logopurple-100 rounded-xl">Load More</button>
        </div>
        :
        books.length === 0 && isLoading ? 
        <Image src={spinner} width={100} height={100} alt="" className="mx-auto animate-spin"/>
        :
        books.length === 0 && searchValue !== "" ? 
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