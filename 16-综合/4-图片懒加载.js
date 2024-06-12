function lazyload() {
  const images = document.querySelectorAll('img');
  for (let img of images) {
    const src = img.dataset.src;
    if (!src) {
      continue;
    }
    if (isVisible(img)) {
      img.src = src;
      img.dataset.src = '';
    }
  }
}

function isVisible(node) {
  const position = node.getBoundingClientRect();
  const windowHeight = document.documentElement.clientHeight;
  const topVisible = position.top > 0 && position.top < windowHeight;
  const bottomVisible = position.bottom > 0 && position.bottom < windowHeight;
  return topVisible || bottomVisible;
}