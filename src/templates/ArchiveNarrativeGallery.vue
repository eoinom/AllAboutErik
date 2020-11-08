<template>
  <Layout>
    <div v-on:[eventName]="closeLargeImg()" class="pb-5">

      <g-link to="/archives/menu" v-b-tooltip.hover.bottom="{ variant: 'secondary' }" title="Back to Archives menu" class="backToArchives">
        <g-image alt="Back to Archives" src="~/assets/images/back-to-archives-single-line.png" class="backToArchivesImg pt-0 pt-md-2" />
        <g-image alt="Back to Archives" src="~/assets/images/back-to-archives-single-line-yellow.png" class="backToArchivesImg-hover pt-0 pt-md-2" />
      </g-link>

      <!-- STATIC HEADER IMAGES -->
      <!-- <header id="header" class="px-3">          
        <div v-if="node.headerImages" class="headerWrapper">
          <div 
            v-for="(headerImg, iImg) in node.headerImages"
            v-show="showHeaderTile(iImg)"
            :key="iImg"
            class="headerBox"
          >
            <div v-if="headerImg.applyFilter == true" class="headerFilter" />

            <img :src="headerImg.img" />

            <div class="headerOverlay" :style="overlayStyles">
              <g-image v-if="iImg == 1" :src="titleImg" :alt="node.title + ' title image'" class="titleImg mt-4 mt-sm-0" />
              <p v-if="iImg == headerGalleryTextTileIndex" class="headerText mt-n1 mt-sm-0">SCROLL</p>
              <p v-if="iImg == headerGalleryTextTileIndex" class="headerText">TO SEE THE GALLERY</p>
            </div>

            <g-link 
              v-if="iImg == headerTextTileIndex" 
              :to="`/archives/${titleSlug}`" 
              v-b-tooltip.hover.bottom="{ variant: 'secondary' }" 
              title="Click to read my recollections" 
              class="headerOverlay link pt-3"
            >
              <p class="headerText mt-n1 mt-sm-0">CLICK</p>
              <p class="headerText">TO READ MY RECOLLECTIONS</p>
            </g-link>
          </div>
        </div>
      </header> -->
      <!-- HEADER -->
      <header id="header">

        <!-- STATIC HEADER IMAGES -->
        <div v-if="!isPortrait && node.headerImages" class="headerWrapper">
          <div 
            v-for="(headerImg, iImg) in node.headerImages"
            :key="iImg"
            class="headerBox"
          >
            <div v-if="headerImg.applyFilter == true" class="headerFilter" />

            <img :src="headerImg.img" />

            <!-- <div v-if="iImg == 1" class="headerOverlay" :style="overlayStyles">
              <g-image :src="titleImg" :alt="node.title + ' title image'" class="titleImg mt-4 mt-sm-0" />
              <p class="headerText mt-n1 mt-sm-0">SCROLL</p>
              <p class="headerText">TO VIEW THE GALLERY</p>
            </div> -->

            <div v-if="iImg == 1" class="headerOverlay headerOverlayBtm pb-4" :style="overlayStylesBtm">
              <g-image :src="titleImg" :alt="node.title + ' title image'" class="titleImg mt-4 mt-sm-0" />
              <p class="headerText mt-n1 mt-sm-0">SCROLL</p>
              <p class="headerText">TO VIEW THE GALLERY</p>
            </div>

            <g-link 
              v-if="iImg == 4" 
              :to="`/archives/${titleSlug}`" 
              v-b-tooltip.hover.bottom="{ variant: 'secondary' }" 
              title="Click to see the gallery" 
              class="headerOverlay link pt-3"
            >
              <p class="headerText mt-n1 mt-sm-0">CLICK</p>
              <p class="headerText">TO READ MY</p>
              <p class="headerText">RECOLLECTIONS</p>
            </g-link>
          </div>
        </div>

        <!-- PORTRAIT SLIDESHOW -->
        <div v-else-if="isPortrait && node.headerMobileImages" class="headerWrapperPortrait">
          <SlideshowImages 
            :slides="node.headerMobileImages" 
            :interval="4500" 
            borderRadius="15px" 
            ref="portraitSlideshow" 
            class="headerBoxPortrait" 
          >
            <div class="headerOverlay headerOverlayBtm" :style="overlayStylesBtm" style="bottom:0px">
              <g-image :src="titleImg" :alt="node.title + ' title image'" class="titleImg" />
              <p class="headerText">SCROLL</p>
              <p class="headerText">TO VIEW THE GALLERY</p>

              <g-link 
                :to="`/archives/${titleSlug}`" 
                v-b-tooltip.hover.bottom="{ variant: 'secondary' }" 
                title="Click to see the gallery" 
                class="link"
              >
                <p class="headerText mt-n1 mt-sm-0">CLICK</p>
                <p class="headerText">TO READ MY</p>
                <p class="headerText">RECOLLECTIONS</p>
              </g-link>
            </div>
          </SlideshowImages>
        </div>
      </header>


      <div id="mainContent" class="px-3 pt-5 mt-4" :style="mainContentStyles">
        <!-- IMAGE GALLERY SECTIONS -->
        <div 
          v-for="(section, iSect) in sections" 
          :key="iSect"
          class="pb-5 mb-5"
        >
          <h2 class="sectionHeading pb-3">{{ section.heading }}</h2>
          
          <div class="galleryWrapper">
            <div 
              v-for="(img, iImg) in section.images" 
              :key="'img'+iImg" 
              class="galleryBox"
              @click.prevent="onGalleryImgClick(`${iSect}_${iImg}`)"
            >
              <img 
                :src="img"
                :id="`galleryImage_${iSect}_${iImg}`"
                class="galleryImage" 
                :class="{ 'centerPos': applyLargeImgStyles && zoomedImgIndex == `${iSect}_${iImg}` }"
                :style="zoomedImgStyles"
              />
            </div>
          </div>
          
        </div>
      </div>

      <ScrollToTop
        text="BACK TO THE TOP"
        :includeArrow="true"
      />
      
    </div>

  </Layout>
</template>


<page-query>
query ($id: ID!) {
  archive: archivesNarrativeGallery(id: $id) {
    title
    titleImg {
      singleLine
      topOffset
      maxWidth
    }
    headerImages {
      img
      applyFilter
    }
    headerMobileImages {
      img
      applyFilter
    }
    imageGallery {
      commonPath
      numImages
    }
    imageGallerySections {
      heading
      imageStartNo
      numImages
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
      zoomedImgIndex: null,
      imgCenterPos: {
        top: 0,
        left: 0
      },
      applyLargeImgStyles: false,
      eventName: null,      
      portraitTablet: {
        maxAspect: 0.85
      },
      windowWidth: 0.0,
      windowHeight: 0.0
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
      return this.$page.archive
    },
    titleImg() {
      return this.node.titleImg.singleLine != '' ? this.node.titleImg.singleLine : this.node.titleImg.doubleLine
    },
    aspectRatio() {
      return this.windowWidth / this.windowHeight
    },
    isPortrait() {
      return this.aspectRatio < this.portraitTablet.maxAspect
    },
    overlayStyles() {
      let css = {}
      if (this.windowWidth < 576)
        var topOffset = Math.min(60, this.node.titleImg.topOffset)
      else if (this.windowWidth < 768)
        topOffset = Math.min(60, this.node.titleImg.topOffset)
      else if (this.windowWidth < 992)
        topOffset = Math.min(65, this.node.titleImg.topOffset)
      else
        topOffset = this.node.titleImg.topOffset
      css['--titleTopOffset'] = topOffset + '%'
      css['--titleMaxWidth'] = this.node.titleImg.maxWidth + '%'
      return css
    },
    overlayStylesBtm() {
      let css = {}
      css['--titleMaxWidth'] = this.node.titleImg.maxWidth + '%'
      return css
    },
    galleryImgUrls() {
      if (this.node.imageGallery == null)
        return null
      let urls = []
      for (let i = 1; i <= this.node.imageGallery.numImages; i++) {
        let url = this.node.imageGallery.commonPath + i + '.jpg'
        urls.push(url)
      }
      return urls
    },
    sections() {
      let sections = this.node.imageGallerySections
      sections.forEach(s => {
        s.images = this.galleryImgUrls.slice(s.imageStartNo - 1, s.imageStartNo + s.numImages - 1)
      });
      return sections
    },
    zoomedImgStyles() {
      let absCenterTop = this.windowHeight / 2 - this.imgCenterPos.top + 175
      let absCenterLeft = this.windowWidth / 2 - this.imgCenterPos.left + 175
      return {
        '--absCenterTop': absCenterTop.toFixed(2) + 'px',
        '--absCenterLeft': absCenterLeft.toFixed(2) + 'px'
      }
    },
    numItems() {
      return this.galleryImgUrls ? this.galleryImgUrls.length : 0
    },
    mainContentStyles() {
      let css = {}
      if (this.numItems <= 8) {
        css['--maxPerRow'] = 1
        css['--boxSize'] = '480px'
        css['--gridGap'] = '30px'
      } else {
        css['--maxPerRow'] = 5
        css['--boxSize'] = '350px'
        css['--gridGap'] = '30px'
      }
      return css
    },
    headerTextTileIndex() {
      if (this.windowWidth < 576 && this.aspectRatio < 0.97) {
        return 3
      // } else if (this.windowWidth >= 1200 && this.aspectRatio > 1.5 && this.aspectRatio < 2.15) {
      //   return 4
      } else if (this.windowWidth < 1200) {
        return 3
      } else {
        return 4
      }
    },
    headerGalleryTextTileIndex() {
      return 1
    }
  },

  mounted() {
    this.updateWindowDims()
    this.bindEvents()
  },

  beforeDestroy() {
    this.unbindEvents()
  },

  methods: {
    bindEvents() {
      window.addEventListener('resize', this.updateWindowDims, false)
      window.addEventListener('orientationchange', this.updateWindowDims, false)
      document.addEventListener('keydown', this.keyDownHandler, false)
      document.addEventListener('scroll', this.scrollHandler, false)
    },
    unbindEvents() {
      window.removeEventListener('resize', this.updateWindowDims, false)
      window.removeEventListener('orientationchange', this.updateWindowDims, false)
      document.removeEventListener('keydown', this.keyDownHandler, false)
      document.removeEventListener('scroll', this.scrollHandler, false)
    },
    showHeaderTile(index) {
      if (this.windowWidth >= 1200 && this.aspectRatio < 2.15) {
        return index <= 5                               // show all six tiles
      } else if (this.windowWidth >= 1200 && this.aspectRatio >= 2.15) {
        return index <= 2
      } else if (this.aspectRatio < 0.65) {
        return index == 1 || index == 3 || index == 5   // show three tiles
      } else if (this.aspectRatio < 0.97) {
        return index == 1 || index == 3                 // show two tiles
      } else {
        return index == 1                               // show one tile
      }
    },
    onGalleryImgClick(img_Id) {
      if (this.zoomedImgIndex == img_Id || this.windowWidth < 768) {
        return
      }
      
      const imgEl = document.getElementById('galleryImage_' + img_Id)
      const elemRect = imgEl.getBoundingClientRect()
      this.imgCenterPos.top = elemRect.top + (elemRect.height / 2)
      this.imgCenterPos.left = elemRect.left + (elemRect.width / 2)

      this.$nextTick(() => {
        this.zoomedImgIndex = img_Id
        this.applyLargeImgStyles = true
      })
      
      this.eventName = 'click'
    },
    closeLargeImg() {
      if (this.applyLargeImgStyles) {
        this.applyLargeImgStyles = false        

        this.$nextTick(() => {
          this.eventName = null
          this.zoomedImgIndex = null
        })
      }
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
        this.closeLargeImg()
      }
    },
    updateWindowDims() {      
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    }
  }
}
</script>



<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lora:400,400i,700&display=swap');

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
  padding: 0 12px;
  overflow: hidden; /* added for pseudo-element */
  position: relative; /* added for pseudo-element */
  min-height: 100vh;
  width: 100%;
}

.backToArchives {
  position: fixed;
  top: 50px;
  right: 60px;
  z-index: 100;
}
.backToArchivesImg,
.backToArchivesImg-hover {
  width: 50vw;
  max-width: 260px;
  height: auto;
}
.backToArchivesImg {
  display: inline-block;
}
.backToArchivesImg-hover {
  display: none;
}
@media (hover) {
  .backToArchives:hover .backToArchivesImg-hover {
    display: inline-block;
  }
  .backToArchives:hover .backToArchivesImg {
    display: none;
  }
}

#header {
  position: relative;
  text-align: center;
  // padding-top: 12.5px;
  // padding-bottom: 12.5px;
  width: 100%;
  margin: 0 auto;
  // padding: 0 80px !important;
  padding: 130px 50px 0px 50px !important;
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

.headerWrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  justify-content: center;

  height: 100%;
  max-width: 2030px;
  margin: 0 auto;
}
.headerWrapperPortrait {
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
  align-content: center;
}
.headerBox {
  width: 100%;
  max-width: 821px;
  position: relative;
  place-self: center;
}
.headerBoxPortrait {
  width: 100%;
  // max-width: 821px;
  position: relative;
  place-self: center;

  height: 100%;
  // max-width: 660px;
}
.headerBox > img {
  border-radius: 15px;
  width: 100%;
  // height: auto;

  height: 100%;
  object-fit: cover;
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
  top: var(--titleTopOffset);
  right: 0;
  left: 0;
  max-width: 100%;
  height: calc(100% - var(--titleTopOffset));
  padding-bottom: 16px;
  z-index: 50;
}
.headerOverlay * {
  padding-right: 32px;
  padding-left: 32px;
}
.headerOverlayBtm {
  bottom: 0;
}

.titleImg {
  position: relative;
  max-width: var(--titleMaxWidth);
  height: auto;
  margin: auto;
  padding: 0 0 16px 0;
}

.headerText {
  color: #FFF;
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
  font-weight: 400;

  --font-size: 1.25rem;
  font-size: var(--font-size);
  line-height: calc(1.35 * var(--font-size));
  letter-spacing: calc(0.29 * var(--font-size));
  
  text-align: center;
  text-transform: uppercase;
  margin: 0px;
  padding: 0px;
  cursor: context-menu;
}
.link .headerText {
  cursor: pointer;
}
.headerOverlay.link:hover .headerText {
  color: #EECF49;
}

#mainContent {
  max-width: calc(var(--maxPerRow) * var(--boxSize) + (var(--maxPerRow - 1) * var(--gridGap)) + 2 * 16px);
  // width: 100%;
  width: 70%;
  margin: 0 auto;
}

.galleryWrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--boxSize), 1fr));
  // grid-template-columns: repeat(auto-fit, var(--boxSize));
  grid-auto-flow: row;
  grid-gap: var(--gridGap);
  align-items: center;
  // justify-content: center;
  justify-content: left;
}
.galleryBox {
  background-color: black;
  width: 100%;
  max-width: var(--boxSize);
  height: var(--boxSize);
  position: relative;
  // place-self: center;
  place-self: left;
  cursor: pointer;
}

.sectionHeading {
  color: white;
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 36px;
  letter-spacing: 3px;
  line-height: 42px;
  text-align: left;
  text-transform: uppercase;
}

.galleryImage {
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  object-fit: contain;
  margin: auto;
  top: 175px;
  left: 175px;
  width: 350px;
  height: 350px;
  z-index: 10;
  cursor: zoom-in;
  transition: all 0.3s linear;
}
.centerPos {
  top: var(--absCenterTop);
  left: var(--absCenterLeft);
  width: 90vw;
  height: 90vh;
  z-index: 100;
  cursor: zoom-out;
  transition: all 0.3s linear;
}

// .hideOnHover {
//   opacity: 1;
//   transition: all 0.5s ease 0s;
// }
// .galleryBox:hover .hideOnHover {
//   opacity: 0;
// }
// .showOnHover {
//   opacity: 0;
//   transition: all 0.5s ease 0s;
// }
// .galleryBox:hover .showOnHover {
//   opacity: 1;
// }



/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  // .titleImg {
  //   max-width: 85%;
  //   padding: 0 32px 8px 32px;
  // }
  // .headerOverlay {
  //   padding-bottom: 0px;
  // }
  // .backToArchives {
  //   top: 20px;
  //   right: 20px;
  // }
  // .backToArchivesImg {
  //   max-width: 100px;
  // }
  #mainContent {
    width: 100%;
  }
  .galleryWrapper {
    grid-gap: 16px;
    justify-content: center;
  }
  #header {
    // display: flex;
    // align-items: center;
    // height: 100vh;
    // transform: translate3d(0, 0, 0);    
    padding: 110px 16px 0px 16px !important;
  }
  // .headerWrapper {
  //   grid-gap: 15px;
  // }
  // .headerText {
  //   font-size: 1.25rem;
  //   line-height: 1.8145rem;
  //   letter-spacing: 0.3629rem;
  // }
  // .headerText:nth-of-type(2) {
  //   font-size: 0.9274rem;
  //   line-height: 1.3306rem;
  // }

  .backToArchives {
    // top: 48px;
    top: 30px;
    right: 20px;
  }
  // #header {
  //   display: flex;
  //   align-items: center;
  //   height: 100vh;
  //   transform: translate3d(0, 0, 0);
  //   padding: 90px 4px 4px 4px !important;
  // }
  .headerWrapper {
    grid-gap: 15px;
  }
  .headerOverlay {
    padding-bottom: 0px;
  }
  .titleImg {
    max-width: 100%;
    padding: 0 32px 8px 32px;
  }
  .headerText {
    --font-size: 1.1rem;
  }
  // .galleryBox {
  //   height: 40vw;
  //   width: 40vw;
  // }
  .thumbnailCaption {
    --fontSize: 4.5vw;
  }
  .sectionHeading {
    font-size: 24px;
    letter-spacing: 3px;
    line-height: 28px;
  }
}
@media only screen and (max-width: 375px) {
  // #header {
  //   padding: 0 59px !important;
  // }
  .headerText {
    --font-size: 1rem;
  }
}
// @media only screen and (max-width: 320px) {
//   #header {
//     padding: 0 54px !important;
//   }
//   .headerText:nth-of-type(2) {
//     font-size: 0.835rem;
//     line-height: 1.197rem;
//   }
// }

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {  
  .backToArchives {
    top: 27px;
    right: 27px;
  }
  #header {
    padding: 130px 30px 0px 30px !important;
  }
  // .backToArchivesImg {
  //   max-width: 110px;
  // }
  .galleryWrapper {
    grid-gap: 16px;
    justify-content: center;
  }
  .sectionHeading {
    font-size: 28px;
    letter-spacing: 3px;
    line-height: 37px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .galleryWrapper {
    grid-gap: 24px;
    justify-content: center;
  }
  .galleryBox {
    place-self: center;
  }
  .backToArchives {
    top: 33px;
    right: 33px;
  }
  #header {
    padding: 130px 35px 0px 35px !important;
  }
  // .backToArchivesImg {
  //   max-width: 120px;
  // }
  .sectionHeading {
    font-size: 32px;
    letter-spacing: 3px;
    line-height: 32.67px;
  }
}

/* iPad only */
// @media only screen and (min-width: 767.98px) and (max-width: 768.02px) {
//   #header {
//     padding: 130px 40px 0px 40px !important;
//   }
// }

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) { 
  .galleryWrapper {
    // grid-template-columns: repeat(auto-fit, minmax(var(--boxSize), 1fr));
    justify-content: center;
    grid-gap: 24px;
  }
  .galleryBox {
    place-self: center;
  }
  .backToArchives {
    top: 37px;
    right: 37px;
  }
  #header {
    padding: 130px 35px 0px 35px !important;
  }
  // .backToArchivesImg {
  //   max-width: 130px;
  // }
  .sectionHeading {
    font-size: 34px;
    letter-spacing: 3px;
    line-height: 40px;
  }
}

/* Large devices (desktops, 1200px and up) */
@media only screen and (min-width: 1200px) { 
  .backToArchivesImg,
  .backToArchivesImg-hover {
    max-width: 300px;
  }
}

/* Special */
@media only screen and (max-width: 360px) {
  .galleryWrapper {
    grid-template-rows: repeat(1fr);
    grid-gap: 16px;
  }
  .galleryBox {
    max-height: calc(350px - 32px);
  }
  .galleryImage {
    height: calc(350px - 32px);
    top: calc(175px - 16px);
  }
}

/* Special */
// @media only screen and (max-width: 1199.98px) {
//   .headerWrapper {
//     grid-template-columns: 1fr;
//   }
//   .headerText {
//     font-size: 2.841613vw;
//     line-height: 4.124924vw;
//     letter-spacing: 0.824985vw;
//   }
//   .headerText:nth-of-type(2) {
//     font-size: 2.108294vw;
//     line-height: 3.024945vw;
//   }
// }

</style>
