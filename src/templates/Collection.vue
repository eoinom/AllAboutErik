<template>
  <!-- <Layout :style="layoutStyle">   -->
  <Layout>  
    <header id="header" :style="headerStyles">
      <div id="headerItems">
        <g-image :src="titleImg1Line" class="titleImg titleImg1Line" />
        <g-image :src="titleImg2Lines" class="titleImg titleImg2Lines" />
        <div v-html="$page.collection.content" class="collections_headerText" />
      </div>
    </header>

    <CollectionViewer
      :images="images"
      :index="imageIndex"
      :disable-scroll="true"
      :prevCollection="prev_collection"
      :nextCollection="next_collection"
      @close="imageIndex = null"
    />

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
import CollectionViewer from '../components/CollectionViewer.vue'

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
    }
  },

  computed: {
    title() {
      return this.$page.collection.title
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
    }
  },

  components: {
    CollectionViewer
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
.collections_headerText {
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
.collections_headerText > p { 
  margin: 0px;
  padding: 0px;
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
  background: var(--backgroundImg) no-repeat center center;
  background-size: cover;
  will-change: transform; /* creates a new paint layer */
  z-index: -1;
  opacity: var(--backgroundOpacity);
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


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .main-col {
    max-width: 61.46%;
  }
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .main-col {
    max-width: 61.46%;
  }
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .main-col {
    max-width: 61.46%;
  }
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  .main-col {
    max-width: 61.46%;
  }
}

/* Special - Larger devices (desktops, 1200px and up) */
@media (min-width: 1200px) and (max-width: 1390.98px) { 
  .main-col {
    max-width: 61.46%;
  }
}

</style>
