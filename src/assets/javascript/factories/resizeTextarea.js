function resizeTextarea() {
  let s
  const defaults = {
    maxHeight: 300,
    id: 'formMessage',
    wrapperId: 'formMessageWrapper'
  }

  function handleResize() {
    const textArea = document.getElementById(s.id)
    const wrapper = document.getElementById(s.wrapperId)

    textArea.style.overflow = 'hidden'
    textArea.style.height = 'auto'
    textArea.style.height = `${textArea.scrollHeight}px`
    wrapper.style.height = textArea.style.height

    if (textArea.scrollHeight >= s.maxHeight) {
      textArea.style.overflowY = 'auto'
      textArea.style.maxHeight = `${s.maxHeight}px`
      wrapper.style.maxHeight = `${s.maxHeight}px`
    }
  }

  function handleDelayedResize() {
    window.setTimeout(handleResize, 0)
  }

  function bindUIActions() {
    const textArea = document.getElementById(s.id)

    textArea.addEventListener('change', handleResize)
    textArea.addEventListener('cut', handleDelayedResize)
    textArea.addEventListener('paste', handleDelayedResize)
    textArea.addEventListener('drop', handleDelayedResize)
    textArea.addEventListener('keydown', handleDelayedResize)

    handleResize()
  }

  return {
    init(options) {
      s = Object.assign({}, defaults, options)
      bindUIActions()
    }
  }
}

export default resizeTextarea()
