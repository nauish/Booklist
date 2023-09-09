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
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/label";
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
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-6 items-center">
            <Input
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
            <div className="flex-shrink-0">
              <Checkbox
                value={read}
                onChange={(e) => setRead(e.target.value)}
                id="read"
                className="mr-1"
              ></Checkbox>
              <Label htmlFor="read">I have read the book</Label>
            </div>
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
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Pages</TableHead>
                <TableHead>Read?</TableHead>
                <TableHead>Action</TableHead>
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
