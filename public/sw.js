const cacheName = 'index_Cache_v1'; 
const dynamicCache = 'dynamic_cache';
const assetsUrl = [
    './',
    // css asset
    './css/landing-page.css',
    './css/index.css',
    './css/admin.css',
    './css/userDashboard.css',
    './css/sign-in.css',
    './css/@keyframes-landing.css',
    './css/@keyframe-index.css',
    './css/@media_index.css',
    './css/plugins/swiper.min.css',
    './video/background-video.mp4',
    './manifest.json',
    // ...
    // img assets 
    './img/icons/cart.png',
    './img/icons/user.png',
    './img/logo/logo.jpg',
    './img/logo/logo.webp',
    './img/svg/login-back.svg',
    './img/icons/cart-black-btn.png',
    './img/icons/admin.png',
    './img/index/flare-images/1.webp',
    './img/index/flare-images/2.webp',
    './img/index/flare-images/3.webp',
    './img/index/flare-images/4.webp',
    './img/index/flare-images/5.webp',
    './img/icons/focus.png',
    './img/icons/bubble.png',
    './img/icons/drop.png',
    './img/icons/pallet.png',
    './img/index/banner/cover.webp',
    './img/index/banner/gamer.webp',
    './img/index/banner/new-banner.webp',
    './img/index/banner/trend-banner.webp',
    './img/svg/circle.svg',
    './img/svg/coins.svg',
    './img/svg/rocket.svg',
    //Trending section
    './img/index/slide/1.webp',
    './img/index/slide/2.webp',
    './img/index/slide/3.webp',
    './img/index/slide/4.webp',
    './img/index/slide/5.webp',
    './img/index/slide/6.webp',
    './img/index/slide/7.webp',
    './img/index/slide/8.webp',
    './img/index/slide/9.webp',
    './img/index/slide/10.webp',
    // Pickup section
    './company-name-1.html',
    './company-name-2.html',
    // logo section
    './img/logo/icons-128x128.png',
    './img/logo/icons-144x144.png',
    './img/logo/icons-192x192.png',
    './img/logo/icons-512x512.png',
    './img/logo/icons-96x96.png',
    './img/logo/icons-72x72.png',
    // js assets
    './js/sw-register.js',
    './js/landing-page.js',
    './js/index.js',
    './js/admin_icon.js',
    './js/signLog-nav.js',
    './js/userDashBoard.js',
    './js/footer.js',
    './js/plugins/Swiper.min.js',
    './js/plugins/setup.js',
    // sidebar section
    './js/sideBarList/categoryList.js',
    './js/sideBarList/pickUpList.js',

    // html pages
    './fallbackError.html',
];

// Limiting caches sizes
const limitCacheSizes = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(key => { // get caches each from array
            if (key.length > size) { // if cache length is greater than the size specified
                cache.delete(key[0]) // delete assets in caches (old once)
                .then(limitCacheSizes(name, size)) // run function again to check 
            }
        })
    })
}

// sw instal
self.addEventListener('install', (e) => {
    console.log("Service Worker is been INSTALLED");
    // Pre hatching assets from server to to local caches
        e.waitUntil(
            (async () => {
                try {
                    const cachesRes = await caches.open(cacheName);
                    cachesRes.addAll(assetsUrl);
                } catch (error) {
                    console.log("Error in Adding Assets:", error);
                }
                
            })()
        )
    // ...
});
// ...
// ws active
self.addEventListener('activate', (e) => {
    console.log("Service Worker is been ACTIVATED");

    // Delete OLD caches version and use the current cache
    // excluding the dynamic caches
        e.waitUntil(
            caches.keys().then(keys => {
                return Promise.all(keys
                    .filter(key => key !== cacheName && key !== dynamicCache) // filter and delete the cache name not matching or the dynamic cache
                    .map(key => caches.delete(key))  // delete from cache.setMonth(month, date)  
                )
            })
        )
    // ...

});
// ....
// sw fetch
self.addEventListener('fetch', (e) => {
    // Getting assets from cache
    // But comparing with assets in first cache, if not present 
    // move to the network and fetch from server and 
    // store the request URL in different local cache with different name
    // for it to be loaded by the HTML page in future
        e.respondWith(
            caches.match(e.request).then(cacheRes => {
                return cacheRes || fetch(e.request).then(respond => {
                    return caches.open(dynamicCache).then(cache => {
                        cache.put(e.request.url, respond.clone());
                        // check for caches size limits
                        // can specify any limit of choice 
                        limitCacheSizes(dynamicCache, 70)
                        return respond;
                    })
                })
            }).catch(error => {
                // notify user in OFFLINE MODE using 404 page
                // But execute when an index file is triggered
                if (e.request.url.indexOf(".html") > -1) {
                    caches.match("./fallbackError.html")
                }
            })
        )
    // ...
});
// ...