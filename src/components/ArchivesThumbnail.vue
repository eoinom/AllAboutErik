<template>
  <div class="thumbnailContainer">    
    <div class="thumbnailImgContainer" :style="vignetteStyles">
      <g-image :alt="thumbnailObj.title" v-if="thumbnailObj.img != null" :src="thumbnailObj.img" class="thumbnailImg hideOnHover"/>
      <g-image :alt="thumbnailObj.title" v-if="thumbnailObj.img_bright != null" :src="thumbnailObj.img_bright" class="thumbnailImg showOnHover"/>
    </div>

    <div class="thumbnailImgTextOverlay">
      <div class="hideOnHover">
        <span class="overlayText">{{ thumbnailObj.text }}</span>      
      </div>
      
      <div class="showOnHover">
        <p class="mb-0 mb-lg-1 mb-xl-2">
          <!-- <g-image alt="Eye icon" v-if="thumbnailObj.url != null" src="~/assets/images/eye.png" class="thumbnailOverlayImg" /> -->
          <g-image alt="Eye icon" v-if="true" src="~/assets/images/eye.png" class="thumbnailOverlayImg" />
        </p>
      </div>
    </div>
  </div>
</template>


<script scoped>
export default { 
  name: 'ArchivesThumbnail',

  props: {
    thumbnailObj: {
      type: Object,
      required: true
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
        // '--blur': (0.0586*this.windowWidth),    // in px  (about 150px for a 2560px wide window)
        // '--spread': (0.0234*this.windowWidth)   // in px  (about 60px for a 2560px wide window)
        '--blur': 150,    // in px
        '--spread': 0,    // in px
        '--opacity': 0.56
      }
    }
  },

  methods: {
  },

  mounted() {
    this.windowWidth = window.innerWidth

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      });
    })
  },
}
</script>



<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.thumbnailContainer {
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
  opacity: 0.7;
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
  width: 145%;
  
  /* Using the padding trick, we force the elments padding bottom to push down the height */
  /* To form a square, the padding-bottom, needs to have the same value as the width property */
  padding-bottom: 145%;
  
  --blur_px: calc(var(--blur) * 1px);
  --spread_px: calc(var(--spread) * 1px);
  box-shadow: inset 0px 0px var(--blur_px) var(--spread_px) rgba(0,0,0,var(--opacity)), inset 0px 0px var(--blur_px) var(--spread_px) rgba(0,0,0,var(--opacity));
  border-radius: 50%;

  transition: box-shadow 0.5s ease;
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
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.overlayText {
  font-family: 'Open Sans Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 300;
  font-size: 3.3125rem;  /* 53px with 16px default size */
  line-height: 3.3125rem;  /* 53px with 16px default size */
  letter-spacing: 9px;
  text-transform: uppercase;
  // text-shadow: 1px 1px 4px rgba(0,0,0,0.32);
}

.thumbnailOverlayImg {
  width: 21%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


.thumbnailContainer:hover .thumbnailImgContainer:after {
  box-shadow: none;
}

.hideOnHover,
.thumbnailContainer:hover .showOnHover,
.thumbnailContainer:hover .thumbnailImgContainer {
  opacity: 1;
  transition: all 0.5s ease 0s;
}
.thumbnailImg.hideOnHover,
.thumbnailContainer:hover .thumbnailImg.showOnHover {
  display: block;
}

.showOnHover,
.thumbnailContainer:hover .hideOnHover {
  opacity: 0;
  transition: all 0.5s ease 0s;
}
.thumbnailImg.showOnHover,
.thumbnailContainer:hover .thumbnailImg.hideOnHover {
  display: none;
}

// .thumbnailImgContainer {
//   opacity: 0.7;
//   transition: all 0.5s ease 0s;
// }
// .thumbnailContainer:hover .thumbnailImgContainer {
//   opacity: 1;
// }


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .overlayText {
    font-size: 1.6622rem;
    letter-spacing: 8.4324px;
  }
  .thumbnailImgContainer:after {
    --blur_px: calc(var(--blur) * 2px);
    --spread_px: calc(var(--spread) * 2px);
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .overlayText {
    font-size: 1.6622rem;
    letter-spacing: 8.4324px;
  }
  .thumbnailImgContainer:after {
    --blur_px: calc(var(--blur) * 2px);
    --spread_px: calc(var(--spread) * 2px);
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .overlayText {
    font-size: 2.0778rem;
    letter-spacing: 13px;
  }
  .thumbnailImgContainer:after {
    --blur_px: calc(var(--blur) * 2px);
    --spread_px: calc(var(--spread) * 2px);
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  .overlayText {
    font-size: 2.0778rem;
    letter-spacing: 13px;
  }
}

</style>
