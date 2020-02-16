<template>
  <!-- <Layout :style="layoutStyle">   -->
  <Layout>  
    <header id="header" :style="headerStyle">
      <div id="headerItems">
        <g-image :src="titleImg" id="titleImg" class="my-4" />
        <div v-html="$page.collection.content" id="mainContent" />
      </div>
    </header>

    <!-- <div :style="navLinksVisibility" class="navLinksContainer">
      <g-link :to="'/collections/' + prev_collection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="prev_collection.name" class="nav_link" id="nav_prev">PREV</g-link>
      <g-link :to="'/collections/' + prev_collection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="prev_collection.name" class="nav_link" id="nav_previous">PREVIOUS COLLECTION</g-link>
      <g-link :to="'/collections/' + prev_collection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="next_collection.name" class="nav_link" id="nav_next">NEXT COLLECTION</g-link>
    </div> -->

    <!-- <b-container fluid class="wrapper">
      <b-container fluid class="main-col"> 
        <h1 id="heading"> {{ heading }} </h1>
        <div v-html="$page.collection.content" id="mainContent" />
      </b-container> -->

      <!-- <b-container fluid class="mediaItemsContainer">
        <b-row align-h="center" id="mediaItemsRow">
          <b-col v-for="(item,index) in $page.friend.mediaItems" :key="index" class="mediaItems p-2" v-b-toggle="String(index+1)" @click="mediaItemClick(item, index)">
            <g-image :src="item.thumbnailImg" class="mediaItemsImg" :id="'mediaItemImg'+index" />
            <br />
            <span class="mediaItemsText mediaItemsLabel">{{ item.label }}</span>
            <b-collapse v-if="item.galleries[0].label" :id="String(index+1)" accordion="mediaItems-accordion">
              <div v-for="(gallery,galIndex) in item.galleries" :key="galIndex">
                <br />
                <span
                  @click="galleryIndex = galIndex; setMediaIndexToZero(item.mediaType)"
                  class="mediaItemsText galleriesLabel py-2 pr-2"
                >
                  {{ gallery.label }}
                </span>
              </div>
            </b-collapse>
          </b-col>
        </b-row>

        <b-row align-h="center" class="text-center">
          <b-col>
            <div :style="navLinksVisibility" class="navLinksContainer">
              <g-link to="/collections/" class="nav_link pt-3" id="nav_back">BACK TO COLLECTIONS MENU</g-link>
            </div>
          </b-col>
        </b-row>
        
      </b-container> -->
    <!-- </b-container> -->


    <!-- <ImageLightBox
      :images="images"
      :index="imageIndex"
      :disable-scroll="true"
      @close="imageIndex = null; galleryIndex = null"
    /> -->

  </Layout>
</template>

<page-query>
query ($id: ID!) {
  collection: collections(id: $id) {
    title
    titleImg
    headerBgImg
    backgroundImgOpacity
    content
    images {
      img
      opacity
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
          link
        }
      }
    }
  }	
}
</static-query>


<script scoped>
import ImageLightBox from '../components/ImageLightBox.vue'

var VueScrollTo = require('vue-scrollto');

export default {
  metaInfo() {
    return {
      title: this.title
    }
  },

  data() {
    return {
      mediaItemIndex: null,
      galleryIndex: null,
      imageIndex: null,
      videoIndex: null,
      audioIndex: null,
      windowHeight: 0,      
      documentHeight: 0
    }
  },

  computed: {
    title() {
      return this.$page.collection.title
    },
    titleImg() {
      return this.$page.collection.titleImg
    },
    // heading() {
    //   return this.$page.collection.heading ? this.$page.collection.heading : this.name
    // },
    headerBgImg() {
      return this.$page.collection.headerBgImg
    },
    // mediaItems() {
    //   return this.$page.collection.mediaItems
    // },
    images() {
      return this.$page.collection.images
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
      return this.collections[prev_i]
    },
    next_collection() {
      let i = this.collection_names.indexOf(this.title)      
      if (i === this.collection_names.length - 1)
        var next_i = 0
      else
        next_i = i + 1
      return this.collections[next_i]
    },
    // layoutStyle() {
    //   return {
    //     '--backgroundImg': 'url(' + this.$page.friend.backgroundImg + ')',
    //     '--backgroundOpacity': this.$page.friend.backgroundOpacity / 100
    //   }
    // },    
    headerStyle() {
      return {
        '--headerBgImg': 'url(' + this.headerBgImg + ')'
      }
    },
    navLinksVisibility() {
      let css = {}
      if (this.imageIndex == null & this.videoIndex == null) {
        css.visibility = 'visible'
        css.opacity = 1
      }
      else {
        css.visibility = 'hidden'
        css.opacity = 0
      }
      return css
    }
  },

  methods: {
    // mediaItemClick(mediaItem, index) {
    //   if (mediaItem.mediaType == 'images' || mediaItem.mediaType == 'videos' || mediaItem.mediaType == 'audio') {
    //     this.mediaItemIndex = index
    //     if (mediaItem.galleries.length == 1) {
    //       this.galleryIndex = 0
    //       this.setMediaIndexToZero(mediaItem.mediaType)
    //     }
    //     else {
    //       this.$scrollTo('#mediaItemImg' + index, 500)
    //     }
    //   }
    //   else if (mediaItem.mediaType == 'link') {
    //     this.$router.push(mediaItem.galleries[0].url)
    //   }
    // },
    setMediaIndexToZero(mediaType) {
      if (mediaType == 'images') {
        this.imageIndex = 0
      }
      if (mediaType == 'videos') {
        this.videoIndex = 0
      }
      if (mediaType == 'audio') {
        this.audioIndex = 0
      }
    },
    getDocumentHeight() {
      // ref: https://stackoverflow.com/a/1147768
      const body = document.body
      const html = document.documentElement  
      this.documentHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight )
    }
  },

  mounted() {    
    this.windowHeight = window.innerHeight
    this.getDocumentHeight()

    this.$nextTick(() => {

      window.addEventListener('scroll', this.getDocumentHeight);
      
      window.addEventListener('resize', () => {
        this.windowHeight = window.innerHeight 
        this.getDocumentHeight()
      });
    })
  },

  components: {
    ImageLightBox
  },
}
</script>



<style scoped>
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

#header {
  background-image: var(--headerBgImg);
  background-position: center;
  background-color: rgba(0, 0, 0, 0.32);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
}

#headerItems {
  width: 1036px; 
  text-align: center;
  margin: 0 auto;
}
#mainContent {
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  text-shadow: 1px 1px 4px rgba(0,0,0,0.29);
  color: #FFFFFF;
  text-align: center;
  letter-spacing: 1px;
  line-height: 26px;
  font-size: 18px;
  font-weight: 500;
  margin: 0px;
  padding: 0px;
}

#titleImg {
  max-width: 70%;
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
  background: var(--backgroundImg) no-repeat center center;
  background-size: cover;
  will-change: transform; /* creates a new paint layer */
  z-index: -1;
  opacity: var(--backgroundOpacity);
}

.navLinksContainer {
  visibility: visible;
  opacity: 1;
  transition: visibility 0.5s linear 1s, opacity 0.5s linear 1s;
}
.nav_link {
  color: white; 
  display: block;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-style: italic;
  font-size: 39px;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(28,16,23,0.83);
  margin: 0px;
  padding: 0px;
}
.nav_link:hover,
.mediaItems:hover,
.mediaItems:hover .mediaItemsLabel {
  color:	#EED047;
  cursor: pointer;
}
#nav_prev, #nav_previous {
  position: fixed;
  top: 44%;
  left: 5%;
  text-align: left;
}
#nav_prev {
  display: none;
}
#nav_next {
  position: fixed;
  top: 44%;
  right: 5%;
  text-align: right;
}
#nav_back {
  text-align: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.main-col {
  max-width: 855px;
  padding: 50px 0 10px 0;
}

#heading {
  color: #FFFFFF;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 42px;
  font-style: normal;
  text-align: left;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(28,16,23,0.83);
  letter-spacing: 2px;
  line-height: 50px;
  margin: 0px;
  padding: 0px;
}

.mediaItemsContainer {
  width: 100%;
  padding: 4px 20% 20px 20%;
}
.mediaItems {
  max-width: 295px;
}
.mediaItemsImg {
  max-width: 275px;
  height: 193px;
}
.mediaItemsText {
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  text-align: left;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.16);
  margin: 0px;
  padding: 0px;
}
.mediaItemsLabel {
  color: white;
  font-size: 20px;
  line-height: 30px;
}
.galleriesLabel {
  color: #ECECEC;
  font-size: 17px;
  line-height: 30px;
}
.galleriesLabel:hover {
  color: #2CACE4;
  cursor: pointer;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .nav_link {
    font-size: 5vw;
  }
  #nav_previous {
    display: none;
  }
  #nav_prev {
    display: block;
    left: 4%;
  }
  #nav_next {
    right: 4%;
  }
  .main-col, .galleriesContainer {
    max-width: 61.46%;
  }
  #heading {
    font-size: 31.5px;
  }
  #mainContent {
    font-size: 15px;
    line-height: 24px;
  }
  .galleriesContainer {
    padding: 4px 0 20px 0;
  }
  .galleries {
    min-width: 100%;
  }
  .galleriesImg {
    max-width: 100%;
    height: auto;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .nav_link {
    font-size: 30px;
  }
  #nav_previous {
    display: none;
  }
  #nav_prev {
    display: block;
  }
  .main-col, .galleriesContainer {
    max-width: 61.46%;
  }
  #heading {
    font-size: 36.75px;
  }
  #mainContent {
    font-size: 17.5px;
    line-height: 28px;
  }
  .galleriesContainer {
    padding: 4px 0 20px 0;
  }
  .galleries {
    min-width: 50%;
    width: auto;
  }
  .galleriesImg {
    max-width: 100%;
    height: auto;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  #nav_previous {
    display: none;
  }
  #nav_prev {
    display: block;
  }
  .main-col, .galleriesContainer {
    max-width: 61.46%;
  }
  #heading {
    font-size: 36.75px;
  }
  #mainContent {
    font-size: 17.5px;
    line-height: 28px;
  }
  .galleriesContainer {
    padding: 4px 0 20px 0;
  }
  .galleries {
    min-width: 50%;
    width: auto;
  }
  .galleriesImg {
    max-width: 100%;
    height: auto;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  #nav_previous {
    display: none;
  }
  #nav_prev {
    display: block;
  }
  .main-col, .galleriesContainer {
    max-width: 61.46%;
  }
  .galleriesContainer {
    padding: 4px 0 20px 0;
  }
}

/* Special - Larger devices (desktops, 1200px and up) */
@media (min-width: 1200px) and (max-width: 1390.98px) { 
  .main-col, .galleriesContainer {
    max-width: 61.46%;
  }
  .galleriesContainer {
    padding: 4px 0 20px 0;
  }
}

</style>
