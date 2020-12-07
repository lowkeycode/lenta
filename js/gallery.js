const imageContainer = document.querySelector(".gallery__container");
const body = document.querySelector("body");
const loader = document.querySelector('.loader');
const header = document.querySelector('.header')
const menuBarsArray = document.querySelectorAll('.bar')


let photosArray = [];



// API
const count = 3;
const apiKey = "dNz3c1X_j1AGBMw5Up-N-LmZtbJObnIxlu32YY22CUY";

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

const apiUrl = `https://api.unsplash.com//photos/random/?client_id=${apiKey}&query=landscape&count=${count}`;

const displayPhotos = function () {
  // Run function for each object in array
  photosArray.forEach((photo) => {
    // Link on click to unsplash

    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    // Create img element for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    img.style.borderRadius = "2px";

    // Add caption with photographer name
    const figcapCont = document.createElement("div");
    const figcap = document.createElement("figcaption");
    figcap.innerHTML = `Photo by ${photo.user.name}`;

    // Put image inside link & both inside img container element
    figcapCont.appendChild(figcap);
    item.appendChild(img);
    imageContainer.appendChild(item);
    imageContainer.appendChild(figcapCont);
  });
};

// Get photos from unsplash API

async function getPhotos() {

  // Show loader
  loader.removeAttribute('hidden');
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();

    // Wait until there is a list of photos to make the intersecting element be the last img element otherwise on page load is null

    // Intersection Observer for Infinite Scroll
    let lastImg =
      imageContainer.lastElementChild.previousElementSibling.firstChild;

    let offset = -lastImg.offsetHeight + "px";

    const options = {
      root: null,
      rootMargin: `${offset}`,
    };

    // Careful to not limit the API request limit here
    const obsCallback = function (entries, observer) {
      let [entry] = entries;

      if (entry.isIntersecting) {
        getPhotos();

        // Reset old last img to new last img
        lastImg =
          imageContainer.lastElementChild.previousElementSibling.firstChild;
      }
    };

    const lastImgObserver = new IntersectionObserver(obsCallback, options);

    lastImgObserver.observe(lastImg);
    loader.setAttribute('hidden', true);
  } catch (error) {
    console.log(error);
  }
}

// Mod nav


// On load
getPhotos();

const overlay = document.querySelector('.overlay');
const menuBars = document.querySelector('.galmenu-bars');
const homeNav = document.querySelector('.galmobnav__list--home');
const aboutNav = document.querySelector('.galmobnav__list--about');
const bookingsNav = document.querySelector('.galmobnav__list--bookings');
const galleryNav = document.querySelector('.galmobnav__list--gallery');
const blogNav = document.querySelector('.galmobnav__list--blog');
const contactNav = document.querySelector('.galmobnav__list--contact');
const navItems = [homeNav, aboutNav, bookingsNav, galleryNav, blogNav, contactNav];

// Control Navigation Animation

function navAnimation(direction1, direction2) {
    navItems.forEach((nav, i) => {
        nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
    });
}


function toggleMobNav(){
    // Toggle hamburger close/open/pos-fixed
    menuBars.classList.toggle('change');
    menuBars.classList.toggle('menu-bars-fixed');
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


menuBars.addEventListener('click', toggleMobNav);
homeNav.addEventListener('click', toggleMobNav);
aboutNav.addEventListener('click', toggleMobNav);
bookingsNav.addEventListener('click', toggleMobNav);
galleryNav.addEventListener('click', toggleMobNav);
blogNav.addEventListener('click', toggleMobNav);


// Show menu bars at end of header

const showHideBars = function(entries, observer)  {
  let [entry] = entries;
  console.log(entry);
  if(!entry.isIntersecting) {
    menuBarsArray.forEach(bar => {
      bar.classList.remove('hidden');
    });
  } else {
    menuBarsArray.forEach(bar => {
      bar.classList.add('hidden');
    });
  }
  
}

const options =  {
  root: null,
  threshold: 0
}

const headerObserver = new IntersectionObserver(showHideBars, options)

headerObserver.observe(header);