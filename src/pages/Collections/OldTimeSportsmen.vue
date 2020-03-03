<template>
  <!-- <Layout :style="layoutStyle">   -->
  <Layout>  
    <header id="header" :style="headerStyles">
      <div id="headerItems">
        <g-image :src="titleImg1Line" class="titleImg titleImg1Line" />
        <g-image :src="titleImg2Lines" class="titleImg titleImg2Lines" />
        <div v-html="$page.OldTimeSportsmen.edges[0].node.content" class="collections_headerText" />
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

    <section id="postcardHistory">
      <div id="postcardHistory__textDiv">
        <h2 class="title">{{ postcardHistory.title }}</h2>
        <div class="pb-5">
          <div class="pb-2 pl-5 pr-3" style="float: right">
            <img :src="postcardHistory.postcards[0].imgFront">
            <p class="caption">{{ postcardHistory.postcards[0].caption }}</p>
          </div>
          <br />
          <span v-html="postcardHistory.textPt1" class="postcardText" />

          <img :src="postcardHistory.images[0].img" class="py-3 pr-3" style="float: left">
          <span v-html="postcardHistory.textPt2" class="postcardText" />

          <img :src="postcardHistory.images[1].img" class="pl-3" style="float: right;">
          <!-- <br /> -->
          <span v-html="postcardHistory.textPt3" class="postcardText" />
        </div>

        
        <h2 class="title">{{ about.title }}</h2>
        <span v-html="about.text" class="postcardText" />

      </div> 

    </section>

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
    headerStyles() {
      return {
        '--headerBgImg': 'url(' + this.headerBgImg + ')',
        '--bgOpacity': this.headerBgImgOpacity / 100
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
    CollectionViewer
  },
}
</script>



<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');
@import url('https://fonts.googleapis.com/css?family=Crimson+Text:600,600i&display=swap');
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:700&display=swap');

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

#header {
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
}
#header:after  {
  content : "";
  display: inline-block;
  position: absolute;
  bottom: 0;
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
  /* color: #FFFFFF; */
  color: #000;
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
  /* height: 100%; */
  top: 0;
  left: 0;
  background-color: black;
  /* background: var(--backgroundImg) no-repeat center center; */
  background-size: cover;
  will-change: transform; /* creates a new paint layer */
  z-index: -1;
  /* opacity: var(--backgroundOpacity); */
}

/* .wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
} */

/* .main-col {
  max-width: 855px;
  padding: 50px 0 10px 0;
} */


#postcardHistory {
    background-color: #E6E5DF;
    width: 100%;

  &__textDiv {
    width: 1058px;
    margin: 0 auto;

    .title {
      font-family: 'Open Sans Condensed';
      font-feature-settings: 'liga';
      font-weight: 700;
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

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  /* .main-col {
    max-width: 61.46%;
  } */
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  /* .main-col {
    max-width: 61.46%;
  } */
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  /* .main-col {
    max-width: 61.46%;
  } */
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  /* .main-col {
    max-width: 61.46%;
  } */
}

/* Special - Larger devices (desktops, 1200px and up) */
@media (min-width: 1200px) and (max-width: 1390.98px) { 
  /* .main-col {
    max-width: 61.46%;
  } */
}

</style>
