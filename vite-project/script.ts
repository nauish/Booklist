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

// Store books existing in the local storage from the previous session and parse them here if they exist
let myLibrary: object[] = [];

if (localStorage.getItem("myLibrary")) {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary") as string);
}

function addBookToLibrary(
  name: string,
  author: string,
  pages: number,
  status: string
) {
  const newBook = new Book(name, author, pages, status);
  myLibrary.push(newBook);
}
