<template>
  <Layout>
    <transition name="page" mode="out-in">
      <div :key="'archive_' + titleSlug"> <!-- Need a unique key for the transition above to work on route change -->

      <g-link to="/archives/menu" v-b-tooltip.hover.bottom="{ variant: 'secondary' }" title="Back to Archives menu" class="backToArchives">
        <g-image src="~/assets/images/arrow-full-left.png"  />
        <p class="pt-2 mb-0">Back to<br />Archives</p>
      </g-link>

        <!-- <header id="header" :style="headerStyles"> -->
        <header id="header" class="px-3">
          <div class="headerWrapper">
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
              <div class="slideshowOverlay">
                <g-image 
                  v-if="node.titleImg1Line != null"
                  :src="node.titleImg1Line"
                  :alt="node.title + ' title image'" 
                  class="titleImg titleImg1Line" 
                />
                <span v-html="node.content" class="archive_headerText" />
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
          </div>
        </header>


        <div id="mainContent" class="px-3">
          <div class="galleryWrapper">
            <div 
              v-for="(img, iImg) in imageUrlsLowRes" 
              :key="'img'+iImg" 
              class="galleryBox"
              @click="onGalleryImgClick(iImg)"
            >
              <img :src="img" :id="'galleryImage_' + iImg" class="galleryImage">
            </div>
          </div>
        </div>

        <!-- <g-image 
          v-if="zoomedImgIndex"
          :src="imageUrlsHiRes[zoomedImgIndex]"
          class="zoomedImg"
          :style="zoomedImgStyles"
        /> -->
        <img 
          v-if="zoomedImgIndex"
          :src="imageUrlsHiRes[zoomedImgIndex]"
          class="zoomedImg"
          :style="zoomedImgStyles"
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
    content
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
  }
}
</page-query>


<script scoped>
import SlideshowImages from '../components/SlideshowImages.vue'
const slugify = require('@sindresorhus/slugify')

export default {
  metaInfo() {
    return {
      title: this.title
    }
  },

  components: {
    'SlideshowImages': require('../components/SlideshowImages.vue').default,
  },

  data() {
    return {
      imageIndex: 0,
      showIntro: false,
      windowWidth: 0.0,
      zoomedImgIndex: null,
      imgPosition: {
        top: null,
        right: null,
        left: null
      },
      applyLargeImgStyles: false
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
    imageUrlsLowRes() {
      let urls = []
      for (let i = 1; i <= this.node.imageGallery.numImages; i++) {
        let url = this.node.imageGallery.commonPathLoRes + i + '.jpg'
        urls.push(url)
      }
      return urls
    },
    imageUrlsHiRes() {
      let urls = []
      for (let i = 1; i <= this.node.imageGallery.numImages; i++) {
        let url = this.node.imageGallery.commonPathHiRes + i + '.jpg'
        urls.push(url)
      }
      return urls
    },
    zoomedImgStyles() {
      let css = {}
      css.top = this.imgPosition.top ? this.imgPosition.top.toFixed(2) + 'px' : ''
      // css.right = this.imgPosition.right ? this.imgPosition.right.toFixed(2) + 'px' : ''
      css.left = this.imgPosition.left ? this.imgPosition.left.toFixed(2) + 'px' : ''

      if (this.applyLargeImgStyles) {
        css.maxWidth = '90%'
        css.height = '90vh'
        css.top = '50%'
        css.left = '50%'
        css.transform = 'translate3d(-50%, -50%, 0)'
      }

      return css
    }
    // titleImg1Line() {
    //   return this.$page.archive.titleImg1Line
    // },
    // titleImg2Lines() {
    //   return this.$page.archive.titleImg2Lines
    // },
    // headerBgImg() {
    //   return this.$page.archive.headerBgImg
    // },
    // headerBgImgOpacity() {
    //   return this.$page.archive.hasOwnProperty('backgroundImgOpacity') ? this.$page.archive.backgroundImgOpacity : 0.5
    // },  
    // headerStyles() {
    //   return {
    //     '--headerBgImg': 'url(' + this.headerBgImg + ')',
    //     '--bgOpacity': this.headerBgImgOpacity / 100
    //   }
    // },
    // images() {
    //   return this.$page.archive.images
    // },
    // archives() {
    //   return this.$static.Archives.edges[0].node.archives
    // },    
    // archive_names() {
    //   return this.archives.map(x => x.title);
    // },
    // archiveIndex() {
    //   return this.archive_names.indexOf(this.title)
    // },
    // prev_archive() {
    //   const i = this.archiveIndex
    //   if (i === 0)
    //     var prev_i = this.archive_names.length - 1
    //   else
    //     prev_i = i - 1
    //   let archive = {...this.archives[prev_i]}
    //   archive.link = slugify(archive.title)
    //   return archive
    // },
    // next_archive() {
    //   const i = this.archiveIndex     
    //   if (i === this.archive_names.length - 1)
    //     var next_i = 0
    //   else
    //     next_i = i + 1
    //   let archive = {...this.archives[next_i]}
    //   archive.link = slugify(archive.title)
    //   return archive
    // }
  },

  mounted() {
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', () => {  
      this.windowWidth = window.innerWidth
    })
    window.addEventListener('orientationchange', () => {  
      this.windowWidth = window.innerWidth
    })

    this.$refs.slideshowLeft.pause()
    this.$refs.slideshowCenter.pause()
    this.$refs.slideshowRight.pause()
    this.staggerSlideshowStarts()
  },

  methods: {
    delay(ms) {
      return new Promise(res => setTimeout(res, ms))
    },
    async staggerSlideshowStarts() {
      this.$refs.slideshowLeft.start()

      await this.delay(1500);
      this.$refs.slideshowRight.start()

      await this.delay(1500);
      this.$refs.slideshowCenter.start()
    },
    onGalleryImgClick(iImg) {
      let imgElement = document.getElementById('galleryImage_' + iImg)
      this.updateImgPosition(imgElement)
      this.zoomedImgIndex = iImg

      this.applyLargeImgStyles = true
    },
    updateImgPosition(el) {
      let elemRect = el.getBoundingClientRect()
      this.imgPosition.top = elemRect.top
      this.imgPosition.right = elemRect.right
      this.imgPosition.left = elemRect.left
    },
    resetImgPosition(el) {
      this.imgPosition.top = null
      this.imgPosition.right = null
      this.imgPosition.left = null
    }
  }
}
</script>



<style scoped lang="scss">
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
  padding: 0;
  overflow: hidden; /* added for pseudo-element */
  position: relative; /* added for pseudo-element */
}

.backToArchives {
  position: fixed;
  top: 50px;
  right: 60px;
  z-index: 5;

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
  text-shadow: 1px 1px 4px rgba(0,0,0,0.29);
  color: #FFFFFF;
  text-align: center;
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

.slideshowCol {
  position: relative;
  max-height:1224px; 
  width:auto;
  text-align: center;
}



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

.slideshowOverlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto auto;
  max-width: 85%;
  height: fit-content;
  z-index: 50;
}

.titleImg {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: auto;
}
.titleImg1Line {
  display: inline;
}
.titleImg2Lines {
  display: none;
}

#mainContent {
  width: 100%;
  max-width: calc(5 * 350px + 4 * 30px + 2 * 16px);
  margin: 0 auto;
}

.galleryWrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-auto-flow: row;
  grid-gap: 30px;
  align-items: center;
  justify-content: center;
}
.galleryBox {
  width: 100%;
  max-width: 350px;
  height: 350px;
  position: relative;
  place-self: center;
}
.galleryImage {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
}

.zoomedImg {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  // width: 350px;
  height: 350px;
  // max-width: 100%;
  max-height: 100%;
  max-width: 350px;
  margin: 0 auto;
  z-index: 100;
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
