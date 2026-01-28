import Book from './book.js';

export default class UserInterface {
  constructor(collection) {
    this.collection = collection;
    this.bookList = document.getElementById('book_list');
    this.titleInput = document.getElementById('title'); // Corrected from title to titleInput
    this.authorInput = document.getElementById('author'); // Corrected from author to authorInput
    this.submit = document.getElementById('submit_button');
    this.bookMenu = document.getElementById('menu');

    this.submit.addEventListener('click', () => this.handleAdd());
    this.renderBooks();
    this.setupEventListeners();
    this.initializeVisibility();
    this.startClock();
  }

  renderBooks = () => {
    this.bookList.innerHTML = '';
    this.collection.getBooks().forEach((book, index) => {
      const bookItem = document.createElement('li');
      const titleAuthorText = document.createElement('p');
      titleAuthorText.textContent = `'${book.title}' by ${book.author}`; // Corrected object properties

      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = 'Remove';
      removeBtn.addEventListener('click', () => {
        this.collection.removeBook(index);
        this.renderBooks();
      });

      bookItem.appendChild(titleAuthorText);
      bookItem.appendChild(removeBtn);
      this.bookList.appendChild(bookItem);
    });
  }

handleAdd = () => {
  const title = this.titleInput.value.trim();
  const author = this.authorInput.value.trim();
  if (title === '' || author === '') { // Corrected variable names
    return; // Prevent further execution if inputs are empty
  }
  const book = new Book(title, author);
  this.collection.addBook(book);
  this.titleInput.value = '';
  this.authorInput.value = '';
  this.renderBooks();
}

  setupEventListeners = () => {
    document.getElementById('bookslink').onclick = () => this.displayBooks();
    document.getElementById('addBooklink').onclick = () => this.displayAddBook();
    document.getElementById('Contactlink').onclick = () => this.displayContact();
  }

  displayBooks = () => {
    this.hideAllSections();
    document.getElementById('books').classList.remove('hidden');
  }

  displayAddBook = () => {
    this.hideAllSections();
    document.getElementById('addBook').classList.remove('hidden');
  }

  displayContact = () => {
    this.hideAllSections();
    document.getElementById('contact').classList.remove('hidden');
  }

  hideAllSections = () => {
    document.querySelectorAll('section').forEach((section) => {
      section.classList.add('hidden');
    });
  }

   initializeVisibility =() => {
     this.displayBooks();
   }

  startClock = () => {
    const el = document.getElementById('dateTime');
    if (!el) return;

    const formatter = new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const tick = () => { el.textContent = formatter.format(new Date()); };
    tick(); // initial paint
    this.clockId = setInterval(tick, 1000);
  }
}
