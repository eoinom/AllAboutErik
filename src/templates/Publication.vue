<template>
  <Layout>
    <transition name="page" mode="out-in">
      <div :key="'publication_' + titleSlug"> <!-- Need a unique key for the transition above to work on route change -->
        
        <img v-if="node.pageBgImg != ''" :src="node.pageBgImg" id="pageBgImg" :style="pageBgStyles" />

        <!-- FOR OLD TIMEY SPORTSMEN -->
        <header v-if="title == 'Old Timey Sportsmen'" id="header" :style="headerStyles">
          <b-container fluid class="slideshowOverlay">
            <b-row align-v="start" style="min-height:240px">

              <b-col v-if="node.headerLeftImg != ''" align-self="center" class="headerImageCol" style="text-align: right">            
                <g-image alt="Hunter" :src="node.headerLeftImg" id="headerLeftImg" />
              </b-col>
              
              <b-col id="headerItems" style="max-width: 970px">          
                <g-image :src="node.titleImg1Line" class="titleImg titleImg1Line pt-3" />
                <g-image :src="node.titleImg2Lines" class="titleImg titleImg2Lines" />

                <div v-html="node.content" class="headerText" />

                <b-row align-v="start" align-h="center" style="min-height:68px; padding-top:8px">                  
                  <b-col>
                    <a href="http://oldtimeysportsmenphotogallery.com/gallery/" target="_blank"
                      class="sportsmenLinkText"
                      style="margin: 0 auto"
                      @mouseover="updateSportsmenGalleryHover(true)" 
                      @mouseleave="updateSportsmenGalleryHover(false)"
                    >

                      <div v-if="windowWidth > 350" style="padding-bottom: 66px">
                        <span>SEE MORE OF THE COLLECTION, CLICK FOR A NEW TAB</span>
                        <br><span class="line2">Old-Time Sportsmen Gallery</span>
                      </div>
                      <div v-else style="padding-bottom: 66px">
                        <span>SEE MORE OF THE COLLECTION, CLICK FOR A NEW TAB</span>
                        <br><span class="line2">Old-Time Sportsmen <br>Gallery</span>
                      </div>

                      <g-image v-show="sportsmenGalleryHover" class="headerHoverImg" alt="Guns crossed" :src="node.headerHoverImg" />
                    </a>
                  </b-col>
                </b-row>            
              </b-col>
              
              <b-col v-if="node.headerRightImg != ''" align-self="center" class="headerImageCol" style="text-align:left">            
                <g-image alt="ducks" :src="node.headerRightImg" id="headerRightImg" />
              </b-col>

            </b-row>
          </b-container>
        </header>
        
        <!-- FOR OTHER PAGES -->
        <header v-else id="header" :style="headerStyles">
          <div id="headerItems">
            <g-image :src="titleImg1Line" class="titleImg titleImg1Line pt-3" />
            <g-image :src="titleImg2Lines" class="titleImg titleImg2Lines" />
            
            <div v-html="node.content" class="headerText" />
          </div>
        </header>




        <b-container fluid class="py-4 px-5">
          <b-row no-gutters align-v="start" id="navLinksRow">
            <b-col cols="">
              <g-link :to="'/publications/' + prevPublication.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="prevPublication.title" class="nav_link nav_link_small" id="nav_prev">PREV</g-link>
              <g-link :to="'/publications/' + prevPublication.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="prevPublication.title" class="nav_link nav_link_big" id="nav_prev">PREVIOUS PUBLICATION</g-link>
            </b-col>
            
            <b-col cols="7" class="pb-5">
              <div class="publication_mainText">
                <span v-html="renderMarkdown(node.mainTextTop)" />
              </div>

              <br><br><br>
              
              <BookViewer :pages="bookImagesUrlsStdRes" :pagesHiRes="bookImagesUrlsHiRes" />
              
              <br><br><br><br><br><br>

              <div class="publication_mainText">{{ node.mainTextBottom }}</div>

              <br />

              <div v-if="node.videoUrl !== ''" style="width:100%;height:100%;position:relative; text-align:center">
                <h2 class="videoTitleText mb-3">WATCH THE VIDEO ABOUT THE BOOK HERE</h2>
                <iframe 
                  :src="node.videoUrl + '?autoplay=0&color=505050&title=0&byline=0&portrait=0'"
                  style="width:954.656px; height:537px; max-width:100%" 
                  frameborder="0" 
                  webkitallowfullscreen mozallowfullscreen allowfullscreen >
                </iframe>
              </div>

            </b-col>
            
            <b-col cols="">
              <g-link :to="'/publications/' + nextPublication.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="nextPublication.title" class="nav_link nav_link_small" id="nav_next">NEXT</g-link>
              <g-link :to="'/publications/' + nextPublication.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="nextPublication.title" class="nav_link nav_link_big" id="nav_next">NEXT PUBLICATION</g-link>
            </b-col>            
          </b-row>
        </b-container>

        <g-link to="/publications/" class="nav_link pt-3" id="nav_back">BACK TO PUBLICATIONS MENU</g-link>

      </div>
    </transition>
  </Layout>
</template>


<page-query>
query ($id: ID!) {
  Publication: publications(id: $id) {
    title
    titleImg1Line
    titleImg2Lines
    headerBgImg
    headerBgImgOpacity
    headerLeftImg
    headerRightImg
    headerHoverImg
    content
    pageBgImg
    pageBgImgOpacity
    mainTextTop
    mainTextBottom
    videoUrl
    bookImages {
      commonPathStdRes
      commonFilenameStdRes
      commonPathHiRes
      commonFilenameHiRes
      commonFilenameStartNum
      commonFilenameLastNum
    }
  }
}
</page-query>

<static-query>
{
  Publications: allPublicationsIndex {
    edges {
      node {
        publications {
          title
        }
      }
    }
  }	
}
</static-query>


<script scoped>
import BookViewer from '../components/BookViewer.vue'
const slugify = require('@sindresorhus/slugify')
const MarkdownIt = require('markdown-it')

export default {
  metaInfo() {
    return {
      title: this.title
    }
  },

  components: {
    BookViewer
  },

  data() {
    return {
      imageIndex: 0,
      showIntro: false,
      sportsmenGalleryHover: false,
      windowWidth: 0.0,
      bookFilenames: ['SkeletonKimono_10-20-1.jpg', 'SkeletonKimono_10-20-2.jpg', 'SkeletonKimono_10-20-3.jpg', 'SkeletonKimono_10-20-4.jpg', 'SkeletonKimono_10-20-5.jpg', 'SkeletonKimono_10-20-6.jpg', 'SkeletonKimono_10-20-7.jpg', 'SkeletonKimono_10-20-8.jpg', 'SkeletonKimono_10-20-9.jpg', 'SkeletonKimono_10-20-10.jpg', 'SkeletonKimono_10-20-11.jpg', 'SkeletonKimono_10-20-12.jpg', 'SkeletonKimono_10-20-13.jpg', 'SkeletonKimono_10-20-14.jpg', 'SkeletonKimono_10-20-15.jpg', 'SkeletonKimono_10-20-16.jpg', 'SkeletonKimono_10-20-17.jpg', 'SkeletonKimono_10-20-18.jpg', 'SkeletonKimono_10-20-19.jpg', 'SkeletonKimono_10-20-20.jpg']
    }
  },

  computed: {
    node() {
      return this.$page.Publication
    },
    title() {
      return this.node.title
    },
    titleSlug() {
      return slugify(this.title)
    },
    titleImg1Line() {
      return this.node.titleImg1Line !== '' ? this.node.titleImg1Line : this.node.titleImg2Lines
    },
    titleImg2Lines() {
      return this.node.titleImg2Lines
    },
    headerBgImgOpacity() {
      return this.node.hasOwnProperty('headerBgImgOpacity') ? this.node.headerBgImgOpacity : 0.5
    },  
    headerStyles() {
      return {
        '--headerBgImg': 'url(' + this.node.headerBgImg + ')',
        '--bgOpacity': this.headerBgImgOpacity / 100
      }
    },
    pageBgStyles() {
      let css = {} 
      css.opacity = this.node.pageBgImgOpacity / 100
      // if (this.bgImgAspectRatio <= this.windowAspectRatio)
      //   css.width = this.windowWidth + 'px';
      // else
      //   css.height = this.windowHeight + 'px';
      return css
    },
    bookImagesUrlsStdRes() {
      let pages = [null]  // first element is null so that cover page appears on its own
      const book = this.node.bookImages
      // let urlPrepend = 'https://res.cloudinary.com/all-about-erik/image/upload/f_auto/v1588104930/Publications/temp/'
      let urlCommon = book.commonPathStdRes + book.commonFilenameStdRes
      for (let i = book.commonFilenameStartNum; i <= book.commonFilenameLastNum; i++) {
        let url = urlCommon + i + '.jpg'
        pages.push(url)
      }
      return pages
    },
    bookImagesUrlsHiRes() {
      let pages = [null]  // first element is null so that cover page appears on its own
      const book = this.node.bookImages
      let urlCommon = book.commonPathHiRes + book.commonFilenameHiRes
      for (let i = book.commonFilenameStartNum; i <= book.commonFilenameLastNum; i++) {
        let url = urlCommon + i + '.jpg'
        pages.push(url)
      }
      return pages
    },
    publications() {
      return this.$static.Publications.edges[0].node.publications
    },    
    publication_names() {
      return this.publications.map(x => x.title);
    },
    publicationIndex() {
      return this.publication_names.indexOf(this.title)
    },
    prevPublication() {
      const i = this.publicationIndex
      if (i === 0)
        var prev_i = this.publication_names.length - 1
      else
        prev_i = i - 1
      let publication = {...this.publications[prev_i]}
      publication.link = slugify(publication.title)
      return publication
    },
    nextPublication() {
      const i = this.publicationIndex     
      if (i === this.publication_names.length - 1)
        var next_i = 0
      else
        next_i = i + 1
      let publication = {...this.publications[next_i]}
      publication.link = slugify(publication.title)
      return publication
    }
  },

  watch: {
    windowWidth: function (val) {
      if (val >= 576 && val <= 1366) {
        this.sportsmenGalleryHover = true
      }
      else {
        this.sportsmenGalleryHover = false
      }
    }
  },

  mounted() {
    this.windowWidth = window.innerWidth

    window.addEventListener('resize', () => {  
      this.windowWidth = window.innerWidth
    })
    window.addEventListener('orientationchange', () => {  
      this.windowWidth = window.innerWidth
    })
  },

  methods: {
    renderMarkdown(text) {
      const md = new MarkdownIt()
      return md.render(text) 
    },
    updateSportsmenGalleryHover(val) {
      if (this.windowWidth > 1366)
        this.sportsmenGalleryHover = val      
    }
  }
}
</script>



<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');
@import url('https://fonts.googleapis.com/css?family=Francois+One&display=swap');

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

#pageBgImg {
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0%);
  width: auto;
  height: auto;
  min-height: 100%;
  min-width: 100%;    
  overflow: hidden;
  z-index: -1;
}

#header {
  position: relative;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
  /* min-height: 301px; */
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

#headerLeftImg {
  min-width: 230px;
  max-width: 70%;
  max-height: 189px;
}
#headerRightImg {
  min-width: 230px;
  max-width: 70%;
  max-height: 149px;
}
#headerLeftImg,
#headerRightImg {
  /* max-height: 189px;
  max-width: 70%; */
}

#headerItems {
  width: 1240px; 
  max-width: 90vw; 
  text-align: center;
  margin: 0 auto;
}
.headerText {
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  /* text-shadow: 1px 1px 4px rgba(0,0,0,0.29); */
  color: #FFFFFF;
  text-align: center;
  /* font-size: 1.125rem; */
  /* line-height: 1.625rem; */
  /* letter-spacing: 1px; */
  font-weight: 500;
  margin: 0px;
  padding: 0px;

  text-shadow: 4px 4px 3px rgba(0,0,0,0.18);
  text-transform: uppercase;
  font-size: 1.0625rem;
  line-height: 1.5rem;
  letter-spacing: 8px;
}
.sportsmenLinkText {
  color: #000;
  font-family: 'Francois One', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  /* font-size: 0.875rem; */
  font-size: 1rem;
  letter-spacing: 0.8px;
  text-align: center;
  line-height: 20px;
  margin: 0px;
  padding: 0px;
  width: 397px;
  display: block;
  cursor: pointer;
}
.sportsmenLinkText .line2 {
  font-size: 1.125rem;
}

.headerHoverImg {
  display: block;
  position: absolute;
  bottom: 0;
}

.titleImg {
  max-width: 100%;
  /* margin-bottom: 20px; */
  margin-bottom: 8px;
}
.titleImg1Line {
  display: inline;
}
.titleImg2Lines {
  display: none;
}

.nav_link {
  color: white;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-style: italic;
  font-size: 1.75rem;
  letter-spacing: 1px;
  line-height: 2.1875rem;
  text-shadow: 1px 1px 2px rgba(28,16,23,0.83);
  margin: 0px;
  padding: 0px;
  width: fit-content;
  z-index: 1000;
}
.nav_link_small {
  display: none;
}
.nav_link_big {
  display: block;
}
#nav_prev {
  text-align: left;
  padding-left: var(--linkGutter);
}
#nav_next {
  text-align: right;
  float: right;
  padding-right: var(--linkGutter);
}
#nav_back { 
  display: block;
  position: fixed;
  top: auto;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  padding: 0 20px;
}
#nav_prev:hover, #nav_next:hover, #nav_back:hover {
  color:	#EED047;
  cursor: pointer;
}

.publication_mainText {
  font-family: 'NeueHaasGroteskText Pro55', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  text-align: justify;
  color: #FFFFFF;
  font-size: 1.1875rem;
  line-height: 1.9375rem;
  letter-spacing: 1px;
  text-shadow: 0px 0px 14px rgba(0,0,0,0.19),0px 0px 14px rgba(0,0,0,0.19)/* glow */,
  0px 0px 29px rgba(0,0,0,0.57)/* drop shadow*/;
  /* See styles.css for further styles */
}

.videoTitleText {
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  text-align: center;
  color: #FFFFFF;
  font-size: 1.75rem;
  line-height: 2rem;
  letter-spacing: 1px;
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
@media (max-width: 575.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
    margin: 10px 0px;
    padding: 0px 60px;
  }
  .headerText {
    line-height: 1.4375rem;
    font-size: 1rem;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {  
  .titleImg {
    max-width: 100%;
    padding: 15px 40px 10px 70px;
    margin: 0px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
    margin: 10px 0px;
    padding: 0px 80px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  .titleImg {
    padding: 0px 100px;
  }
}

/* Special - Larger devices (desktops, 1200px and up) */
@media (min-width: 1200px) and (max-width: 1499.98px) {
  .headerText, .titleImg {
    padding: 0px 120px;
  }
}

/* Special */
@media (max-width: 1399.98px) { 
  .headerImageCol {   
    display: none;
  }
}

</style>
