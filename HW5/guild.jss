// Домашнее задание 6. Книжная полка
const books = [
  { title: 'Хоббит', author: 'Толкин' },
  { title: 'Маленький принц', author: 'Сент-Экзюпери' },
  { title: 'Алиса в Стране чудес', author: 'Кэрролл' }
];
console.log('Старт! Файл подключён');
// DOM-код пишите здесь. Условия — в слайдах ДЗ.\

const titleText = 'Моя библиотека';
const descriptionText = 'Книги для следующего приключения';
const linkText = 'Посмотреть книги';
const linkHref = '#books';

const libraryTitle = document.getElementById('library-title');
const libraryDescription = document.getElementById('library-description');
const libraryLink = document.getElementById('library-link');

libraryTitle.textContent = titleText;
libraryDescription.textContent = descriptionText;
libraryLink.textContent = linkText;
libraryLink.href = linkHref;

libraryTitle.classList.add('ready');

function renderBooks(list) {
    const library = document.getElementById('books');
    const counter = document.getElementById('book-count');
    library.innerHTML = '';

    list.forEach(function(book) {
        const card = document.createElement('article');
        const bookName = document.createElement('h3');
        const bookAuthor = document.createElement('p');
        card.className = 'hero-card';
        bookName.textContent = book.title;
        bookAuthor.textContent = book.author;
        card.appendChild(bookName);
        card.appendChild(bookAuthor);
        library.appendChild(card);
    });
    counter.textContent = list.length;
}
renderBooks(books);

