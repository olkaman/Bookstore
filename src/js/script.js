{
  'use strict';

  const bookListWrapper = document.querySelector('.books-list');
  const templateOfBook = document.querySelector('#template-book');
  const bookFilters = document.querySelector('.filters');

  const filters = [];
	

  const bookView = Handlebars.compile(templateOfBook.innerHTML); 
  const booksDataSource = dataSource.books;

  function getBooksList(){
    for(let book of booksDataSource){
      const bookHTML = bookView(book);
      const bookDOM = utils.createDOMFromHTML(bookHTML);
      bookListWrapper.appendChild(bookDOM);
    }
  }

  getBooksList();


  function initActions() {
    const favoriteBooks = [];

    bookListWrapper.addEventListener('dblclick', function(e){
      e.preventDefault();
      const id = e.target.offsetParent.getAttribute('data-id');
      if(!favoriteBooks.includes(id)){
        e.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(id);
      } else {
        e.target.offsetParent.classList.remove('favorite');
        const removeID = favoriteBooks.indexOf(id);
        favoriteBooks.splice(removeID, 1);
      }
    });

    
  }
  
  initActions();

  f
}
