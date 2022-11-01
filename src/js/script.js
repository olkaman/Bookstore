{
  'use strict';

  class BooksList {
    constructor(){
      const thisBookList = this;

      thisBookList.getElements();
      thisBookList.getBooksList();
      thisBookList.initActions();
    }

    getElements(){
      const thisBookList = this;

      thisBookList.bookListWrapper = document.querySelector('.books-list');
      thisBookList.templateOfBook = document.querySelector('#template-book');
      thisBookList.bookFilters = document.querySelector('.filters');
      thisBookList.booksDataSource = dataSource.books;
    }

    getBooksList(){
      const thisBookList = this;

      const bookView = Handlebars.compile(thisBookList.templateOfBook.innerHTML); 

      for(let book of thisBookList.booksDataSource){
        const ratingBgc = thisBookList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;

        const bookHTML = bookView(book);
        const bookDOM = utils.createDOMFromHTML(bookHTML);

        thisBookList.bookListWrapper.appendChild(bookDOM);
      }
    }

    initActions(){
      const thisBookList = this;

      const favoriteBooks = [];
      thisBookList.filters = [];

      thisBookList.bookListWrapper.addEventListener('dblclick', function(e){
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

      thisBookList.bookFilters.addEventListener('click', function(e){
        if(e.target.name == 'filter' && e.target.checked == true){
          thisBookList.filters.push(e.target.value);
        }else if(e.target.name == 'filter' && e.target.checked == false){
          const toRemoveValue = thisBookList.filters.indexOf(e.target.value);
          thisBookList.filters.splice(toRemoveValue, 1);
        }
        thisBookList.filterBooks();
      });

    }

    filterBooks(){
      const thisBookList = this;
    
      let shouldBeHidden = false;

      for(let book of thisBookList.booksDataSource){
        for(let filter of thisBookList.filters){
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

    determineRatingBgc(rating){
      const thisBookList = this;

      thisBookList.background = '';
      if(rating <= 6){
        thisBookList.background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8){
        thisBookList.background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9){
        thisBookList.background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else {
        thisBookList.background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }

      return thisBookList.background;
    }
  }

  const app = new BooksList();
  console.log(app);
}