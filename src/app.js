const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "read" : "not read yet"
  }`;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);

  myLibrary.push(book);
}

function getBooksFromLibrary() {
  for (const book of myLibrary) {
    console.log(book.info());
  }
}

//Example Data
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
