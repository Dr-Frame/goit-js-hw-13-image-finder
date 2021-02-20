import './styles.css';
const _ = require('lodash');
import imgGenApi from './js/apiService';

import galleryTpl from './templates/gallery.hbs';
import refs from './js/refs';

refs.inputRef.addEventListener('input', _.debounce(handleQuerry, 500));
refs.inputRef.addEventListener('click', handleInputClear);
refs.loadMoerBtn.addEventListener('click', loadGallery);

function handleQuerry(event) {
  imgGenApi.searchQuerry = event.target.value;

  hideLoadMoreBtn();
  clearGalleyContainer();
  imgGenApi.resetPage();
  if (imgGenApi.searchQuerry === '') {
    return;
  }
  loadGallery();
}

function loadGallery() {
  imgGenApi.fetchGallery().then(data => {
    handleGalleryMarkUp(data);
    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
    showLoadMoreBtn();
  });
}

function handleGalleryMarkUp(pictures) {
  const markup = galleryTpl(pictures);
  refs.galleryWrapper.insertAdjacentHTML('beforeend', markup);
}

function showLoadMoreBtn() {
  refs.loadMoerBtn.classList.remove('hidden');
}
function hideLoadMoreBtn() {
  refs.loadMoerBtn.classList.add('hidden');
}

function handleInputClear() {
  refs.inputRef.value = '';
}

function clearGalleyContainer() {
  refs.galleryWrapper.innerHTML = '';
}
