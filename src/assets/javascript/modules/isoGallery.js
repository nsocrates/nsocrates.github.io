import debounce from './debounce'
import masonry from './masonry'

let isotope
const state = {
  gridItems: null,
  values: [],
  containerWidth: null,
  currentScreenSize: null,
  container: document.getElementById('iso'),
}

// Calculates a new ratio that will fit either the max width or max height
// calcFitRatio : (Int, Int) -> (Int, Int) -> { a : String, b : String }
const calcFitRatio = (mw, mh) => (w, h) => {
  const r = Math.min(mw / w, mh / h)
    return {
    width: `${w * r}px`,
    height: `${h * r}px`,
  }
}

// Calculates the sum of the given ratios
const ratio = (...args) => (
  args.reduce((acc, item) => item[0] / item[1] + acc, 0)
)

// Calculates row
const makeRow = maxWidth => (...args) => maxWidth / ratio(...args)

// @ xl [012--3456]
const layoutXl = (mWidth, rowFn) => values => {
  const mHeight1 = rowFn(values[0], values[1], values[2])
  const mHeight2 = rowFn(values[3], values[4], values[5], values[6])

  const r1 = calcFitRatio(mWidth, mHeight1)
  const r2 = calcFitRatio(mWidth, mHeight2)

  return values.map((item, idx) => {
    if (idx <= 2) return r1(item[0], item[1])
    return r2(item[0], item[1])
  })
}

// @ sm, md, lg [01-23-456]
const layoutDefault = (mWidth, rowFn) => values => {
  // Calculate max height of all images in each row
  const mHeight1 = rowFn(values[0], values[1])
  let mHeight2
  let mHeight3
  let span2

  // Set columns depending on screen size
  mHeight2 = rowFn(values[2], values[3])
  mHeight3 = rowFn(values[4], values[5], values[6])
  span2 = 3

  // Set up ratio fn
  // We get back a fn that calculates an optimal w/h for each image
  const r1 = calcFitRatio(mWidth, mHeight1)
  const r2 = calcFitRatio(mWidth, mHeight2)
  const r3 = calcFitRatio(mWidth, mHeight3)

  // Return images with new dimensions
  return values.map((item, idx) => {
    if (idx <= 1) return r1(item[0], item[1])
    if (idx <= span2) return r2(item[0], item[1])
    return r3(item[0], item[1])
  })
}

// @ xs [0-1-2...6]
const layoutXs = (mWidth, rowFn) => values => {
  return values.map(item => {
    const mHeight = rowFn(item)
    return calcFitRatio(mWidth, mHeight)(item[0], item[1])
  })
}

/**
 * Make layout
 *
 * Container BP
 * *****************
 * sm:    576px
 * md:    720px
 * lg:    940px
 * xl:    1140px
 *
 * Grid BP
 * ******************
 * xs:    0
 * sm:    544px
 * md:    768px
 * lg:    992px
 * xl:    1200px
 */
function layout(values) {
  const screen = state.currentScreenSize
  const mWidth = state.containerWidth
  const rowFn = makeRow(mWidth)

  switch (screen) {
    case 'sm':
    case 'md':
    case 'lg':
      return layoutDefault(mWidth, rowFn)(values)
    case 'xl':
      return layoutXl(mWidth, rowFn)(values)
    default:
      return layoutXs(mWidth, rowFn)(values)
  }
}

// Set width and height for each element
function applyStyles() {
  const grid = layout(state.values)

  state.gridItems.forEach((item, idx) => {
    const tweenElement = item.querySelector('.gallery__fx')
    // Set new dimensions on wrapper element.
    item.style.width = grid[idx].width
    item.style.height = grid[idx].height

    // Animate the inner element.
    TweenMax.to(tweenElement, 0.4, {
      width: grid[idx].width,
      height: grid[idx].height,
      ease: Expo.easeInOut,
    })
  })

  // Relayout
  isotope.layout()
}

// Gets the name of the current screen size defined in our CSS
function selectBp() {
  return window.getComputedStyle(document.body, '::after')
               .getPropertyValue('content')
               .split('"')
               .join('')
}

// Sets screen size and container width
function setAndApply() {
  const bp = selectBp()
  
  // Set container width
  state.currentScreenSize = bp
  state.containerWidth = state.container.clientWidth

  // Apply new styles
  return applyStyles()
}

// Initialize our Iso gallery
const isoGallery = imagesLoaded => selector => {

  // Wait for imagesLoaded to complete before init.
  imagesLoaded(state.container, { background: true }, () => {
  // Grab selectors and make it an iteratable array
  state.gridItems = [].slice.call(document.querySelectorAll(`${selector}`))

    // Initialize masonry and store the returned object in variable isotope.
    isotope = masonry.init()

    // Grab data-wh attribute and parse it into an array
    state.values = state.gridItems.map(item => (
      JSON.parse(item.getAttribute('data-wh'))
    ))

    return setAndApply()
  })
}

window.addEventListener('resize', debounce(setAndApply, 200))

export default isoGallery
