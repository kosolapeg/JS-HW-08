const images = document.querySelectorAll("[data-src]");

const options = {};

const io = new IntersectionObserver((entries, self) => {
  console.log("🤓");

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      //   self.unobserve(entry.target);
    }
  });
});

images.forEach((image) => {
  io.observe(image);
});
