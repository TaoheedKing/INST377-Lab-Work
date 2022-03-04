let slidePosition = 0;
const slides = document.getElementsByClassName('carousel__item hidden');
const totalSlides = slides.length;

function updateSlidePosition() {
  for (const slide of slides) {
    console.log(slide);
    slide.classList.remove('carousel__item');
    slide.classList.add('carousel__item');
  }
  slides[slidePosition].classList.add('carousel__item');
}

function moveToNextSlide() {
  if (slidePosition === totalSlides) {
    slidePosition = 0;
  } else {
    slidePosition += 1;
  }
  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition -= 1;
  }
  updateSlidePosition();
}

document.querySelector('.next')
  .addEventListener('click', () => {
    console.log('clicked next');
    moveToNextSlide();
  });

document.querySelector('.prev')
  .addEventListener('click', () => {
    console.log('clicked prev');
    moveToPrevSlide();
  });