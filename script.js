let myLibrary = [];

function Book(title, author, numPages) {
    this.title = title,
    this.author = author,
    this.numPages = numPages,
    this.read = false,
    this.info = function()   {
        return `${this.title} by ${this.author}, ${numPages} pages, ${this.read ? 'already read' : 'not read yet'}`;
    }
}

function toggleRead(idx) {
    myLibrary[idx].isRead = !myLibrary[idx].isRead;
    redraw();
}

function showAddBookForm() {
    const overlay = document.querySelector("#dark-overlay");
    overlay.style.visibility = "visible";
    const bookForm = document.querySelector("#add-book-form");
    bookForm.style.visibility = "visible";
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    redraw();
}

function removeBookFromLibrary(idx) {
    myLibrary.splice(idx, 1);
    redraw();
}

function addCardElement(book, idx) {
    // create card
    let newCard = document.createElement("div");
    newCard.classList.add('card');
    // populate card
    let bookTitle = document.createElement("p");
    bookTitle.textContent = book.title;
    bookTitle.classList.add('bookTitle');
    let bookAuthor = document.createElement("p");
    bookAuthor.textContent = `By ${book.author}`;
    bookAuthor.classList.add('bookAttribute');
    let bookPages = document.createElement("p");
    bookPages.textContent = `${book.numPages} pages`;
    bookPages.classList.add('bookAttribute');
    let isRead = document.createElement("button");
    isRead.textContent = `${book.isRead ? "Read" : "Not read"}`;
    isRead.classList.add("bookBtn");
    isRead.classList.add(book.isRead ? "btn-read" : "btn-unread");
    isRead.addEventListener("mousedown", () => toggleRead(idx));
    let removeBook = document.createElement("button");
    removeBook.textContent = "Remove from library";
    removeBook.classList.add("btn-remove");
    removeBook.addEventListener("mousedown", () => removeBookFromLibrary(idx));
    newCard.appendChild(bookTitle);
    newCard.appendChild(bookAuthor);
    newCard.appendChild(bookPages);
    newCard.appendChild(isRead);
    newCard.appendChild(removeBook);
    return newCard;
}

const redraw = function() {
    const library = document.querySelector(".library");
    // first clear library
    while (library.firstChild) {
        library.removeChild(library.lastChild);
    }
    // then populate with examples
    myLibrary.forEach((book, idx) => {
        const newCard = addCardElement(book, idx);
        library.appendChild(newCard);
    });

    // add event listener to Add a book button
    const bookBtn = document.querySelector("#add-new");
    bookBtn.addEventListener("mousedown", () => showAddBookForm());
}

// add event listener to book adder
const addButton = document.querySelector("#confirm-add");
addButton.addEventListener("mousedown", () => {
    const bookTitle = document.querySelector("#bookTitle");
    const bookAuthor = document.querySelector("#bookAuthor");
    const numPages = document.querySelector("#bookNumPages");
    const hasRead = document.querySelector("#bookHasRead");
    if (bookTitle && bookAuthor && numPages) {
        let newBook = new Book(bookTitle.value, bookAuthor.value, numPages.value);
        newBook.isRead = hasRead.checked;
        addBookToLibrary(newBook);
        bookTitle.value = '';
        bookAuthor.value = '';
        numPages.value = '';
        hasRead.checked = false;
        const overlay = document.querySelector("#dark-overlay");
        overlay.style.visibility = "hidden";
        const bookForm = document.querySelector("#add-book-form");
        bookForm.style.visibility = "hidden";
    }
});

const cancelButton = document.querySelector("#cancel-add");
cancelButton.addEventListener("mousedown", () => {
    const bookTitle = document.querySelector("#bookTitle");
    const bookAuthor = document.querySelector("#bookAuthor");
    const numPages = document.querySelector("#bookNumPages");
    const hasRead = document.querySelector("#bookHasRead");
    bookTitle.value = '';
    bookAuthor.value = '';
    numPages.value = '';
    hasRead.checked = false;
    const overlay = document.querySelector("#dark-overlay");
    overlay.style.visibility = "hidden";
    const bookForm = document.querySelector("#add-book-form");
    bookForm.style.visibility = "hidden";
});

const tempBooks = [
    new Book('Don Quijote', 'Miguel De Cervantes', 880), 
    new Book('A Tale of Two Cities', 'Charles Dickens', 304),
    new Book('The Little Prince', 'Antoine de Saint-Exupery', 96)];

tempBooks.forEach((book) => addBookToLibrary(book));

redraw();