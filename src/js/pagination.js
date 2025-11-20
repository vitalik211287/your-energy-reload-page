export function renderPaginationUniversal({
  container, // HTMLElement (вже знайдений)
  currentPage, // поточна сторінка (number)
  totalPages, // всього сторінок (number)
  onPageChange, // callback(page)
  mode = 'full', // 'full' | 'neighbors'
  showArrows = false,
  classes = {},
  icons = {},
  scrollToTop = true,
}) {
  if (!container) return;
  container.innerHTML = '';

  const {
    page: pageClass = '',
    active: activeClass = 'active',
    arrow: arrowClass = '',
  } = classes;

  const { prev: prevIcon = 'Prev', next: nextIcon = 'Next' } = icons;

  // Хелпер: створення кнопки
  const createBtn = (label, page, className = '') => {
    const btn = document.createElement('button');
    btn.className = className;
    btn.textContent = label;
    btn.dataset.page = page;
    return btn;
  };

  if (mode === 'full') {
    // 1 2 3 4 ... totalPages
    for (let i = 1; i <= totalPages; i++) {
      const pageNum = i;
      const btn = createBtn(pageNum, pageNum, pageClass);

      if (pageNum === currentPage) {
        btn.classList.add(activeClass);
      }

      container.appendChild(btn);
    }
  } else if (mode === 'neighbors') {
    // (currentPage - 1), currentPage, (currentPage + 1)

    let pages = [];

    if (totalPages <= 3) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage === 1) {
      pages = [1, 2, 3];
    } else if (currentPage === totalPages) {
      pages = [totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [currentPage - 1, currentPage, currentPage + 1];
    }

    pages.forEach(pageNum => {
      const btn = createBtn(
        pageNum,
        pageNum,
        `${pageClass} ${pageNum === currentPage ? activeClass : ''}`.trim()
      );
      container.appendChild(btn);
    });
  }

  // ▶
  if (showArrows) {
    container.appendChild(createArrow('next'));
  }

  // CLICK HANDLER
  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = Number(btn.dataset.page);
      if (Number.isNaN(page) || page === currentPage) return;

      onPageChange(page);

      if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}