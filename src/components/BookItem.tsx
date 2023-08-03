import Image from "next/image";
import { SmileyXEyes } from "@phosphor-icons/react";
import Link from "next/link";

interface DetailsProps {
  book: {
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
}

export default function BookItem({book}:DetailsProps) {
  return (
    <div className="flex items-start gap-10 p-10 rounded-2xl bg-violet-200">
      {
        book.volumeInfo.imageLinks?.thumbnail ? (
          <Image src={book.volumeInfo.imageLinks?.thumbnail} width={100} height={100} alt=""/>
        ) : <div className="flex flex-col items-center justify-center py-5 my-5 text-center text-pink-100 bg-purple-900 rounded-xl">
          <SmileyXEyes size={40} />
          <p>Image not found!</p>
        </div>
      }
      <div className="flex flex-col w-full my-2">
        <h1 className="text-lg font-bold">{book.volumeInfo.title}</h1>
        <h2 className="flex gap-2 mb-3">{book.volumeInfo.authors?.map((author, i) => <span key={i}>{author}</span>)}</h2>
          {
            book.volumeInfo.description && (
              <p>{book.volumeInfo.description?.substring(0, 100) + "..."}</p>
            )
          }
        <Link href={`/${book.id}`} className="self-start px-5 py-1 mt-2 text-white bg-pink-500 rounded-md" role="button">see more</Link>
      </div> 
    </div>
  )
} 