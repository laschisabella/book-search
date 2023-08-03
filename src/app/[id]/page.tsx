import Image from "next/image";
import Link from "next/link";
import DOMPurify from 'isomorphic-dompurify';

interface BookPagePropsI {
  params: {
    id: string
  };
}

async function getBookInfo(id: string) {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`, { cache: 'no-store' });
    const bookData = await response.json();

    return bookData
  } catch (error) {
    console.error('Error fetching book info:', error);
    return null;
  }
}

export default async function BookPage({params}: BookPagePropsI) {

  const book = await getBookInfo(params.id)

  const sanitizedDescription = DOMPurify.sanitize(book.volumeInfo.description);

  return(
    <main className="max-w-screen-lg mx-auto my-24">
      <div className="flex items-center gap-10">
        {
          book.volumeInfo.imageLinks?.thumbnail && (
            <Image src={book.volumeInfo.imageLinks?.thumbnail.replace(/&zoom=\d+/, "&zoom=3")} width={1000} height={1000} alt="" className="w-80 rounded-xl"/>
          ) 
        }


        
        <div>
          <h1 className="mb-3 text-3xl font-bold text-logopink-100">{book.volumeInfo.title}</h1>
          <h2 className="flex gap-2 mb-10 font-bold text-white">{book.volumeInfo.authors?.map((author:string, i:number) => <span key={i}>{author}</span>)}</h2>
          <div className="text-white" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
      </div>
      <Link href='/' className="block px-5 py-2 mx-auto my-5 font-bold uppercase w-min bg-logopink-100 text-logopurple-100 rounded-xl">back</Link>
    </main>
  )
}