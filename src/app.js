import { nanoid } from "nanoid";

//Selected elements
const libraryEl = document.querySelector(".library");

const addBookBtn = document.querySelector("#add-book");
const clearListBtn = document.querySelector("#clear-list");

const modal = document.querySelector(".add-book-modal");

const form = document.querySelector(".add-book-modal form");

let myLibrary = [];

function Book(title, author, pages, read, imgSrc) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.imgSrc = imgSrc;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "read" : "not read yet"
  }`;
};

function addBookToLibrary(title, author, pages, read, imgSrc) {
  const book = new Book(title, author, pages, read, imgSrc);
  book.id = nanoid();

  myLibrary.push(book);
  generateLibrary();
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
  img.src = book.imgSrc; // Placeholder image source
  img.alt = book.title;
  bookImgContainer.appendChild(img);

  const bookInfo = document.createElement("div");
  bookInfo.className = "book-info";

  const heading = document.createElement("h3");
  heading.textContent = book.title;
  const author = document.createElement("p");
  author.className = "book-author";
  author.textContent = book.author;
  const pages = document.createElement("p");
  pages.className = "book-pages";
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
  libraryEl.innerHTML = "";
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

function showModal() {
  modal.style.cssText = "display:block;";
  form.reset();
}

function closeModal() {
  modal.style.cssText = "display: none";
}

//Example Data
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 304, true, "/hobbit.jpg");

addBookToLibrary(
  "Wiedźmin Ostatnie Życzenie",
  "Andrzej Sapkowski",
  286,
  true,
  "/wiedzmin.jpg"
);

addBookToLibrary(
  "Wiedźmin Miecz Przeznaczenia",
  "Andrzej Sapkowski",
  286,
  false,
  "/wiedzmin2.jpg"
);

addBookToLibrary(
  "Wiedźmin Krew Elfów",
  "Andrzej Sapkowski",
  286,
  false,
  "/wiedzmin3.jpg"
);

addBookToLibrary(
  "Wiedźmin Chrzest Ognia",
  "Andrzej Sapkowski",
  286,
  false,
  "/wiedzmin4.jpg"
);

addBookToLibrary(
  "Silmarillion",
  "J.R.R. Tolkien",
  286,
  false,
  "/silmarillion.jpg"
);

generateLibrary();

//Events

//TODO
addBookBtn.addEventListener("click", () => {
  showModal();
});

clearListBtn.addEventListener("click", clearLibrary);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titleInput = document.querySelector("#title").value;
  const authorInput = document.querySelector("#author").value;
  const pagesInput = document.querySelector("#pages").value;
  const readInput = document.querySelector("#read").value === "true";
  const imgInput = document.querySelector("#book-img").files[0];

  if (!titleInput || !authorInput || !pagesInput) {
    alert("Incorrect values! Try again.");
    return;
  }

  let imgSrc = "/test.jpg"; // Default image path

  if (imgInput) {
    imgSrc = await readFileAsDataURL(imgInput);
  }

  console.log(imgSrc);

  addBookToLibrary(titleInput, authorInput, pagesInput, readInput, imgSrc);
  generateLibrary();
  closeModal();
});

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
