<template>
  <g-link :to="'/archives/' + link" class="thumbnailContainer">    
    <div class="thumbnailImgContainer" :style="vignetteStyles">
      <g-image :alt="thumbnailObj.title" v-if="thumbnailObj.img != null" :src="thumbnailObj.img" class="thumbnailImg hideOnHover"/>
      <g-image :alt="thumbnailObj.title" v-if="thumbnailObj.img_bright != null" :src="thumbnailObj.img_bright" class="thumbnailImg showOnHover"/>
    </div>

    <div class="thumbnailImgTextOverlay">
      <div class="hideOnHover">
        <span class="overlayText px-3">{{ thumbnailObj.text }}</span>      
      </div>
      
      <div class="showOnHover">
        <p class="mb-0 mb-lg-1 mb-xl-2">
          <!-- <g-image alt="Eye icon" v-if="thumbnailObj.url != null" src="~/assets/images/eye.png" class="thumbnailOverlayImg" /> -->
          <g-image alt="Eye icon" v-if="true" src="~/assets/images/eye.png" class="thumbnailOverlayImg" />
        </p>
      </div>
    </div>
  </g-link>
</template>


<script scoped>
const slugify = require('@sindresorhus/slugify')

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
      link: this.thumbnailObj.hasOwnProperty('text') ? slugify(this.thumbnailObj.text) : '',
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


// Media queries for overlay text & img shadow variables
// Note that these are based on when the containing tile is less than 480px wide
/* Small */
@media only screen and (max-width: 512px) { 
  .overlayText {
    font-size: calc(2.0703125rem + 19.875 * (100vw - 332px) / (512 - 332));
    line-height: calc(2.0703125rem + 19.875 * (100vw - 332px) / (512 - 332));
    letter-spacing: calc(8.125px + 4.875 * (100vw - 332px) / (512 - 332));
  }
  .thumbnailImgContainer:after {
    --blur_px: calc(var(--blur) * 1px * (0.078125rem + 0.75 * (100vw - 332px) / (512 - 332)) );
    --spread_px: calc(var(--blur) * 1px * (0.078125rem + 0.75 * (100vw - 332px) / (512 - 332)) );
  }
}

/* Medium + Large */
@media only screen and (min-width: 768px) and (max-width: 1152px) { 
  .overlayText {
    font-size: calc(2.2083333rem + 17.6666667 * (100vw - 768px) / (1152 - 768));
    line-height: calc(2.2083333rem + 17.6666667 * (100vw - 768px) / (1152 - 768));
    letter-spacing: calc(8.667px + 4.333 * (100vw - 768px) / (1152 - 768));
  }
  .thumbnailImgContainer:after {
    --blur_px: calc(var(--blur) * 1px * (0.08333rem + 0.6667 * (100vw - 768px) / (1152 - 768)) );
    --spread_px: calc(var(--blur) * 1px * (0.08333rem + 0.6667 * (100vw - 768px) / (1152 - 768)) );
  }
}

/* XL+ */
@media only screen and (min-width: 1200px) and (max-width: 1920px) { 
  .overlayText {
    font-size: calc(2.0703125rem + 19.875 * (100vw - 1200px) / (1920 - 1200));
    line-height: calc(2.0703125rem + 19.875 * (100vw - 1200px) / (1920 - 1200));
    letter-spacing: calc(8.125px + 4.875 * (100vw - 1200px) / (1920 - 1200));
  }
  .thumbnailImgContainer:after {
    --blur_px: calc(var(--blur) * 1px * (0.078125rem + 0.75 * (100vw - 1200px) / (1920 - 1200)) );
    --spread_px: calc(var(--blur) * 1px * (0.078125rem + 0.75 * (100vw - 1200px) / (1920 - 1200)) );
  }
}

</style>
