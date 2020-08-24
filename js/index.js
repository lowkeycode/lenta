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
        console.log(document.body.firstElementChild);
    } else {
        document.body.classList.remove(`fixed-nav`);
        document.body.firstElementChild.lastElementChild.style.marginTop = 0;
    }
}

window.addEventListener(`scroll`, fixedNav);



//====================================================//
//====================   FEATURES    =================//
//====================================================//


const featureHeadings = document.querySelectorAll(`.features__heading`);
const photoBox = document.querySelector(`.features__photo-box`);

function switchFeatureImage(event) {
    let featureNumber = event.target.dataset.feature
    const featureHeading = event.target;
    if (event.target) {
    photoBox.innerHTML = `
    <img style="display: block;" class="features__photo features__photo${featureNumber}" src="/img/${featureNumber}.jpg" alt="Feature Picture" >
    `;
    } 
    if (featureHeading.dataset.feature !== `--1`) {
        featureHeading.parentElement.parentElement.firstElementChild.firstElementChild.classList.remove(`features__heading--1`)
    }
}
featureHeadings.forEach(function(heading) {
    heading.addEventListener(`mouseover`, switchFeatureImage);
});