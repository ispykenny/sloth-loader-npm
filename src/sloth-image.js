const IN_VIEW_CLASS = 'in-view';
const ID_ATTR = 'data-sloth-id';
const LAZY_LOAD_IMG_SRC_ATTR = 'data-sloth-src';
const COMPONENT_PROPS = {
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
};

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
    Vue.$slothImages = [];

    const intersectionHandler = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(IN_VIEW_CLASS);
        }
      });
    };

    const mutationHandler = (mutations) => {
      mutations.forEach(({ target }) => {
        const inView = target.classList.contains(IN_VIEW_CLASS);
        const _uid = Number(target.getAttribute(ID_ATTR));
        const lazySrc = target.getAttribute(LAZY_LOAD_IMG_SRC_ATTR);
      
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

    Vue.$slothImageObserver = new IntersectionObserver(intersectionHandler, intersectionOptions);
    Vue.$slothMutationObserver = new MutationObserver(mutationHandler);

    Vue.component('sloth-image', {
      props: COMPONENT_PROPS,
      mounted() {
        // add to list of live image Components
        Vue.$slothImages = [...Vue.$slothImages, this];
        // make observers aware of new Component in DOM
        Vue.$slothImageObserver.observe(this.$el);
        Vue.$slothMutationObserver.observe(this.$el, mutationOptions);
      },
      destroyed() {
        Vue.$slothImageObserver.unobserve(this.$el);
        Vue.$slothMutationObserver.unobserve(this.$el);
        // TODO: remove from list of live image Components
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
            loaded: this.isLoaded,
          },
          attrs: {
            [LAZY_LOAD_IMG_SRC_ATTR]: this.dataSlothSrc,
            [ID_ATTR]: this._uid,
            src: this.loadedSrc,
          },
        });
      },
    });
  },
};
