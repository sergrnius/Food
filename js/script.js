'use strict';
window.addEventListener('DOMContentLoaded', () => {

    let tabs = document.querySelectorAll('.tabheader__item');
    let tabsContent = document.querySelectorAll('.tabcontent');
    let tabsWrap = document.querySelector('.tabheader__items');

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {

        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsWrap.addEventListener('click', (e) => {
        let target = e.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    let deadLine = '2023-7-14';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds; 
        let t = Date.parse(endtime) - new Date();

        if(t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 *24));
            hours = Math.floor(t / (1000 * 60 * 60) %24);
            minutes = Math.floor(t / (1000 * 60) %60);
            seconds = Math.floor(t / 1000 % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getNull(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        let timer = document.querySelector(selector);
        let days = timer.querySelector('#days');
        let hours = timer.querySelector('#hours');
        let minutes = timer.querySelector('#minutes');
        let seconds = timer.querySelector('#seconds');
        let timerInterval = setInterval(updateClock, 1000); 

        updateClock();

        function updateClock() {
            let t = getTimeRemaining(endtime);
            
            days.innerHTML = getNull(t.days);
            hours.innerHTML = getNull(t.hours);
            minutes.innerHTML = getNull(t.minutes);
            seconds.innerHTML = getNull(t.seconds);

            if(t.total <= 0) {
                clearInterval(timerInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    let buttonModal = document.querySelectorAll('[data-modal]');
    let buttonClose = document.querySelector('[data-close]');
    let modal = document.querySelector('.modal');


    buttonModal.forEach(item => {
        item.addEventListener('click', () =>{
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
        });
    });
    buttonClose.addEventListener('click', () => {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    let slides = document.querySelectorAll('.offer__slide');
    let prev = document.querySelector('.offer__slider-prev');
    let next = document.querySelector('.offer__slider-next');
    let total = document.querySelector('#total');
    let current = document.querySelector('#current');
    let slidesWrapper = document.querySelector('.offer__slider-wrapper');
    let slidField = document.querySelector('.offer__slider-inner');
    let width = window.getComputedStyle(slidesWrapper).width;
    let dots= [];

    let slideIndex = 1;
    let offset = 0;
    console.log(slides.length);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidField.style.width = 100 * slides.length + '%';
    slidField.style.display = 'flex';
    slidField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(item => {
        item.style.width = width;
    });

    next.addEventListener('click', () => {

        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
        
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => {
    //         item.style.display = 'none';
    //     });

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex ;
    //     }

    //     slides[slideIndex - 1].style.display = 'block';
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // slider.style.position = 'relative';
    // let indication = document.createElement('ol');
    // indication.classList.add('carousel-indicators');
    // slider.append(indication);

    // for(let i = 0; i < slides.length; i++) {
    //     let dot = document.createElement('li');
    //     dot.setAttribute('data-slide-to', i + 1);
    //     dot.classList.add('dot');
    //     if (i == 0) {
    //         dot.style.opacity = 1;
    //     }
    //     indication.append(dot);
    //     dots.push(dot);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // dots.forEach(item => {
    //     item.addEventListener('click', (e) => {

    //     });
    // });
});