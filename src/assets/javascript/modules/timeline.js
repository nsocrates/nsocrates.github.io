const loader = document.getElementById('loader')
const loaderLeft = document.getElementById('left')
const loaderRight = document.getElementById('right')
const icon = document.getElementById('icon')

// Preload TL
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
