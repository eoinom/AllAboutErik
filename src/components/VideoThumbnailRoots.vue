<template>
  <div class="videoThumbnailContainer">    
    <div class="thumbnailImgContainer" :style="vignetteStyles">
      <g-image :alt="video.title" v-if="video.thumbnailImg != null" :src="video.thumbnailImg" class="thumbnailImg"/>
    </div>

    <div class="thumbnailImgTextOverlay">
      <transition name="fade">
        <div class="hideOnHover">
          <span class="videoTitle">{{ video.title }}</span>
          <p class="videoSubText">{{ video.subText }}</p>              
        </div>
      </transition>

      <transition name="fade">
        <div class="showOnHover">
          <p class="mb-0 mb-lg-1 mb-xl-2">
            <g-image alt="Play symbol" v-if="video.url != null" src="~/assets/images/playarrowcircle.png" class="thumbnailPlayVideoImg" />
          </p>
          <p v-if="video.duration != null" class="videoDurationText">
            {{ durationInMinsText(video.duration) }} 
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>


<script scoped>
export default { 
  name: 'VideoThumbnailRoots',

  props: {
    video: {
      type: Object
    },
  },

  data() {
    return {
      windowWidth: 0,
    }
  },

  computed: {
    vignetteStyles() {
      return {
        '--blur': (0.0586*this.windowWidth),    // in px  (about 150px for a 2560px wide window)
        '--spread': (0.0234*this.windowWidth)   // in px  (about 60px for a 2560px wide window)
      }
    }
  },

  methods: {
    durationInMinsText(secs) {
      let mins = Math.floor(secs / 60)
      if (mins >= 60) {
        let hrs = Math.floor(mins / 60)
        mins = mins - (hrs * 60)
        if (mins < 10)
          mins = '0' + mins
        if (hrs == 1)
          return '1 hr ' + mins + ' min'
        else
          return hrs + ' hrs ' + mins + ' min'
      }
      else {
        secs = secs - (mins * 60)
        if (secs < 10)
          secs = '0' + secs
        return mins + ':' + secs + ' min'
      }
    }
  },

  mounted() {
    this.windowWidth = window.innerWidth

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      });
    })
  },

  components: {
  },
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lora:700i&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-65md.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.videoThumbnailContainer {
  cursor: pointer;
}

/* For vignette effect, see https://benjaminhorn.io/code/proper-lens-vignette-with-css/ & 
https://codepen.io/beije/pen/zxjeae */

.thumbnailImgContainer {
  background: black;
  line-height: 0;         /* ensure no space between bottom */		
	display: inline-block;  /* don't go wider than image */

  width: 100%;
  position: relative;
  overflow: hidden;

  transition: box-shadow 0.5s ease;
}

.thumbnailImgContainer:after {
  content: '';
  position: absolute;
  
  /* Center element on the middle of it's parent */
  top: 50%;
  left: 50%;
  
  /* Reset back the image so it's center is locked on the center of the parent */
  transform: translate(-50%,-50%);
  
  /* Only set the width of the image */
  width: 120%;
  
  /* Using the padding trick, we force the elments padding bottom to push down the height */
  /* To form a square, the padding-bottom, needs to have the same value as the width property */
  padding-bottom: 120%;
  
  --blur_px: calc(var(--blur) * 1px);
  --spread_px: calc(var(--spread) * 1px);
  box-shadow: inset 0px 0px var(--blur_px) var(--spread_px) rgba(0,0,0,0.8), inset 0px 0px var(--blur_px) var(--spread_px) rgba(0,0,0,0.8);
  border-radius: 50%;
}

.thumbnailImg {
  width: 100%;
  height: auto;  
  opacity: 0.7;
  position: relative;
  transition: opacity 0.5s ease;
  max-width: 100%;
}

.thumbnailImgTextOverlay {
  color: #FFFFFF;
  position: absolute;
  text-align: center;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.videoTitle {
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 2.5625rem;  /* 41px with 16px default size */
  text-transform: uppercase;
  letter-spacing: 16px;
}

.videoSubText {
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.4375rem; /* 23px with 16px default size */
  letter-spacing: 1px;
}

.thumbnailPlayVideoImg {
  display: none;
  width: 18%;
  height: auto;  
  position: relative;
  padding-top: 12%;
}

.videoDurationText {
  display: none;
  font-family: 'Lora', serif;
  font-weight: 700;
  font-size: 1.6rem;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.65);
}

.videoThumbnailContainer:hover .videoTitle, .videoThumbnailContainer:hover .videoSubText {
  display: none;
}
.videoThumbnailContainer:hover .thumbnailPlayVideoImg, .videoThumbnailContainer:hover .videoDurationText {
  display: inline;
}
.videoThumbnailContainer:hover .thumbnailImg {
  opacity: 1;
}
.videoThumbnailContainer:hover .thumbnailImgContainer:after {
  box-shadow: none;
}

.hideOnHover {
  opacity: 1;
  transition: all 0.4s ease-in 0.1s;
}
.videoThumbnailContainer:hover .hideOnHover {
  opacity: 0;
}

.showOnHover {
  opacity: 0;
  transition: all 0.4s ease-in 0.1s;
}
.videoThumbnailContainer:hover .showOnHover {
  opacity: 1;
}



/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .videoTitle {
    font-size: 1.6622rem;
    letter-spacing: 8.4324px;
  }
  .videoSubText {
    font-size: 0.756rem;
    letter-spacing: 0.5259px;
  }
  .videoDurationText {
    font-size: 0.8414rem;
  }
  .thumbnailImgContainer:after {
    --blur_px: calc(var(--blur) * 2px);
    --spread_px: calc(var(--spread) * 2px);
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .videoTitle {
    font-size: 1.6622rem;
    letter-spacing: 8.4324px;
  }
  .videoSubText {
    font-size: 0.756rem;
    letter-spacing: 0.5259px;
  }
  .videoDurationText {
    font-size: 0.8414rem;
  }
  .thumbnailImgContainer:after {
    --blur_px: calc(var(--blur) * 2px);
    --spread_px: calc(var(--spread) * 2px);
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .videoTitle {
    font-size: 2.0778rem;
    letter-spacing: 13px;
  }
  .videoSubText {
    font-size: 1.1655rem;
    letter-spacing: 0.8108px;
  }
  .videoDurationText {
    font-size: 1.2972rem;
  }
  .thumbnailImgContainer:after {
    --blur_px: calc(var(--blur) * 2px);
    --spread_px: calc(var(--spread) * 2px);
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  .videoTitle {
    font-size: 2.0778rem;
    letter-spacing: 13px;
  }
  .videoSubText {
    font-size: 1.1655rem;
    letter-spacing: 0.8108px;
  }
  .videoDurationText {
    font-size: 1.2972rem;
  }
}

</style>
