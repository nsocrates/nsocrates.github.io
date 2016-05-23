import Masonry from 'masonry-layout'

function masonryFactory() {
  const defaults = {
    container: document.getElementById('gallery'),
    layoutDelay: 500,
    config: {
      itemSelector: '.gallery__item',
      percentPosition: true,
      masonry: {
        columnWidth: '.gallery__sizer'
      }
    }
  }
  let s
  let mason
  let timer

  function callLayout() {
    mason.layout()
  }

  function handleResize() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callLayout()
    }, s.layoutDelay)
  }

  function bindUIActions() {
    window.addEventListener('resize', handleResize, false)
  }

  return {
    init(opts) {
      s = Object.assign({}, defaults, opts)
      mason = new Masonry(s.container, s.config)
      bindUIActions()
    }
  }
}

export default masonryFactory()
