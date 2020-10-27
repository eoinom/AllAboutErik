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
        <header v-if="s.header" id="header">

          <!-- STATIC HEADER IMAGES -->
          <div v-if="!isPortrait && node.headerImages" class="headerWrapper">
            <div 
              v-for="(headerImg, iImg) in node.headerImages"
              :key="iImg"
              class="headerBox"
            >
              <div v-if="headerImg.applyFilter == true" class="headerFilter" />

              <img :src="headerImg.img" />

              <div class="headerOverlay" :style="overlayStyles">
                <g-image v-if="iImg == 1" :src="titleImg" :alt="node.title + ' title image'" class="titleImg mt-4 mt-sm-0" />
                <p v-if="iImg == headerTextTileIndex" class="headerText mt-n1 mt-sm-0">SCROLL</p>
                <p v-if="iImg == headerTextTileIndex" class="headerText">TO READ MY</p>
                <p v-if="iImg == headerTextTileIndex" class="headerText">RECOLLECTIONS</p>
              </div>

              <g-link 
                v-if="showGalleryLink && iImg == headerGalleryTextTileIndex" 
                :to="`/archives/${titleSlug}-gallery`" 
                v-b-tooltip.hover.bottom="{ variant: 'secondary' }" 
                title="Click to see the gallery" 
                class="headerOverlay link pt-3"
              >
                <p class="headerText mt-n1 mt-sm-0">CLICK</p>
                <p class="headerText">TO SEE THE GALLERY</p>
              </g-link>
            </div>
          </div>

          <!-- PORTRAIT SLIDESHOW -->
          <div v-else-if="isPortrait && node.headerMobileImages" class="headerWrapperPortrait">
            <SlideshowImages 
              :slides="node.headerMobileImages" 
              :interval="4500" 
              borderRadius="15px" 
              :ref="'slideshow'+iSlideshow" 
              class="headerBoxPortrait" 
            >
              <div class="headerOverlay" :style="overlayStyles">
                <g-image :src="titleImg" :alt="node.title + ' title image'" class="titleImg" />
                <p class="headerText">SCROLL</p>
                <p class="headerText">TO READ MY</p>
                <p class="headerText">RECOLLECTIONS</p>
              </div>
            </SlideshowImages>
          </div>

          <!-- BACK TO ARCHIVES LINK (AT TOP) -->
          <g-link to="/archives/menu" v-b-tooltip.hover.bottom="{ variant: 'secondary' }" title="Back to Archives menu" class="backToArchives">
            <g-image alt="Back to Archives" src="~/assets/images/back-to-archives-single-line.png" class="backToArchivesImg pt-3 pt-md-2" />
            <g-image alt="Back to Archives" src="~/assets/images/back-to-archives-single-line-yellow.png" class="backToArchivesImg-hover pt-3 pt-md-2" />
          </g-link>
        </header>

        <!-- BACK TO ARCHIVES LINK (AT END) -->
        <g-link v-else-if="s.backLink" to="/archives/menu" v-b-tooltip.hover.bottom="{ variant: 'secondary' }" title="Back to Archives menu" class="backToArchivesEnd">
          <g-image alt="Back to Archives" src="~/assets/images/back-to-archives-with-arrow-on-left.png"  class="backToArchivesEndImg"/>
          <g-image alt="Back to Archives" src="~/assets/images/back-to-archives-with-arrow-on-left-yellow.png" class="backToArchivesEndImg-hover" />
        </g-link>
        
        <div 
          v-else 
          v-for="(txtObj, iText) in s.txtArr"
          :key="iText"
          class="slideTextContainer"
          :style="slideTextContainerStyles(txtObj)"
        >
          <div
            class="slideTextDiv"
            :style="slideTextDivStyles(txtObj)"
          >
            <simplebar 
              v-if="(txtObj.hasOwnProperty('showScrollbar') && !txtObj.showScrollbar == false) || windowWidth < 992" 
              class="simple-scrollbar" 
              data-simplebar-auto-hide="false"
            >
              <transition appear name="textAnimation">
                 <span 
                  v-show="$ksvuefp.canAnimContent(iSec, true)" 
                  v-html="renderMarkdown(txtObj.text)" 
                  class="slideText" 
                  :style="slideTextStyles(txtObj)"
                />
              </transition>
            </simplebar>

            <transition v-else appear name="textAnimation">
              <span 
                v-show="$ksvuefp.canAnimContent(iSec, true)" 
                v-html="renderMarkdown(txtObj.text)" 
                class="slideText" 
                :style="slideTextStyles(txtObj)"
              />
            </transition>
          </div>
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
            style="background-color: black"
          >
            <div 
              class="mediaBox"
              :style="'background: transparent url(' + item.thumbnailImg + ') no-repeat left top'"
            />
            <div class="boxOverlay mb-5">
              <span class="thumbnailCaption absCenter hideOnHover">{{ item.caption }}</span>
              
              <g-image v-if="item.type == 'audio'" alt="Play symbol" src="~/assets/images/music_symbol_circle.png" class="absCenter showOnHover" />
              <g-image v-else alt="Eye icon" src="~/assets/images/eye.png" class="absCenter showOnHover" />
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
      doubleLine
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
        alignItems
        textAlign
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
      }
    }
    fiveBySevenLayout {
      noSections
      commonPath
      textList {
        sectionNo
        text
        pos
        posX
        posY
        width
        height
        alignItems
        textAlign
        fontSize
        lineHeight
        applyFilter
        showScrollbar
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
      }
    }
    squareLayout {
      noSections
      commonPath
      textList {
        sectionNo
        text
        pos
        posX
        posY
        width
        height
        alignItems
        textAlign
        applyFilter
        showScrollbar
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
      }
    }
    portraitLayout {
      noSections
	    commonPath
      textList {
        sectionNo
        text
        pos
        posX
        posY
        width
        height
        alignItems
        textAlign
        applyFilter
        showScrollbar
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
      }
    }    
    mobileLayout {
      noSections
	    commonPath
      textList {
        sectionNo
        text
        pos
        posX
        posY
        width
        height
        textAlign
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
      }
    }
  }
}
</page-query>


<script scoped>
import BookViewer from '../components/BookViewer.vue'
import SlideshowImages from '../components/SlideshowImages.vue'
import simplebar from 'simplebar-vue'
import 'simplebar/dist/simplebar.min.css'
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
    simplebar
  },

  data() {
    return {
      windowWidth: 0.0,
      windowHeight: 1.0,
      bookItem: null,
      isBookFullscreen: false,
      bookShowSinglePage: false,
      bookKey: 1,
      options: {
        duration: 850,
        easing: 'easeInOut',
        overlay: false,
        dotNavEnabled: false,
        // dotNavEnabled: true,
        // animationType: 'slideX',
      },
      // mobile: {
      //   maxAspect: 0.85,
      //   area: 375 * 667,     // iPhone 6
      //   fontSize: 20.3,      // in px
      //   maxFontSize: 30,     // in px
      //   padding: 28.2,       // in px
      // },
      portrait: {
        maxAspect: 0.85,
        area: 375 * 667,     // iPhone 6
        fontSize: 20.3,      // in px
        maxFontSize: 30,     // in px
        padding: 28.2,       // in px
      },
      square: {
        maxAspect: 1.2,
        area: 1080 * 1080,
        fontSize: 26,      // in px
        padding: 50,       // in px
      },
      fiveBySeven: {
        maxAspect: 1.6,
        area: 2016 * 1380,
        fontSize: 32,      // in px
        padding: 50,       // in px
      },
      landscape: {
        area: 2560 * 1380,
        fontSize: 36,      // in px
        padding: 100,      // in px
      }
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
    windowArea() {
      return this.windowWidth * this.windowHeight
    },
    windowScale() {
      return Math.sqrt(this.windowArea) / Math.sqrt(this.currentLayout.area)
    },
    currentLayout() {
      let layout = {}
      if (this.aspectRatio < this.portrait.maxAspect) {
        // layout = { ...this.portrait, ...this.node.portraitLayout }
        if (this.windowWidth < 541 )
          layout = { ...this.portrait, ...this.node.mobileLayout }
        else
          layout = { ...this.portrait, ...this.node.portraitLayout }
      } else if (this.aspectRatio < this.square.maxAspect) {
        layout = { ...this.square, ...this.node.squareLayout }
      } else if (this.aspectRatio < this.fiveBySeven.maxAspect) {
        layout = { ...this.fiveBySeven, ...this.node.fiveBySevenLayout }
      } else {
        layout = { ...this.landscape, ...this.node.landscapeLayout }
      }
      return layout
    },
    isPortrait() {
      return this.aspectRatio < this.portrait.maxAspect
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
    sections() {
      let sections = []
      let s = 1 // section no.

      // add section for header
      sections.push({ id: 'section' + s++, header: true })
      
      const layout = this.currentLayout

      // get sections (background images) from CMS`
      if (layout.hasOwnProperty('noSections')) {
        for (let i = 1; i <= layout.noSections; i++) {
          let section = {
            id: 'section' + s++,
            img_url: layout.commonPath + i + '.jpg',
            txtArr: [],
            galleryItems: []
          }
          // add "back to archives" link to last section
          if (i == layout.noSections) {
            section.backLink = true
          }
          sections.push(section)
        }
      }

      // add text from CMS to sections     
      if (layout.hasOwnProperty('textList')) {
        for (let t = 0; t < layout.textList.length; t++) {
          const txtObj = layout.textList[t]
          if (!txtObj.hasOwnProperty('sectionNo') || txtObj.sectionNo > sections.length) 
            continue
          const sectionIndex = txtObj.sectionNo
          sections[sectionIndex].txtArr.push(txtObj)        
        }
      }

      // add gallery items from CMS to sections
      if (layout.hasOwnProperty('galleryItems')) {
        for (let i = 0; i < layout.galleryItems.length; i++) {
          const galObj = layout.galleryItems[i]
          if (!galObj.hasOwnProperty('sectionNo') || galObj.sectionNo > sections.length) 
            continue
          const sectionIndex = galObj.sectionNo
          sections[sectionIndex].galleryItems.push(galObj)
        }
      }

      return sections
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
    headerTextTileIndex() {
      // if (this.windowWidth < 576 && this.aspectRatio < 0.97) {
      //   return 3
      // // } else if (this.windowWidth >= 1200 && this.aspectRatio > 1.5 && this.aspectRatio < 2.15) {
      // //   return 4
      // } else {
      //   return 1
      // }
      return 1
    },
    headerGalleryTextTileIndex() {
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
    showGalleryLink() {
      return this.titleSlug === 'my-dad-earl'
    }
  },

  mounted() {
    window.Velocity = require('velocity-animate')   // needed for KsVueFullpage (ref: https://github.com/pirony/ks-vue-fullpage)
    window.Hammer = require('hammerjs/hammer.js')   // needed for KsVueFullpage 

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
    },
    unbindEvents() {
      window.removeEventListener('resize', this.updateWindowDims, false)
      window.removeEventListener('orientationchange', this.updateWindowDims, false)
    },
    delay(ms) {
      return new Promise(res => setTimeout(res, ms))
    },
    renderMarkdown(text) {
      const md = new MarkdownIt()
      return md.render(text) 
    },
    slideTextContainerStyles(txtObj) {
      let css = {}
      if (txtObj.hasOwnProperty('pos') && txtObj.pos) {
        // default values (left)
        css.left = '0%'
        css.top = '-50vh'
        css.width = '35%'
        css.height = '100vh'

        // presets
        if (txtObj.pos == 'right') {
          css.left = '65.0%'
          // css.left = txtObj.posX ? txtObj.posX : '65.0%'
        } else if (txtObj.pos == 'center') {
          css.left = '32.5%'
          css.top = '-37vh'
          css.height = '87vh'
        } else if (txtObj.pos == 'bottom') {
          css.left = '0%'
          css.top = '17vh'
          css.width = '100%'
          css.height = '33vh'
          css.display = 'flex'
          // css.flexDirection = 'column-reverse'
        } else if (txtObj.pos == 'top') {
          css.width = '100%'
          css.height = '33vh'
        }

        // overwrites
        if ( txtObj.posX ) css.left = txtObj.posX
        if ( txtObj.posY ) css.top = txtObj.posY
        if ( txtObj.width ) css.width = txtObj.width
        if ( txtObj.height ) css.height = txtObj.height

      } else {
        css.left = txtObj.posX ? txtObj.posX : '0.5%'
        css.top = txtObj.posY ? txtObj.posY : '-11vh'
        css.width = txtObj.width ? txtObj.width : '38%'
        css.height = '100%'
      }
      if (txtObj.hasOwnProperty('applyFilter') && txtObj.applyFilter == true) {
        css.backgroundColor = 'rgb(0,0,0,0.47)'
      }
      return css
    },
    slideTextDivStyles(txtObj) {
      let css = {}
      css.width = '100%'

      if (txtObj.hasOwnProperty('pos') && txtObj.pos) {
        if (txtObj.pos == 'bottom') {
          css.height = 'calc(100% - 8px)'
        }
      }
      return css
    },
    slideTextStyles(txtObj) {
      const layout = this.currentLayout
      const scale = this.windowScale
      let css = {}
      if (txtObj.hasOwnProperty('pos') && txtObj.pos) {     
        css.display = 'flex'
        css.flexDirection = 'column'
        
        if (txtObj.pos == 'bottom') {
          css.height = '100%'
        } else {
          css.height = '100vh'
        }
        
        css.alignItems = txtObj.alignItems ? txtObj.alignItems : 'start'

        // padding
        if (txtObj.padding) {
          var paddingPx = scale * parseFloat(txtObj.padding.replace(/[^0-9.]/g,''))
        } else {
          paddingPx = scale * layout.padding
        }
        if (txtObj.pos !== 'bottom') {
          css.padding = `${paddingPx}px`
        } else if (txtObj.hasOwnProperty('applyFilter') && txtObj.applyFilter) {
          css.padding = `${paddingPx}px ${paddingPx}px`
        } else {
          css.padding = `0px ${paddingPx}px`
        }
      }

      // font-size
      if (txtObj.fontSize) {
        var fontSizePx = scale * parseFloat(txtObj.fontSize.replace(/[^0-9.]/g,''))
      } else {
        fontSizePx = layout.maxFontSize ? Math.min(scale * layout.fontSize, layout.maxFontSize) : scale * layout.fontSize
      }
      css.fontSize = fontSizePx + 'px'

      // line-height
      if (txtObj.lineHeight) {
        var lineHeightPx = scale * parseFloat(txtObj.lineHeight.replace(/[^0-9.]/g,''))
      } else {
        lineHeightPx = 1.444 * fontSizePx
      }
      css.lineHeight = lineHeightPx + 'px'

      // text-align
      css.textAlign = txtObj.textAlign ? txtObj.textAlign : 'justify'

      return css
    },
    onGalleryMediaClick(item) {
      this.bookItem = item
      this.toggleFullscreen()
    },
    toggleFullscreen() {
      this.isBookFullscreen = !this.isBookFullscreen
      this.reloadBook()
    },
    reloadBook() {
      this.bookKey += 1 // increment component key to force reload between toggle of fullscreen / normal-screen
    },
    updateWindowDims() {
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // ref: https://stackoverflow.com/a/39345914
      this.windowWidth = (iOS) ? screen.width : window.innerWidth;
      this.windowHeight = (iOS) ? screen.height : window.innerHeight;
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
  padding: 0;
  overflow: hidden; /* added for pseudo-element */
  position: relative; /* added for pseudo-element */
  // min-height: 100vh;
  // height: 100vh;
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
  // display: inline-block;
  display: block;
}
.backToArchivesImg-hover {
  display: none;
}

.backToArchivesEnd {
  position: absolute;
  left: 50%;
  top: 22vh;
  transform: translate3d(-50%, -50%, 0);
}
.backToArchivesEndImg,
.backToArchivesEndImg-hover {
  // width: 10vw;
  width: 30vw;
  min-width: 200px;
  max-width: 350px;
  height: auto;
}
.backToArchivesEndImg {
  display: inline-block;
}
.backToArchivesEndImg-hover {
  display: none;
}

@media (hover) {
  .backToArchives:hover .backToArchivesImg-hover,
  .backToArchivesEnd:hover .backToArchivesEndImg-hover {
    display: inline-block;
  }
  .backToArchives:hover .backToArchivesImg,
  .backToArchivesEnd:hover .backToArchivesEndImg {
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

  height: 100vh;
  padding: 130px 60px 30px 60px !important;
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
  // max-width: 821px;
  position: relative;
  place-self: center;

  height: 100%;
  max-width: 660px;
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

.galleryBox {
  position: absolute;
  // height: 420px;
  // width: 420px;
  // height: 17.13586vw;
  // width: 17.13586vw;
  height: 23vw;
  width: 23vw;
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
.galleryBox:hover .boxOverlay {
  cursor: pointer;
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
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.32);
  text-transform: uppercase;
  transition: inherit;
  width: 100%;
  padding: 0 20px 0 26px;
  // font-size: 53px;
  // line-height: 53px;
  // letter-spacing: 9px;
  font-size: 2.162382vw;
  line-height: 2.162382vw;
  letter-spacing: 0.367197vw;
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
.textAnimation-enter-active, .textAnimation-leave-active {
  transition: opacity 1.5s;
  opacity: 1;
}
.textAnimation-enter {
  opacity: 0;
}
.textAnimation-leave-active {
  opacity: 0;
}

.slideTextContainer {
  position: absolute;
  display: flex;
  // background-color: rgba(0, 0, 0, 0.47);
  // left: 0%;
  // top: 22vh;
  // width: 100%;
  // height: 28vh;
}
.slideTextDiv {
  position: absolute;
  z-index: 1000;
}
.slideText {
  display: block;
  color: #FFF;
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  margin: 0px;
  padding: 0px;  
}
.slideText {
  /deep/ p {
    // margin-bottom: 0;
    margin: auto;
  }
}
.simple-scrollbar {
  height: inherit;
  width: 100%;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .backToArchives {
    top: 48px;
    // top: 128px;
    right: 20px;
  }
  #header {
    display: flex;
    align-items: center;
    height: 100vh;
    transform: translate3d(0, 0, 0);
    padding: 90px 4px 4px 4px !important;
  }
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
}
@media only screen and (max-width: 375px) {
  .headerText {
    --font-size: 1rem;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {  
  .backToArchives {
    top: 27px;
    right: 27px;
  }
  #header {
    padding: 130px 4px 4px 4px !important;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .backToArchives {
    top: 33px;
    right: 33px;
  }
  #header {
    padding: 130px 50px 30px 50px !important;
  }
}

/* iPad */
@media only screen and (min-width: 767.98px) and (max-width: 768.02px) {
  #header {
    padding: 130px 4px 4px 4px !important;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) { 
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
  .backToArchivesImg,
  .backToArchivesImg-hover {
    max-width: 300px;
  }
}

/* Special */
@media only screen and (max-width: 360px) {
  .galleryBox {
    max-height: calc(350px - 32px);
  }
  .galleryImage {
    height: calc(350px - 32px);
    top: calc(175px - 16px);
  }
}

</style>
