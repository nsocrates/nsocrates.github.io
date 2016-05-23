const scrollFactory = () => {
  let s
  const defaults = {
    attribute: 'data-scroll',
    parent: document.body,
    speed: 500,
    ease(_time) {
      let time = _time
      return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time
    }
  }

  function getAnchorElement(evtTarget) {
    let element = evtTarget

    while (element !== s.parent) {
      if (element.hasAttribute(s.attribute)) {
        return element
      }
      element = element.parentNode
    }

    return null
  }

  function getTargetLocation(_target) {
    let target = _target
    let y = target.offsetTop

    while (target.offsetParent && target.offsetParent !== document.body) {
      target = target.offsetParent
      y += target.offsetTop
    }

    return y
  }

  function getDocumentHeight() {
    return Math.max(
      window.document.body.scrollHeight, window.document.documentElement.scrollHeight,
      window.document.body.offsetHeight, window.document.documentElement.offsetHeight,
      window.document.body.clientHeight, window.document.documentElement.clientHeight
    )
  }

  function handleScroll(anchorElement) {
    let targetId = anchorElement.getAttribute(s.attribute) || anchorElement.hash
    targetId = targetId.substr(1)
    const target = document.getElementById(targetId)

    if (!target) {
      return null
    }

    const startLocation = window.scrollY
    const targetLocation = getTargetLocation(target)
    const distance = targetLocation - startLocation
    const documentHeight = getDocumentHeight()
    let timeLapsed = 0
    let interval
    let percentage
    let position

    function stopScroll() {
      const currentLocation = window.scrollY
      if (
        position === targetLocation ||
        currentLocation === targetLocation ||
        window.innerHeight + currentLocation >= documentHeight
      ) {
        clearInterval(interval)
      }
    }

    function loopScroll() {
      timeLapsed += 16
      percentage = timeLapsed / parseInt(s.speed, 10)
      percentage = percentage > 1 ? 1 : percentage
      position = startLocation + (distance * s.ease(percentage))
      window.scrollTo(0, Math.floor(position))
      stopScroll()
    }

    function startScroll() {
      clearInterval(interval)
      interval = setInterval(loopScroll, 16)
    }

    return startScroll()
  }

  function handleClick(e) {
    const anchorElement = getAnchorElement(e.target)

    if (!!anchorElement) {
      e.preventDefault()
      return handleScroll(anchorElement)
    }

    return null
  }

  function bindUIActions() {
    s.parent.addEventListener('click', handleClick, false)
  }

  return {
    init(opts) {
      s = Object.assign({}, defaults, opts)
      bindUIActions()
    }
  }
}

export default scrollFactory()
