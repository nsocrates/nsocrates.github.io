/**
 * http://www.paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
 * https://www.viget.com/articles/extending-paul-irishs-comprehensive-dom-ready-execution
 */

export function documentRouting() {
  let SITE_NAME
  function exec(controller, _action) {
    const namespace = SITE_NAME
    const action = typeof _action === 'undefined' ? 'init' : _action

    if (
      controller !== '' &&
      namespace[controller] &&
      typeof namespace[controller][action] === 'function'
    ) {
      namespace[controller][action]()
    }
  }

  return {
    init(NAME) {
      SITE_NAME = NAME
      const body = document.body
      const controller = body.getAttribute('data-controller')
      const action = body.getAttribute('data-action')
      exec('common')
      exec(controller)
      exec(controller, action)
    }
  }
}

export default documentRouting()
