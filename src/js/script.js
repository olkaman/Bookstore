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
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;

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

    bookFilters.addEventListener('click', function(e){

      if(e.target.name == 'filter' && e.target.checked == true){
        filters.push(e.target.value);
      }else if(e.target.name == 'filter' && e.target.checked == false){
        const toRemoveValue = filters.indexOf(e.target.value);
        filters.splice(toRemoveValue, 1);
      }
      filterBooks();
    });
  }
  
  initActions();

  function filterBooks(){
		
    let shouldBeHidden = false;

    for(let book of booksDataSource){
      for(let filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        } else{
          shouldBeHidden = false;
        }
      }
      const singleBook = document.querySelector('.book__image[data-id="' + book.id + '"]');		
      if(shouldBeHidden){
        singleBook.classList.add('hidden');
      }else{
        singleBook.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating){

    let background = '';
    if(rating <= 6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return background;
  }
}
