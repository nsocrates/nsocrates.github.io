import 'gsap'
import imagesLoaded from 'imagesLoaded'
import * as Modals from './modules/modal/modal.component'
import isoGallery from './modules/isoGallery'
import Modal from './modules/modal/modal.controller'
import { curtain } from './modules/timeline'

window.onload = () => {
  // reInit isoGallery to make sure everything lines up
  isoGallery(imagesLoaded)('.gallery__item')

  // Open curtain once everything is loaded
  curtain.open()
}

document.addEventListener('DOMContentLoaded', () => {
  // =============================
  // INIT MODAL
  // =============================
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
      const imageContainer = document.getElementById('showcase')
      const closefx = document.getElementById('closefx')

      // Wait for images to load first, then trigger animation.
      imagesLoaded(imageContainer, () => {
        curtain.open({ onComplete: cb })
      })
      
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

    // Group our modals
    const modals = {
      colorhappy: { name: 'colorhappy', content: Modals.ch },
      reactsound: { name: 'reactsound', content: Modals.rs },
      amanything: { name: 'amanything', content: Modals.ama },
      snvote: { name: 'snvote', content: Modals.snv },
    }

    const modalProps = {
      willMount: handleWillMount,
      didMount: handleDidMount,
      willUnmount: handleWillUnmount,
      didUnmount: handleDidUnmount,
    }

    const modalKeys = Object.keys(modals)
    const hashLocation = String(window.location.hash.split('#')[1])

    // Opens modal
    function setModal(modal) {
      const m = new Modal(Object.assign({}, modal, modalProps))
      m.open()
    }

    // Open modal on direct links
    if (modalKeys.indexOf(hashLocation) !== -1) {
      setModal(modals[hashLocation])
    }

    // Bind modals to gallery
    function bindModal(modalObj) {
      modalKeys.forEach(key => {
        document.getElementById(`anchor__${key}`).addEventListener('click', () => {
          setModal(modalObj[key])
        })
      })
    }

    bindModal(modals)

  })()

  // ============================
  // INIT ISO GALLERY
  // ============================
  isoGallery(imagesLoaded)('.gallery__item')
})
