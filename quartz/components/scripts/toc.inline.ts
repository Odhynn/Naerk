const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const slug = entry.target.id;
    const tocEntryElements = document.querySelectorAll(`a[data-for="${slug}"]`);
    const windowHeight = entry.rootBounds?.height;
    if (windowHeight) {
      tocEntryElements.forEach((tocEntryElement) => {
        if (entry.boundingClientRect.y < windowHeight) {
          tocEntryElement.classList.add("in-view");
        } else {
          tocEntryElement.classList.remove("in-view");
        }
      });
    }
  }
});

function toggleToc(this: HTMLElement) {
  this.classList.toggle("collapsed")
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
  content.style.maxHeight = content.style.maxHeight === "0px" ? content.scrollHeight + "px" : "0px"
}

function setupToc() {
  function isElementVisible(element: Element): boolean {
    let currentElement = element;
    while (currentElement && !currentElement.classList.contains('quartz-body')) {
      if (getComputedStyle(currentElement).display === 'none') {
        return false;
      }
      currentElement = currentElement.parentElement as Element;
    }
    return true;
  }

  const tocElements = Array.from(document.querySelectorAll('#toc'))
    .filter(isElementVisible);
  const toc = tocElements.length > 0 ? tocElements[0] : null;
  if (toc) {
    const collapsed = toc.classList.contains("collapsed")
    const content = toc.nextElementSibling as HTMLElement | undefined
    if (!content) return
    content.style.maxHeight = collapsed ? "0px" : content.scrollHeight + "px"
    toc.removeEventListener("click", toggleToc)
    toc.addEventListener("click", toggleToc)
  }
}

window.addEventListener("resize", setupToc)
document.addEventListener("nav", () => {
  setupToc()

  // update toc entry highlighting
  observer.disconnect()
  const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  headers.forEach((header) => observer.observe(header))
})
