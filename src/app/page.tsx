import BookList from "@/components/Booklist";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="max-w-screen-lg mx-auto">
      <SearchBar />
      <BookList />
    </main>
  )
}
  