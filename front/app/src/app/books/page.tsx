import { FC } from "react";

type Book = {
  id: number;
  title: string;
  body: string;
};

async function getBook() {
  const res = await fetch("http://back:3000/books");

  if (!res.ok) {
    throw new Error("Failed to fetch Post");
  }

  return res.json();
}

const Home: FC = async () => {
  const books: Book[] = await getBook();

  return (
    <div className="m-4">
      <h1 className="text-4xl mb-4 underline">Book一覧</h1>
      {books.map((book) => (
        <>
          <p className="mb-1" key={book.id}>
            {book.title}
          </p>
          <p className="mb-1" key={book.id}>
            {book.body}
          </p>
        </>
      ))}
    </div>
  );
};

export default Home;
