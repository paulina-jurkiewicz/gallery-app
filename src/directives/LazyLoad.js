export default {
    mounted: (el) => {
        el.classList.remove([ 'loaded', 'no-loaded' ]);

        const imageElement = Array.from(el.children).find(el => el.nodeName === 'IMG');

        function loadImage( observer ) {
            el.classList.remove([ 'loaded', 'no-loaded' ]);

            imageElement.addEventListener('load', () => {
                setTimeout(() => el.classList.add('loaded'), 100);

                observer.unobserve(imageElement);
            });

            imageElement.addEventListener('error', () => {
                el.classList.add('no-loaded');

                throw new Error(`Cannot load image source by ${ imageElement.src }`);
            });

            imageElement.src = imageElement.dataset.src;
        }

        function handleIntersect( entries, observer ) {
            entries.forEach(entry => {
                if ( entry.isIntersecting ) {
                    loadImage(observer);
                }
            });
        }

        function createObsercer() {
            const options = {
                root: null,
                threshold: .1
            };

            const observer = new IntersectionObserver(handleIntersect, options);

            observer.observe(imageElement);

        }

        el.focus();
        
        imageElement && !window[ 'IntersectionObserver' ] ? loadImage() : createObsercer()
    }
}
