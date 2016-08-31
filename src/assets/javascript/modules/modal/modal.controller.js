const rootElement = document.getElementById('root')

function Modal(opts) {
  // Global element references
  this.modal = null
  this.closeButton = null

  // Option defaults
  const defaults = {
    name: '',
    className: '',
    content: '',
    maxWidth: '100%',
    minWidth: '100%',
    willMount: null,
    didMount: null,
    willUnmount: null,
    didUnmount: null,
  }

  // Merge default options with passed in argument
  this.options = Object.assign({}, defaults, opts)

  // Private Methods
  // =========================
  function buildModal() {
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

    // Create content and append to modal
    container = document.createElement('article')
    container.id = 'modalContainer'
    container.className = 'modal__container'
    container.innerHTML = content
    this.modal.appendChild(container)

    // Create close button
    this.closeButton = document.createElement('button')
    this.closeButton.className = 'modal__close'
    this.closeButton.id = 'modalClose'

    // Create close button wrapper
    const closefx = document.createElement('div')
    closefx.id = 'closefx'
    closefx.className = 'modal__closefx'

    // Create close button X
    const closex = document.createElement('div')
    closex.id = 'closex'
    closex.className = 'modal__closex'

    // Append close button elements
    closefx.appendChild(closex)
    this.closeButton.appendChild(closefx)
    container.appendChild(this.closeButton)

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
    this.closeButton.addEventListener('click', this.close.bind(this))
  }

  function resetState() {
    // Reset history events
    window.onpopstate = null
    window.history.replaceState({}, 'home', '/')

    // Reset UI events
    this.closeButton.removeEventListener('click', this.close.bind(this))
  }

  // Public Methods
  // ==============================================
  Modal.prototype.removeModal = () => {
    if (this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal)

      // Show scrollbar on root
      rootElement.style.overflow = ''

      // Call any hooks
      this.options.didUnmount && this.options.didUnmount()
    }
  }

  Modal.prototype.createModal = () => {
    // Hide scrollbar on root
    rootElement.style.overflow = 'hidden'

    // Build Modal
    buildModal.call(this)

    // Init event listeners
    initState.call(this)

    // Force browser to rerender after adding modal elements to the DOM
    window.getComputedStyle(this.modal).height
    
    // Apply ID
    this.modal.id = 'modal'

    // Call any hooks
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

export default Modal;
