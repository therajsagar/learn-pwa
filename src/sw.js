/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const { core: { skipWaiting, clientsClaim }, precaching } = workbox
skipWaiting()
clientsClaim()


self.addEventListener('install', event => {
    console.log('Waiting to resolve.....')
    const asyncInstall = new Promise(res => setTimeout(res, 5000))
    event.waitUntil(asyncInstall)
})

self.addEventListener('activate', event => {
    console.log('Activated')
})

precaching.precacheAndRoute(self.__precacheManifest || [])
