import Masonry from 'isotope-layout'

function factory() {
  const defaults = {
    container: document.getElementById('iso'),
    layoutDelay: 100,
    config: {
      transitionDuration: '0.4s',
      itemSelector: '.gallery__item',
      layoutMode: 'fitRows',
      percentPosition: false,
      resizeBound: false,
      isResizeBound: false,
      initLayout: false,
      isInitLayout: false,
      fitRows: {
        columnWidth: '.gallery__sizer',
      },
    },
  }
  let s
  let masonry

  return {
    init(opts) {
      s = Object.assign({}, defaults, opts)
      masonry = new Masonry(s.container, s.config)

      return masonry
    },
  }
}

export default factory()
