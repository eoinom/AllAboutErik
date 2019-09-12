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
    // height: {
    //   default: 1380
    // },
    // images: {
    //   default: () => [],
    //   type: Array,
    // },
    // interval: {
    //   default: 10000
    // },
    // width: {
    //   default: 2560
    // },
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
      windowHeight: 0
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
      // this.applySlideStyles(index)
      this.time = this.interval(index)      
    },
    // applySlideStyles(index) {
    //   let i = parseInt(index)

    //   if (i >= 0 && i < this.slides.length) {
    //     if (this.slides[i].hasOwnProperty('scaleFrom')) {
    //       this.startScale = this.slides[i].scaleFrom
    //       if (i==0)
    //         this.prevStartScale = this.slides[this.slides.length-1].scaleFrom
    //       else
    //         this.prevStartScale = this.slides[i-1].scaleFrom
    //     }
    //     if (this.slides[i].hasOwnProperty('scaleTo')) {
    //       this.endScale = this.slides[i].scaleTo
    //       if (i==0)
    //         this.prevEndScale = this.slides[this.slides.length-1].scaleTo
    //       else
    //         this.prevEndScale = this.slides[i-1].scaleTo
    //     }
    //     if (this.slides[i].hasOwnProperty('opacity')) {
    //       this.imgOpacity = this.slides[i].opacity / 100
    //     }      
    //     if (this.slides[i].hasOwnProperty('panStart')) {
    //       switch(this.slides[i].panStart.toLowerCase()) {
    //         case 'top-left':      this.startPos = [-1, -1, 0];     break;
    //         case 'top':           this.startPos = [0, -1, 0];      break;
    //         case 'top-right':     this.startPos = [1, -1, 0];      break;
    //         case 'left':          this.startPos = [-1, 0, 0];      break;
    //         case 'centre':        this.startPos = [0, 0, 0];       break;
    //         case 'right':         this.startPos = [1, 0, 0];       break;
    //         case 'bottom-left':   this.startPos = [-1, 1, 0];      break;
    //         case 'bottom':        this.startPos = [0, 1, 0];       break;
    //         case 'bottom-right':  this.startPos = [1, 1, 0];       break;
    //         default:
    //           console.log('Did not recognise value for slides.panStart: ' + this.slides[i].panStart)
    //       } 
    //     }
    //   }

    //   let slideIndex = i + 1
    //   if (i >= 5) {
    //     slideIndex = i - 4
    //   }
    //   if (i >= 10) {
    //     slideIndex = i - 9
    //   }
    //   console.log('in applySlideStyles, setting --animationName to: ' + 'kenburns-'+slideIndex)
    //   this.$el.style.setProperty('--animationName', 'kenburns-'+slideIndex)

    //   console.log('in applySlideStyles, setting --startScale to: ' + this.startScale)
    //   this.$el.style.setProperty('--startScale', this.startScale)
      
    //   console.log('in applySlideStyles, setting --endScale to: ' + this.endScale)
    //   this.$el.style.setProperty('--endScale', this.endScale)

    //   console.log('in applySlideStyles, setting --prevStartScale to: ' + this.prevStartScale)
    //   this.$el.style.setProperty('--prevStartScale', this.prevStartScale)
      
    //   console.log('in applySlideStyles, setting --prevEndScale to: ' + this.prevEndScale)
    //   this.$el.style.setProperty('--prevEndScale', this.prevEndScale)

    //   console.log('in applySlideStyles, setting --imgOpacity to: ' + this.imgOpacity)
    //   this.$el.style.setProperty('--imgOpacity', this.imgOpacity)
      
    //   console.log('in applySlideStyles, setting --startPosX: ' + this.positionFactor*this.startPos[0])
    //   console.log('in applySlideStyles, setting --startPosY: ' + this.positionFactor*this.startPos[1])
    //   console.log('in applySlideStyles, setting --startPosZ: ' + this.positionFactor*this.startPos[2])
    //   this.$el.style.setProperty('--startPosX', this.positionFactor*this.startPos[0])
    //   this.$el.style.setProperty('--startPosY', this.positionFactor*this.startPos[1])
    //   this.$el.style.setProperty('--startPosZ', this.positionFactor*this.startPos[2])

    //   // let actualImgWidth = (1920.0/1080.0) * this.windowHeight    // assumes all images are 1920 x 1080px
    //   // console.log('in applySlideStyles, setting --imgMargin to: ' + ((this.windowWidth - actualImgWidth) / 2) + 'px') 
    //   // this.$el.style.setProperty('--imgMargin', ((this.windowWidth - actualImgWidth) / 2) + 'px')     

    //   // let imgNo = i + 1
    //   // var img = document.querySelector("img.SlideshowImages__image:nth-child(" + imgNo + ")");
    //   // console.log('img width x height: ' + img.width + ' x ' + img.height);
    //   // console.log('in applySlideStyles, setting --leftMargin to: ' + (-(img.width - this.windowWidth) / 2) + 'px') 
    //   // this.$el.style.setProperty('--imgMargin', (-(img.width - this.windowWidth) / 2) + 'px')    
    // },

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
  },

  mounted() {
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

        // let actualImgWidth = (1920.0/1080.0) * this.windowHeight    // assumes all images are 1920 x 1080px
        // this.$el.style.setProperty('--imgMargin', ((this.windowWidth - actualImgWidth) / 2) + 'px')
        // console.log('in mounted, just set --imgMargin to: ' + ((this.windowWidth - actualImgWidth) / 2) + 'px')

        // let imgNo = this.activeIndex + 1
        // let img = document.querySelector("img.SlideshowImages__image:nth-child(" + imgNo + ")");
        // console.log('img width x height: ' + img.width + ' x ' + img.height);
        // console.log('in mounted resize listener, setting --leftMargin to: ' + (-(img.width - this.windowWidth) / 2) + 'px') 
        // this.$el.style.setProperty('--imgMargin', (-(img.width - this.windowWidth) / 2) + 'px')    
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

  // --animationName: 'kenburns-1';
  // --startScale: 1;
  // --prevStartScale: 1;
  // --endScale: 1.1;
  // --prevEndScale: 1.1;
  // --startPosX: 0;
  // --startPosY: 0;
  // --imgOpacity: 0.62;
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
    // opacity: var(--imgOpacity);    
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

  &__leaveActive, &__leaveTo {
    transform: scale(var(--prevEndScale), var(--prevEndScale)); 
    // transform: scale3d(var(--endScale), var(--endScale), 1)   
  }

  &__enterActive, &__leaveActive {
    transition: opacity 3s linear;    // // scale: var(--endScale);
    
  }

  &__enter, &__leaveTo {
    opacity: 0;
  }

  @keyframes kenburns-1 {
    0% {
      transform: scale3d(1, 1, 1) translate3d(calc(1*var(--translateFactor)), calc(1*var(--translateFactor)), 0)
    }
    to {
      transform: scale3d(1.1, 1.1, 1) translate3d(0, 0, 0);
    }
  }

  @keyframes kenburns-2 {
    0% {
      transform: scale3d(1, 1, 1) translate3d(0, 0, 0)
    }
    to {
      transform: scale3d(1.07, 1.07, 1) translate3d(0, 0, 0);
    }
  }

  @keyframes kenburns-3 {
    0% {
      transform: scale3d(1, 1, 1) translate3d(0, calc(1*var(--translateFactor)), 0)
    }
    to {
      transform: scale3d(1.06, 1.06, 1) translate3d(0, 0, 0);
    }
  }

  @keyframes kenburns-4 {
    0% {
      transform: scale3d(1.06, 1.06, 1) translate3d(0, calc(-1*var(--translateFactor)), 0)
    }
    to {
      transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
    }
  }

  @keyframes kenburns-5 {
    0% {
      transform: scale3d(1, 1, 1) translate3d(calc(-1*var(--translateFactor)), calc(1*var(--translateFactor)), 0)
    }
    to {
      transform: scale3d(1.07, 1.07, 1) translate3d(0, 0, 0);
    }
  }

  @keyframes kenburns-6 {
    0% {
      transform: scale3d(1, 1, 1) translate3d(0, 0, 0)
    }
    to {
      transform: scale3d(1.09, 1.09, 1) translate3d(0, 0, 0);
    }
  }

  @keyframes kenburns-7 {
    0% {
      transform: scale3d(1.06, 1.06, 1) translate3d(0, calc(1*var(--translateFactor)), 0)
    }
    to {
      transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
    }
  }

  @keyframes kenburns-8 {
    0% {
      transform: scale3d(1, 1, 1) translate3d(0, calc(1*var(--translateFactor)), 0)
    }
    to {
      transform: scale3d(1.06, 1.06, 1) translate3d(0, 0, 0);
    }
  }

  @keyframes kenburns-9 {
    0% {
      transform: scale3d(1, 1, 1) translate3d(calc(-1*var(--translateFactor)), calc(1*var(--translateFactor)), 0)
    }
    to {
      transform: scale3d(1.07, 1.07, 1) translate3d(0, 0, 0);
    }
  }

  @keyframes kenburns-10 {
    0% {
      transform: scale3d(1, 1, 1) translate3d(calc(-1*var(--translateFactor)), calc(-1*var(--translateFactor)), 0)
    }
    to {
      transform: scale3d(1.07, 1.07, 1) translate3d(0, 0, 0);
    }
  }

  @keyframes kenburns-11 {
    0% {
      transform: scale3d(1, 1, 1) translate3d(0, 0, 0)
    }
    to {
      transform: scale3d(1.09, 1.09, 1) translate3d(0, 0, 0);
    }
  }

  @keyframes kenburns-12 {
    0% {
      transform: scale3d(1, 1, 1) translate3d(calc(-1*var(--translateFactor)), calc(1*var(--translateFactor)), 0)
    }
    to {
      transform: scale3d(1.07, 1.07, 1) translate3d(0, 0, 0);
    }
  }

  @keyframes kenburns-13 {
    0% {
      transform: scale3d(1, 1, 1) translate3d(0, 0, 0)
    }
    to {
      transform: scale3d(1.09, 1.09, 1) translate3d(0, 0, 0);
    }
  }

  @keyframes kenburns-14 {
    0% {
      transform: scale3d(1, 1, 1) translate3d(0, calc(1*var(--translateFactor)), 0)
    }
    to {
      transform: scale3d(1.06, 1.06, 1) translate3d(0, 0, 0);
    }
  }
  
}
</style>