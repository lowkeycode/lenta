/* eslint-disable */


//====================================================//
//=====================   HEADER   ===================//
//====================================================//


const nav = document.querySelector(`.flex-nav`);
const topOfNav = nav.offsetTop;


function fixedNav() {
    if(window.scrollY >= topOfNav) {
        document.body.classList.add(`fixed-nav`);
        document.body.firstElementChild.lastElementChild.style.marginTop = nav.offsetHeight + `px`;
    } else {
        document.body.classList.remove(`fixed-nav`);
        document.body.firstElementChild.lastElementChild.style.marginTop = 0;
    }
}

window.addEventListener(`scroll`, fixedNav);





//====================================================//
//=====================   MOB NAV   ==================//
//====================================================//

const overlay = document.querySelector('.overlay');
const menuBars = document.querySelector('.menu-bars');
const homeNav = document.querySelector('.mobnav__list--home');
const aboutNav = document.querySelector('.mobnav__list--about');
const bookingsNav = document.querySelector('.mobnav__list--bookings');
const galleryNav = document.querySelector('.mobnav__list--gallery');
const blogNav = document.querySelector('.mobnav__list--blog');
const contactNav = document.querySelector('.mobnav__list--contact');
const navItems = [homeNav, aboutNav, bookingsNav, galleryNav, blogNav, contactNav];

// Control Navigation Animation

function navAnimation(direction1, direction2) {
    navItems.forEach((nav, i) => {
        debugger;
        nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
    });
}


function toggleNav(){
    // Toggle hamburger close/open
    menuBars.classList.toggle('change');
    //Toggle menu active
    overlay.classList.toggle('overlay-active');
    if(overlay.classList.contains('overlay-active')) {
        //Animate in
        overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
       navAnimation('out', 'in');
    } else {
        overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
        navAnimation('in', 'out');
    }

}


menuBars.addEventListener('click', toggleNav);
homeNav.addEventListener('click', toggleNav);
aboutNav.addEventListener('click', toggleNav);
bookingsNav.addEventListener('click', toggleNav);
galleryNav.addEventListener('click', toggleNav);
blogNav.addEventListener('click', toggleNav);





//====================================================//
//====================   FEATURES    =================//
//====================================================//


const featureHeadings = document.querySelectorAll(`.features__heading`);
const photoBox = document.querySelector(`.features__photo-box`);


function switchFeatureImage(event) {
    let featureNumber = event.target.dataset.feature;
    const featureHeading = event.target;

    if (event.target) {
        photoBox.innerHTML = `
        <img class="features__photo features__photo${featureNumber}" src="img/${featureNumber}.jpg" alt=" ">
        `;
        
    } 
    if (featureHeading.dataset.feature !== `--1`) {
        featureHeading.parentElement.parentElement.firstElementChild.firstElementChild.classList.remove(`features__heading--1`)
    }
    
}


featureHeadings.forEach(function(heading) {
    heading.addEventListener(`mouseover`, switchFeatureImage);
});
//====================================================//
//====================   MODAL    =================//
//====================================================//


const storiesImages = document.querySelectorAll(`.stories img`);
const modalOuter = document.querySelector(`.modal__outer`);
const modalInner = document.querySelector(`.modal__inner`);


function handleImgClick(e) {
    const img = e.currentTarget;
    imgSrc = this.src;
    const desc = this.dataset.description;
    modalInner.innerHTML = `
    <figure class="img-wrapper">
        <img src="${imgSrc}" alt="Picture of ${desc}">
        <p class="close-modal">x</p>
        <p class="img-p">${desc}</p>
    </figure>
    `;
    modalOuter.classList.add(`open`);
}
 

storiesImages.forEach(img => img.addEventListener(`click`, handleImgClick));


function closeModal() {
    modalOuter.classList.remove(`open`);
}

modalOuter.addEventListener(`click`, function(e) {
    const isOutside = !e.target.closest(`.modal__inner`);
    if(isOutside) {
        closeModal();
    }
});
modalInner.addEventListener(`click`, function(e) {
    const closeModalButton = e.target.closest(`.close-modal`);
    if(closeModalButton) {
        closeModal();
    }
})

window.addEventListener(`keydown`, (e) => {
    if(e.key === `Escape`) {
        closeModal();
    }
})

