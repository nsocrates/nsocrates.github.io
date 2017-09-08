import Modal from './modal.controller'

/**
 * Renders html template string
 * @param  {String} props.heading
 * @param  {String} props.subheading
 * @param  {String} props.description
 * @param  {String} props.gitRepo
 * @param  {String} props.siteUrl
 * @param  {Array}  props.images
 * @param  {Bool}   props.browserImages
 * @return {String} The HTML content
 */
export default function layout(props = {}) {
  const {
    heading = '',
    subheading = '',
    description = '',
    gitRepo = '',
    siteUrl = '',
    images = [],
    browserImages = false,
  } = props
  return (`
      <section class="project">

        <header class="project__header">
          <h2 class="project__heading">${heading}</h2>
          <h4 class="project__subheading">${subheading}</h4>
          <p class="project__description">${description}</p>
        </header>

        <aside class="project__links">

          <div class="project__link-wrap">
            <a class="project__link project__link--live" href=${siteUrl}>
              <svg class="project__link-icon icon"><use xlink:href="#icon--exit-to-app"></use></svg>
              <span class="project__link-text">View Site</span>
            </a>
          </div>

          <div class="project__link-wrap">
            <a class="project__link project__link--github" href=${gitRepo}>
              <svg class="project__link-icon icon"><use xlink:href="#icon--exit-to-app"></use></svg>
              <span class="project__link-text">View on Github</span>
            </a>
          </div>

        </aside>

      </section>

      <section id="showcase" class="showcase">

        ${images.map(image => {
          if (browserImages) {
            return (`
              <div class="showcase__browser">
                <ul class="showcase__dot-list">
                  <li class="showcase__dot-item"></li>
                  <li class="showcase__dot-item"></li>
                  <li class="showcase__dot-item"></li>
                </ul>
                <div class="showcase__img-wrap showcase__img-wrap--browser-child">
                  <img class="showcase__img" src=${image} alt=${heading}>
                </div>
              </div>
            `)
          }

          return (`
            <div class="showcase__img-wrap">
              <img class="showcase__img" src=${image} alt=${heading}>
            </div>
          `)
        }).join('')}

      </section>

      <footer class="mfooter">

          <ul class="footer__section footer__section--right">

            <li class="footer__social">
              <a href="//linkedin.com/in/nsocrates" class="footer__link">
                <svg class="footer__icon icon icon--linkedin-square">
                  <use xlink:href="#icon--linkedin-square"></use>
                </svg>
              </a>
            </li>

            <li class="footer__social">
              <a href="//github.com/nsocrates" class="footer__link">
                <svg class="footer__icon icon icon--github">
                  <use xlink:href="#icon--github"></use>
                </svg>
              </a>
            </li>

            <li class="footer__social">
              <a href="//codepen.io/socrates" class="footer__link">
                <svg class="footer__icon icon icon--codepen">
                  <use xlink:href="#icon--codepen"></use>
                </svg>
              </a>
            </li>

            <li class="footer__social">
              <a href="mailto:nsocrates@protonmail.ch" class="footer__link">
                 <svg class="footer__icon icon icon--envelope">
                  <use xlink:href="#icon--envelope"></use>
                </svg>
              </a>
            </li>

          </ul>

          <section class="footer__section footer__section--left">
            <a class="footer__link" href="mailto:nsocrates@protonmail.ch">nsocrates@protonmail.ch</a>
          </section>

      </footer>
  `)
}
