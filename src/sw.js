console.log('%cInside Service-Worker file -> SW.js', 'background: green; color: white; display: block;')

// eslint-disable-next-line no-undef
const { skipWaiting, clientsClaim } = workbox.core
skipWaiting()
clientsClaim()