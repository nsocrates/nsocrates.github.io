const loader = document.getElementById('loader')
const loaderLeft = document.getElementById('left')
const loaderRight = document.getElementById('right')
const icon = document.getElementById('icon')
const toggleButton = document.getElementById('toggle')
const overlay = document.getElementById('overlay')
const menu = document.getElementById('menu')
const footer = document.querySelectorAll('nav footer')

/**
 * Preload Tween
 */
export const curtain = {
  open: props => {
    const tl = new TimelineMax(props)
    tl.set(icon, { autoAlpha: 0 })
      .to(loaderLeft, 0.5, { x: '-100%', ease: Power2.easeInOut, force3D: true }, 'curtain')
      .to(loaderRight, 0.5, { x: '100%', ease: Power2.easeInOut, force3D: true }, 'curtain')
      .set(loader, { autoAlpha: 0 })
    return tl
  },

  close: props => {
    const tl = new TimelineMax(props)
    tl.set(loader, { autoAlpha: 1 })
      .to(loaderLeft, 0.5, { x: '0%', ease: Power2.easeInOut, force3D: true }, 'curtain')
      .to(loaderRight, 0.5, { x: '0%', ease: Power2.easeInOut, force3D: true }, 'curtain')
      .set(icon, { autoAlpha: 1 })
    return tl
  }
}

/**
 * Nav Tween
 */
export const toggle = {
  on: props => {
    const tl = new TimelineMax(props)
    tl.fromTo(toggleButton, 0.15, { rotation: '0' }, { rotation: '-90', ease: Power4.easeInOut }, 'spin')
      .to(overlay, 0.25, { height: '100%', autoAlpha: 1, ease: Back.easeInOut }, 'spin')
      .to(menu, 0.25, { autoAlpha: 1 }, 'content += 0.05')
      .to(footer, 0.25, { autoAlpha: 1 }, 'content += 0.05')
      .reverse()
    return tl
  },

  off: props => {
    const tl = new TimelineMax(props)
    tl.fromTo(toggleButton, 0.15, { rotation: '-90' }, { rotation: '0', ease: Power4.easeInOut, immediateRender: false }, 'spinx')
      .to(menu, 0.25, { autoAlpha: 0 }, 'spinx -= 0.05')
      .to(footer, 0.25, { autoAlpha: 0 }, 'spinx -= 0.05')
      .to(overlay, 0.25, { height: 0, autoAlpha: 0, ease: Back.easeInOut })
      .reverse()
    return tl
  },
}
