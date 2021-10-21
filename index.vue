<template>
  <div 
    ref="imageParent" 
    class="sloth-loader"
    v-bind:class="classes"
    :style="paddingBottom"
  >
    <img 
      ref="imageElement"
      :src=imageSrc
      :alt=alt
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
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
      default: "Loaded image"
    }
  },
  data() {
    return {
      isLoaded: '',
      imageSrc: ''
    }
  },
  computed: {
    classes() {
      const allClasses = [this.isLoaded];
      if(this.$props.omitAspect) {
        allClasses.push('no-padding')
      }
      if(this.$props.fadeIn) {
        allClasses.push('sloth-fade')
      }
      return [...allClasses]
    },
    paddingBottom() {
      if(this.$props.omitAspect) {
        return ''
      } else {
        return `padding-bottom: ${this.$props.height/this.$props.width * 100}%`
      }s
    }
  },
  mounted() {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: this.$props.loadWhen,
    };
    const element = this.$refs.imageParent
    const observer = new IntersectionObserver((element) => {
      if(!element[0].isIntersecting) return
      if(element[0].intersectionRatio > 0) {
        const newImage = new Image()
        newImage.src = this.$props.src
        newImage.onload = () => {
          this.imageSrc = newImage.src
          this.isLoaded = 'loaded'
        }
      }
      observer.unobserve(element[0].target)
    }, observerOptions)

    observer.observe(element)
  },
  unmounted() {
    this.observer.disconnect()
  }
}
</script>

<style>
  .sloth-loader {
    position: relative;
  }

  .sloth-loader:not(.no-padding) img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0; left: 0;
  }

  .sloth-loader.no-padding img {
    width: 100%;
  }

  .sloth-loader img {
    opacity: 0;
  }

  .sloth-loader.loaded img {
    opacity: 1;
  }

  .sloth-loader.loaded.sloth-fade img {
    transition: opacity .7s ease;
  }

</style>