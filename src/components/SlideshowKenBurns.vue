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
  name: 'SlideshowKenBurns',

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
        let startPos = [0, 0, 0]  // x, y, z
        if (this.slides[i].hasOwnProperty('panStart')) {
          switch(this.slides[i].panStart.toLowerCase()) {
            case 'bottom-left':   startPos = [-1, 1, 0];      break;
            case 'bottom':        startPos = [0, 1, 0];       break;
            case 'bottom-right':  startPos = [1, 1, 0];       break;
            case 'left':          startPos = [-1, 0, 0];      break;
            case 'centre':        startPos = [0, 0, 0];       break;
            case 'right':         startPos = [1, 0, 0];       break;
            case 'top-left':      startPos = [-1, -1, 0];     break;
            case 'top':           startPos = [0, -1, 0];      break;
            case 'top-right':     startPos = [1, -1, 0];      break;
            default:
              console.log('Did not recognise value for slides.panStart: ' + this.slides[i].panStart)
          } 
        }
        const num = i + 1
        const scaleFrom = this.slides[i].scaleFrom
        const scaleTo = this.slides[i].scaleTo
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

  created() {
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

    padding-bottom: 100vh;
  }

  /* For vignette effect, see https://benjaminhorn.io/code/proper-lens-vignette-with-css/ & 
  https://codepen.io/beije/pen/zxjeae */
   &__slides:after {
    content: '';
    position: absolute;
    
    /* Center element on the middle of it's parent */
    top: 50%;
    left: 50%;    
    
    transform: translate(-50%,-50%);  /* Reset back the image so it's center is locked on the center of the parent */
    
    width: 110vw;
    height: 110vh;
    
    box-shadow: inset 0px 0px 150px 60px rgba(0,0,0,0.8), inset 0px 0px 150px 60px rgba(0,0,0,0.8);
    border-radius: 15%;
  }

  &__image {
    position: absolute;
    width: auto;
    height: auto;
    min-height: 100%;
    min-width: 100%;    
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


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
.SlideshowKenBurns {
  &__slides:after { 
      box-shadow: inset 0px 0px 50px 20px rgba(0,0,0,0.8), inset 0px 0px 50px 20px rgba(0,0,0,0.8);
      top: 54%;      //adjusting vertical position & height of vignette to counteract touch scroll on mobile devices
      height: 118vh;
    }
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
.SlideshowKenBurns {
  &__slides:after {
      box-shadow: inset 0px 0px 75px 30px rgba(0,0,0,0.8), inset 0px 0px 75px 30px rgba(0,0,0,0.8);
      top: 54%;      //adjusting vertical position & height of vignette to counteract touch scroll on mobile devices
      height: 118vh;
    }
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
.SlideshowKenBurns {
  &__slides:after {
      box-shadow: inset 0px 0px 100px 40px rgba(0,0,0,0.8), inset 0px 0px 100px 40px rgba(0,0,0,0.8);
      top: 52.5%;      //adjusting vertical position & height of vignette to counteract touch scroll on mobile devices
      height: 115vh;
    }
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
.SlideshowKenBurns {
  &__slides:after {
      box-shadow: inset 0px 0px 125px 50px rgba(0,0,0,0.8), inset 0px 0px 125px 50px rgba(0,0,0,0.8);
      top: 52.5%;      //adjusting vertical position & height of vignette to counteract touch scroll on mobile devices
      height: 115vh;
    }
  }
}
</style>