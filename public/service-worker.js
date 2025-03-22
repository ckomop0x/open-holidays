import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

const CACHE_NAME = 'api-cache-v1';

// Pre-warm cache with essential API responses
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache.addAll([
                new Request('/Countries'),
                new Request('/PublicHolidays?countryIsoCode=NL&validFrom=2025-01-01&validTo=2025-12-31&languageIsoCode=EN') // Adjust for your default
            ])
        )
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    const isAPI =
        url.origin === location.origin &&
        (url.pathname === '/Countries' || url.pathname.startsWith('/PublicHolidays'));

    if (!isAPI) return;

    event.respondWith(
        caches.open(CACHE_NAME).then(async (cache) => {
            try {
                const response = await fetch(event.request);
                if (response && response.ok) {
                    cache.put(event.request, response.clone());
                }
                return response;
            } catch {
                // Try matching without query params
                const fallbackKey = new Request(url.origin + url.pathname);
                const cached =
                    (await cache.match(fallbackKey)) || (await cache.match(event.request));
                return cached || new Response(null, { status: 503, statusText: 'Service Unavailable' });
            }
        })
    );
});
