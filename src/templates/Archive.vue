<template>
  <Layout>
    <transition name="page" mode="out-in">
      <div :key="'archive_' + titleSlug" v-on:[eventName]="closeLargeImg()" class="pb-5"> <!-- Need a unique key for the transition above to work on route change -->

        <g-link to="/archives/menu" v-b-tooltip.hover.bottom="{ variant: 'secondary' }" title="Back to Archives menu" class="backToArchives">
          <g-image src="~/assets/images/arrow-full-left.png"  />
          <p class="pt-2 mb-0">Back to<br />Archives</p>
        </g-link>

        <!-- <header id="header" :style="headerStyles"> -->
        <header id="header" class="px-3">
          <div class="headerWrapper">

            <!-- SLIDESHOWS -->
            <template v-if="node.headerSlideshowLeft.length > 0">
              <SlideshowImages 
                v-show="windowWidth >= 1200"
                :slides="node.headerSlideshowLeft" 
                :interval="4500" 
                borderRadius="15px" 
                ref="slideshowLeft" 
                id="slideshowLeft" 
                class="headerBox" 
              />

              <SlideshowImages 
                :slides="node.headerSlideshowCenter"  
                :interval="4500" 
                borderRadius="15px" 
                ref="slideshowCenter" 
                id="slideshowCenter"
                class="headerBox"
              >
                <div class="headerFilter" />
                <div class="headerOverlay">
                  <g-image 
                    v-if="node.titleImg1Line != null"
                    :src="node.titleImg1Line"
                    :alt="node.title + ' title image'" 
                    class="titleImg titleImg1Line" 
                  />
                  <span v-html="node.content" class="archive_headerText" :style="headerTextStyles" />
                </div>
              </SlideshowImages>

              <SlideshowImages 
                v-show="windowWidth >= 1200"
                :slides="node.headerSlideshowRight" 
                :interval="4500" 
                borderRadius="15px" 
                ref="slideshowRight" 
                id="slideshowRight" 
                class="headerBox" 
              />
            </template>

            <!-- STATIC HEADER IMAGES -->
            <template v-if="node.headerImgLeft !== ''">
              <div v-show="windowWidth >= 1200" class="headerBox">
                <img :src="node.headerImgLeft" />
              </div>

              <div class="headerBox">
                <div class="headerFilter" />
                <img :src="node.headerImgCentre" />
                <div class="headerOverlay">
                  <g-image 
                    v-if="node.titleImg2Lines != ''"
                    :src="node.titleImg2Lines"
                    :alt="node.title + ' title image'" 
                    class="titleImg" 
                  />
                  <span v-html="node.content" class="archive_headerText" :style="headerTextStyles" />
                </div>
              </div>

              <div v-show="windowWidth >= 1200" class="headerBox">
                <img :src="node.headerImgRight" />
              </div>
            </template>

          </div>
        </header>

        
        <div id="mainContent" class="px-3" :style="mainContentStyles">
          <div class="galleryWrapper">

            <!-- IMAGE GALLERY -->
            <template v-if="imageUrlsLowRes != null">
              <div 
                v-for="(img, iImg) in imageUrlsLowRes" 
                :key="'img'+iImg" 
                class="galleryBox"
                @click.prevent="onGalleryImgClick(iImg)"
              >
                <img
                  :src="img" 
                  :id="'galleryImage_' + iImg" 
                  class="galleryImage"
                  :class="zoomedImgIndex == iImg ? 'zeroOpacity' : 'fullOpacity'"
                >
              </div>
            </template>

            <!-- AUDIO GALLERY -->
            <template v-if="audioTracks != null">
              <div 
                v-for="(track, iTrack) in audioTracks" 
                :key="'track'+iTrack" 
                class="galleryBox audioBox"
                :style="'background: transparent url(' + track.thumbnailImg + ') no-repeat left top'"
                @click.prevent="onAudioTrackClick(iTrack)"
              >
                <div class="boxOverlay mb-5">
                  <transition name="fade">
                    <span class="thumbnailCaption hideOnHover">{{ track.caption }}</span>
                  </transition>
                  
                  <transition name="fade">
                    <g-image alt="Play symbol" src="~/assets/images/music_symbol_circle.png" class="playSymbol showOnHover" />
                  </transition>
                </div>

              </div>
            </template>
          </div>
        </div>
        
        <!-- HI-RES ZOOMED GALLERY IMAGE -->
        <img 
          v-if="zoomedImgIndex != null && zoomedImgIndex >= 0"
          :src="imageUrlsHiRes[zoomedImgIndex]"
          class="zoomedImg"
          :class="applyLargeImgStyles ? 'centerPos' : null"
          :style="zoomedImgStyles"
        />

        <ScrollToTop
          text="BACK TO THE TOP"
          :includeArrow="true"
        />
        
      </div>
    </transition>

  </Layout>
</template>


<page-query>
query ($id: ID!) {
  archive: archives(id: $id) {
    title
    titleImg1Line
    titleImg2Lines
    content
    headerImgLeft
    headerImgCentre
    headerImgRight
    headerSlideshowLeft {
      img
    }
    headerSlideshowCenter {
      img
    }
    headerSlideshowRight {
      img
    }
    imageGallery {
      numImages
      commonPathLoRes
      commonPathHiRes
    }
    audioGallery {
      url
      caption
      thumbnailImg
    }
  }
}
</page-query>


<script scoped>
import ScrollToTop from '../components/ScrollToTop.vue'
import SlideshowImages from '../components/SlideshowImages.vue'
const slugify = require('@sindresorhus/slugify')

const keyMap = {
  ESC: 27
};

export default {
  metaInfo() {
    return {
      title: this.title
    }
  },

  components: {
    ScrollToTop,
    'SlideshowImages': require('../components/SlideshowImages.vue').default,
  },

  data() {
    return {
      imageIndex: 0,
      showIntro: false,
      windowWidth: 0.0,
      zoomedImgIndex: null,
      imgCenterPos: {
        top: 0,
        left: 0
      },
      imgNewCenterPos: {
        top: 0,
        left: 0
      },
      applyLargeImgStyles: false,
      eventName: null,
      hiResImages: []
    }
  },

  computed: {
    title() {
      return this.$page.archive.title
    },
    titleSlug() {
      return slugify(this.title)
    },
    node() {
      console.log('this.node:')
      console.log(this.$page.archive)
      return this.$page.archive
    },
    headerTextStyles() {
      let css = {}
      css.textAlign = this.node.content.length < 80 ? 'center' : 'justify'
      return css
    },
    imageUrlsLowRes() {
      if (this.node.imageGallery == null)
        return null
      let urls = []
      for (let i = 1; i <= this.node.imageGallery.numImages; i++) {
        let url = this.node.imageGallery.commonPathLoRes + i + '.jpg'
        urls.push(url)
      }
      return urls
    },
    imageUrlsHiRes() {
      if (this.node.imageGallery == null)
        return null
      let urls = []
      for (let i = 1; i <= this.node.imageGallery.numImages; i++) {
        let url = this.node.imageGallery.commonPathHiRes + i + '.jpg'
        urls.push(url)
      }
      return urls
    },
    zoomedImgStyles() {
      return {
        '--startPosTop': this.imgCenterPos.top.toFixed(2) + 'px',
        '--startPosLeft': this.imgCenterPos.left.toFixed(2) + 'px'
      }
    },
    audioTracks() {
      return this.node.audioGallery
    },
    numItems() {
      let num = 0
      num += this.imageUrlsLowRes ? this.imageUrlsLowRes.length : 0
      num += this.audioTracks ? this.audioTracks.length : 0
      return num
    },
    mainContentStyles() {
      let css = {}
      if (this.numItems == 1) {
        css['--maxPerRow'] = 1
        css['--boxSize'] = '480px'
        css['--gridGap'] = '0px'
      } else {
        css['--maxPerRow'] = 5
        css['--boxSize'] = '350px'
        css['--gridGap'] = '30px'
      }
      return css
    }
  },

  mounted() {
    // to preload the hi-res images (ref: https://stackoverflow.com/q/3646036/13159696)
    if (this.node.imageGallery != null) {
      for (let i = 1; i <= this.node.imageGallery.numImages; i++) {
        const image = new Image();
        image.src = this.node.imageGallery.commonPathHiRes + i + '.jpg'
        this.hiResImages.push(image)
      }
    }

    this.windowWidth = window.innerWidth
    window.addEventListener('resize', () => {  
      this.windowWidth = window.innerWidth
    })
    window.addEventListener('orientationchange', () => {  
      this.windowWidth = window.innerWidth
    })

    if (this.node.headerSlideshowLeft.length > 0) {
      this.$refs.slideshowLeft.pause()
      this.$refs.slideshowCenter.pause()
      this.$refs.slideshowRight.pause()
      this.staggerSlideshowStarts()
    }

    this.bindEvents()
  },

  beforeDestroy() {
    this.unbindEvents()
  },

  methods: {
    bindEvents() {
      document.addEventListener('keydown', this.keyDownHandler, false);
      document.addEventListener('scroll', this.scrollHandler, false);
    },
    unbindEvents() {
      document.removeEventListener('keydown', this.keyDownHandler, false);
      document.removeEventListener('scroll', this.scrollHandler, false);
    },
    delay(ms) {
      return new Promise(res => setTimeout(res, ms))
    },
    async staggerSlideshowStarts() {
      this.$refs.slideshowLeft.start()

      await this.delay(1500)
      this.$refs.slideshowRight.start()

      await this.delay(1500)
      this.$refs.slideshowCenter.start()
    },
    async onGalleryImgClick(iImg) {
      if (this.zoomedImgIndex !== null) {
        this.updateNewImgPosition(iImg)
        return
      }

      this.updateImgPosition(iImg)

      await this.delay(300)

      this.$nextTick(() => {
        this.zoomedImgIndex = iImg
      })

      this.$nextTick(() => {
        this.applyLargeImgStyles = true
      })
      
      this.eventName = 'click'
    },
    updateImgPosition(iImg) {
      console.log('in updateImgPosition, iImg: ' + iImg)
      const imgEl = document.getElementById('galleryImage_' + iImg)
      const elemRect = imgEl.getBoundingClientRect()
      this.imgCenterPos.top = elemRect.top + (elemRect.height / 2)
      this.imgCenterPos.left = elemRect.left + (elemRect.width / 2)
    },
    updateNewImgPosition(iImg) {
      const imgEl = document.getElementById('galleryImage_' + iImg)
      const elemRect = imgEl.getBoundingClientRect()
      this.imgNewCenterPos.top = elemRect.top + (elemRect.height / 2)
      this.imgNewCenterPos.left = elemRect.left + (elemRect.width / 2)
    },
    closeLargeImg() {
      if (this.applyLargeImgStyles) {
        this.applyLargeImgStyles = false
        this.eventName = null
        this.resetZoomedImgIndex()
      }
    },
    async resetZoomedImgIndex() {
      await this.delay(400);
      this.zoomedImgIndex = null      
      this.imgCenterPos.top = this.imgNewCenterPos.top
      this.imgCenterPos.left = this.imgNewCenterPos.left
      this.imgNewCenterPos.top = 0
      this.imgNewCenterPos.left = 0
    },
    keyDownHandler(event) {
      switch (event.keyCode) {
        case keyMap.ESC:
          this.closeLargeImg()
          break
        default:
          break
      }
    },
    scrollHandler() {      
      if (this.zoomedImgIndex !== null) {
        this.updateImgPosition(this.zoomedImgIndex)
        this.$nextTick(() => {
          this.closeLargeImg()
        })
      }
    }
  }
}
</script>



<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');

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

.layout {
  background-color: #222222;
  padding: 0;
  overflow: hidden; /* added for pseudo-element */
  position: relative; /* added for pseudo-element */
  min-height: 100vh;
}

.backToArchives {
  position: fixed;
  top: 50px;
  right: 60px;
  z-index: 100;

  font-family: NeueHaasGroteskText Pro65;
  font-size: 20px;
  font-weight: 400;
  color: #FFFFFF;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.65);
}

#header {
  position: relative;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
  max-width: 2434px;
  margin: 0 auto;
}
#header:after  {
  content : "";
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--headerBgImg) no-repeat center;
  background-size: cover;
  opacity : var(--bgOpacity);
  width: 100%;
  height: 100%;
  z-index: -1;
}

.archive_headerText {
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  // text-shadow: 1px 1px 4px rgba(0,0,0,0.29);
  text-shadow: 2px 2px 5px rgba(0,0,0,0.65);
  color: #FFFFFF;
  letter-spacing: 1px;
  line-height: 1.625rem;
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0px;
  padding: 0px;
  /* See styles.css for further styles */
}

// #headerTextDevice {
//   color:#ECECEC;
//   font-size: 0.925rem;
//   margin: 20px;
// }

// .arrow {
//   margin-left: 5px;
//   margin-right: -3px;
// }
// .arrow > line {
//   stroke: rgb(203,203,201);
//   stroke-width: 2px;
// }


.headerWrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  justify-content: center;
}
.headerBox {
  width: 100%;
  max-width: 786px;
  // height: 617px;
  position: relative;
  place-self: center;
}
.headerBox img {
  border-radius: 15px;
}
.headerFilter {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 40;
  background-color: #3E2E20;
  opacity: 0.29;
}
.headerOverlay {
  position: absolute;
  top: 100px;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto auto;
  // max-width: 85%;
  max-width: 100%;
  margin: auto 24px;
  height: fit-content;
  z-index: 50;
}

.titleImg {
  position: relative;
  // width: 100%;
  // max-width: 100%;
  max-width: 85%;
  height: auto;
  margin: auto;
  padding-bottom: 8px;
}
.titleImg1Line {
  display: inline;
}
.titleImg2Lines {
  display: none;
}

#mainContent {
  max-width: calc(var(--maxPerRow) * var(--boxSize) + (var(--maxPerRow - 1) * var(--gridGap)) + 2 * 16px);
  width: 100%;
  margin: 0 auto;
}

.galleryWrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--boxSize), 1fr));
  grid-auto-flow: row;
  grid-gap: var(--gridGap);
  align-items: center;
  justify-content: center;
}
.galleryBox {
  width: 100%;
  max-width: var(--boxSize);
  height: var(--boxSize);
  position: relative;
  place-self: center;
}

.galleryBox.audioBox {
  cursor: pointer;
  opacity: 0.84;
  transition: opacity 0.2s ease;
}
.galleryBox.audioBox::before {
  content: "";
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  box-shadow: inset 0px 0px 150px rgba(0,0,0,0.5), inset 0px 0px 150px rgba(0,0,0,0.5);
  pointer-events: none;
  transition: box-shadow 0.2s ease;
}
.galleryBox.audioBox:hover {
  opacity: 1;
}
.galleryBox.audioBox:hover::before {
  box-shadow: none;
}
.audioBox .playSymbol {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.galleryImage {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin: auto;
  cursor: zoom-in;
}

.thumbnailCaption {
  color: white;
  font-family: 'Open Sans Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 300;
  font-size: 53px;
  line-height: 53px;
  letter-spacing: 9px;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.32);
  text-transform: uppercase;
  transition: inherit;
}

.fullOpacity {
  opacity: 1;
}
.zeroOpacity {
  opacity: 0;
}

.boxOverlay {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.hideOnHover {
  opacity: 1;
  transition: all 0.5s ease 0s;
}
.audioBox:hover .hideOnHover {
  opacity: 0;
}
.showOnHover {
  opacity: 0;
  transition: all 0.5s ease 0s;
}
.audioBox:hover .showOnHover {
  opacity: 1;
}

.zoomedImg {
  position: fixed;
  margin: auto;
  z-index: 100;
  cursor: zoom-out;
  
  max-width: 350px;
  height: 350px;
  object-fit: contain;
  top: var(--startPosTop);
  left: var(--startPosLeft);
  transform: translate3d(-50%, -50%, 0);

  transition: all 0.3s linear 0s;
}
.zoomedImg.centerPos {
  max-width: 90vw;
  max-height: 90vh;
  height: 90vh;
  width: auto;
  top: 50%;
  left: 50%;
}


/* To fix poor scroll speed using "background-size: cover" and "background-attachment: fixed"
Ref: https://www.fourkitchens.com/blog/article/fix-scrolling-performance-css-will-change-property/ */
.layout::before {
  content: ' ';
  position: fixed;  /* instead of background-attachment */
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
  background-size: cover;
  will-change: transform; /* creates a new paint layer */
  z-index: -1;
}



/* Transition styles on router-view for fading the page */
.page-enter-active {
  transition-duration: 5.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
.page-leave-active {
  transition-duration: 1.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}




/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  // .titleImg1Line {
  //   display: none;
  // }
  // .titleImg2Lines {
  //   display: inline;
  //   margin: 10px 0px;
  //   padding: 0px 60px;
  // }
  .galleryWrapper {
    grid-gap: 16px;
  }
  .archive_headerText {
    line-height: 1.4375rem;
    font-size: 1rem;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {  
  // .titleImg {
  //   max-width: 100%;
  //   padding: 15px 40px 10px 70px;
  //   margin: 0px;
  // }
  .galleryWrapper {
    grid-gap: 16px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  // .titleImg1Line {
  //   display: none;
  // }
  // .titleImg2Lines {
  //   display: inline;
  //   margin: 10px 0px;
  //   padding: 0px 80px;
  // }
  .galleryWrapper {
    grid-gap: 24px;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) { 
  .titleImg {
    // padding: 0px 100px;
  }
  .galleryWrapper {
    grid-gap: 24px;
  }
}

/* Special - Larger devices (desktops, 1200px and up) */
@media only screen and (min-width: 1200px) and (max-width: 1499.98px) {
  .archive_headerText, .titleImg {
    // padding: 0px 120px;
  }
}

/* Special - Larger devices (desktops, 1200px and up) */
@media only screen and (max-width: 360px) {
  .galleryWrapper {
    // grid-template-columns: repeat(1fr);
    grid-template-rows: repeat(1fr);
    grid-gap: 16px;
  }
  .galleryBox {
    max-height: calc(350px - 32px);
  }
}

/* Special - Larger devices (desktops, 1200px and up) */
@media only screen and (max-width: 1199.98px) {
  // #slideshowLeft, #slideshowRight {
  // .headerBox:first-child, .headerBox:last-child {
  //   display: none;
  // }
  .headerWrapper {
    grid-template-columns: 1fr;
    // grid-gap: 30px;
  }
}

</style>
