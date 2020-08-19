<template>
  <Layout>
  <ClientOnly>

    <ksvuefp :options="options" :sections="sections">
      <ksvuefp-section 
        class="flatImgContainer"
        v-for="(s, iSec) in sections" 
        :section="s"
        :key="s.id" 
        :section-index="iSec"
        :background-image="'url('+ s.img_url +')'"
      >

        <!-- HEADER -->
        <header v-if="s.header" id="header" class="px-3">

          <!-- SLIDESHOWS -->
          <div v-if="node.headerSlideshows" class="headerWrapper">
            <SlideshowImages 
              v-for="(slideshow, iSlideshow) in node.headerSlideshows"
              v-show="windowWidth >= 1200 || iSlideshow == 1"
              :key="iSlideshow"
              :slides="slideshowImgs(iSlideshow)" 
              :interval="4500" 
              borderRadius="15px" 
              :ref="'slideshow'+iSlideshow" 
              class="headerBox" 
            >                  
              <div v-if="iSlideshow == 1" class="headerOverlay" :style="overlayStyles">
                <g-image :src="titleImg" :alt="node.title + ' title image'" class="titleImg" />
                <p class="headerText">SCROLL</p>
                <p class="headerText">TO READ MY RECOLLECTIONS</p>
              </div>
            </SlideshowImages>
          </div>

          <!-- STATIC HEADER IMAGES -->
          <div v-if="node.headerImages" class="headerWrapper">
            <div 
              v-for="(headerImg, iImg) in node.headerImages"
              v-show="windowWidth >= 1200 || iImg == 1"
              :key="iImg"
              class="headerBox"
            >
              <div v-if="headerImg.applyFilter !== false" class="headerFilter" />

              <img :src="headerImg.img" />

              <div v-if="iImg == 1" class="headerOverlay" :style="overlayStyles">
                <g-image :src="titleImg" :alt="node.title + ' title image'" class="titleImg" />
                <p class="headerText">SCROLL</p>
                <p class="headerText">TO READ MY RECOLLECTIONS</p>
              </div>
            </div>
          </div>

          <!-- BACK TO ARCHIVES LINK (AT TOP) -->
          <g-link to="/archives/menu" v-b-tooltip.hover.bottom="{ variant: 'secondary' }" title="Back to Archives menu" class="backToArchives">
            <g-image v-if="windowWidth >= 1200" alt="Back to Archives" src="~/assets/images/back-to-archives-with-arrow-on-left.png" />
            <g-image v-else alt="Back to Archives" src="~/assets/images/back-to-archives-with-arrow-on-top.png" class="backToArchivesImg" />
          </g-link>
        </header>

        <!-- BACK TO ARCHIVES LINK (AT END) -->
        <g-link v-else-if="s.backLink" to="/archives/menu" v-b-tooltip.hover.bottom="{ variant: 'secondary' }" title="Back to Archives menu" class="backToArchivesEnd">
          <g-image alt="Back to Archives" src="~/assets/images/back-to-archives-with-arrow-on-left.png" />
        </g-link>

        <!-- <div 
          v-else
          v-for="(txtObj, iText) in s.txtArr"
          :key="iText"
          class="slideTextDiv"
          :style="
            `left: ${txtObj.posX};
            top: ${txtObj.posY};
            width: ${txtObj.width};
            font-size: ${txtObj.fontSize};
            line-height: ${txtObj.lineHeight};`"
        > -->
        <div 
          v-else
          v-for="(txtObj, iText) in s.txtArr"
          :key="iText"
          class="slideTextDiv"
          :style="slideTextDivStyles(txtObj)"
        >
          <transition appear name="textAnimation">
            <span 
              v-show="$ksvuefp.canAnimContent(iSec, true) && !$ksvuefp.slidingActive" 
              v-html="renderMarkdown(txtObj.text)" 
              class="slideText" 
              :style="slideTextStyles(txtObj)"
            />
          </transition> 
        </div>

        <!-- GALLERY ITEMS -->
        <template v-if="s.galleryItems">
          <div 
            v-for="(item, iItem) in s.galleryItems" 
            :key="'item'+iItem" 
            class="galleryBox"
            @click.prevent="onGalleryMediaClick(item)"
            :style="
              `left: ${item.posX};
              top: ${item.posY};`"
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
      </ksvuefp-section>
    </ksvuefp>
  </ClientOnly>

  <BookViewer 
    v-show="isBookFullscreen"
    :pages="bookImagesUrlsStdRes" 
    :isFullscreen="isBookFullscreen"
    :showSinglePage="bookShowSinglePage"
    :key="'bookViewer'+bookKey" 
    @toggleFullscreen="toggleFullscreen()" 
    @reload="reloadBook()" 
  />

  </Layout>
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
    headerImages {
      img
      applyFilter
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
        pos
        posX
        posY
        width
        fontSize
        lineHeight
        applyFilter
      }
      galleryItems {
        sectionNo
        posX
        posY
        caption
        thumbnailImg
        commonPathStdRes
        commonFilenameStartNum
        commonFilenameLastNum
        orientation
      }
    }
  }
}
</page-query>


<script scoped>
import BookViewer from '../components/BookViewer.vue'
import SlideshowImages from '../components/SlideshowImages.vue'
import 'ks-vue-fullpage/dist/ks-vue-fullpage.min.css'
import 'ks-vue-fullpage/dist/ks-vue-fullpage.min.js'
// import simplebar from 'simplebar-vue'
// import 'simplebar/dist/simplebar.min.css'
const MarkdownIt = require('markdown-it')
const slugify = require('@sindresorhus/slugify')

export default {
  metaInfo() {
    return {
      title: this.title
    }
  },

  components: {
    BookViewer,
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
      bookItem: null,
      isBookFullscreen: false,
      bookShowSinglePage: false,
      bookKey: 1,

      options: {
        duration: 850,
        easing: 'easeInOut',
        overlay: false,
        dotNavEnabled: true,
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
    titleImg() {
      return this.node.titleImg.singleLine != '' ? this.node.titleImg.singleLine : this.node.titleImg.doubleLine
    },
    // headerTextStyles() {
    //   let css = {}
    //   css.textAlign = this.node.content.length < 80 ? 'center' : 'justify'
    //   return css
    // },
    overlayStyles() {
      let css = {}
      if (this.windowWidth < 576)
        var topOffset = Math.min(50, this.node.titleImg.topOffset)
      else if (this.windowWidth < 768)
        topOffset = Math.min(60, this.node.titleImg.topOffset)
      else
        topOffset = this.node.titleImg.topOffset
      css['--titleTopOffset'] = topOffset + '%'
      css['--titleMaxWidth'] = this.node.titleImg.maxWidth + '%'
      return css
    },
    bookImagesUrlsStdRes() {
      const book = this.bookItem
      if (book == null)
        return []
      let pages = []
      for (let i = book.commonFilenameStartNum; i <= book.commonFilenameLastNum; i++) {
        let url = book.commonPathStdRes + i + '.jpg'
        pages.push(url)
      }
      return pages
    },
    sections() {
      let sections = []
      let s = 1 // section no.

      // add section for header
      sections.push({ id: 'section' + s++, header: true })

      const layout = this.node.landscapeLayout

      // get sections (background images) from CMS
      for (let i = 1; i <= layout.noSections; i++) {
        let section = {
          id: 'section' + s++,
          img_url: layout.commonPath + i + '.jpg',
          txtArr: [],
          galleryItems: []
        }
        sections.push(section)
      }

      // add text from CMS to sections
      for (let t = 0; t < layout.textList.length; t++) {
        const txtObj = layout.textList[t]
        if (!txtObj.hasOwnProperty('sectionNo') || txtObj.sectionNo > sections.length) 
          continue
        const sectionIndex = txtObj.sectionNo
        sections[sectionIndex].txtArr.push(txtObj)        
      }

      // add gallery items from CMS to sections
      for (let i = 0; i < layout.galleryItems.length; i++) {
        const galObj = layout.galleryItems[i]
        if (!galObj.hasOwnProperty('sectionNo') || galObj.sectionNo > sections.length) 
          continue
        const sectionIndex = galObj.sectionNo
        sections[sectionIndex].galleryItems.push(galObj)
      }

      // add another section for "back to archives" link
      sections.push({ id: 'section' + s++, backLink: true })

      return sections
    }
  },

  mounted() {
    window.Velocity = require('velocity-animate')   // needed for KsVueFullpage (ref: https://github.com/pirony/ks-vue-fullpage)

    if (this.node.hasOwnProperty('headerSlideshows') && this.node.headerSlideshows.length > 0) {
      // for (let i = 0; i < this.node.headerSlideshows.length; i++) {
      //   const ref = `slideshow${i}`
      //   // this.$refs[ref].pause()
      //   // this.$refs[`slideshow${i}`].pause()
      //   const slideshow = this.$refs[`slideshow${i}`]
      //   slideshow.pause()
      // }
      console.log('this.$refs:')
      console.log(this.$refs)    
      this.staggerSlideshowStarts()
    }
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
      // for (let i = 0; i < this.node.headerSlideshows.length; i++) {
      //   // this.$refs[`slideshow${i}`][0].pause()
      //   this.$refs[`slideshow${i}`].pause()
      // }
      this.$refs.slideshow0[0].pause()
      this.$refs.slideshow1[0].pause()
      this.$refs.slideshow2[0].pause()
      if (this.node.headerSlideshows.length == 6) {
        this.$refs.slideshow3[0].pause()
        this.$refs.slideshow4[0].pause()
        this.$refs.slideshow5[0].pause()
      }

      if (this.windowWidth >= 1200 & this.node.headerSlideshows.length == 6) {
        this.$refs.slideshow0.start()
        this.$refs.slideshow4.start()

        await this.delay(1500)
        this.$refs.slideshow2.start()
        this.$refs.slideshow3.start()

        await this.delay(1500)
        this.$refs.slideshow1.start()
        this.$refs.slideshow5.start()
      }
      else if (this.windowWidth >= 1200 & this.node.headerSlideshows.length == 3) {
        this.$refs.slideshow0.start()

        await this.delay(1500)
        this.$refs.slideshow1.start()

        await this.delay(1500)
        this.$refs.slideshow2.start()
      }
      // else if (this.node.headerSlideshows.length == 3) {
      //   this.$refs.slideshow1.pause()
      //   this.$refs.slideshow1.start()
      // }
    },
    renderMarkdown(text) {
      const md = new MarkdownIt()
      return md.render(text) 
    },
    slideshowImgs(index) {
      if (this.node.headerSlideshows == null)
        return null
      let imgs = []
      for (let i = 1; i <= this.node.headerSlideshows[index].numImages; i++) {
        let url = this.node.headerSlideshows[index].commonPath + i + '.jpg'
        imgs.push({img: url})
      }
      return imgs
    },
    slideTextDivStyles(txtObj) {
      let css = {}
      console.log(txtObj)
      if (txtObj.hasOwnProperty('pos') && txtObj.pos) {
        css.top = '-50vh'
        css.width = txtObj.width ? txtObj.width : '35%'
        css.height = txtObj.height ? txtObj.height : '100vh'

        if (txtObj.pos == 'center') {
          css.left = '32.5%'
          css.top = '-37vh'
          css.height = '87vh'
        } else {
          css.left = txtObj.pos == 'right' ? '65.0%' : '0%'
        }
      } else {
        css.left = txtObj.posX ? txtObj.posX : '0.5%'
        css.top = txtObj.posY ? txtObj.posY : '-11vh'
        css.width = txtObj.width ? txtObj.width : '38%'
      }
      if (txtObj.hasOwnProperty('applyFilter') && txtObj.applyFilter == true) {
        css.backgroundColor = 'rgb(0,0,0,0.47)'
      }
      return css
    },
    slideTextStyles(txtObj) {
      let css = {}
      if (txtObj.hasOwnProperty('pos') && txtObj.pos) {        
        css.display = 'inline-flex'
        css.height = '100vh'
        css.alignItems = 'center'
        css.padding = '100px'
        css.fontSize = txtObj.fontSize ? txtObj.fontSize : '36px'
        css.lineHeight = txtObj.lineHeight ? txtObj.lineHeight : '52px'        
      } else {
        css.fontSize = txtObj.fontSize ? txtObj.fontSize : '44px'
        css.lineHeight = txtObj.lineHeight ? txtObj.lineHeight : '57px'
      }      
      return css
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
    onGalleryMediaClick(item) {
      // function callback(arrItem) {
      //   return arrItem.thumbnailImg == item.thumbnailImg
      // }
      // if (item.type == 'audio') {
      //   const index = this.audioTracks.findIndex(callback)
      //   this.audioIndex = index >= 0 ? index : null
      // }
      // else if (item.type == 'article') {
      //   const index = this.articles.findIndex(callback)
      //   this.articleIndex = index >= 0 ? index : null
      //   this.toggleFullscreen()
      // }
      // this.articleIndex = itemIndex >= 0 ? itemIndex : null
      this.bookItem = item
      this.toggleFullscreen()
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
.backToArchivesEnd {
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, -50%, 10px);
}

#header {
  position: relative;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
  width: 100%;
  margin: 0 auto;

  height: calc(100vh - 120px);
  transform: translate3d(0, -40px, 0);
  padding: 0 80px !important;
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

// #archive_headerText { 
//   padding-right: 0px;
//   padding-left: 0px;
//   // see styles.css for more
// }
.headerText {
  color: #FFF;
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 1.9375rem;
  line-height: 2.8125rem;
  letter-spacing: 0.5625rem;
  text-align: center;
  text-transform: uppercase;
  margin: 0px;
  padding: 0px;
}
.headerText:nth-of-type(2) {
  font-size: 1.4375rem;
  line-height: 2.0625rem;
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
// .galleryBox {
//   background-color: black;
//   width: 100%;
//   max-width: var(--boxSize);
//   height: var(--boxSize);
//   position: relative;
//   place-self: center;
//   cursor: pointer;
// }
.galleryBox {
  position: absolute;
  height: 420px;
  width: 420px;
}

.mediaBox {
  opacity: 0.46;
  transition: opacity 0.2s ease;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-size: contain;
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
  // background-size: contain;
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
.textAnimation-enter-active, .textAnimation-leave-active {
  transition: opacity 1s, transform 1s cubic-bezier(.13,.07,.26,.99);
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.textAnimation-enter {
  opacity: 0;  
  transform: translate3d(0, 4rem, 0);
}
.textAnimation-leave-active {
  opacity: 0;
}

.slideTextDiv {
  position: absolute;
  z-index: 1000;
}
.slideText {
  display: block;
  // background-color: aqua;
  color: #FFF;
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
  font-weight: 400;
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
