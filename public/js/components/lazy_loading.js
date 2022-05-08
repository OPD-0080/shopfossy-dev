// VANILLA LAZY LOADING START
function lazyLoading() {
    var images = document.querySelectorAll(".lazy-load-selector");

    var imageOption = {};
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            /* intersecting checking to see:
                if image is not on screen, 
                            return images by updates the image on the screen
            */
            if (!entry.isIntersecting) {
                return
            }
            // updating images on screen
            var image = entry.target;
            //console.log(image);

            // single images sections from it array (ENTRY TARGET)
            var dataSrc = image.getAttribute("data-src");
            image.src = dataSrc;

            // to prevent the server from reloading images when already on screen
            observer.unobserve(image)
        });
    }, imageOption)
    
    // looping array and equating  data-src to the real src of the images.
    images.forEach(image => {
        /*var dataSrc = image.getAttribute("data-src");
        image.src = dataSrc;*/
        observer.observe(image);
    })
}
export {lazyLoading}
// VANILLA LAZY LOADING END