const rootElement = document.getElementById('root')

function Modal(opts) {
  // Global element references
  this.closeButton = null
  this.modal = null
  this.overlay = null
  this.transitionEnd = transitionSelect()

  // Option defaults
  const defaults = {
    name: '',
    className: '',
    content: '',
    maxWidth: '100%',
    minWidth: '100%',
    closeButton: true,
    overlay: false,
    willMount: null,
    didMount: null,
    willUnmount: null,
    didUnmount: null,
  }

  // Merge default options with passed in argument
  this.options = Object.assign({}, defaults, opts)

  // Private Methods
  // =========================
  function buildOut() {
    let content
    let container
    let docFrag

    /**
     * If content === HTML string, append the HTML string.
     * if content === domNode, append its content.
     */
    if (typeof this.options.content === 'string') {
      content = this.options.content
    } else {
      content = this.options.content.innerHTML
    }

    // Create DocumentFragment
    docFrag = document.createDocumentFragment()

    // Create modal element
    this.modal = document.createElement('aside')
    this.modal.className = `modal ${this.options.className}`
    this.modal.style.minWidth = !!+this.options.minWidth ? `${this.options.minWidth}px` : this.options.minWidth
    this.modal.style.maxWidth = !!+this.options.maxWidth ? `${this.options.maxWidth}px` : this.options.maxWidth

    // Add overlay if true
    if (this.options.overlay) {
      this.overlay = document.createElement('div')
      this.overlay.className = `modal__overlay ${this.options.className}`
      docFrag.appendChild(this.overlay)
    }

    // Create content and append to modal
    container = document.createElement('article')
    container.id = 'modalContainer'
    container.className = 'modal__container'
    container.innerHTML = content
    this.modal.appendChild(container)

    // If closeButton option is true, add close button.
    if (this.options.closeButton) {
      this.closeButton = document.createElement('button')
      this.closeButton.className = 'modal__close'
      this.closeButton.id = 'modalClose'

      // Button wrapper
      const closefx = document.createElement('div')
      closefx.id = 'closefx'
      closefx.className = 'modal__closefx'

      // X
      const closex = document.createElement('div')
      closex.id = 'closex'
      closex.className = 'modal__closex'

      // Append elements
      closefx.appendChild(closex)
      this.closeButton.appendChild(closefx)
      container.appendChild(this.closeButton)
    }

    // Append modal to DocumentFragment
    docFrag.appendChild(this.modal)

    // Append DocumentFragment to body
    document.body.appendChild(docFrag)
  }

  function initState() {
    // Listen for close
    window.onpopstate = () => {
      if (window.location.href.indexOf(`#${this.options.name}`) === -1) {
        this.close()
      }
    }

    // Bind UI events
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this))
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', this.close.bind(this))
    }
  }

  function resetState() {
    // Reset history events
    window.onpopstate = null
    window.history.replaceState({}, 'home', '/')

    // Reset UI events
    if (this.closeButton) {
      this.closeButton.removeEventListener('click', this.close.bind(this))
    }

    if (this.overlay) {
      this.overlay.removeEventListener('click', this.close.bind(this))
    }
  }

  // Public Methods
  // ==============================================
  Modal.prototype.removeModal = () => {
    if (this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal)
      this.overlay && this.overlay.parentNode && this.overlay.parentNode.removeChild(this.overlay)

      // Remove body overflow style
      rootElement.style.overflow = ''

      this.options.didUnmount && this.options.didUnmount()
    }
  }

  Modal.prototype.createModal = () => {
    // Hide body overflow
    rootElement.style.overflow = 'hidden'

    // Build Modal
    buildOut.call(this)

    // Init event listeners
    initState.call(this)

    // Force browser to rerender after adding modal elements to the DOM
    window.getComputedStyle(this.modal).height
    
    // Apply ID
    this.modal.id = 'modal'

    this.options.didMount && this.options.didMount()
  }

  Modal.prototype.open = () => {
    if (!!this.options.willMount && typeof this.options.willMount === 'function') {
      this.options.willMount(this.createModal)
    } else {
      this.createModal()
    }
  }

  Modal.prototype.close = () => {
    // Remove event listeners
    resetState.call(this)

    // Call close fn
    if (!!this.options.willUnmount && typeof this.options.willUnmount === 'function') {
      this.options.willUnmount(this.removeModal)
    } else {
      this.removeModal()
    }
  }
}

/**
 * Utility method to determine which transistionend event is supported
 * 
 * SEE: https://davidwalsh.name/css-animation-callback
 */
function transitionSelect() {
  var el = document.createElement('div')
  if (el.style.WebkitTransition) return 'webkitTransitionEnd'
  if (el.style.OTransition) return 'oTransitionEnd'
  return 'transitionend'
}

export default Modal;
