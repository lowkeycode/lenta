const memberImgs = document.querySelectorAll("img");
const memberNames = document.querySelectorAll(".team__member--name");
const sections = document.querySelectorAll(".section");

const updateMemberImg = function (team) {
  memberImgs.forEach((img, i) => {
    img.setAttribute("src", team.results[i].picture.large);
  });
};

const updateMemberName = function (team) {
  memberNames.forEach((name, i) => {
    const first = team.results[i].name.first;
    const last = team.results[i].name.last;
    name.textContent = `${first} ${last}`;
  });
};

// API
const getRandomUserData = async function () {
  const results = 10;
  const apiUrl = `https://randomuser.me/api/?results=${results}`;

  try {
    const response = await fetch(apiUrl);
    const team = await response.json();
    console.log(team);
    if (team) {
      updateMemberImg(team);
      updateMemberName(team);
    }
  } catch (err) {
    console.log(err);
  }
};

const revealSection = function (entries) {
  const [entry] = entries;
    console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  rootMargin: '-80px'
});

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Event Listeners
getRandomUserData();


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