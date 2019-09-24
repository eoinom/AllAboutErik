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
      style="text-shadow: 1px 1px 2px #333; "
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd" 
    >
      <b-carousel-slide
        v-for="(image, iImg) in images"
        :key="iImg"
        caption=""
        text=""
        :img-src="image" >
      </b-carousel-slide>
    </b-carousel>

  </div>
</template>


<script>
export default {
  name: 'SlideshowImages2',

  props: {
    slides: {
      default: () => [],
      type: Array,
    },
  },

  data() {
    return {
      slide: 0,
      sliding: null
    };
  },

  computed: {
    images() {    
      return this.slides.map(a => a.img)
    },
    currentImg() {
      return this.images[this.slide]
    }
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
  }
};
</script>


<style>

@font-face {
  font-family: NeueHaasGroteskText Pro5;
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

@font-face {
  font-family: NeueHaasGroteskText Pro6;
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-65md.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.carousel-caption > p {
  color: #FFFFFF;
  /* font-size: 30px; */
  font-size: 1.875rem;
  font-family: 'NeueHaasGroteskText Pro6';
  font-feature-settings: 'liga';
  font-weight: 500;
  text-align: center;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.65);
  line-height: 43px;
  letter-spacing: 2px;    
}

</style>