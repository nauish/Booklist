import { useState, useEffect } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "./components/ui/table";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "./components/ui/select";

function App() {
  class Book {
    name: string;
    author: string;
    pages: number;
    status: string;

    constructor(name: string, author: string, pages: number, status: string) {
      this.name = name;
      this.author = author;
      this.pages = pages;
      this.status = status;
    }
  }

  const [myLibrary, setMyLibrary] = useState<Book[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState<number>(0);
  const [read, setRead] = useState("");

  useEffect(() => {
    // Load the library from local storage on component mount
    const storedLibrary = JSON.parse(localStorage.getItem("myLibrary") || "[]");
    setMyLibrary(storedLibrary);
  }, []);

  // Extract book adding logic into a separate function
  function addBookToLibrary(
    name: string,
    author: string,
    pages: number,
    status: string
  ) {
    const newBook = new Book(name, author, pages, status);
    setMyLibrary([...myLibrary, newBook]);
    localStorage.setItem("myLibrary", JSON.stringify([...myLibrary, newBook]));
  }

  function deleteBookFromLibrary(index: number) {
    const updatedLibrary = [...myLibrary];
    updatedLibrary.splice(index, 1);
    setMyLibrary(updatedLibrary);
    localStorage.setItem("myLibrary", JSON.stringify(updatedLibrary));
  }

  return (
    <>
      <header>
        <nav className="flex">
          <div className="font-bold">Library</div>
        </nav>
      </header>
      <main>
        <div className="flex flex-col items-center gap-3 flex-wrap">
          <div className="sm:flex gap-3">
            <Input
              className=""
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
            ></Input>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              placeholder="Author"
            ></Input>
            <Input
              type="number"
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              placeholder="Pages"
            ></Input>
            <Select
              defaultValue="Read"
              onValueChange={(value) => setRead(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Read?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Read" disabled>
                  Read?
                </SelectItem>
                <SelectItem value="Have read">I have read the book</SelectItem>
                <SelectItem value="Haven't">I haven't read the book</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => addBookToLibrary(title, author, pages, read)}
            className="bg-blue-700"
          >
            Add to Library
          </Button>
        </div>
        <div>
          <Table>
            <TableCaption>A list of books in the library.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Author</TableHead>
                <TableHead className="text-center">Pages</TableHead>
                <TableHead className="text-center">Read?</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myLibrary.map((book, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{book.name}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.pages}</TableCell>
                  <TableCell>{book.status}</TableCell>
                  <TableCell>
                    <Button
                      className="bg-red-500"
                      onClick={() => deleteBookFromLibrary(index)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}

export default App;
