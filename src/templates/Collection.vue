<template>
  <Layout>
    <transition name="page" mode="out-in">
      <div :key="'collection_' + titleSlug"> <!-- Need a unique key for the transition above to work on route change -->
        <header id="header" :style="headerStyles">
          <div id="headerItems">
            <g-image :src="titleImg1Line" class="titleImg titleImg1Line" />
            <g-image :src="titleImg2Lines" class="titleImg titleImg2Lines" />

            <div v-if="windowWidth < 1200 && !showIntro" v-b-toggle.collapse-1 class="collection_headerText" style="font-style: italic" @click="showIntro = true">
              Read intro
              <svg viewBox="0 0 20 20" width="20" height="20" class="arrow">
                <line x1="1" y1="4.5" x2="9" y2="13" />
                <line x1="8" y1="13" x2="16" y2="4.5" />
              </svg>
            </div>

            <div v-else-if="windowWidth < 1200 && showIntro" v-b-toggle.collapse-1 class="collection_headerText" style="font-style: italic" @click="showIntro = false">
              Hide intro
              <svg viewBox="0 0 20 20" width="20" height="20" class="arrow">
                <line x1="1" y1="13" x2="9" y2="4.5" />
                <line x1="8" y1="4.5" x2="16" y2="13" />
              </svg>
            </div>
            
            <div v-else v-html="$page.collection.content" class="collection_headerText" />

          </div>
        </header>
        
        <b-collapse id="collapse-1">
          <div v-html="$page.collection.content" class="collection_headerText" id="headerTextDevice" />
        </b-collapse>
        

        <CollectionViewer
          :images="images"
          :index="imageIndex"
          :disable-scroll="true"
          :prevCollection="prev_collection"
          :nextCollection="next_collection"
          @close="imageIndex = null"
        />

      </div>
    </transition>

  </Layout>
</template>

<page-query>
query ($id: ID!) {
  collection: collections(id: $id) {
    title
    titleImg1Line
    titleImg2Lines
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
import CollectionViewer from '../components/CollectionViewer.vue'

const slugify = require('@sindresorhus/slugify')

export default {
  metaInfo() {
    return {
      title: this.title
    }
  },

  components: {
    CollectionViewer
  },

  data() {
    return {
      imageIndex: 0,
      showIntro: false,
      windowWidth: 0.0
    }
  },

  computed: {
    title() {
      return this.$page.collection.title
    },
    titleSlug() {
      return slugify(this.title)
    },
    titleImg1Line() {
      return this.$page.collection.titleImg1Line
    },
    titleImg2Lines() {
      return this.$page.collection.titleImg2Lines
    },
    headerBgImg() {
      return this.$page.collection.headerBgImg
    },
    headerBgImgOpacity() {
      return this.$page.collection.hasOwnProperty('backgroundImgOpacity') ? this.$page.collection.backgroundImgOpacity : 0.5
    },  
    headerStyles() {
      return {
        '--headerBgImg': 'url(' + this.headerBgImg + ')',
        '--bgOpacity': this.headerBgImgOpacity / 100
      }
    },
    images() {
      return this.$page.collection.images
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
  }
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
  position: relative;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
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

#headerItems {
  width: 1240px; 
  max-width: 90vw; 
  text-align: center;
  margin: 0 auto;
}
.collection_headerText {
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
  stroke: rgb(203,203,201);
  stroke-width: 2px;
}

.titleImg {
  max-width: 100%;
  margin-bottom: 20px;
}
.titleImg1Line {
  display: inline;
}
.titleImg2Lines {
  display: none;
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
  .collection_headerText {
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
  .collection_headerText, .titleImg {
    padding: 0px 120px;
  }
}

</style>
