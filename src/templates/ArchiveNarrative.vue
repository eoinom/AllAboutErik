<template>
<!-- <ClientOnly> -->
  <Layout>
    <!-- <div v-on:[eventName]="closeLargeImg()" class="pb-5"> -->
    <!-- <div class="pb-5"> -->

      <!-- <g-link to="/archives/menu" v-b-tooltip.hover.bottom="{ variant: 'secondary' }" title="Back to Archives menu" class="backToArchives">
        <g-image v-if="windowWidth >= 1200" alt="Back to Archives" src="~/assets/images/back-to-archives-with-arrow-on-left.png" />
        <g-image v-else alt="Back to Archives" src="~/assets/images/back-to-archives-with-arrow-on-top.png" class="backToArchivesImg" />
      </g-link> -->

      <!-- HEADER SLIDESHOWS -->
      <!-- <header id="header" class="px-3">
        <div class="headerWrapper">

          <template v-if="slideshowLeftImgs != null">
            <SlideshowImages 
              v-show="windowWidth >= 1200"
              :slides="slideshowLeftImgs" 
              :interval="4500" 
              borderRadius="15px" 
              ref="slideshowLeft" 
              id="slideshowLeft" 
              class="headerBox" 
            />

            <SlideshowImages 
              :slides="slideshowCenterImgs"  
              :interval="4500" 
              borderRadius="15px" 
              ref="slideshowCenter" 
              id="slideshowCenter"
              class="headerBox"
            >
              
              <div class="headerOverlay" :style="overlayStyles">
                <g-image 
                  :src="titleImg"
                  :alt="node.title + ' title image'" 
                  class="titleImg" 
                />
                <simplebar class="simple-scrollbar" data-simplebar-auto-hide="false">
                  <span id="archive_headerText" :style="headerTextStyles" v-html="node.content" />
                </simplebar>
              </div>
            </SlideshowImages>

            <SlideshowImages 
              v-show="windowWidth >= 1200"
              :slides="slideshowRightImgs" 
              :interval="4500" 
              borderRadius="15px" 
              ref="slideshowRight" 
              id="slideshowRight" 
              class="headerBox" 
            />
          </template>
          
        </div>
      </header> -->

      
      <!-- <div id="mainContent" class="" style="">
        <div class="">

          <template v-if="flatImgUrls != null">
            <div 
              v-for="(img, iImg) in flatImgUrls" 
              :key="'img'+iImg" 
              class="mb-4 flatImgContainer"
            >
              <img 
                :src="img"
                :id="'galleryImage_' + iImg"
                class="flatImg" 
                style=""
              />
            </div>
          </template>
          
        </div>
      </div> -->

      
      
      <ksvuefp :options="options" :sections="sections">
        <ksvuefp-section 
          class="flatImgContainer mb-4"
          v-for="(s, iSec) in sections" 
          :section="s"
          :key="s.id" 
          :section-index="iSec"
          :background-image="'url('+ s.img_url +')'"
        >
          <!-- <span>{{ s.text }}</span> -->
          <div 
            v-for="(txtObj, iText) in s.txtArr"
            :key="iText"
            class="slideTextDiv"
            :style="
              `top: ${txtObj.posY};
              left: ${txtObj.posX};
              width: ${txtObj.width};`"
          >
            <!-- {{ txtObj.text }} -->
            <span v-html="renderMarkdown(txtObj.text)" class="slideText" />
          </div>
        </ksvuefp-section>
      </ksvuefp>
       <!-- <ksvuefp :options="options" :sections="sections">
        <ksvuefp-section v-for="(section,index) in sections" :section="section" :key="section.bgColor" :section-index="index" :background-color="section.bgColor">
          <transition name="fade">
            <h2 v-show="$ksvuefp.canAnimContent(index, true)"> 
              {{ section.content }}
            </h2>
          </transition>    
        </ksvuefp-section>
      </ksvuefp> -->

      
      <!-- <ScrollToTop
        text="BACK TO THE TOP"
        :includeArrow="true"
      /> -->
      
    <!-- </div> -->

  </Layout>
  <!-- </ClientOnly> -->
</template>


<page-query>
query ($id: ID!) {
  archive: archivesNarrative(id: $id) {
    title
    titleImg {
      singleLine
      topOffset
      maxWidth
    }
    headerSlideshows {
      commonPath
      numImages
    }
    content
    landscapeLayout {
      noSections
	    commonPath
      textList {
		  	sectionNo
        text
        posX
        posY
        width
        height
      }
    }
  }
}
</page-query>


<script scoped>
// import ScrollToTop from '../components/ScrollToTop.vue'
import SlideshowImages from '../components/SlideshowImages.vue'
// import KsVueFullpage from 'ks-vue-fullpage'
// import simplebar from 'simplebar-vue'
// import 'simplebar/dist/simplebar.min.css'
const MarkdownIt = require('markdown-it')
const slugify = require('@sindresorhus/slugify')
import Velocity from 'velocity-animate'               // for KsVueFullpage
import 'ks-vue-fullpage/dist/ks-vue-fullpage.min.css' // for KsVueFullpage

export default {
  metaInfo() {
    return {
      title: this.title
    }
  },

  components: {
    // ScrollToTop,
    'SlideshowImages': require('../components/SlideshowImages.vue').default,
    // simplebar
  },

  data() {
    return {
      // audioIndex: null,
      // zoomedImgIndex: null,
      // imgCenterPos: {
      //   top: 0,
      //   left: 0
      // },
      // applyLargeImgStyles: false,
      // eventName: null,
      windowWidth: 0.0,
      windowHeight: 0.0,      
      // articleIndex: null,
      // isBookFullscreen: false,
      // bookShowSinglePage: false,
      // bookKey: 1
      // sections: [
      //   {
      //     bgColor: '#ec407a',
      //     content: 'I am section 1'
      //   },
      //   {
      //     bgColor: '#42a5f5',
      //     content: 'I am section 2'
      //   },
      //   {
      //     bgColor: '#66bb6a',
      //     content: 'I am section 3'
      //   }
      // ],
      options: {
        duration: 800,
        // easing: [1, 0, 0, 1],
        overlay: false,
        dotNavEnabled: false,
      },
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
    // titleImg() {
    //   return this.node.titleImg1Line != '' ? this.node.titleImg1Line : this.node.titleImg2Lines
    // },
    // headerTextStyles() {
    //   let css = {}
    //   css.textAlign = this.node.content.length < 80 ? 'center' : 'justify'
    //   return css
    // },
    // slideshowLeftImgs() {
    //   if (this.node.headerSlideshowLeft == null)
    //     return null
    //   let imgs = []
    //   for (let i = 1; i <= this.node.headerSlideshowLeft.numImages; i++) {
    //     let url = this.node.headerSlideshowLeft.commonPath + i + '.jpg'
    //     imgs.push({img: url})
    //   }
    //   return imgs
    // },
    // slideshowCenterImgs() {
    //   if (this.node.headerSlideshowCenter == null)
    //     return null
    //   let imgs = []
    //   for (let i = 1; i <= this.node.headerSlideshowCenter.numImages; i++) {
    //     let url = this.node.headerSlideshowCenter.commonPath + i + '.jpg'
    //     imgs.push({img: url})
    //   }
    //   return imgs
    // },
    // overlayStyles() {
    //   let css = {}
    //   if (this.windowWidth < 576)
    //     var topOffset = Math.min(50, this.node.titleImgTopOffset)
    //   else if (this.windowWidth < 768)
    //     topOffset = Math.min(60, this.node.titleImgTopOffset)
    //   else
    //     topOffset = this.node.titleImgTopOffset
    //   css['--titleTopOffset'] = topOffset + '%'
    //   css['--titleMaxWidth'] = this.node.titleImgMaxWidth + '%'
    //   return css
    // },
    // slideshowRightImgs() {
    //   if (this.node.headerSlideshowRight == null)
    //     return null
    //   let imgs = []
    //   for (let i = 1; i <= this.node.headerSlideshowRight.numImages; i++) {
    //     let url = this.node.headerSlideshowRight.commonPath + i + '.jpg'
    //     imgs.push({img: url})
    //   }
    //   return imgs
    // },
    // galleryImgUrls() {
    flatImgUrls() {
      // if (this.node.imageGallery == null)
      //   return null
      let urls = []
      // for (let i = 1; i <= this.node.imageGallery.numImages; i++) {
      //   let url = this.node.imageGallery.commonPath + i + '.jpg'
      //   urls.push(url)
      // }
      const commonPath = 'https://res.cloudinary.com/all-about-erik/image/upload/v1596580503/Archives/05.%20My%20Amazing%20Mom/flat-images/My_amazing_mom-Flat_pages'
      for (let i = 1; i <= 42; i++) {
        let url = commonPath + i + '.jpg'
        urls.push(url)
      }
      return urls
    },
    // sections() {
    //   let sections = []
    //   // console.log('this.flatImgUrls:')
    //   // console.log(this.flatImgUrls)
    //   // console.log('this.flatImgUrls.length :' + this.flatImgUrls.length )
    //   for (let i = 0; i < this.flatImgUrls.length; i++) {
    //     if (i < 13)
    //       continue
    //     let section = {
    //       id: i + 1,
    //       // text: `I'm section ${i + 1}`,
    //       txtArr: [{
    //         text: `I'm section ${i + 1}`,
    //         posX: '0.5%',
    //         posY: '-11vh',
    //         width: '38%',
    //         height: '20vh'
    //       }],
    //       img_url: this.flatImgUrls[i]
    //     }
    //     if (i == 13) {
    //       section.txtArr[0].text = "Here's a handmade invite she made for a circus themed lunch she threw for me."
    //     }
    //     sections.push(section)
    //   }
    //   // console.log('sections:')
    //   // console.log(sections)
    //   return sections
    // }
    sections() {
      let sections = []

      const layout = this.node.landscapeLayout
      console.log('layout: ')
      console.log(layout)

      for (let i = 1; i <= layout.noSections; i++) {
        let section = {
          id: 'section' + i,
          img_url: layout.commonPath + i + '.jpg',
          txtArr: []
        }
        sections.push(section)
      }

      for (let t = 0; t < layout.textList.length; t++) {
        const textObj = layout.textList[t]
        if (!textObj.hasOwnProperty('sectionNo') || textObj.sectionNo > sections.length) 
          continue
        const sectionIndex = textObj.sectionNo - 1
        // console.log('sectionIndex: ' + sectionIndex)
        // console.log('sections: ')
        // console.log(sections)
        sections[sectionIndex].txtArr.push({
          text: textObj.text,
          posX: textObj.posX ? textObj.posX : '0.5%',
          posY: textObj.posY ? textObj.posY : '-11vh',
          width: textObj.width ? textObj.width : '38%'
        })
      }

      return sections
    }
  },

  mounted() {
    // if (this.node.headerSlideshowLeft != null) {
    //   this.$refs.slideshowLeft.pause()
    //   this.$refs.slideshowCenter.pause()
    //   this.$refs.slideshowRight.pause()
    //   this.staggerSlideshowStarts()
    // }
    console.log('this.node:')
    console.log(this.node)
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
      // document.addEventListener('keydown', this.keyDownHandler, false)
      document.addEventListener('scroll', this.scrollHandler, false)
    },
    unbindEvents() {
      window.removeEventListener('resize', this.updateWindowDims, false)
      window.removeEventListener('orientationchange', this.updateWindowDims, false)
      // document.removeEventListener('keydown', this.keyDownHandler, false)
      document.removeEventListener('scroll', this.scrollHandler, false)
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
    renderMarkdown(text) {
      const md = new MarkdownIt()
      return md.render(text) 
    },
    // onGalleryImgClick(iImg) {
    //   if (this.zoomedImgIndex == iImg || this.windowWidth < 768) {
    //     return
    //   }
      
    //   const imgEl = document.getElementById('galleryImage_' + iImg)
    //   const elemRect = imgEl.getBoundingClientRect()
    //   this.imgCenterPos.top = elemRect.top + (elemRect.height / 2)
    //   this.imgCenterPos.left = elemRect.left + (elemRect.width / 2)

    //   this.$nextTick(() => {
    //     this.zoomedImgIndex = iImg
    //     this.applyLargeImgStyles = true
    //   })
      
    //   this.eventName = 'click'
    // },
    // closeLargeImg() {
    //   if (this.applyLargeImgStyles) {
    //     this.applyLargeImgStyles = false        

    //     this.$nextTick(() => {
    //       this.eventName = null
    //       this.zoomedImgIndex = null
    //     })
    //   }
    // },
    // keyDownHandler(event) {
    //   switch (event.keyCode) {
    //     case keyMap.ESC:
    //       this.closeLargeImg()
    //       break
    //     default:
    //       break
    //   }
    // },
    scrollHandler() {      
      // if (this.zoomedImgIndex !== null) {
      //   this.closeLargeImg()
      // }
    },
    // onGalleryMediaClick(iItem) {
    //   const item = this.audiosAndArticles[iItem]
    //   function callback(arrItem) {
    //     return arrItem.thumbnailImg == item.thumbnailImg
    //   }
    //   if (item.type == 'audio') {
    //     const index = this.audioTracks.findIndex(callback)
    //     this.audioIndex = index >= 0 ? index : null
    //   }
    //   else if (item.type == 'article') {
    //     const index = this.articles.findIndex(callback)
    //     this.articleIndex = index >= 0 ? index : null
    //     this.toggleFullscreen()
    //   }
    // },
    updateWindowDims() {      
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    },
    // toggleFullscreen() {
    //   this.isBookFullscreen = !this.isBookFullscreen
    //   this.reloadBook()
    // },
    // reloadBook() {
    //   this.bookKey += 1 // increment component key to force reload between toggle of fullscreen / normal-screen
    // },
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
  // padding: 0 12px;
  padding: 0;
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
.backToArchivesImg {
  max-width: 222px;
  height: auto;
}

#header {
  position: relative;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
  width: 100%;
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

.headerWrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  justify-content: center;
}
.headerBox {
  width: 100%;
  max-width: 821px;
  position: relative;
  place-self: center;
}
.headerBox img {
  border-radius: 15px;
  width: 100%;
  height: auto;
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

.titleImg {
  position: relative;
  max-width: var(--titleMaxWidth);
  height: auto;
  margin: auto;
  padding: 0 0 16px 0;
}
// .titleImg1Line {
//   display: inline;
// }
// .titleImg2Lines {
//   display: none;
// }

#archive_headerText { 
  padding-right: 0px;
  padding-left: 0px;
  // see styles.css for more
}

.simple-scrollbar {
  height: inherit;
}

#mainContent {
  // max-width: calc(var(--maxPerRow) * var(--boxSize) + (var(--maxPerRow - 1) * var(--gridGap)) + 2 * 16px);
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
  background-color: black;
  width: 100%;
  max-width: var(--boxSize);
  height: var(--boxSize);
  position: relative;
  place-self: center;
  cursor: pointer;
}

.mediaBox {
  opacity: 0.46;
  transition: opacity 0.2s ease;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.galleryBox .mediaBox::before {
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
.galleryBox:hover .mediaBox {
  opacity: 1;
}
.galleryBox:hover .mediaBox::before {
  box-shadow: none;
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
  width: 100%;
  padding: 0 20px 0 26px;
}

.absCenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.boxOverlay {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

// .fade-enter-active, .fade-leave-active {
//   transition: opacity 0.5s;
// }
// .fade-enter, .fade-leave-to {
//   opacity: 0;
// }
.hideOnHover {
  opacity: 1;
  transition: all 0.5s ease 0s;
}
.galleryBox:hover .hideOnHover {
  opacity: 0;
}
.showOnHover {
  opacity: 0;
  transition: all 0.5s ease 0s;
}
.galleryBox:hover .showOnHover {
  opacity: 1;
}


.flatImgContainer {
  display: flex;
  justify-content: center;
}

.flatImg {
  height: 100vh;
}


// For the ks-vue-fullpage component
body {
  margin: 0;
}
.ksvuefp-section {
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 100vh;
  h2, span {
    text-align: center;
    color: white;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
  opacity: 1;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}


.slideTextDiv {
  position: absolute;
  z-index: 1000;
}
.slideText {
  display: block;
  background-color: aqua;

  color: #FFF;
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 44px;
  letter-spacing: 2px;
  line-height: 57px;
  text-align: justify !important;
  margin: 0px;
  padding: 0px;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .titleImg {
    max-width: 85%;
    padding: 0 32px 8px 32px;
  }
  .headerOverlay {
    padding-bottom: 0px;
  }
  .backToArchives {
    top: 20px;
    right: 20px;
  }
  .backToArchivesImg {
    max-width: 100px;
  }
  .galleryWrapper {
    grid-gap: 16px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {  
  .backToArchives {
    top: 27px;
    right: 27px;
  }
  .backToArchivesImg {
    max-width: 110px;
  }
  .galleryWrapper {
    grid-gap: 16px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .galleryWrapper {
    grid-gap: 24px;
  }
  .backToArchives {
    top: 33px;
    right: 33px;
  }
  .backToArchivesImg {
    max-width: 120px;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) { 
  .galleryWrapper {
    grid-gap: 24px;
  }
  .backToArchives {
    top: 37px;
    right: 37px;
  }
  .backToArchivesImg {
    max-width: 130px;
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
@media only screen and (max-width: 1199.98px) {
  .headerWrapper {
    grid-template-columns: 1fr;
  }
}

</style>
