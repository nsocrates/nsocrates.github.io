import ModalContent from './modal.model'

const chProps = {
  heading: 'ColorHappy',
  subheading: 'Explore, create, and save your palettes.',

  description: `ColorHappy is a color scheme manager that allows registered users to keep track
                of their favorite color patterns and share them with others. Visitors can save
                their pallets by adding it to their favorites or downloading it as an
                SCSS file.`,

  gitRepo: '//github.com/nsocrates/colorhappy',
  siteUrl: '//colorhappy.herokuapp.com',
  images: [
    '/assets/images/ch/ch-0.jpeg',
    '/assets/images/ch/ch-1.jpeg',
    '/assets/images/ch/ch-2.jpeg',
    '/assets/images/ch/ch-3.jpeg',
  ],
  browserImages: true,
}

const rsProps = {
  heading: 'ReactSound',
  subheading: 'Get music through ReactSound.',

  description: `ReactSound is an audio client that renders and plays data fetched from
                the SoundCloud API. Visitors have the option to authorize ReactSound and
                connect it to their SoundCloud account. Authenticated users can manage their
                account favorites and followings through ReactSound.`,

  gitRepo: '//github.com/nsocrates/reactsound',
  siteUrl: '//reactsound.herokuapp.com',
  images: [
    '/assets/images/rs/rs-4.jpeg',
    '/assets/images/rs/rs-2.jpeg',
    '/assets/images/rs/rs-3.jpeg',
  ],
  browserImages: true,
}

const amaProps = {
  heading: 'AMAnything',
  subheading: 'A friendly interview web application.',

  description: `AMAnything is a Twitter clone meant for asking questions. Visitors can
                post questions on a user's wall. All posts are public, but the users have
                the option to delete posts and edit their answers on their own walls.`,

  gitRepo: '//github.com/nsocrates/amanything',
  siteUrl: '//amanything1.herokuapp.com',
  images: [
    '/assets/images/ama/ama-1.jpeg',
    '/assets/images/ama/ama-2.jpeg',
    '/assets/images/ama/ama-3.jpeg',
  ],
  browserImages: true,
}

const snvProps = {
  heading: 'snVote',
  subheading: 'snVote allows you to create pools and share them with your friends.',

  description: `snVote is a voting application built with the MEAN stack. It features user
                registration, authentication, event functions.`,

  gitRepo: '//github.com/nsocrates/snvote',
  siteUrl: '//snvote.herokuapp.com',
  images: [
    '/assets/images/snv/snv-1.jpeg',
    '/assets/images/snv/snv-2.jpeg',
    '/assets/images/snv/snv-3.jpeg',
  ],
  browserImages: true,
}

export const ch = ModalContent(chProps)
export const rs = ModalContent(rsProps)
export const ama = ModalContent(amaProps)
export const snv = ModalContent(snvProps)
