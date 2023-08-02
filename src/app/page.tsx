import BookList from "@/components/Booklist";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import Link from "next/link";
import logo from 'public/logo.png'


export default function Home() {
  return (
    <main className="min-h-screen bg-logopurple-100">
      <div className="flex flex-col w-1/2 gap-5 mx-auto">
        <div className="text-center">
          <p className="py-4 text-xs font-bold text-center uppercase text-violet-400 ">
            THIS IS A DEMO. PLEASE <Link href="https://isabella-laschi.vercel.app/"  className="text-pink-200 transition hover:text-pink-400" target="_blank">VISIT MY PORTFOLIO</Link> FOR MORE.
          </p>
        </div>
        <Image src={logo} width={200} height={100} alt="" className="mx-auto my-10" />
        <SearchBar />
        <BookList />
      </div>
    </main>
  )
}
  