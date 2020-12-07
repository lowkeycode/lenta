const imageContainer = document.querySelector(".gallery__container");
const body = document.querySelector("body");

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
  } catch (error) {
    console.log(error);
  }
}

// On load
getPhotos();
