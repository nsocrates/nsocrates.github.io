function validation() {
  let formErrorList
  const errorClass = 'form__input--error'
  const form = document.getElementById('formControl')
  const formName = document.getElementById('formName')
  const formEmail = document.getElementById('formEmail')
  const formMessage = document.getElementById('formMessage')
  const formErrorDialogue = document.getElementById('formErrorDialogue')

  function validateRequired(element) {
    if (!!element.value) {
      return true
    }
    return false
  }

  function validateEmail(element) {
    const reEmail = /\S+@\S+\.\S+/
    return reEmail.test(element.value)
  }

  function validateLength(element) {
    return element.value.trim().length >= 20
  }

  const fields = {
    name: {
      element: formName,
      rules: [{
        fn: validateRequired,
        prompt: 'Please enter your name',
        dataKey: 'name_required',
        hasError: null
      }]
    },
    email: {
      element: formEmail,
      rules: [{
        fn: validateRequired,
        prompt: 'Please enter your email',
        dataKey: 'email_required',
        hasError: null
      }, {
        fn: validateEmail,
        prompt: "That doesn't look like a valid email",
        dataKey: 'email_valid',
        hasError: null
      }]
    },
    message: {
      element: formMessage,
      rules: [{
        fn: validateRequired,
        prompt: 'Please enter a message',
        dataKey: 'msg_required',
        hasError: null
      }, {
        fn: validateLength,
        prompt: 'Message must be at least 20 characters long',
        dataKey: 'msg_length',
        hasError: null
      }]
    }
  }

  function checkField(field) {
    const { element, rules } = field
    const hasErrorClass = element.classList.value.indexOf(errorClass) > -1
    const isClean = rules.every(rule => !rule.hasError)

    if (!hasErrorClass && !isClean) {
      element.classList.add(errorClass)
    } else if (hasErrorClass && isClean) {
      element.classList.remove(errorClass)
    }
  }

  function removeError(rule) {
    const { dataKey } = rule
    const children = formErrorList.querySelectorAll('[data-form_key]')

    return [].forEach.call(children, child => {
      if (child.getAttribute('data-form_key') === dataKey) {
        child.classList.remove('form__animation--in')
        child.classList.add('form__animation--out')
        window.setTimeout(() => {
          formErrorList.removeChild(child)
        }, 350)
      }

      if (children.length <= 1) {
        formErrorDialogue.removeChild(formErrorList)
      }
    })
  }

  function appendError(rule) {
    const { prompt, dataKey } = rule
    const errorListItem = document.createElement('li')
    const errorPrompt = document.createTextNode(prompt)

    if (!formErrorList) {
      formErrorList = document.createElement('ul')
      formErrorList.className = 'form__error-list'
    }

    errorListItem.dataset.form_key = dataKey
    errorListItem.classList.add('form__error-list-item', 'form__animation', 'form__animation--in')
    errorListItem.appendChild(errorPrompt)
    formErrorList.appendChild(errorListItem)
    formErrorDialogue.appendChild(formErrorList)
  }

  function handleSubmit(e) {
    const keys = Object.keys(fields)
    const validity = keys.map(key =>
      fields[key].rules.map((rule, index) => {
        const { fn, hasError } = rule
        const currentField = fields[key]
        const currentElement = currentField.element
        const isValid = fn(currentElement)
        if (!isValid && !hasError) {
          appendError(rule)
          currentField.rules[index].hasError = true
        }

        if (isValid && hasError) {
          removeError(rule)
          currentField.rules[index].hasError = false
        }

        checkField(currentField)
        return currentField.rules[index].hasError
      })
    )

    const canSubmit = validity.reduce((a, b) => a.concat(b), []).every(n => !n)

    if (!canSubmit) {
      e.preventDefault()
      return false
    }

    return true
  }

  function handleUIActions() {
    form.addEventListener('submit', handleSubmit, false)
  }

  return {
    init() {
      handleUIActions()
    }
  }
}

export default validation()
