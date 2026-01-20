const bookList = document.getElementById('book_list');
const title = document.getElementById('title');
const author = document.getElementById('author');
const submit = document.getElementById('submit_button');

// Load book objects or an empty array from local storage
let books = JSON.parse(localStorage.getItem('books')) || [];
// Function to display books
function displayBook() {
  bookList.innerHTML = ''; // Clear the list
  books.forEach((book, index) => {
    const bookItem = document.createElement('li');

    const titleAuthorText = document.createElement('p');
    titleAuthorText.textContent = `'${book.titleInput}' by ${book.authorInput}`;

    bookItem.appendChild(titleAuthorText);
    // Function to remove a book
    function removeBook(index) {
      books = books.filter((_, i) => i !== index);
      localStorage.setItem('books', JSON.stringify(books));
      displayBook();
    }

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'Remove';
    removeBtn.addEventListener('click', () => removeBook(index));

    bookItem.appendChild(removeBtn);
    bookList.appendChild(bookItem); // Append bookItem to bookList
  });
}

// Function to add a book
function addBook() {
  const titleInput = title.value.trim();
  const authorInput = author.value.trim();
  if (titleInput === '' || authorInput === '') {
    return;
  }

  // Create a new book object that stores data entered by the user
  const newBook = {
    titleInput,
    authorInput,
  };

  // Add the newly created book to the array of objects called books
  books.push(newBook);

  // Store the books in local storage
  localStorage.setItem('books', JSON.stringify(books));

  // Clear input fields after adding the book
  title.value = '';
  author.value = '';

  displayBook();
}

// Initialize the displayed book list
displayBook();

// Attach event listener for adding books
submit.addEventListener('click', addBook);