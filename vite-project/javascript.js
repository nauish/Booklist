class Book {
  constructor(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}
// store books existing in the local storage from previous session and parse in here if it exists
let myLibrary = [];
if (localStorage.getItem("myLibrary")) {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

function addBookToLibrary() {
  const newBook = new Book();
  myLibrary.push(newBook);
}
