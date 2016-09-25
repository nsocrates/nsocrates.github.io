import history from 'html5-history-api'

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

  // ==============================================
  // PRIVATE METHODS
  // ==============================================
  function buildModal() {
    let content
    let container
    let docFrag

    // Append HTML string
    content = this.options.content

    // Create DocumentFragment
    docFrag = document.createDocumentFragment()

    // Create modal element
    this.modal = document.createElement('aside')
    this.modal.className = `modal ${this.options.className}`

    this.modal.style.minWidth = !!+this.options.minWidth
      ? `${this.options.minWidth}px`
      : this.options.minWidth

    this.modal.style.maxWidth = !!+this.options.maxWidth
      ? `${this.options.maxWidth}px`
      : this.options.maxWidth

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
    // Listen for back button
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

    // HTML5-History-API polyfill
    const location = window.history.location || window.location
    history.replaceState({}, 'home', '/')

    // Reset UI events
    if (this.closeButton) {
      this.closeButton.removeEventListener('click', this.close.bind(this))
    }
  }

  function removeModal() {
    if (this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal)

      // Show scrollbar on root
      rootElement.style.overflow = ''

      // Call any defined hooks
      this.options.didUnmount && this.options.didUnmount()
    }
  }

  function createModal() {
    // Hide scrollbar on root
    rootElement.style.overflow = 'hidden'

    // Build Modal
    buildModal.call(this)

    // Init event listeners
    initState.call(this)
    
    // Apply ID
    this.modal.id = 'modal'

    // Call any hooks
    this.options.didMount && this.options.didMount()
  }

  // ==============================================
  // PUBLIC METHODS
  // ==============================================
  Modal.prototype.open = () => {
    if (typeof this.options.willMount === 'function') {
      this.options.willMount(() => createModal.call(this))
    } else {
      createModal.call(this)
    }
  }

  Modal.prototype.close = () => {
    resetState.call(this)

    if (typeof this.options.willUnmount === 'function') {
      this.options.willUnmount(() => removeModal.call(this))
    } else {
      removeModal.call(this)
    }
  }
}

export default Modal;
