import 'gsap'
import rGallery from './modules/iso'
import * as Modals from './modules/modal/modal.component'
import Modal from './modules/modal/modal.controller'
import imagesLoaded from 'imagesLoaded'
import { curtain } from './modules/tweens'

window.onload = () => {
  rGallery(imagesLoaded)('.gallery__item')
  curtain.open()
}

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Nav event listener
   */
  // ;(function () {
  //   const toggleButton = document.getElementById('toggle')
  //   const menu = document.getElementById('menu')
  //   const state = { menuIsActive: false }
  //   const toggleOn = toggle.on()
  //   const toggleOff = toggle.off()

  //   const toggleMenu = () => {
  //     if (state.menuIsActive) toggleOff.play(0)
  //     else toggleOn.play(0)
  //     state.menuIsActive = !state.menuIsActive
  //   }

  //   // Add listener to toggler and menu
  //   toggleButton.addEventListener('click', toggleMenu)
  //   menu.addEventListener('click', toggleMenu)

  // })()


  /**
   * Modal Fn
   */
  ;(function () {
    // Component WillUnmount
    function handleWillUnmount(cb) {
      curtain.close({ onComplete: cb })
    }

    // Component DidUnmount
    function handleDidUnmount(cb) {
      curtain.open({ onComplete: cb })
    }

    // Component WillMount
    function handleWillMount(cb) {
      curtain.close({ onComplete: cb })
    }

    // Component DidMount
    function handleDidMount(cb) {
      /**
       * Begin modal onenter animation
       */
      const imageContainer = document.getElementById('showcase')

      // Wait for images to load first, then trigger animation.
      imagesLoaded(imageContainer, () => {
        curtain.open({ onComplete: cb })
      })

      /**
       * Activate hover animations
       */
      const closefx = document.getElementById('closefx')
      
      // REMINDER: Remove event listeners on modal.close
      closefx.addEventListener('mouseenter', () => {
        TweenMax.killTweensOf(closefx)
        TweenMax.to(closefx, 0.3, { rotation: '90', autoAlpha: 0.38, ease: Power1.easeNone })
      })

      closefx.addEventListener('mouseleave', () => {
        TweenMax.killTweensOf(closefx)
        TweenMax.to(closefx, 0.3, { rotation: '0', autoAlpha: 1, ease: Power1.easeNone })
      })
    }

    const modalProps = {
      willMount: handleWillMount,
      didMount: handleDidMount,
      willUnmount: handleWillUnmount,
      didUnmount: handleDidUnmount,
    }

    // Init our modal
    const modals = {
      colorhappy: { name: 'colorhappy', content: Modals.ch },
      reactsound: { name: 'reactsound', content: Modals.rs },
      amanything: { name: 'amanything', content: Modals.ama },
      snvote: { name: 'snvote', content: Modals.snv },
    }

    const modalKeys = Object.keys(modals)
    const hashLocation = String(window.location.hash.split('#')[1])

    // Open modal on direct links
    if (modalKeys.indexOf(hashLocation) !== -1) {
      const m = new Modal(Object.assign({}, modals[hashLocation], modalProps))
      m.open()
    }

    // Bind modals to gallery
    function bindModal(modalObj) {
      modalKeys.forEach(key => {

        // Bind events
        document.getElementById(`anchor__${key}`).addEventListener('click', () => {
          const m = new Modal(Object.assign({}, modalObj[key], modalProps))
          m.open()
        })
      })
    }

    bindModal(modals)

  })()
  rGallery(imagesLoaded)('.gallery__item')
})
