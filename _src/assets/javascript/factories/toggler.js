const toggler = () => {
  let s
  const defaults = {
    button: document.getElementById('toggle'),
    overlay: document.getElementById('toggle-overlay'),
    query: 'data-scroll',
    menuParent: document.getElementById('nav'),
    visibleClass: 'sidebar-isVisible'
  }

  function getAnchorElement(evtTarget) {
    let element = evtTarget

    while (element !== s.menuParent) {
      if (element.hasAttribute(s.query)) {
        return element
      }
      element = element.parentNode
    }

    return null
  }

  function removeClass() {
    const { visibleClass } = s
    document.body.classList.remove(visibleClass)
  }

  function handleParentClick(e) {
    const menuItem = getAnchorElement(e.target)

    if (menuItem) {
      return removeClass()
    }

    return null
  }

  function handleToggle() {
    const { visibleClass } = s
    document.body.classList.toggle(visibleClass)
  }

  function bindUIAction() {
    const { button, overlay, menuParent } = s
    menuParent.onclick = handleParentClick.bind(this)
    button.onclick = handleToggle.bind(this)
    overlay.onclick = handleToggle.bind(this)
  }

  return {
    init(opts) {
      s = Object.assign({}, defaults, opts)
      bindUIAction()
    }
  }
}

export default toggler()
