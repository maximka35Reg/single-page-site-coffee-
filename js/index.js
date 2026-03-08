const search = document.getElementById('search');
const filters = document.querySelectorAll('.filter');
const reset = document.getElementById('reset');
const overlay = document.querySelector('.modal-overlay');



//ФИЛЬТРАЦИЯ И ПОИСК
function filter() {
  // Получение текста из поиска
  const text = search.value.toLowerCase().trim();

  // Нахождение активного фильтра 
  const filter = document.querySelector('.filter.active')?.textContent || '';

  // Счётчик найденных карточек
  let count = 0;

  const cards = document.querySelectorAll('.card').forEach(card => {
    // Данные для сравнения с поисковой строкой
    const name = card.querySelector('.name').textContent.toLowerCase();
    const desc = card.querySelector('.descr').textContent.toLowerCase();
    const strength = card.querySelector('.strength').textContent.toLowerCase();
    const way = card.querySelector('.way').textContent.toLowerCase();
    const country = card.querySelector('.country').textContent.toLowerCase();

    // Данные для сравнения с фильтром
    const dataWay = card.dataset.way;
    const dataStrength = card.dataset.strength;
    const dataCountry = card.dataset.country

    // Отображение или сокрытие карточки в зависимости от введённой информации
    if ((!filter || dataWay === filter || dataStrength === filter || dataCountry === filter) && (text === '' || name.includes(text) || desc.includes(text) || strength.includes(text) || way.includes(text) || country.includes(text))) {
      card.style.display = 'block';
      reset.style.display = 'block';
      count++;
    }
    else 
      card.style.display = 'none';
  });

  const no = document.querySelector('.no-results');
  if (count === 0) {
    no.style.display = 'block';
  } else {
    no.style.display = 'none';
  }
}

//Поиск при вводе текста
search.addEventListener('input', filter);

//Клик по кнопке фильтра
filters.forEach(btn => {
  btn.addEventListener('click', function() {
    filters.forEach(f => { f.classList.remove('active'); });
    this.classList.add('active');
    filter();
  });
});

// Cброс фильтров
reset.addEventListener('click', function() {
  filters.forEach(f => { f.classList.remove('active'); });
  search.value = '';
  document.querySelectorAll('.card').forEach(c => { c.style.display = 'block'; });

  reset.style.display = 'none'; 
});



//МОДАЛЬНОЕ ОКНО ДЛЯ ВИДОВ КОФЕ
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function() {

    const img = this.querySelector('.img').src;
    const name = this.querySelector('.name').textContent; 
    const description = this.querySelector('.descr').textContent;
    const strength = this.querySelector('.strength').textContent;
    const way = this.querySelector('.way').textContent;
    const country = this.querySelector('.country').textContent;


    document.querySelector('.modalTitle').textContent = name; 
    document.querySelector('.modalPicture').src = img; 
    document.querySelector('.modalDesc').textContent = description; 
    document.querySelector('.modalStrength').textContent = strength; 
    document.querySelector('.modalWay').textContent = way; 
    document.querySelector('.modalCountry').textContent = country; 


    document.querySelector('.modal-window-types').classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});



// МОДАЛЬНОЕ ОКНО ДЛЯ СПОСОБОВ ПРИГОТОВЛЕНИЯ
document.querySelectorAll('.type').forEach(type => {
  type.addEventListener('click', function() {
      const title = this.dataset.title;
      const description = this.dataset.desc;
      const image = this.dataset.img;
      const video = this.dataset.link;

    document.querySelector('.modalWayTitle').textContent = title;
    document.querySelector('.modalWayDesc').textContent = description;
    document.querySelector('.modalWayPicture').src = image;
    if (video) 
      document.querySelector('.modalWayLink').href = video;

    document.querySelector('.modal-window-way').classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});



// ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function closeModal() {
  document.querySelector('.modal-window-types').classList.remove('active');
  document.querySelector('.modal-window-way').classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}



// ТОЧКИ НА КАРТЕ
const points = document.querySelectorAll('.point');
const win = document.querySelector('.point-window');
const country = document.querySelector('.point-window-country'); 
const desc = document.querySelector('.point-window-info');
const img = document.querySelector('.point-img');

points.forEach(point => {
  point.addEventListener('mouseenter', function(e){
    country.textContent = this.dataset.country;
    desc.textContent = this.dataset.info;
    img.src = this.dataset.img;
        
    win.style.left = (e.clientX - 20) + 'px'; 
    win.style.top = (e.clientY - 210) + 'px';

    win.style.display = 'flex';
  });

  point.addEventListener('mouseleave', function(){
    win.style.display = 'none';
  });
});

