import images from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  clsBtn: document.querySelector(".lightbox__button"),
  lightboxImage: document.querySelector(".lightbox__image"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
};

///////////////////////////////////////
////////// Handler functions //////////
///////////////////////////////////////

const updateImage = (currentImage) => {
  const url = currentImage.dataset.source;
  refs.lightboxImage.src = url;
  refs.lightboxImage.alt = currentImage.alt;
  refs.lightboxImage.dataset.index = currentImage.dataset.index;
};

const openModal = (e) => {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") return;

  updateImage(e.target);

  refs.lightbox.classList.add("is-open");
};

const closeModal = (e) => {
  if (!e) refs.lightbox.classList.remove("is-open");
  if (e.currentTarget == e.target) refs.lightbox.classList.remove("is-open");
};

const showNext = () => {
  const idx = Number(refs.lightboxImage.dataset.index);
  const nextIdx = idx + 1;

  if (nextIdx >= images.length) return;

  const nextImage = document.querySelector(`[data-index='${nextIdx}']`);
  updateImage(nextImage);
};

const showPrev = () => {
  const idx = Number(refs.lightboxImage.dataset.index);
  const nextIdx = idx - 1;

  if (nextIdx < 0) return;

  const prevImage = document.querySelector(`[data-index='${nextIdx}']`);
  updateImage(prevImage);
};

const keyDownHandler = (e) => {
  if (e.code === "Escape") closeModal();
  if (e.code === "ArrowRight") showNext();
  if (e.code === "ArrowLeft") showPrev();
};

///////////////////////////////////////
////////// Gallery rendering //////////
///////////////////////////////////////

const imagesArray = images.reduce((acc, image, idx) => {
  const item = document.createElement("li");
  const link = document.createElement("a");

  link.setAttribute("href", image.preview);
  link.classList.add("gallery__link");

  const img = document.createElement("img");
  img.classList.add("gallery__image");
  img.setAttribute("alt", image.description);
  img.setAttribute("src", image.preview);
  img.dataset.source = image.original;
  img.dataset.index = idx;

  item.appendChild(link);
  link.appendChild(img);

  return [...acc, item];
}, []);

refs.gallery.append(...imagesArray);

///////////////////////////////////////
////////// Event listenesrs //////////
///////////////////////////////////////

refs.gallery.addEventListener("click", openModal);
refs.clsBtn.addEventListener("click", closeModal);
window.addEventListener("keydown", keyDownHandler);
refs.lightboxOverlay.addEventListener("click", closeModal);
