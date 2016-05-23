function spyFactory() {
  let s
  const defaults = {
    selector: '[data-scroll]',
    offset: -90,
    activeClassName: 'sidebar__link--active'
  }

  function getRects() {
    const targets = [].map.call(s.elementsToActivate, element => {
      const targetId = element.getAttribute(s.selector.replace(/[\[\]]/g, ''))
        || element.hash

      return targetId.substr(1)
    })

    return targets.map(target => {
      const targetElement = document.getElementById(target)
      return !!targetElement && {
        rect: targetElement.getBoundingClientRect(),
        id: target
      }
    })
  }

  function activate(id) {
    return [].forEach.call(s.elementsToActivate, element => {
      const targetToMatch = element.hash
        ? element.hash
        : element.getAttribute(s.selector.replace(/[\[\]]/g, ''))
      const isMatch = targetToMatch.substr(1) === id
      const isActive = element.className.indexOf(s.activeClassName) > -1

      if (isMatch && isActive) {
        return
      }

      element.classList.remove(s.activeClassName)
      if (isMatch) {
        element.classList.add(s.activeClassName)
      }
    })
  }

  function handleScroll() {
    const rects = getRects().filter(n => !!n)
    const centerHeight = window.innerHeight / 2
    rects.forEach(item => {
      const { id, rect } = item
      const { top, bottom } = rect

      if (
        centerHeight + s.offset >= top &&
        centerHeight + s.offset <= bottom
      ) {
        activate(id)
      }
    })
  }

  function bindUIActions() {
    window.addEventListener('scroll', handleScroll, false)
    handleScroll()
  }

  return {
    init(opts) {
      s = Object.assign({}, defaults, opts)
      s.elementsToActivate = document.querySelectorAll(s.selector)
      bindUIActions()
    }
  }
}

export default spyFactory()
