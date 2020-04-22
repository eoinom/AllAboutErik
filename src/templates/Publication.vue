<template>
  <Layout>
    <transition name="page" mode="out-in">
      <div :key="'publication_' + titleSlug"> <!-- Need a unique key for the transition above to work on route change -->
        
        <img v-if="pageBgImg != ''" :src="pageBgImg" id="pageBgImg" :style="pageBgStyles" />
        
        <header id="header" :style="headerStyles">
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
            
            <b-col cols="7">
              <div class="publication_mainText">
                <span v-html="renderMarkdown(mainTextTop)" />
              </div>

              <br><br><br><br><br><br><br><br><br><br><br><br>

              <div class="publication_mainText">{{ mainTextBottom }}</div>
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
    content
    pageBgImg
    pageBgImgOpacity
    mainTextTop
    mainTextBottom
    videoUrl
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
const slugify = require('@sindresorhus/slugify')
const MarkdownIt = require('markdown-it')

export default {
  metaInfo() {
    return {
      title: this.title
    }
  },

  components: {
  },

  data() {
    return {
      imageIndex: 0,
      showIntro: false,
      windowWidth: 0.0
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
    headerBgImg() {
      return this.node.headerBgImg
    },
    headerBgImgOpacity() {
      return this.node.hasOwnProperty('headerBgImgOpacity') ? this.node.headerBgImgOpacity : 0.5
    },  
    headerStyles() {
      return {
        '--headerBgImg': 'url(' + this.headerBgImg + ')',
        '--bgOpacity': this.headerBgImgOpacity / 100
      }
    },
    headerLeftImg() {
      return this.node.headerLeftImg
    },
    headerRightImg() {
      return this.node.headerRightImg
    },
    headerText() {
      return this.node.content
    },
    pageBgImg() {
      return this.node.pageBgImg
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
    mainTextTop() {
      return this.node.mainTextTop
    },
    mainTextBottom() {
      return this.node.mainTextBottom
    },
    // bookImagesUrls() {
    //   return this.node.bookImagesUrls
    // },
    videoUrl() {
      return this.node.videoUrl
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
    }
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

</style>
