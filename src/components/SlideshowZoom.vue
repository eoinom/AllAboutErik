<template>
  <div class="SlideshowZoom">
    
    <!-- https://vuejs.org/v2/guide/transitions.html#List-Transitions -->
    <transition-group     
      tag="div"
      enter-active-class="SlideshowZoom__enterActive"
      enter-class="SlideshowZoom__enter"
      leave-active-class="SlideshowZoom__leaveActive"
      leave-to-class="SlideshowZoom__leaveTo"
      class="SlideshowZoom__slides"
    >
      <img
        v-for="(image, index) in images"
        v-show="index === activeIndex"
        :key="image"
        :src="image"
        class="SlideshowZoom__image"
        :style="imgStyle(index)"
        alt=""
      >
    </transition-group>

  </div>
</template>


<script>
export default {
  name: 'SlideshowZoom',

  props: {
    slides: {
      default: () => [],
      type: Array,
    },
  },

  data() {
    return {
      activeIndex: 0,
      time: 0,
      translateFactor: 1.5
    };
  },

  computed: {
    images() {    
      return this.slides.map(a => a.img)
    },
  },

  methods: {
    goToIndex(index) {
      this.activeIndex = index
      this.time = this.interval(index)      
    },

    imgStyle(index) {
      let css = {}
      css.animationName = 'keyframe-'+ (index+1)
      css.transformOrigin = 'center'
      return css
    },

    scaleFrom(index) {
      return this.slides[index].hasOwnProperty('scaleFrom') ? this.slides[index].scaleFrom : 0.8
    },

    scaleTo(index) {
      return this.slides[index].hasOwnProperty('scaleTo') ? this.slides[index].scaleTo : 1.0
    },

    startInterval() {
      const precision = 100;
      const clock = setInterval(() => {
        this.time -= precision;
        if (this.time <= 0) {
          this.next();
        }
      }, precision);
      
      // Clear the interval if the component is destroyed to prevent memory leaks
      this.$once('hook:destroyed', () => clearInterval(clock));
    },

    interval(index) {
      // return 1000*this.slides[index].duration
      return 5000;
    },

    next() {  
      let nextIndex = this.activeIndex + 1;
      // Go to the first image if the active image ist the last one
      if (!this.images[nextIndex]) {
        nextIndex = 0
      }
      this.goToIndex(nextIndex);
    },

    createKeyFrames() {
      for (let i = 0; i < this.slides.length; i++) {        
        let startPos = [0, 0, 0]  // x, y, z   (center)     
        const num = i + 1
        const scaleFrom = this.scaleFrom(i)
        const scaleTo = this.scaleTo(i)
        const Tx = this.translateFactor * startPos[0]
        const Ty = this.translateFactor * startPos[1]
        var style = document.createElement('style');
        style.type = 'text/css';
        var keyFrame = '\
        @keyframes keyframe-' + num + ' {\
          0% {\
            transform: scale3d('+ scaleFrom + ', '+ scaleFrom + ', 1) translate3d('+ Tx + '%, '+ Ty + '%, 0);\
          }\
          100% {\
            transform: scale3d('+ scaleTo + ', '+ scaleTo + ', 1) translate3d(0, 0, 0);\
          }\
        }';
        style.innerHTML = keyFrame
        document.head.appendChild(style)
      }
    }
  },

  beforeMount() {
    this.createKeyFrames()
    this.goToIndex(0);
    this.startInterval();
  },
};
</script>


<style lang="scss" scoped>

.SlideshowZoom {
  --translateFactor: 1.5%;    
  background-color: transparent;

  &__slides {
    position: relative;
    display: flex;
    justify-content: center;
  }

  &__image {
    position: absolute;
    width: auto;
    height: auto;    
    overflow: hidden;  
    animation-duration: 8s;
    animation-fill-mode: forwards;  // The element will retain the style values that is set by the last keyframe
  }

  &__enterActive, &__leaveActive {
    transition: opacity 2s linear;
  }

  &__enter, &__leaveTo {
    opacity: 0;
  }  
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
}
</style>