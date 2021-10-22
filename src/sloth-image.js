const intersectionOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const mutationOptions = {
  attributes: true,
  attributeOldValue : true,
  attributeFilter: ['class'],
};

export default {
  install(Vue, options) {
    const intersectionHandler = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };

    const mutationHandler = (mutations) => {
      mutations.forEach(({ target }) => {
        const inView = target.classList.contains('in-view');
        const _uid = Number(target.getAttribute('data-sloth-id'));
        const lazySrc = target.getAttribute('data-lazy-src');
      
        if (inView) {
          const targetComponent = Vue.$slothImages.filter($slothImage => $slothImage._uid === _uid).shift();
          const img = new Image();
          img.src = lazySrc;
      
          img.onload = () => {
            targetComponent.isLoaded = true;
            targetComponent.loadedSrc = lazySrc;
          }
        }
      });
    };

    Vue.$slothImages = [];

    Vue.$slothImageObserver = new IntersectionObserver(intersectionHandler, intersectionOptions);
    Vue.$slothMutationObserver = new MutationObserver(mutationHandler);

    Vue.component('sloth-image', {
      props: {
        dataLazySrc: {
          type: String,
          default: null
        },
        omitAspect: {
          type: Boolean,
          default: false
        },
        height: {
          type: Number,
          default: 1080
        },
        width: {
          type: Number,
          default: 1920
        },
        loadWhen: {
          type: Number,
          default: 0.5
        }, 
        fadeIn: {
          type: Boolean,
          default: false
        }, 
        alt: {
          type: String,
          default: 'Loaded image',
        }
      },
      mounted() {
        Vue.$slothImages = [...Vue.$slothImages, this];
        Vue.$slothImageObserver.observe(this.$el);
        Vue.$slothMutationObserver.observe(this.$el, mutationOptions);
      },
      destroyed() {
        Vue.$slothImageObserver.unobserve(this.$el);
        Vue.$slothMutationObserver.unobserve(this.$el);
        // TODO: remove from Vue.$slothImages
      },
      data() {
        return {
          isLoaded: false,
          loadedSrc: '',
        };
      },
      render(createElement) {
        return createElement('img', {
          class: {
            'loaded': this.isLoaded,
          },
          attrs: {
            'data-lazy-src': this.dataLazySrc,
            'data-sloth-id': this._uid,
            src: this.loadedSrc,
          },
        });
      },
    });
  },
};
