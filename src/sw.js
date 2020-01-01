/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const { core: { skipWaiting, clientsClaim }, precaching, routing } = workbox

skipWaiting()
clientsClaim()

self.addEventListener('install', event => {
    console.log('Waiting to resolve.....')
    const asyncInstall = new Promise(res => setTimeout(res, 5000))
    event.waitUntil(asyncInstall)
})

self.addEventListener('activate', () => {
    console.log('Activated')
})

routing.registerRoute(
    new RegExp('https:.*min\.(css|js)'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'cdn-cache'
    })
)

routing.registerRoute(
    new RegExp('http://.*:4567.*\.json'),
    workbox.strategies.networkFirst({
        cacheName: 'api-response'
    })
)

precaching.precacheAndRoute(self.__precacheManifest || [])
