<template>
  <Layout>  
    <header :style="headerStyles">
      <b-container fluid class="slideshowOverlay">
        <b-row align-v="center">

          <b-col cols="3" class="headerImageCol" style="text-align: right">            
            <g-image alt="Hunter" v-if="headerLeftImg != null" :src="headerLeftImg" id="headerLeftImg" />
          </b-col>
          
          <b-col id="headerItems">          
            <g-image :src="titleImg1Line" class="titleImg titleImg1Line" />
            <g-image :src="titleImg2Lines" class="titleImg titleImg2Lines" />

            <div v-if="windowWidth < 992 && !showIntro" v-b-toggle.collapse-1 class="collections_headerText" style="font-style: italic" @click="showIntro = true">
              Read intro
              <svg viewBox="0 0 20 20" width="20" height="20" class="arrow">
                <line x1="1" y1="4.5" x2="9" y2="13" />
                <line x1="8" y1="13" x2="16" y2="4.5" />
              </svg>
            </div>

            <div v-else-if="windowWidth < 992 && showIntro" v-b-toggle.collapse-1 class="collections_headerText" style="font-style: italic" @click="showIntro = false">
              Hide intro
              <svg viewBox="0 0 20 20" width="20" height="20" class="arrow">
                <line x1="1" y1="13" x2="9" y2="4.5" />
                <line x1="8" y1="4.5" x2="16" y2="13" />
              </svg>
            </div>

            <div v-else v-html="node.content" class="collections_headerText" />

            <b-row align-v="start" align-h="center" style="min-height:68px; padding-top:8px">
              <b-col sm="1" md="2" class="d-none d-sm-block" />

              <b-col cols="6" sm="4" md="3" style="padding:0 5px">
                <div 
                  v-scroll-to="{ el:'#postcardHistory', duration:1500, easing:'ease' }"
                  class="sportsmenLinkText collections_headerLinkText" 
                  id="sportsmenMoreInfoText"
                  @mouseover="updateSportsmenSiteHover(true)" 
                  @mouseleave="updateSportsmenSiteHover(false)" 
                >
                  <div v-if="windowWidth > 484">
                    <span>MORE INFORMATION ON</span>
                    <br><span>Old-Time Sportsmen</span>
                  </div>
                  <div v-else-if="windowWidth > 479">
                    <span>MORE INFORMATION <br>ON</span>
                    <br><span>Old-Time Sportsmen</span>
                  </div>
                  <div v-else>
                    <span>MORE INFORMATION <br>ON</span>
                    <br><span>Old-Time <br>Sportsmen</span>
                  </div>

                  <g-image class="sportsmenSiteHoverImg" alt="Fishing fly line" :src="sportsmenSiteHoverImg" :class="{ showImage: sportsmenSiteHover }" />
                </div>
              </b-col>

              <b-col sm="1" md="2" class="d-none d-sm-block" />
              
              <b-col cols="6" sm="4" md="3" style="padding:0 5px">
                <a :href="sportsmenGalleryLink" target="_blank"
                  class="sportsmenLinkText collections_headerLinkText"
                  @mouseover="updateSportsmenGalleryHover(true)" 
                  @mouseleave="updateSportsmenGalleryHover(false)"
                >
                  <div v-if="windowWidth > 350">
                    <span>OPEN A NEW TAB TO SEE THE</span>
                    <br><span>Old-Time Sportsmen Gallery</span>
                  </div>
                  <div v-else>
                    <span>OPEN A NEW TAB TO SEE THE</span>
                    <br><span>Old-Time Sportsmen <br>Gallery</span>
                  </div>

                  <g-image class="sportsmenGalleryHoverImg" alt="Old log cabin" :src="sportsmenGalleryHoverImg" :class="{ showImage: sportsmenGalleryHover }" />
                </a>
              </b-col>

              <b-col sm="1" md="2" class="d-none d-sm-block" />
            </b-row>            
          </b-col>
          
          <b-col cols="3" class="headerImageCol" style="text-align:left">            
            <g-image alt="ducks" v-if="headerRightImg != null" :src="headerRightImg" id="headerRightImg" />
          </b-col>

        </b-row>
      </b-container>
    </header>
        
    <b-collapse id="collapse-1">
      <div v-html="node.content" class="collections_headerText" id="headerTextDevice" />
    </b-collapse>


    <CollectionViewer
      :images="images"
      :index="imageIndex"
      :disable-scroll="true"
      :prevCollection="prev_collection"
      :nextCollection="next_collection"
    />


    <section id="postcardHistory">
      <b-container fluid class="slideshowOverlay">
        <b-row align-v="center">

          <b-col v-if="windowWidth >= 2200" align-self="start" style="padding-top:250px">
            <slideshow-zoom :slides="people_images" />
          </b-col>
          
          <b-col> 
            <div id="postcardHistory__textDiv">
              <h2 class="title">{{ postcardHistory.title }}</h2>
              <div class="pb-2 pb-sm-3 pb-md-4 pb-lg-5">
                <div class="pb-4 pb-xl-2 pt-3 pt-xl-0 mb-3 mb-xl-0 pl-5 pr-3" style="float:right">
                  <flip-postcard
                    v-if="windowWidth > 850"
                    :imgFront="postcardHistory.postcards[0].imgFront"
                    :imgBack="postcardHistory.postcards[0].imgBack"
                    :caption="postcardHistory.postcards[0].caption"
                    :seeTheBack=false
                    :width="480"
                    :height="297"
                  />
                  <flip-postcard
                    v-else-if="windowWidth >= 768"
                    :imgFront="postcardHistory.postcards[0].imgFront"
                    :imgBack="postcardHistory.postcards[0].imgBack"
                    :caption="postcardHistory.postcards[0].caption"
                    :seeTheBack=false
                    :width="408"
                    :height="252.45"
                  />
                </div>
                <br v-if="windowWidth >= 768" />
                <span v-html="postcardHistory.textPt1" class="postcardText" />

                <img :src="postcardHistory.images[0].img" class="py-3 pr-3" style="float:left; max-width:55%">
                <span v-html="postcardHistory.textPt2" class="postcardText" />

                <img :src="postcardHistory.images[1].img" class="pl-3" style="float:right; max-width:55%">
                <span v-html="postcardHistory.textPt3" class="postcardText" />
              </div>

              
              <h2 class="title">{{ about.title }}</h2>
              <span v-html="about.text" class="postcardText" />

            </div>
          </b-col>

          <b-col v-if="windowWidth >= 2200" align-self="start">
            <div id="postcardsSidebar" class="pt-5">
              <flip-postcard
                :imgFront="postcardHistory.postcards[1].imgFront"
                :imgBack="postcardHistory.postcards[1].imgBack"
                :imgBackLarge="postcardHistory.postcards[1].imgBackLarge"
                :caption="postcardHistory.postcards[1].caption"
                :width="487"
                :height="307"
                :seeTheBack=true
                :backText="renderMarkdown(postcardHistory.postcards[1].backText)"
                :backTextIsHTML=true
                class="sidePostcards"
              />
              <flip-postcard
                :imgFront="postcardHistory.postcards[2].imgFront"
                :imgBack="postcardHistory.postcards[2].imgBack"
                :imgBackLarge="postcardHistory.postcards[2].imgBackLarge"
                :caption="postcardHistory.postcards[2].caption"
                :width="487"
                :height="309"
                :seeTheBack=true
                :backText="renderMarkdown(postcardHistory.postcards[2].backText)"
                :backTextIsHTML=true
                class="sidePostcards"
              />
              <flip-postcard
                :imgFront="postcardHistory.postcards[3].imgFront"
                :imgBack="postcardHistory.postcards[3].imgBack"
                :imgBackLarge="postcardHistory.postcards[3].imgBackLarge"
                :caption="postcardHistory.postcards[3].caption"
                :width="487"
                :height="310"
                :seeTheBack=true
                :backText="renderMarkdown(postcardHistory.postcards[3].backText)"
                :backTextIsHTML=true
                class="sidePostcards"
              />
            </div>
          </b-col>
        </b-row>



        <b-row v-if="windowWidth < 2200" align-v="center" align-h="center">

          <b-col v-if="windowWidth > 1149" align-self="start" style="padding-top:250px">
            <slideshow-zoom :slides="people_images" />
          </b-col>
          
          <b-col align-self="start" :style="postcardsSidebarStyles">
            <div id="postcardsSidebar" class="pt-4">
              <flip-postcard
                v-if="windowWidth < 768"
                :imgFront="postcardHistory.postcards[0].imgFront"
                :imgBack="postcardHistory.postcards[0].imgBack"
                :caption="postcardHistory.postcards[0].caption"
                :seeTheBack="windowWidth >= 576"
                :width="postcardSize(0).width"
                :height="postcardSize(0).height"
              />
              <flip-postcard
                :imgFront="postcardHistory.postcards[1].imgFront"
                :imgBack="postcardHistory.postcards[1].imgBack"
                :imgBackLarge="postcardHistory.postcards[1].imgBackLarge"
                :caption="postcardHistory.postcards[1].caption"
                :width="postcardSize(1).width"
                :height="postcardSize(1).height"
                :seeTheBack="windowWidth >= 576"
                :backText="renderMarkdown(postcardHistory.postcards[1].backText)"
                :backTextIsHTML=true
                class="sidePostcards"
              />
              <flip-postcard
                :imgFront="postcardHistory.postcards[2].imgFront"
                :imgBack="postcardHistory.postcards[2].imgBack"
                :imgBackLarge="postcardHistory.postcards[2].imgBackLarge"
                :caption="postcardHistory.postcards[2].caption"
                :width="postcardSize(2).width"
                :height="postcardSize(2).height"
                :seeTheBack="windowWidth >= 576"
                :backText="renderMarkdown(postcardHistory.postcards[2].backText)"
                :backTextIsHTML=true
                class="sidePostcards"
              />
              <flip-postcard
                :imgFront="postcardHistory.postcards[3].imgFront"
                :imgBack="postcardHistory.postcards[3].imgBack"
                :imgBackLarge="postcardHistory.postcards[3].imgBackLarge"
                :caption="postcardHistory.postcards[3].caption"
                :width="postcardSize(3).width"
                :height="postcardSize(3).height"
                :seeTheBack="windowWidth >= 576"
                :backText="renderMarkdown(postcardHistory.postcards[3].backText)"
                :backTextIsHTML=true
                class="sidePostcards"
              />
            </div>
          </b-col>

        </b-row>

      </b-container>
    
    </section>

    <footer :style="footerStyles" />

  </Layout>
</template>

<page-query>
{
  OldTimeSportsmen: allOldTimeSportsmen {
    edges {
      node {
        id
        title
        titleImg1Line
        titleImg2Lines
        headerBgImg
        backgroundImgOpacity
        headerLeftImg
        headerRightImg
        sportsmenSiteHoverImg
        sportsmenBookHoverImg
        sportsmenSiteLink
        footerImg
        content
        images {
          img
        }
        postcardHistory {
          title
          textPt1
          textPt2
          textPt3
          images {
            img
            altText
          }
          postcards {
            imgFront
            imgBack
            imgBackLarge
            caption
            backText
          }
        }
        about {
          title
          text
        }
        people {
          img
        }
      }
    }
  }	
}
</page-query>

<static-query>
{
  Collections: allCollectionsIndex {
    edges {
      node {
        collections {
          title
        }
      }
    }
  }	
}
</static-query>


<script scoped>
import CollectionViewer from '../../components/CollectionViewer.vue'
import FlipPostcard from '../../components/FlipPostcard.vue'
import SlideshowZoom from '../../components/SlideshowZoom.vue'

const slugify = require('@sindresorhus/slugify')
const MarkdownIt = require('markdown-it')

export default {
  metaInfo() {
    return {
      title: this.title
    }
  },

  data() {
    return {
      imageIndex: 0,
      sportsmenSiteHover: false,
      sportsmenGalleryHover: false,
      showIntro: false,
      windowWidth: 0.0,
      postcardSizes: [
        {width: 480, height: 297},
        {width: 487, height: 307},
        {width: 487, height: 309},
        {width: 487, height: 310},
      ]
    }
  },

  computed: {
    node() {
      return this.$page.OldTimeSportsmen.edges[0].node
    },
    title() {
      return this.node.title
    },
    titleImg1Line() {
      return this.node.titleImg1Line
    },
    titleImg2Lines() {
      return this.node.titleImg2Lines
    },
    headerBgImg() {
      return this.node.headerBgImg
    },
    headerBgImgOpacity() {
      return this.node.hasOwnProperty('backgroundImgOpacity') ? this.node.backgroundImgOpacity : 0.5
    },
    headerLeftImg() {
      return this.node.headerLeftImg
    },
    headerRightImg() {
      return this.node.headerRightImg
    },
    sportsmenSiteHoverImg() {
      return this.node.sportsmenSiteHoverImg
    },
    sportsmenGalleryHoverImg() {
      return this.node.sportsmenBookHoverImg
    },
    sportsmenGalleryLink() {
      return this.node.sportsmenSiteLink
    },
    footerImg() {
      return this.node.footerImg
    },
    headerStyles() {
      return {
        '--headerBgImg': 'url(' + this.headerBgImg + ')',
        '--bgOpacity': this.headerBgImgOpacity / 100
      }
    },
    footerStyles() {
      return {
        '--footerBgImg': 'url(' + this.footerImg + ')'
      }
    },
    postcardsSidebarStyles() {
      if (this.windowWidth < 1150) {
        return {
          flex: 0
        }
      }
    },
    images() {
      return this.node.images
    },
    people_images() {
      return this.node.people
    },
    collections() {
      return this.$static.Collections.edges[0].node.collections
    },    
    collection_names() {
      return this.collections.map(x => x.title);
    },
    collectionIndex() {
      return this.collection_names.indexOf(this.title)
    },
    prev_collection() {
      const i = this.collectionIndex
      if (i === 0)
        var prev_i = this.collection_names.length - 1
      else
        prev_i = i - 1
      let collection = {...this.collections[prev_i]}
      collection.link = slugify(collection.title)
      return collection
    },
    next_collection() {
      const i = this.collectionIndex 
      if (i === this.collection_names.length - 1)
        var next_i = 0
      else
        next_i = i + 1
      let collection = {...this.collections[next_i]}
      collection.link = slugify(collection.title)
      return collection
    },
    postcardHistory() {
      return this.node.postcardHistory
    },
    about() {
      return this.node.about
    }
  },

  watch: {
    windowWidth: function (val) {
      if (val >= 576 && val <= 1366) {
        this.sportsmenSiteHover = true
        this.sportsmenGalleryHover = true
      }
      else {
        this.sportsmenSiteHover = false
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
    updateSportsmenSiteHover(val) {
      if (this.windowWidth > 1366)
        this.sportsmenSiteHover = val
    },
    updateSportsmenGalleryHover(val) {
      if (this.windowWidth > 1366)
        this.sportsmenGalleryHover = val      
    },
    postcardSize(index) {
      if (this.windowWidth >= 620)
        return this.postcardSizes[index]
      else {
        let factor = this.windowWidth / 620
        return {
          width: factor * this.postcardSizes[index].width,
          height:  factor * this.postcardSizes[index].height 
        }
      }
    }
  },

  components: {
    CollectionViewer,
    FlipPostcard,
    SlideshowZoom
  },
}
</script>



<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');
@import url('https://fonts.googleapis.com/css?family=Crimson+Text:600,600i&display=swap');
@import url('https://fonts.googleapis.com/css?family=Francois+One&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}
@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url('../../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../../assets/fonts/nhaasgrotesktxpro-65md.woff') format('woff'), /* Pretty Modern Browsers */
       url('../../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.layout {
  padding: 0;
  overflow: hidden; /* added for pseudo-element */
  position: relative; /* added for pseudo-element */
}

header {
  position: relative;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
}
header:after  {
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
}
#headerRightImg {
  min-width: 230px;
  max-width: 70%;
}

#headerItems {
  width: 1240px; 
  max-width: 80vw; 
  text-align: center;
  margin: 0 auto;
}
.collections_headerText {
  color: #000;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.25rem;
  letter-spacing: 1px;
  text-align: center;
  margin: 0px;
  padding: 0px;
}
.collections_headerText > p { 
  margin: 0px;
  padding: 0px;
}

.collections_headerLinkText {
  color: #000;
  font-family: 'Francois One', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 0.875rem;
  letter-spacing: 0.8px;
  text-align: center;
  line-height: 20px;
  margin: 0px;
  padding: 0px;
  width: 220px;
}
.collections_headerLinkText > span:nth-child(3) {
  font-size: 0.9375rem;
}

#headerTextDevice {
  color:#ECECEC;
  font-size: 0.925rem;
  margin: 20px;
}

.arrow {
  margin-left: 5px;
  margin-right: -3px;
}
.arrow > line {
  stroke: black;
  stroke-width: 2px;
}

.sportsmenLinkText {
  display: block;
  text-align: center; 
  padding: 0;
  cursor: pointer;
}

.sportsmenSiteHoverImg {
  max-width: 357px; 
  position: absolute;
  right: 60px; 
  top: -7px;
  display: none;
}
#sportsmenMoreInfoText {
  float: right;
}

.sportsmenGalleryHoverImg {
  max-width: 389px; 
  position: absolute;
  left: -70px; 
  top: -6px;
  display: none;
}

.showImage {
  display: block;
}

.titleImg {
  max-width: 652px;
  margin-bottom: 4px;
}
.titleImg1Line {
  display: inline;
}
.titleImg2Lines {
  display: none;
}


footer {
  position: relative;
  text-align: center;
  padding: 0 0 346px 0;
}
footer:after  {
  content : "";
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  background: var(--footerBgImg) no-repeat center;
  background-size: cover;
  width: 100%;
  height: 536px;
  z-index: -1;
}



/* To fix poor scroll speed using "background-size: cover" and "background-attachment: fixed"
Ref: https://www.fourkitchens.com/blog/article/fix-scrolling-performance-css-will-change-property/ */
.layout::before {
  content: ' ';
  position: fixed;  /* instead of background-attachment */
  width: 100%;
  top: 0;
  left: 0;
  background-color: black;
  background-size: cover;
  will-change: transform; /* creates a new paint layer */
  z-index: -3;
}

#postcardHistory {
    // background-color: #E6E5DF;
    position: relative;
    background-color: transparent;
    width: 100%;

  &__textDiv {
    width: 1058px;
    margin: 0 auto;

    .title {
      font-family: 'Francois One', sans-serif;
      font-feature-settings: 'liga';
      font-weight: 400;
      font-size: 2.5rem;
      line-height: 2.75rem;
      letter-spacing: 0.8px;
      text-align: center;
      text-transform: uppercase;
      margin: 0;
      padding: 24px 0;
    }

    .postcardText {
      font-family: 'Crimson Text', serif;
      font-feature-settings: 'liga';
      font-weight: 600;
      font-size: 1.3125rem;
      line-height: 1.5625rem;
      text-align: left;
      margin: 0px;
      padding: 0px;
    }

    .caption {      
      font-family: 'Crimson Text', serif;
      font-feature-settings: 'liga';
      font-style: italic;
      font-weight: 600;
      font-size: 1.125rem;
      line-height: 1.375rem;
      letter-spacing: 1px;
      text-align: left;
      margin: 0px;
      padding: 12px 0;
    }
  }
}

#postcardHistory:after  {
  content : "";
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #E6E5DF;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.sidePostcards {
  margin:70px 0
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .titleImg {
    max-width: 82%;
  }
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
  }
  .collections_headerLinkText,
  .collections_headerLinkText > span:nth-child(3) {
    width: auto;
    font-size: 14px;
  }
  .sportsmenLinkText {
    width: fit-content;
    margin: 0 auto;
  }
  #sportsmenMoreInfoText {
    float: none;
  }
  #postcardHistory {
    &__textDiv {
      width: 90%;
    }
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .titleImg {
    max-width: 90%;
    padding: 15px 0;
  }
  .sportsmenSiteHoverImg {
    height: 72px;
    right: 76px;
    top: 0px;
  }
  .sportsmenGalleryHoverImg {
    height: 65px;
    left: -58px;
    top: 0px;
  }
  #postcardHistory {
    &__textDiv {
      width: 90%;
    }
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {  
  .titleImg {
    max-width: 90%;
  }
  .titleImg {
    max-width: 66%;
  }
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
  }
  #postcardHistory {
    &__textDiv {
      width: 90%;
    }
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) { 
  #postcardHistory {
    &__textDiv {
      width: 90%;
    }
  }
}

/* Special */
@media only screen and (max-width: 1399.98px) { 
  .headerImageCol {   
    display: none;
  }
}

</style>
