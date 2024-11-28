import { nanoid } from "nanoid";

//Selected elements
const libraryEl = document.querySelector(".library");

const addBookBtn = document.querySelector("#add-book");
const clearListBtn = document.querySelector("#clear-list");

let myLibrary = [];

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
  book.id = nanoid();

  myLibrary.push(book);
}

function getBooksFromLibrary() {
  for (const book of myLibrary) {
    console.log(book.info());
  }
}

function createBookElement(book) {
  const bookContainer = document.createElement("div");
  bookContainer.className = "book";

  const bookImgContainer = document.createElement("div");
  bookImgContainer.className = "book-img";
  const img = document.createElement("img");
  img.src = "./hobbit.jpg"; // Placeholder image source
  img.alt = book.title;
  bookImgContainer.appendChild(img);

  const bookInfo = document.createElement("div");
  bookInfo.className = "book-info";

  const heading = document.createElement("h3");
  heading.textContent = book.title;
  const author = document.createElement("p");
  author.textContent = book.author;
  const pages = document.createElement("p");
  pages.textContent = `Pages: ${book.pages}`;

  const label = document.createElement("label");
  label.htmlFor = "read-book";
  label.textContent = "Read: ";

  const select = document.createElement("select");
  select.name = "read";
  select.id = "read-book";

  const optionYes = document.createElement("option");
  optionYes.value = "true";
  optionYes.textContent = "Yes";

  const optionNo = document.createElement("option");
  optionNo.value = "false";
  optionNo.textContent = "No";

  select.appendChild(optionYes);
  select.appendChild(optionNo);
  select.value = book.read ? "true" : "false";

  label.appendChild(select);

  const btn = document.createElement("button");
  btn.className = "book-btn";
  btn.textContent = "Remove";

  bookInfo.appendChild(heading);
  bookInfo.appendChild(author);
  bookInfo.appendChild(pages);
  bookInfo.appendChild(label);
  bookInfo.appendChild(btn);

  bookContainer.appendChild(bookImgContainer);
  bookContainer.appendChild(bookInfo);

  select.addEventListener("change", (e) => {
    book.read = e.target.value === "true";
  });

  btn.addEventListener("click", (e) => {
    const bookId = e.target.id;

    //Delete this book from array
    myLibrary = myLibrary.filter((b) => b.id !== book.id);

    //Delete from DOM
    bookContainer.remove();
  });

  return bookContainer;
}

function generateLibrary() {
  myLibrary.forEach((book) => {
    const bookEl = createBookElement(book);
    //Book added to UI
    libraryEl.appendChild(bookEl);
  });
}

function clearLibrary() {
  myLibrary = [];
  libraryEl.innerHTML = "";
}

//Example Data
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);

generateLibrary();

//Events

//TODO
addBookBtn.addEventListener("click", () => {
  console.log("Add book");
});

clearListBtn.addEventListener("click", clearLibrary);
