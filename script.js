'use strict';

//Selecting elements
const modal = document.querySelector('.modal');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const home = document.querySelector('.home');
const shop = document.querySelector('.shop');
const allSections = document.querySelectorAll('.section');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnclosehomeModal = document.querySelector('.btn--close-homemodal');
const btnCloseShopModal = document.querySelector('.btn--close-shopmodal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnHome = document.querySelector('.btn-home');
const btnshop = document.querySelector('.btn-shop');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.wines__tab');
const tabsContainer = document.querySelector('.wines__tab-container');
const tabsContent = document.querySelectorAll('.wines__content');

//Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//Closing modal with esc shortcut
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Modal window-home
const openhomeModal = function (e) {
  e.preventDefault();
  home.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closehomeModal = function () {
  home.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnHome.addEventListener('click', openhomeModal);
btnclosehomeModal.addEventListener('click', closehomeModal);
overlay.addEventListener('click', closehomeModal);

//Closing modal with esc shortcut
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !home.classList.contains('hidden')) {
    closehomeModal();
  }
});

//Modal window-shopping
const openshopModal = function (e) {
  e.preventDefault();
  shop.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeshopModal = function () {
  shop.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnshop.addEventListener('click', openshopModal);
btnCloseShopModal.addEventListener('click', closeshopModal);
overlay.addEventListener('click', closeshopModal);

//Closing modal with esc shortcut
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !shop.classList.contains('hidden')) {
    closeshopModal();
  }
});

//Expanding effect for panel-in header
const panels = document.querySelectorAll('.panel');

panels.forEach((panel) => {
  panel.addEventListener('click', () => {
    removeActiveClasses();
    panel.classList.add('panel-active');
  });
});

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove('panel-active');
  });
}

//Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  // getBoundingClientRect() returns an obj of size, position, and other geometric properties of a DOM element
  //const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll(X/Y)', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page navigation (Aiming clicking only related tag for navigation)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed component
tabsContainer.addEventListener('click', function (e) {
  //finding the closest ancestor of the target element that matches a specified selector.
  const clicked = e.target.closest('.wines__tab');

  //console.log(clicked);

  if (!clicked) return;

  //Removing active class from tab
  tabs.forEach((t) => t.classList.remove('wines__tab--active'));
  tabsContent.forEach((c) => c.classList.remove('wines__content--active'));

  //Activation of clicked tab
  clicked.classList.add('wines__tab--active');
  document
    .querySelector(`.wines__content--${clicked.dataset.tab}`)
    .classList.add('wines__content--active');
});

//Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    //console.log(link);

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

//Passing argument into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky navigation (Intersection observer API)

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let curSlide = 0;
const maxSlide = slides.length;

function slider() {
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };
  const init = function () {
    goToSlide(0);
    createDots();
    activeDot(0);
  };
  init();

  //Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  });
}
slider();
