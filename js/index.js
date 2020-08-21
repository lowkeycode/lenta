const featureHeadings = document.querySelectorAll(`.features__heading`);
const photoBox = document.querySelector(`.features__photo-box`);

function switchFeatureImage(event) {
    let featureNumber = event.target.dataset.feature
    const featureHeading = event.target;
    console.log(featureHeading.parentElement.parentElement.firstElementChild.firstElementChild);
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