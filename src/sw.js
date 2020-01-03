/* eslint-disable no-useless-escape */
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

self.addEventListener('fetch', event => {
    if (event.request.method === "POST" || event.request.method === "DELETE") {
        event.respondWith(
            fetch(event.request).catch(err => {
                return new Response(
                    JSON.stringify({ error: "This action disabled while app is offline" }), {
                    headers: { 'Content-Type': 'application/json' }
                }
                )
            })
        )
    }
})

self.addEventListener('push', event => {
    event.waitUntil(
        self.registration.showNotification(
            'TodoList',
            { body: event.data.text() }
        )
    )
})

precaching.precacheAndRoute(self.__precacheManifest || [])
