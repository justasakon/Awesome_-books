export default class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  addBook = (book) => {
    this.books.push(book);
    this.save();
  }

  removeBook = (index) => {
    this.books = this.books.filter((_, i) => i !== index);
    this.save();
  }

  save = () => {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  getBooks = () => this.books
}