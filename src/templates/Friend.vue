<template>
  <Layout :style="layoutStyle"> 

    <div :style="navLinksVisibility" id="navLinks">
      <span class="nav" id="nav_prev">PREVIOUS</span>
      <span class="nav" id="nav_next">NEXT</span>
    </div>

    <b-container fluid class="main-col">      
      <h1 id="heading"> {{ heading }} </h1>
  	  <div v-html="$page.friend.content" id="mainContent" />
    </b-container>

    <b-container fluid class="galleriesContainer">
      <b-row align-h="center" id="galleriesRow">
        <b-col cols="2" v-for="(item,index) in $page.friend.mediaItems" :key="index" class="galleries p-2" @click="mediaItemClick(item, index)">
          <g-image :src="item.thumbnailImg" class="galleriesImg" />
          <br />
          <span class="galleriesLabel">{{ item.label }}</span>
        </b-col>
      </b-row>

    </b-container>

    <ImageLightBox
      :images="images"
      :index="imageIndex"
      :disable-scroll="true"
      @close="imageIndex = null"
    />
    <VideoLightBox
      :videos="videos"
      :index="videoIndex"
      :disable-scroll="true"
      @close="videoIndex = null"
    />

  </Layout>
</template>

<page-query>
query ($id: ID!) {
  friend: friends(id: $id) {
    name
    heading
    backgroundImg
    backgroundOpacity
    content
    mediaItems {
      orderNo
      label
      mediaType
      thumbnailImg
      galleries {
        orderNo
        label
        images {
          orderNo
          img
          caption
        }
      }
    }
  }
}
</page-query>


<script scoped>
import ImageLightBox from '../components/ImageLightBox.vue'
import VideoLightBox from '../components/VideoLightBox.vue'

export default { 
  metaInfo() {
    return {
      title: this.name
    }
  },

  data() {
    return {
      mediaItemIndex: null,
      imageIndex: null,
      videoIndex: null
    }
  },

  computed: {
    name() {
      return this.$page.friend.name
    },
    heading() {
      return this.$page.friend.heading ? this.$page.friend.heading : this.name
    },
    mediaItems() {
      return this.$page.friend.mediaItems
    },
    images() {
      return this.mediaItemIndex != null ? this.mediaItems[this.mediaItemIndex].galleries[0].images : []
    },
    videos() {
      return this.mediaItemIndex != null ? this.mediaItems[this.mediaItemIndex].galleries[0].videos : []
    },
    layoutStyle() {
      return {
        '--backgroundImg': 'url(' + this.$page.friend.backgroundImg + ')',
        '--backgroundOpacity': this.$page.friend.backgroundOpacity / 100
      }
    },
    showNavLinks() {
      return this.imageIndex == null & this.videoIndex == null
    },
    navLinksVisibility() {
      let css = {}
      if (this.showNavLinks) {
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
    mediaItemClick(mediaItem, index) {
      if (mediaItem.mediaType == 'images') {
        this.mediaItemIndex = index
        this.imageIndex = 0
      }
      if (mediaItem.mediaType == 'videos') {
        this.mediaItemIndex = index
        this.videoIndex = 0
      }
    }
  },

  mounted() {
  },

  components: {
    ImageLightBox,
    VideoLightBox
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

.layout {
  padding: 0;
  overflow: hidden; /* added for pseudo-element */
  position: relative; /* added for pseudo-element */
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

#navLinks {
  visibility: visible;
  opacity: 1;
  transition: visibility 0.5s linear 1s, opacity 0.5s linear 1s;
}
.nav {
  color: white; 
  display: block;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-style: italic;
  font-size: 39px;
  letter-spacing: 1px;
  line-height: 59px;
  text-shadow: 1px 1px 2px rgba(28,16,23,0.83);
  margin: 0px;
  padding: 0px;
}
.nav:hover,
.galleries:hover,
.galleries:hover .galleriesLabel {
  color:	#EED047;
  cursor: pointer;
}
#nav_prev {
  position: fixed;
  top: 44%;
  left: 5%;
  text-align: left;
}
#nav_next {
  position: fixed;
  top: 44%;
  right: 5%;
  text-align: right;
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

#mainContent {
  color: #FFFFFF;
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 32px;
  text-align: justify;
  text-shadow: 0px 0px 250px #1C0F07,0px 0px 250px #1C0F07/* glow */,1px 1px 2px rgba(28,16,23,0.89)/* drop shadow*/;
}

.galleriesContainer {
  max-width: 1746px;
  padding: 4px 0 20px 0;
}

.galleriesImg {
  max-width: 275px;
  height: 193px;
}
.galleriesLabel {
  color: white; 
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  text-align: left;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.16);
  margin: 0px;
  padding: 0px;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {

}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {

}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 

}

</style>
