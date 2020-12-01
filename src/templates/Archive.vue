<template>
  <Layout>
    <div v-on:[eventName]="closeLargeImg()" class="pb-5">

      <g-link to="/archives/menu" v-b-tooltip.hover.bottom="{ variant: 'secondary' }" title="Back to Archives menu" class="backToArchives">
        <g-image alt="Back to Archives" src="~/assets/images/back-to-archives-single-line.png" class="backToArchivesImg pt-3 pt-md-2" />
        <g-image alt="Back to Archives" src="~/assets/images/back-to-archives-single-line-yellow.png" class="backToArchivesImg-hover pt-3 pt-md-2" />
      </g-link>

      <header id="header" class="px-3">
        <div class="headerWrapper">

          <!-- SLIDESHOWS -->
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
              <div 
                v-if="node.applyCenterFilter !== false" 
                class="headerFilter" 
              />
              
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

          <!-- STATIC HEADER IMAGES -->
          <template v-if="node.headerImgLeft !== ''">
            <div v-show="windowWidth >= 1200" class="headerBox">
              <img :src="node.headerImgLeft" />
            </div>

            <div class="headerBox">
              <div v-if="node.applyCenterFilter !== false" class="headerFilter" />
              <img :src="node.headerImgCentre" />
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
            </div>

            <div v-show="windowWidth >= 1200" class="headerBox">
              <img :src="node.headerImgRight" />
            </div>
          </template>

        </div>
      </header>

      
      <div id="mainContent" class="px-3 pb-5" :style="mainContentStyles">
        <div class="galleryWrapper">

          <!-- IMAGE GALLERY -->
          <template v-if="galleryImgUrls != null">
            <div 
              v-for="(img, iImg) in galleryImgUrls" 
              :key="'img'+iImg" 
              class="galleryBox"
              @click.prevent="onGalleryImgClick(iImg)"
            >
              <img 
                :src="img"
                :id="'galleryImage_' + iImg"
                class="galleryImage" 
                :class="{ 'centerPos': applyLargeImgStyles && zoomedImgIndex == iImg }"
                :style="zoomedImgStyles"
              />
            </div>
          </template>

          <!-- AUDIOS & ARTICLES GALLERY -->
          <template v-if="audiosAndArticles != null">
            <div 
              v-for="(item, iItem) in audiosAndArticles" 
              :key="'item'+iItem" 
              class="galleryBox"
              @click.prevent="onGalleryMediaClick(iItem)"
            >
              <div 
                class="mediaBox"
                :style="'background: transparent url(' + item.thumbnailImg + ') no-repeat left top'"
              />
              <div class="boxOverlay mb-5">
                <transition name="fade">
                  <span class="thumbnailCaption absCenter hideOnHover">{{ item.caption }}</span>
                </transition>
                
                <transition name="fade">
                  <g-image v-if="item.type == 'audio'" alt="Play symbol" src="~/assets/images/music_symbol_circle.png" class="absCenter showOnHover" />
                  <g-image v-else alt="Eye icon" src="~/assets/images/eye.png" class="absCenter showOnHover" />
                </transition>
              </div>

            </div>
          </template>
          
        </div>
      </div>
      
      <AudioLightBox
        v-if="audioTracks != null"
        :audios="audioTracks"
        :index="audioIndex"
        :disable-scroll="true"
        :show-caption="false"
        @close="audioIndex = null"
      />

      <BookViewer 
        v-show="isBookFullscreen"
        :pages="bookImagesUrlsStdRes" 
        :isFullscreen="isBookFullscreen"
        :showSinglePage="bookShowSinglePage"
        :key="'bookViewer'+bookKey" 
        @toggleFullscreen="toggleFullscreen()" 
        @reload="reloadBook()" 
      />

      <BackToTop />
      
    </div>

  </Layout>
</template>


<page-query>
query ($id: ID!) {
  archive: archives(id: $id) {
    title
    titleImg1Line
    titleImg2Lines
    titleImgTopOffset
    titleImgMaxWidth
    content
    headerImgLeft
    headerImgCentre
    headerImgRight
    headerSlideshowLeft {
      commonPath
      numImages
    }
    headerSlideshowCenter {
      commonPath
      numImages      
    }
    headerSlideshowRight {
      commonPath
      numImages
    }
    applyCenterFilter
    imageGallery {
      commonPath
      numImages
    }
    audioGallery {
      orderNo
      caption
      url
      thumbnailImg
    }
    articleGallery {
      orderNo
      caption
      thumbnailImg
      commonPathStdRes
      commonFilenameStdRes
      commonFilenameStartNum
      commonFilenameLastNum
      orientation
      width
      height
    }
  }
}
</page-query>


<script scoped>
import AudioLightBox from '../components/AudioLightBox.vue'
import BookViewer from '../components/BookViewer.vue'
import BackToTop from '../components/BackToTop.vue'
import SlideshowImages from '../components/SlideshowImages.vue'
import simplebar from 'simplebar-vue'
import 'simplebar/dist/simplebar.min.css'
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
    AudioLightBox,
    BookViewer,
    BackToTop,
    'SlideshowImages': require('../components/SlideshowImages.vue').default,
    simplebar
  },

  data() {
    return {
      audioIndex: null,
      zoomedImgIndex: null,
      imgCenterPos: {
        top: 0,
        left: 0
      },
      applyLargeImgStyles: false,
      eventName: null,
      windowWidth: 0.0,
      windowHeight: 0.0,      
      articleIndex: null,
      isBookFullscreen: false,
      bookShowSinglePage: false,
      bookKey: 1
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
      return this.node.titleImg1Line != '' ? this.node.titleImg1Line : this.node.titleImg2Lines
    },
    headerTextStyles() {
      let css = {}
      css.textAlign = this.node.content.length < 80 ? 'center' : 'justify'
      return css
    },
    slideshowLeftImgs() {
      if (this.node.headerSlideshowLeft == null)
        return null
      let imgs = []
      for (let i = 1; i <= this.node.headerSlideshowLeft.numImages; i++) {
        let url = this.node.headerSlideshowLeft.commonPath + i + '.jpg'
        imgs.push({img: url})
      }
      return imgs
    },
    slideshowCenterImgs() {
      if (this.node.headerSlideshowCenter == null)
        return null
      let imgs = []
      for (let i = 1; i <= this.node.headerSlideshowCenter.numImages; i++) {
        let url = this.node.headerSlideshowCenter.commonPath + i + '.jpg'
        imgs.push({img: url})
      }
      return imgs
    },
    overlayStyles() {
      let css = {}
      if (this.windowWidth < 576)
        var topOffset = Math.min(50, this.node.titleImgTopOffset)
      else if (this.windowWidth < 768)
        topOffset = Math.min(60, this.node.titleImgTopOffset)
      else
        topOffset = this.node.titleImgTopOffset
      css['--titleTopOffset'] = topOffset + '%'
      css['--titleMaxWidth'] = this.node.titleImgMaxWidth + '%'
      return css
    },
    slideshowRightImgs() {
      if (this.node.headerSlideshowRight == null)
        return null
      let imgs = []
      for (let i = 1; i <= this.node.headerSlideshowRight.numImages; i++) {
        let url = this.node.headerSlideshowRight.commonPath + i + '.jpg'
        imgs.push({img: url})
      }
      return imgs
    },
    galleryImgUrls() {
      if (this.node.imageGallery == null)
        return null
      let urls = []
      for (let i = 1; i <= this.node.imageGallery.numImages; i++) {
        let url = this.node.imageGallery.commonPath + i + '.jpg'
        if (this.titleSlug === 'lots-of-fishing' && (i == 356 || i == 379)) {
          continue
        } else {
          urls.push(url)
        }
      }
      return urls
    },
    zoomedImgStyles() {
      let absCenterTop = this.windowHeight / 2 - this.imgCenterPos.top + 175
      let absCenterLeft = this.windowWidth / 2 - this.imgCenterPos.left + 175
      return {
        '--absCenterTop': absCenterTop.toFixed(2) + 'px',
        '--absCenterLeft': absCenterLeft.toFixed(2) + 'px'
      }
    },
    audioTracks() {
      return this.node.audioGallery.map(obj => ({ ...obj, type: 'audio' }))
    },
    articles() {
      return this.node.articleGallery.map(obj => ({ ...obj, type: 'article' }))
    },
    audiosAndArticles() {
      return [...this.audioTracks, ...this.articles].sort((a, b) => (a.orderNo > b.orderNo) ? 1 : -1); 
    },
    numItems() {
      let num = 0
      num += this.galleryImgUrls ? this.galleryImgUrls.length : 0
      num += this.audioTracks ? this.audioTracks.length : 0
      return num
    },
    mainContentStyles() {
      let css = {}
      if (this.numItems <= 8) {
        css['--maxPerRow'] = 1
        css['--boxSize'] = '480px'
      } else if (this.windowWidth < 375) {
        css['--maxPerRow'] = 1
        const boxSize = this.windowWidth - 32
        css['--boxSize'] = boxSize + 'px'
      } else {
        css['--maxPerRow'] = 5
        css['--boxSize'] = '350px'
      }
      css['--gridGap'] = '30px'
      return css
    },
    bookImagesUrlsStdRes() {
      if (this.articles == null || this.articleIndex == null)
        return []
      const book = this.articles[this.articleIndex]
      let pages = []
      let urlCommon = book.commonPathStdRes + book.commonFilenameStdRes
      for (let i = book.commonFilenameStartNum; i <= book.commonFilenameLastNum; i++) {
        let url = urlCommon + i + '.jpg'
        pages.push(url)
      }
      return pages
    }
  },

  mounted() {
    if (this.node.headerSlideshowLeft != null) {
      this.$refs.slideshowLeft.pause()
      this.$refs.slideshowCenter.pause()
      this.$refs.slideshowRight.pause()
      this.staggerSlideshowStarts()
    }
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
    onGalleryImgClick(iImg) {
      if (this.zoomedImgIndex == iImg || this.windowWidth < 768) {
        return
      }
      
      const imgEl = document.getElementById('galleryImage_' + iImg)
      const elemRect = imgEl.getBoundingClientRect()
      this.imgCenterPos.top = elemRect.top + (elemRect.height / 2)
      this.imgCenterPos.left = elemRect.left + (elemRect.width / 2)

      this.$nextTick(() => {
        this.zoomedImgIndex = iImg
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
    onGalleryMediaClick(iItem) {
      const item = this.audiosAndArticles[iItem]
      function callback(arrItem) {
        return arrItem.thumbnailImg == item.thumbnailImg
      }
      if (item.type == 'audio') {
        const index = this.audioTracks.findIndex(callback)
        this.audioIndex = index >= 0 ? index : null
      }
      else if (item.type == 'article') {
        const index = this.articles.findIndex(callback)
        this.articleIndex = index >= 0 ? index : null
        this.toggleFullscreen()
      }
    },
    updateWindowDims() {      
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    },
    toggleFullscreen() {
      this.isBookFullscreen = !this.isBookFullscreen
      this.reloadBook()
    },
    reloadBook() {
      this.bookKey += 1 // increment component key to force reload between toggle of fullscreen / normal-screen
    },
  }
}
</script>



<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');

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
  padding: 130px 60px 30px 60px !important;
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

.titleImg {
  position: relative;
  max-width: var(--titleMaxWidth);
  height: auto;
  margin: auto;
  padding: 0 0 16px 0;
}

#archive_headerText { 
  padding-right: 0px;
  padding-left: 0px;
  // see styles.css for more
}

.simple-scrollbar {
  height: inherit;
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
  top: calc(var(--boxSize)/2);
  left: calc(var(--boxSize)/2);
  width: var(--boxSize);
  height: var(--boxSize);
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
    right: 26px;
  }
  #header {
    padding: 90px 16px 16px 16px !important;
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
  #header {
    padding: 100px 24px 16px 24px !important;
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
  #header {
    padding: 100px 36px 24px 36px !important;
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
  #header {
    padding: 130px 50px 30px 50px !important;
  }
}

/* Large devices (desktops, 1200px and up) */
@media only screen and (min-width: 1200px) { 
  .backToArchivesImg-hover,
  .backToArchivesImg {
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
    height: calc(var(--boxSize));
    top: calc(var(--boxSize)/2);
  }
}

/* Special */
@media only screen and (max-width: 1199.98px) {
  .headerWrapper {
    grid-template-columns: 1fr;
  }
}

</style>
