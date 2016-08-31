import 'gsap'
import * as Modals from './modules/modal/modal.component'
import isoGallery from './modules/isoGallery'
import Modal from './modules/modal/modal.controller'
import imagesLoaded from 'imagesLoaded'
import { curtain } from './modules/timeline'

window.onload = () => {
  // reInit isoGallery to make sure everything lines up
  isoGallery(imagesLoaded)('.gallery__item')

  // Open curtain once everything is loaded
  curtain.open()
}

document.addEventListener('DOMContentLoaded', () => {
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
      
      // Attach listeners
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

    // Group our modals
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

  // Init isoGallery
  isoGallery(imagesLoaded)('.gallery__item')
})
