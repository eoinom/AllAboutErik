<template>
  <div class="SlideshowKenBurns">
    
    <!-- https://vuejs.org/v2/guide/transitions.html#List-Transitions -->
    <transition-group     
      tag="div"
      enter-active-class="SlideshowKenBurns__enterActive"
      enter-class="SlideshowKenBurns__enter"
      leave-active-class="SlideshowKenBurns__leaveActive"
      leave-to-class="SlideshowKenBurns__leaveTo"
      class="SlideshowKenBurns__slides"
      :style="slideshowStyles"
    >
      <img
        v-for="(image, index) in images"
        v-show="index === activeIndex"
        :key="image"
        :src="image"
        class="SlideshowKenBurns__image"
        :style="imgStyle(index)"
        alt=""
      >
    </transition-group>

  </div>
</template>


<script>
export default {
  name: 'SlideshowKenBurnsSmall',

  props: {
    slides: {
      default: () => [],
      type: Array,
    },
    height: {
      default: '40vh',
      type: String,
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
    slideshowStyles() {
      return {
        '--height': this.height
      }
    }
  },

  methods: {
    goToIndex(index) {
      this.activeIndex = index
      this.time = this.interval(index)      
    },

    imgStyle(index) {
      let css = {}
      css.animationName = 'kenburns-'+ (index+1)
      css.transformOrigin = this.panStart(index)
      return css
    },

    panStart(index) {
      if (this.slides[index].hasOwnProperty('panStart')) {
        switch(this.slides[index].panStart.toLowerCase()) {
          case 'bottom-left':   return 'bottom left';
          case 'bottom':        return 'bottom';
          case 'bottom-right':  return 'bottom right';
          case 'left':          return 'left';
          case 'centre':        return 'center';
          case 'right':         return 'right';
          case 'top-left':      return 'top left';
          case 'top':           return 'top';
          case 'top-right':     return 'top right';
          default:
            console.log('Did not recognise value for slides.panStart: ' + this.slides[i].panStart)
        } 
        return 'center'
      }
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
        let startPos = [0, 0, 0]  // x, y, z
        switch(this.panStart(i)) {
          case 'bottom left':   startPos = [-1, 1, 0];      break;
          case 'bottom':        startPos = [0, 1, 0];       break;
          case 'bottom right':  startPos = [1, 1, 0];       break;
          case 'left':          startPos = [-1, 0, 0];      break;
          case 'center':        startPos = [0, 0, 0];       break;
          case 'right':         startPos = [1, 0, 0];       break;
          case 'top left':      startPos = [-1, -1, 0];     break;
          case 'top':           startPos = [0, -1, 0];      break;
          case 'top right':     startPos = [1, -1, 0];      break;
          default:
            console.log('Did not recognise value for slides.panStart: ' + this.panStart(i))
        }
        const num = i + 1
        const scaleFrom = this.scaleFrom(i)
        const scaleTo = this.scaleTo(i)
        const Tx = this.translateFactor * startPos[0]
        const Ty = this.translateFactor * startPos[1]
        var style = document.createElement('style');
        style.type = 'text/css';
        var keyFrame = '\
        @keyframes kenburns-' + num + ' {\
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

.SlideshowKenBurns {
  --translateFactor: 1.5%;    
  background-color: black;

  &__slides {
    position: relative;
    display: flex;
    justify-content: center;
    padding-bottom: var(--height);
  }

  &__image {
    position: absolute;
    width: auto;
    height: auto;   
    overflow: hidden;  
    opacity: 0.62;    
    animation-duration: 8s;
    animation-fill-mode: forwards;  // The element will retain the style values that is set by the last keyframe
  }

  &__enterActive, &__leaveActive {
    transition: opacity 3s linear;
  }

  &__enter, &__leaveTo {
    opacity: 0;
  }  
}

</style>