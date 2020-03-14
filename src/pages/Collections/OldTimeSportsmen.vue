<template>
  <Layout>  
    <header :style="headerStyles">

      <b-container fluid class="slideshowOverlay">
        <b-row align-v="center">
          <b-col style="text-align: right">            
            <g-image alt="Hunter" v-if="headerLeftImg != null" :src="headerLeftImg" id="headerLeftImg" style="max-width:357px"/>
          </b-col>

          
          <div id="headerItems">            
            <g-image :src="titleImg1Line" class="titleImg titleImg1Line" />
            <g-image :src="titleImg2Lines" class="titleImg titleImg2Lines" />
            <div v-html="$page.OldTimeSportsmen.edges[0].node.content" class="collections_headerText" />

            <b-row align-v="start" align-h="center" style="min-height:68px; padding-top:8px">
              <a :href="sportsmenSiteLink">
                <div v-if="sportsmenSiteHoverImg != null" id="sportsmenSiteHoverImgDiv">            
                  <g-image class="sportsmenSiteHoverImg" alt="Fishing fly line" :src="sportsmenSiteHoverImg" :class="{ showImage: sportsmenSiteHover }" />
                </div>

                <div id="sportsmenSiteText" @mouseover="sportsmenSiteHover = true" @mouseleave="sportsmenSiteHover = false">
                  <div class="collections_headerLinkText" style="margin-right:100px">
                    <span>COME VISIT THE</span>
                    <br>
                    <span>Old-Time Sportsmen Website</span>
                  </div>
                </div>
              </a>

              <a :href="sportsmenBookLink">
                <div v-if="sportsmenBookHoverImg != null" id="sportsmenBookHoverImgDiv">            
                  <g-image class="sportsmenBookHoverImg" alt="Old log cabin" :src="sportsmenBookHoverImg" :class="{ showImage: sportsmenBookHover }" />
                </div>

                <div id="sportsmenBookText" @mouseover="sportsmenBookHover = true" @mouseleave="sportsmenBookHover = false">
                  <div class="collections_headerLinkText" style="margin-right:150px">
                    <span>AND SEE THE</span>
                    <br>
                    <span>Old-Time Sportsmen Book</span>
                  </div>
                </div>
              </a>
            </b-row>            
          </div>

          
          <b-col style="text-align: left">            
            <g-image alt="ducks" v-if="headerRightImg != null" :src="headerRightImg" id="headerRightImg" style="max-width:389px"/>
          </b-col>
        </b-row>
      </b-container>

    </header>

    <CollectionViewer
      :images="images"
      :index="imageIndex"
      :disable-scroll="true"
      :prevCollection="prev_collection"
      :nextCollection="next_collection"
      @close="imageIndex = null"
    />

    <section id="postcardHistory">
      <div id="postcardHistory__textDiv">
        <h2 class="title">{{ postcardHistory.title }}</h2>
        <div class="pb-5">
          <div class="pb-2 pl-5 pr-3" style="float: right">
            <flip-postcard
              :imgFront="postcardHistory.postcards[0].imgFront"
              :imgBack="postcardHistory.postcards[0].imgBack"
              :caption="postcardHistory.postcards[0].caption"
              :width="480"
              :height="297"
            />
          </div>
          <br />
          <span v-html="postcardHistory.textPt1" class="postcardText" />

          <img :src="postcardHistory.images[0].img" class="py-3 pr-3" style="float: left">
          <span v-html="postcardHistory.textPt2" class="postcardText" />

          <img :src="postcardHistory.images[1].img" class="pl-3" style="float: right;">
          <span v-html="postcardHistory.textPt3" class="postcardText" />
        </div>

        
        <h2 class="title">{{ about.title }}</h2>
        <span v-html="about.text" class="postcardText" />

      </div> 

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
        sportsmenSiteLink
        sportsmenBookHoverImg
        sportsmenBookLink
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
            caption
          }
        }
        about {
          title
          text
        }
      }
    }
  }	
}
</page-query>

<static-query>
{
  Collections: allCollectionsPage {
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

const slugify = require('@sindresorhus/slugify')

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
      sportsmenBookHover: false
    }
  },

  computed: {
    title() {
      return this.$page.OldTimeSportsmen.edges[0].node.title
    },
    titleImg1Line() {
      return this.$page.OldTimeSportsmen.edges[0].node.titleImg1Line
    },
    titleImg2Lines() {
      return this.$page.OldTimeSportsmen.edges[0].node.titleImg2Lines
    },
    headerBgImg() {
      return this.$page.OldTimeSportsmen.edges[0].node.headerBgImg
    },
    headerBgImgOpacity() {
      return this.$page.OldTimeSportsmen.edges[0].node.hasOwnProperty('backgroundImgOpacity') ? this.$page.OldTimeSportsmen.edges[0].node.backgroundImgOpacity : 0.5
    },
    headerLeftImg() {
      return this.$page.OldTimeSportsmen.edges[0].node.headerLeftImg
    },
    headerRightImg() {
      return this.$page.OldTimeSportsmen.edges[0].node.headerRightImg
    },
    sportsmenSiteHoverImg() {
      return this.$page.OldTimeSportsmen.edges[0].node.sportsmenSiteHoverImg
    },
    sportsmenSiteLink() {
      return this.$page.OldTimeSportsmen.edges[0].node.sportsmenSiteLink
    },
    sportsmenBookHoverImg() {
      return this.$page.OldTimeSportsmen.edges[0].node.sportsmenBookHoverImg
    },
    sportsmenBookLink() {
      return this.$page.OldTimeSportsmen.edges[0].node.sportsmenBookLink
    },
    footerImg() {
      return this.$page.OldTimeSportsmen.edges[0].node.footerImg
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
    images() {
      return this.$page.OldTimeSportsmen.edges[0].node.images
    },
    collections() {
      return this.$static.Collections.edges[0].node.collections
    },    
    collection_names() {
      return this.collections.map(x => x.title);
    },
    prev_collection() {
      let i = this.collection_names.indexOf(this.title)
      if (i === 0)
        var prev_i = this.collection_names.length - 1
      else
        prev_i = i - 1
      let collection = {...this.collections[prev_i]}
      collection.link = slugify(collection.title)
      return collection
    },
    next_collection() {
      let i = this.collection_names.indexOf(this.title)      
      if (i === this.collection_names.length - 1)
        var next_i = 0
      else
        next_i = i + 1
      let collection = {...this.collections[next_i]}
      collection.link = slugify(collection.title)
      return collection
    },
    postcardHistory() {
      return this.$page.OldTimeSportsmen.edges[0].node.postcardHistory
    },
    about() {
      return this.$page.OldTimeSportsmen.edges[0].node.about
    }
  },

  components: {
    CollectionViewer,
    FlipPostcard
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

#headerItems {
  width: 1240px; 
  max-width: 90vw; 
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

#sportsmenSiteHoverImgDiv {
  position: relative;
  text-align: right; 
  width: 205px; 
  padding-right: 0;
  cursor: pointer;
}
.sportsmenSiteHoverImg {
  max-width: 357px; 
  position: absolute; 
  right: -146px; 
  top: -7px;
  opacity: 0;
}
#sportsmenSiteText {
  text-align: right; 
  padding: 0;
  cursor: pointer;
}
#sportsmenSiteHoverImgDiv:hover .sportsmenSiteHoverImg {
  opacity: 1;
}
#sportsmenBookHoverImgDiv {
  position: relative;
  text-align: left;
  width: 100px;
  cursor: pointer;
}
.sportsmenBookHoverImg {
  max-width: 389px; 
  position: absolute; 
  right: -27px; 
  top: -6px;
  opacity: 0;
}
#sportsmenBookText {
  text-align: left;
  cursor: pointer;
}
#sportsmenBookHoverImgDiv:hover .sportsmenBookHoverImg {
  opacity: 1;
}

.showImage {
  opacity: 1;
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

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
}

/* Special - Larger devices (desktops, 1200px and up) */
@media (min-width: 1200px) and (max-width: 1390.98px) { 
}

</style>
