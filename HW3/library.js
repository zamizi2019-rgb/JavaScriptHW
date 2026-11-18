let books = [
  { title: 'Мастер и Маргарита', author: 'Булгаков', year: 1967, pages: 480, isRead: false },
  { title: 'Преступление и наказание', author: 'Достоевский', year: 1866, pages: 672, isRead: true },
  { title: 'Война и мир', author: 'Толстой', year: 1869, pages: 1225, isRead: false },
  { title: 'Евгений Онегин', author: 'Пушкин', year: 1833, pages: 224, isRead: true },
  { title: 'Три товарища', author: 'Ремарк', year: 1936, pages: 384, isRead: false }
];

function addBook(books, title, author, year, pages) {
  let newBook = {
    title: title,
    author: author,
    year: year,
    pages: pages,
    isRead: false
  };
  books.push(newBook);
}
function printBooks(books) {
  books.forEach(function(book, index) {
    console.log(`${index + 1}. ${book.title} — ${book.author}, ${book.year}`);
  });
}
function countRead(books) {
  let count = 0;
  for (let book of books) {
    if (book.isRead == true) {
      count++;
    }
  }
  return count;
}

function findBooks(books, query) {
  let foundBooks = [];
  let search = query.toLowerCase();
  for (let book of books) {
    let bookTitle = book.title.toLowerCase();
    let bookAuthor = book.author.toLowerCase();
    if (bookTitle.includes(search) || bookAuthor.includes(search)) {
      foundBooks.push(book); 
    }
  }
  return foundBooks;
}
function oldestBook(books) {
  let oldest = books[0]; 
  for (let book of books) {
    if (book.year < oldest.year) {
      oldest = book;
    }
  }
  return oldest;
}
function averagePages(books) {
  let totalPages = 0;
  for (let book of books) {
    totalPages += book.pages;
  }
  let average = totalPages / books.length;
  return Math.round(average); 
}
function markRead(books, title) {
  for (let book of books) {
    if (book.title === title) {
      book.isRead = true;
      return;
    }
  }
  console.log(`Книга "${title}" не найдена`);
}
function borrowBook(book) {
  let returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 14);
  book.returnDate = returnDate;
  console.log(`Книга "${book.title}" взята на 14 дней. Вернуть до: ${returnDate.toLocaleDateString()}`);
}
function isOverdue(book) {
  if (!book.returnDate) {
    return false;
  }
  return new Date() > book.returnDate;
}
function bookOfTheDay(books) {
  let randomIndex = Math.floor(Math.random() * books.length);
  let randomBook = books[randomIndex];
  console.log(`Книга дня: "${randomBook.title}" (${randomBook.author})`);
  setTimeout(function() {
    console.log(`Напоминание: Не забудьте прочитать Книгу дня — "${randomBook.title}"!`);
  }, 3000);
}

addBook(books, 'Идиот', 'Достоевский', 1869, 640);
printBooks(books);
console.log('Прочитано:', countRead(books));
console.log('Поиск "достоев":', findBooks(books, 'достоев'));
console.log('Самая старая:', oldestBook(books));
console.log('Среднее страниц:', averagePages(books));
markRead(books, 'Война и мир');
console.log('Прочитано после прочтения:', countRead(books));
borrowBook(books[0]);
console.log('Просрочена?', isOverdue(books[0]));
books[0].returnDate = new Date('1001-01-01');
console.log('Просрочена?', isOverdue(books[0]));
bookOfTheDay(books);
