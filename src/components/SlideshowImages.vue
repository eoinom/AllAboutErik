<template>
  <div class="SlideshowImages">
    
    <!-- https://vuejs.org/v2/guide/transitions.html#List-Transitions -->
    <transition-group     
      tag="div"
      :style="slideShowPadding"
      enter-active-class="SlideshowImages__enterActive"
      enter-class="SlideshowImages__enter"
      leave-active-class="SlideshowImages__leaveActive"
      leave-to-class="SlideshowImages__leaveTo"
      class="SlideshowImages__slides"
    >
      <img
        v-for="(image, index) in images"
        v-show="index === activeIndex"
        :key="image"
        :src="image"
        class="SlideshowImages__image"
        :style="imgStyle(index)"
        alt=""
      >
    </transition-group>

  </div>
</template>


<script>
export default {
  name: 'SlideshowImages',

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

      startScale: 1.0,
      endScale: 1.1,
      prevStartScale: 1.0,
      prevEndScale: 1.1,

      imgOpacity: 0.62,
      startPos: [0, 0, 0],  // x, y, z
      positionFactor: 1.5,

      startPosX: 0,
      startPosY: 0,

      windowWidth: 0,
      windowHeight: 0,

      translateFactor: 1.5
    };
  },

  computed: {
    aspectRatio() {
      console.log('aspectRatio is: ' + (this.windowHeight / this.windowWidth) * 100)
      return (this.windowHeight / this.windowWidth) * 100
    },
    slideShowPadding() {
      console.log('slideShowPadding:');
      console.log('paddingBottom: ' + this.aspectRatio + '%');
      return 'paddingBottom: ' + this.aspectRatio + '%'
    },
    images() {
      console.log('images');
      console.log(this.slides.map(a => a.img));      
      return this.slides.map(a => a.img)
    },
  },

  methods: {
    goToIndex(index) {
      console.log('in goToIndex, index is: ' + index)
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
          case 'top-left':      return 'top left';
          case 'top':           return 'top';
          case 'top-right':     return 'top right';
          case 'left':          return 'left';
          case 'centre':        return 'center';
          case 'right':         return 'right';
          case 'bottom-left':   return 'bottom left';
          case 'bottom':        return 'bottom';
          case 'bottom-right':  return 'bottom right';
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
      console.log('interval: ' + 1000*this.slides[index].duration)
      // return 1000*this.slides[index].duration
      return 5000;
    },

    next() {
      console.log('in next()');      
      let nextIndex = this.activeIndex + 1;
      // Go to the first image if the active image ist the last one
      if (!this.images[nextIndex]) {
        nextIndex = 0
      }
      this.goToIndex(nextIndex);
    },

    createKeyFrames() {
      for (let i = 0; i < this.slides.length; i++) {        
        let startPos = [0, 0, 0]
        if (this.slides[i].hasOwnProperty('panStart')) {
          switch(this.slides[i].panStart.toLowerCase()) {
            case 'top-left':      startPos = [-1, -1, 0];     break;
            case 'top':           startPos = [0, -1, 0];      break;
            case 'top-right':     startPos = [1, -1, 0];      break;
            case 'left':          startPos = [-1, 0, 0];      break;
            case 'centre':        startPos = [0, 0, 0];       break;
            case 'right':         startPos = [1, 0, 0];       break;
            case 'bottom-left':   startPos = [-1, 1, 0];      break;
            case 'bottom':        startPos = [0, 1, 0];       break;
            case 'bottom-right':  startPos = [1, 1, 0];       break;
            default:
              console.log('Did not recognise value for slides.panStart: ' + this.slides[i].panStart)
          } 
        }
        let num = i + 1
        let scaleFrom = this.slides[i].scaleFrom
        let scaleTo = this.slides[i].scaleTo
        let Tx = this.translateFactor * startPos[0]
        let Ty = this.translateFactor * startPos[1]
        var style = document.createElement('style');
        style.type = 'text/css';
        var keyFrames = '\
        @keyframes kenburns-' + num + ' {\
          0% {\
            transform: scale3d('+ scaleFrom + ', '+ scaleFrom + ', 1) translate3d('+ Tx + '%, '+ Ty + '%, 0);\
          }\
          100% {\
            transform: scale3d('+ scaleTo + ', '+ scaleTo + ', 1) translate3d(0, 0, 0);\
          }\
        }';
        style.innerHTML = keyFrames
        document.head.appendChild(style)
      };
    }
  },

  mounted() {
    this.createKeyFrames()
    console.log('document.head:');
    console.log(document.head);
    

    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight

    console.log('this.slides');
    console.log(this.slides);

    this.goToIndex(0);
    // this.time = this.interval(0)
    this.startInterval();

    this.$nextTick(() => {
      window.addEventListener('resize', () => {        
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight 
      });
    })
  },
};
</script>


<style lang="scss">

body {
  background-color: black;
}

.SlideshowImages {
  --translateFactor: 1.5%;  

  &__slides {
    position: relative;
    display: flex;
    justify-content: center;
    // align-items: center;
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
    // animation-timing-function: linear;
    // animation-iteration-count: infinite;

    // // Enable the effect only
    // // on large screen devices.
    // @media (min-width: 42em) {
    //   animation: kenburns 8s;
    //   animation-fill-mode: forwards;
    // }
  }

  &__enterActive, &__leaveActive {
    transition: opacity 3s linear;    // // scale: var(--endScale);
    
  }

  &__enter, &__leaveTo {
    opacity: 0;
  }

  // @keyframes kenburns-1 {
  //   0% {
  //     transform: scale3d(1, 1, 1) translate3d(calc(1*var(--translateFactor)), calc(1*var(--translateFactor)), 0)
  //   }
  //   to {
  //     transform: scale3d(1.1, 1.1, 1) translate3d(0, 0, 0);
  //   }
  // }

  // @keyframes kenburns-2 {
  //   0% {
  //     transform: scale3d(1, 1, 1) translate3d(0, 0, 0)
  //   }
  //   to {
  //     transform: scale3d(1.07, 1.07, 1) translate3d(0, 0, 0);
  //   }
  // }

  // @keyframes kenburns-3 {
  //   0% {
  //     transform: scale3d(1, 1, 1) translate3d(0, calc(1*var(--translateFactor)), 0)
  //   }
  //   to {
  //     transform: scale3d(1.06, 1.06, 1) translate3d(0, 0, 0);
  //   }
  // }

  // @keyframes kenburns-4 {
  //   0% {
  //     transform: scale3d(1.06, 1.06, 1) translate3d(0, calc(-1*var(--translateFactor)), 0)
  //   }
  //   to {
  //     transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
  //   }
  // }

  // @keyframes kenburns-5 {
  //   0% {
  //     transform: scale3d(1, 1, 1) translate3d(calc(-1*var(--translateFactor)), calc(1*var(--translateFactor)), 0)
  //   }
  //   to {
  //     transform: scale3d(1.07, 1.07, 1) translate3d(0, 0, 0);
  //   }
  // }

  // @keyframes kenburns-6 {
  //   0% {
  //     transform: scale3d(1, 1, 1) translate3d(0, 0, 0)
  //   }
  //   to {
  //     transform: scale3d(1.09, 1.09, 1) translate3d(0, 0, 0);
  //   }
  // }

  // @keyframes kenburns-7 {
  //   0% {
  //     transform: scale3d(1.06, 1.06, 1) translate3d(0, calc(1*var(--translateFactor)), 0)
  //   }
  //   to {
  //     transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
  //   }
  // }

  // @keyframes kenburns-8 {
  //   0% {
  //     transform: scale3d(1, 1, 1) translate3d(0, calc(1*var(--translateFactor)), 0)
  //   }
  //   to {
  //     transform: scale3d(1.06, 1.06, 1) translate3d(0, 0, 0);
  //   }
  // }

  // @keyframes kenburns-9 {
  //   0% {
  //     transform: scale3d(1, 1, 1) translate3d(calc(-1*var(--translateFactor)), calc(1*var(--translateFactor)), 0)
  //   }
  //   to {
  //     transform: scale3d(1.07, 1.07, 1) translate3d(0, 0, 0);
  //   }
  // }

  // @keyframes kenburns-10 {
  //   0% {
  //     transform: scale3d(1, 1, 1) translate3d(calc(-1*var(--translateFactor)), calc(-1*var(--translateFactor)), 0)
  //   }
  //   to {
  //     transform: scale3d(1.07, 1.07, 1) translate3d(0, 0, 0);
  //   }
  // }

  // @keyframes kenburns-11 {
  //   0% {
  //     transform: scale3d(1, 1, 1) translate3d(0, 0, 0)
  //   }
  //   to {
  //     transform: scale3d(1.09, 1.09, 1) translate3d(0, 0, 0);
  //   }
  // }

  // @keyframes kenburns-12 {
  //   0% {
  //     transform: scale3d(1, 1, 1) translate3d(calc(-1*var(--translateFactor)), calc(1*var(--translateFactor)), 0)
  //   }
  //   to {
  //     transform: scale3d(1.07, 1.07, 1) translate3d(0, 0, 0);
  //   }
  // }

  // @keyframes kenburns-13 {
  //   0% {
  //     transform: scale3d(1, 1, 1) translate3d(0, 0, 0)
  //   }
  //   to {
  //     transform: scale3d(1.09, 1.09, 1) translate3d(0, 0, 0);
  //   }
  // }

  // @keyframes kenburns-14 {
  //   0% {
  //     transform: scale3d(1, 1, 1) translate3d(0, calc(1*var(--translateFactor)), 0)
  //   }
  //   to {
  //     transform: scale3d(1.06, 1.06, 1) translate3d(0, 0, 0);
  //   }
  // }
  
}
</style>