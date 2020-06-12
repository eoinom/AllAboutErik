<template>
  <div>
    <b-carousel
      id="carousel-roots&youth"
      v-model="slide"
      :interval="4000"
      fade
      background="#ababab"
      img-width="1024"
      img-height="480"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      class="carousel"
      :style="carouselStyles"
    >
      <!-- <b-carousel-slide
        v-for="(image, iImg) in images"
        :key="iImg"
        caption=""
        text=""
        :img-src="image"
        class="carousel-slide"
        :style="vignetteStyles"
      /> -->
      <b-carousel-slide
        v-for="(image, iImg) in images"
        :key="iImg"
        caption=""
        text=""
        :img-src="image"
        class="carousel-slide"
      >
        <slot name="caption"></slot>
      </b-carousel-slide>

      <slot></slot>
      
    </b-carousel>

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
    borderRadius: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      slide: 0,
      sliding: null,
      windowWidth: 0,
      windowHeight: 0,
    };
  },

  computed: {
    images() {    
      return this.slides.map(a => a.img)
    },
    currentImg() {
      return this.images[this.slide]
    },
    carouselStyles() {
      if (this.borderRadius != '') {
        return {
          '--borderRadius': this.borderRadius
        }
      }
    }
    // vignetteStyles() {
    //   return {
    //     '--blur': (0.1*this.windowWidth) + 'px',
    //     '--spread': (0.05*this.windowWidth) + 'px'
    //   }
    // }
  },

  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  },

  mounted() {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight
      });
    })
  }
};
</script>


<style lang="scss">

@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-65md.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.carousel-caption > p {
  color: #FFFFFF;
  font-size: 1.875rem;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  text-align: center;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.65);
  line-height: 43px;
  letter-spacing: 2px;    
}

.carousel {
  text-shadow: 1px 1px 2px #333;
  border-radius: var(--borderRadius);
}
.carousel-inner {
  border-radius: var(--borderRadius);
}

  /* For vignette effect, see https://benjaminhorn.io/code/proper-lens-vignette-with-css/ & 
  https://codepen.io/beije/pen/zxjeae */
/* .carousel-slide::after {
  content: '';
  position: absolute; */
  
  /* Center element on the middle of it's parent */
  /* top: 50%;
  left: 50%;     */
  
  /* Reset back the image so it's center is locked on the center of the parent */
  /* transform: translate(-50%,-50%);
  
  width: 115%;
  padding-bottom: 115%;
  
  box-shadow: inset 0px 0px var(--blur) var(--spread) rgba(0,0,0,0.8), inset 0px 0px var(--blur) var(--spread) rgba(0,0,0,0.8);
  border-radius: 50%;
} */

</style>