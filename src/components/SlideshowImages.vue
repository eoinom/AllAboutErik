<template>
  <div class="SlideshowImages">
    
    <!-- https://vuejs.org/v2/guide/transitions.html#List-Transitions -->
    <transition-group
      :duration="1000"      
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
        alt=""
      >
      <!-- <div
        v-for="(image, index) in images"
        v-show="index === activeIndex"
        :key="image"
        :style="'background-image: url(' + image + ')'"
        class="SlideshowImages__image"
      /> -->
    </transition-group>

    <!-- <div class="SlideshowImages__controls">
      <button
        class="SlideshowImages__control"
        @click="prev"
      >
        &laquo; prev
      </button>
      <button
        class="SlideshowImages__control"
        @click="next"
      >
        next &raquo;
      </button>
    </div> -->

  </div>
</template>


<script>
export default {
  name: 'SlideshowImages',

  props: {
    // height: {
    //   default: 1380
    // },
    // // images: {
    // //   default: () => [],
    // //   type: Array,
    // // },
    // // interval: {
    // //   default: 10000
    // // },
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

      imgOpacity: 0.6,
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
    }
  },

  methods: {
    goToIndex(index) {
      console.log('in goToIndex, index is: ' + index)
      this.activeIndex = index
      this.applySlideStyles(index)
      this.time = this.interval(index)      
    },
    applySlideStyles(index) {
      let i = parseInt(index)

      if (i >= 0 && i < this.slides.length) {
        if (this.slides[i].hasOwnProperty('scaleFrom')) {
          this.startScale = this.slides[i].scaleFrom
          if (i==0)
            this.prevStartScale = this.slides[this.slides.length-1].scaleFrom
          else
            this.prevStartScale = this.slides[i-1].scaleFrom
        }
        if (this.slides[i].hasOwnProperty('scaleTo')) {
          this.endScale = this.slides[i].scaleTo
          if (i==0)
            this.prevEndScale = this.slides[this.slides.length-1].scaleTo
          else
            this.prevEndScale = this.slides[i-1].scaleTo
        }
        if (this.slides[i].hasOwnProperty('opacity')) {
          this.imgOpacity = this.slides[i].opacity / 100
        }      
        if (this.slides[i].hasOwnProperty('panStart')) {
          switch(this.slides[i].panStart.toLowerCase()) {
            case 'top-left':      this.startPos = [-1, -1, 0];     break;
            case 'top':           this.startPos = [0, -1, 0];      break;
            case 'top-right':     this.startPos = [1, -1, 0];      break;
            case 'left':          this.startPos = [-1, 0, 0];      break;
            case 'centre':        this.startPos = [0, 0, 0];       break;
            case 'right':         this.startPos = [1, 0, 0];       break;
            case 'bottom-left':   this.startPos = [-1, 1, 0];      break;
            case 'bottom':        this.startPos = [0, 1, 0];       break;
            case 'bottom-right':  this.startPos = [1, 1, 0];       break;
            default:
              console.log('Did not recognise value for slides.panStart: ' + this.slides[i].panStart)
          } 
        }
      }

      let slideIndex = i + 1
      if (i >= 5) {
        slideIndex = i - 4
      }
      if (i >= 10) {
        slideIndex = i - 9
      }
      console.log('in applySlideStyles, setting --animationName to: ' + 'kenburns-'+slideIndex)
      this.$el.style.setProperty('--animationName', 'kenburns-'+slideIndex)

      console.log('in applySlideStyles, setting --startScale to: ' + this.startScale)
      this.$el.style.setProperty('--startScale', this.startScale)
      
      console.log('in applySlideStyles, setting --endScale to: ' + this.endScale)
      this.$el.style.setProperty('--endScale', this.endScale)

      console.log('in applySlideStyles, setting --startScale to: ' + this.startScale)
      this.$el.style.setProperty('--prevStartScale', this.prevStartScale)
      
      console.log('in applySlideStyles, setting --endScale to: ' + this.endScale)
      this.$el.style.setProperty('--prevEndScale', this.prevEndScale)

      console.log('in applySlideStyles, setting --imgOpacity to: ' + this.imgOpacity)
      this.$el.style.setProperty('--imgOpacity', this.imgOpacity)
      
      console.log('in applySlideStyles, setting --startPosX: ' + this.positionFactor*this.startPos[0])
      console.log('in applySlideStyles, setting --startPosY: ' + this.positionFactor*this.startPos[1])
      console.log('in applySlideStyles, setting --startPosZ: ' + this.positionFactor*this.startPos[2])
      this.$el.style.setProperty('--startPosX', this.positionFactor*this.startPos[0])
      this.$el.style.setProperty('--startPosY', this.positionFactor*this.startPos[1])
      this.$el.style.setProperty('--startPosZ', this.positionFactor*this.startPos[2])

      // let actualImgWidth = (1920.0/1080.0) * this.windowHeight    // assumes all images are 1920 x 1080px
      // console.log('in applySlideStyles, setting --imgMargin to: ' + ((this.windowWidth - actualImgWidth) / 2) + 'px') 
      // this.$el.style.setProperty('--imgMargin', ((this.windowWidth - actualImgWidth) / 2) + 'px')     

      // let imgNo = i + 1
      // var img = document.querySelector("img.SlideshowImages__image:nth-child(" + imgNo + ")");
      // console.log('img width x height: ' + img.width + ' x ' + img.height);
      // console.log('in applySlideStyles, setting --leftMargin to: ' + (-(img.width - this.windowWidth) / 2) + 'px') 
      // this.$el.style.setProperty('--imgMargin', (-(img.width - this.windowWidth) / 2) + 'px')    
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

  --animationName: 'kenburns-1';
  --startScale: 1;
  --endScale: 1.1;
  --startPosX: 0;
  --startPosY: 0;
  --imgMargin: 0;
  --imgOpacity: 0.6;

  // display: block;
  // padding-left: 500px;
  // display: block;
  //   margin-left: auto;
  //   margin-right: auto;

  // position: relative;

  // position: absolute;   
  // width: 100%;
  // margin: auto;  
  // left: 0; 
  // right: 0;
  

  &__slides {
    position: relative;
    overflow: hidden;
    // margin-left: var(--imgMargin);
    // margin-right: var(--imgMargin);
    // z-index: 100;

    // display: block;
    // margin-left: auto;
    // margin-right: auto;

    // position: absolute;
    // width: 100vw;
    // height: 100vh;

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

    // margin: 0 auto;
    // display: block;
    // margin-left: auto;
    // margin-right: auto;
    // margin: auto;  
    // left: 0; 
    // right: 0;
    
    // object-fit: contain;
    // background: no-repeat 50% 50%;
    // background-size: cover;
    // // animation-name: kenburns;
    // animation-timing-function: linear;
    // animation-iteration-count: infinite;
    // // animation-duration: $total-time;
    
    opacity: var(--imgOpacity);    

    // animation: kenburns 8s;
    animation-name: var(--animationName);
    animation-duration: 8s;
    //animation-fill-mode: none;
    animation-fill-mode: forwards;  // The element will retain the style values that is set by the last keyframe

    // // Enable the effect only
    // // on large screen devices.
    // @media (min-width: 42em) {
    //   animation: kenburns 8s;
    //   animation-fill-mode: forwards;
    // }
  }

  &__leaveActive, &__leaveTo {
    // transform: scale(var(--prevEndScale), var(--prevEndScale));
  }

  &__enterActive, &__leaveActive {
    transition: opacity 3s ease;
    // scale: var(--endScale);
  }

  &__enter, &__leaveTo {
    opacity: 0;
  }

  // &__controls {
  //   display: flex;
  //   justify-content: space-between;
  // }

  // 1. Reset native button styles.
  // &__control {
  //   padding: 0; // 1
  //   border: none; // 1
  //   background-color: transparent; // 1
  //   font-size: 1.25em;
  // }



  @keyframes kenburns {
    0% {
      // transform: scale(var(--startScale), var(--startScale)) translate(calc(var(--startPosX) * 1%), calc(var(--startPosY) * 1%));
      transform: scale(var(--startScale), var(--startScale)) translate(0, 0);
      // transform: scale(1, 1) translate(-10%, -5%);
    }
    to {
      // transform: scale(var(--endScale), var(--endScale)) translate(0, 0);
      transform: scale(var(--endScale), var(--endScale)) translate(calc(var(--startPosX) * -1%), calc(var(--startPosY) * -1%));
      // transform: scale(1.25, 1.25) translate(0, 0);
    }
  }

  @keyframes kenburns-1 {
    0% {
      transform: scale(1, 1) translate(0, 0);
    }
    to {
      transform: scale(1.1, 1.1) translate(-1.5%, -1.5%);
    }
  }

  @keyframes kenburns-2 {
    0% {
      transform: scale(1, 1) translate(0, 0);
    }
    to {
      transform: scale(1.07, 1.07) translate(0, 0);
    }
  }

  @keyframes kenburns-3 {
    0% {
      transform: scale(1, 1) translate(0, 0);
    }
    to {
      transform: scale(1.06, 1.06) translate(0, -1.5%);
    }
  }

  @keyframes kenburns-4 {
    0% {
      transform: scale(1.06, 1.06) translate(0, 0);
    }
    to {
      transform: scale(1, 1) translate(0, 1.5%);
    }
  }

  @keyframes kenburns-5 {
    0% {
      transform: scale(1, 1) translate(0, 0);
    }
    to {
      transform: scale(1.07, 1.07) translate(1.5%, -1.5%);
    }
  }
}
</style>