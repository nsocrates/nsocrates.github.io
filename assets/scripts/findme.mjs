import * as L from 'https://unpkg.com/leaflet/dist/leaflet-src.esm.js'

const WS_URL = 'wss://f9f8i03a1d.execute-api.us-east-1.amazonaws.com/dev'
const MARKER_HTML =
  '<svg class="icon icon--marker" xmlns="http://www.w3.org/2000/svg" width="43.3" height="42.4" viewBox="0 0 43.3 42.4"><path class="ring-outer" d="M28.6 23c6.1 1.4 10.4 4.4 10.4 8 0 4.7-7.7 8.6-17.3 8.6-9.6 0-17.4-3.9-17.4-8.6 0-3.5 4.2-6.5 10.3-7.9.7-.1-.4-1.5-1.3-1.3C5.5 23.4 0 27.2 0 31.7c0 6 9.7 10.7 21.7 10.7s21.6-4.8 21.6-10.7c0-4.6-5.7-8.4-13.7-10-.8-.2-1.8 1.2-1 1.4z"/><path class="ring-inner" d="M27 25.8c2 .7 3.3 1.8 3.3 3 0 2.2-3.7 3.9-8.3 3.9-4.6 0-8.3-1.7-8.3-3.8 0-1 .8-1.9 2.2-2.6.6-.3-.3-2-1-1.6-2.8 1-4.6 2.7-4.6 4.6 0 3.2 5.1 5.7 11.4 5.7 6.2 0 11.3-2.5 11.3-5.7 0-2-2.1-3.9-5.4-5-.7-.1-1.2 1.3-.7 1.5z"/><path class="pin" d="M21.6 8.1a4 4 0 0 0 4-4 4 4 0 0 0-4-4.1 4.1 4.1 0 0 0-4.1 4 4 4 0 0 0 4 4.1zm4.9 8v-3.7c0-1.2-.6-2.2-1.7-2.6-1-.4-1.9-.6-2.8-.6h-.9c-1 0-2 .2-2.8.6-1.2.4-1.8 1.4-1.8 2.6V16c0 .9 0 2 .2 2.8.2.8.8 1.5 1 2.3l.2.3.4 1 .1.8.2.7.6 3.6c-.6.3-.9.7-.9 1.2 0 .9 1.4 1.7 3.2 1.7 1.8 0 3.2-.8 3.2-1.7 0-.5-.3-.9-.8-1.2l.6-3.6.1-.7.2-.8.3-1 .1-.3c.3-.8 1-1.5 1.1-2.3.2-.8.2-2 .2-2.8z"/></svg>'
const RECONNECT_DELAY = 1000

function mapFactory() {
  let coords = [48.8584, 2.2945]
  let hasView = false
  const map = L.map('map')
  const icon = L.divIcon({
    className: 'marker',
    html: MARKER_HTML,
    iconAnchor: [24, 34],
    iconSize: [49.02, 48],
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map)

  const marker = L.marker(coords, { icon, title: '@me' }).addTo(map)

  const setView = nextCoords => {
    nextCoords = Array.isArray(nextCoords) ? nextCoords : coords
    const [lat, lng] = coords
    const [nextLat, nextLng] = nextCoords
    const isValid = !isNaN(nextLat) && !isNaN(nextLng)

    if (isValid || !hasView) {
      map.setView(nextCoords, 20, { animate: true })
      marker.setLatLng(nextCoords)
      coords = nextCoords
      hasView = true
    }
  }

  return { setView, coords }
}

;(async function main() {
  const map = mapFactory()
  let webSocket

  function reconnect() {
    setTimeout(connect, RECONNECT_DELAY)
  }

  function connect() {
    webSocket = new WebSocket(WS_URL)

    webSocket.addEventListener('open', () => {
      webSocket.send({})
    })

    webSocket.addEventListener('message', e => {
      const data = JSON.parse(e.data)
      const { message, action } = data
      if (action === 'coords') {
        map.setView(data.message)
      }
    })

    webSocket.addEventListener('error', map.setView)
    webSocket.addEventListener('close', reconnect)
  }

  connect()
})()
