import documentRouting from './utils/documentRouting'
import masonryFactory from './factories/masonry'
import resizeFactory from './factories/resizeTextarea'
import scrollFactory from './factories/scroll'
import spyFactory from './factories/spy'
import toggler from './factories/toggler'
import validation from './factories/validation'

export const SOCRATES = {
  common: {
    init() {}
  },

  main: {
    init() {
      masonryFactory.init()
      resizeFactory.init()
      scrollFactory.init()
      spyFactory.init()
      toggler.init()
      validation.init()
    }
  },

  post: {
    init() {
      toggler.init()
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  documentRouting.init(SOCRATES)
})
