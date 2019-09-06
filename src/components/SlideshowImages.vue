<template>
  <div class="SlideshowImages">
    
    <!-- https://vuejs.org/v2/guide/transitions.html#List-Transitions -->
    <transition-group
      :duration="1000"      
      tag="div"
      :style="{ paddingBottom: `${aspectRatio}%` }"
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
        v-show="activeIndex === index"
        :key="image"
        :style="{ backgroundImage: `url('${image}')` }"
        style="padding-bottom:50%"
        class="SlideshowImages__image"
        alt=""
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
    height: {
      default: 600
    },
    // images: {
    //   default: () => [],
    //   type: Array,
    // },
    // interval: {
    //   default: 10000
    // },
    width: {
      default: 1280
    },
    slides: {
      default: () => [],
      type: Array,
    },
  },

  data() {
    return {
      activeIndex: 0,
      time: 0,

      // startScale: 1.0,
      // endScale: 1.1,
      startPosX: 0,
      startPosY: 0,
      startPosZ: 0,
      endPosX: 0,
      endPosY: 0,
      endPosZ: 0,
    };
  },

  computed: {
    aspectRatio() {
      console.log('aspectRatio is: ' + (this.height / this.width) * 100)
      return (this.height / this.width) * 100
    },
    images() {
      console.log('images');
      console.log(this.slides.map(a => a.img));
      
      return this.slides.map(a => a.img)
    },
    // startScale(){
    //   let i = this.activeIndex
    //   let startScale = 1.0
    //   if (i >= 0 && i < this.slides.length && this.slides[i].hasOwnProperty('scaleFrom')) {
    //     startScale = this.slides[i].scaleFrom
    //   }
    //   console.log('setting --startScale to: ' + startScale)
    //   this.$el.style.setProperty('--startScale', startScale)
    //   return startScale
    // },
    // endScale(){
    //   let i = this.activeIndex
    //   let endScale = 1.1
    //   if (i >= 0 && i < this.slides.length && this.slides[i].hasOwnProperty('scaleTo')) {
    //     endScale = this.slides[i].scaleTo
    //   }
    //   console.log('setting --endScale to: ' + endScale)
    //   this.$el.style.setProperty('--endScale', endScale)
    //   return endScale
    // }
    // interval() {
    //   console.log('interval: ' + 1000*this.slides[this.activeIndex].duration)
    //   return 1000*this.slides[this.activeIndex].duration
    // }
  },

  methods: {
    goToIndex(index) {
      console.log('in goToIndex, index is: ' + index)
      this.activeIndex = index
      this.applySlideStyles(index)
      this.time = this.interval(index)      
    },
    applySlideStyles(index) {
      let i = index

      let startScale = 1.0      
      if (i >= 0 && i < this.slides.length && this.slides[i].hasOwnProperty('scaleFrom')) {
        startScale = this.slides[i].scaleFrom
      }
      console.log('setting --startScale to: ' + startScale)
      this.$el.style.setProperty('--startScale', startScale)

      let endScale = 1.1
      if (i >= 0 && i < this.slides.length && this.slides[i].hasOwnProperty('scaleTo')) {
        endScale = this.slides[i].scaleTo
      }
      console.log('setting --endScale to: ' + endScale)
      this.$el.style.setProperty('--endScale', endScale)

      let startPos = [0, 0, 0]  // x, y, z
      if (this.slides[i].hasOwnProperty('panStart')) {
        switch(this.slides[i].panStart) {
          case 'top-left':      startPos = [-50, 50, 0];    break;
          case 'top':           startPos = [0, 50, 0];       break;
          case 'top-right':     startPos = [50, 50, 0];     break;
          case 'left':          startPos = [-50, 0, 0];      break;
          case 'center':        startPos = [0, 0, 0];         break;
          case 'right':         startPos = [50, 0, 0];       break;
          case 'bottom-left':   startPos = [-50, -50, 0];   break;
          case 'bottom':        startPos = [0, -50, 0];      break;
          case 'bottom-right':  startPos = [50, -50, 0];    break;
          default:
            console.log('Did not reognise value for slides.panStart: ' + this.slides.panStart)
        } 
      }
      console.log('panStart: ' + this.slides[i].panStart)
      console.log('startPos: ')
      console.log(startPos)
      console.log('startPosX: ' + startPos[0])
      console.log('startPosY: ' + startPos[1])
      console.log('startPosZ: ' + startPos[2])
      this.$el.style.setProperty('--startPosX', startPos[0])
      this.$el.style.setProperty('--startPosY', startPos[1])
      this.$el.style.setProperty('--startPosZ', startPos[2])
      

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
      return 1000*this.slides[index].duration
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
    console.log('this.slides');
    console.log(this.slides);
    this.time = this.interval(0)
    this.startInterval();
  },
};
</script>


<style lang="scss">

body {
  background-color: black;
}
// $startScale: 0.8;
// $endScale: 1.1;

  // :root {
  //   --startScale: 0.8;
  //   --endScale: 1.1;
  //   --startPosX: 0;
  //   --startPosY: 0;
  //   --startPosZ: 0;
  //   --endPosX: 0;
  //   --endPosY: 0;
  //   --endPosZ: 0;
  // } 

.SlideshowImages {

  --startScale: 0.8;
  --endScale: 1.1;
  --startPosX: 0;
  --startPosY: 0;
  --startPosZ: 0;
  --endPosX: 0;
  --endPosY: 0;
  --endPosZ: 0;

  &__slides {
    position: relative;
    overflow: hidden;
    // z-index: 100;
  }

  &__image {
    position: absolute;
    width: 100%;
    // height: 100%;
    overflow: hidden;
    

    animation: kenburns 8s;
    animation-fill-mode: forwards;  // The element will retain the style values that is set by the last keyframe

    // // Enable the effect only
    // // on large screen devices.
    // @media (min-width: 42em) {
    //   animation: kenburns 8s;
    //   animation-fill-mode: forwards;
    // }
  }

  &__enterActive, &__leaveActive {
    transition: opacity 1s;
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
    from {
      // transform: scale(var(--startScale), var(--startScale)) translate(calc(var(--startPosX) * 1%), calc(var(--startPosY) * 1%));
      transform: scale(1, 1) translate(0, 0);
    }
    to {
      // transform: scale(var(--endScale), var(--endScale)) translate(0, 0);
      transform: scale(1, 1) translate(0, 0);
    }
  }
}
</style>