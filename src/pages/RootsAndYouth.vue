<template>
  <Layout> 

    <b-container fluid class="main-col">
      <!-- Content here -->
      <b-row no-gutters style="max-height:1224px; width:auto;">
        <b-col style="background-color:orange; max-height:1224px; width:auto;">
          
          <div class="slideshow">
            <slideshow-images :slides="slides" />
          </div>

          <!-- <g-image alt="All About Erik logo" v-if="titleImg != null" :src="titleImg" class="titleImg"/>
          <span v-html="mainText" class="mainText" /> -->
          
          <b-container fluid class="slideshowOverlay">
            <b-row>
              <b-col class="mainContent">
                <g-image alt="All About Erik logo" v-if="titleImg != null" :src="titleImg" class="titleImg"/>
                <span v-html="mainText" class="mainText" />
              </b-col>
            </b-row>
          </b-container>

        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" md="6" style="background-color:cyan">
          Some text here
        </b-col>
        <b-col cols="12" md="6" style="background-color:limegreen">
          Some text here
        </b-col>        
        <b-col cols="12" md="6" style="background-color:cyan">
          Some text here
        </b-col>
        <b-col cols="12" md="6" style="background-color:limegreen">
          Some text here
        </b-col>
      </b-row>

      <b-row>
        <b-col style="background-color:orange">
          Some text here
        </b-col>
      </b-row>

    </b-container>   
   
    <!-- <br> -->
    <!-- <h2>Roots and Youth</h2> -->
    <!-- <h2>{{ $page.RootsAndYouth.edges[0].node.pageTitle }}</h2> -->
    <!-- <div v-for="edge in $page.RootsAndYouth.edges" :key="edge.node.id">
      <h1>{{ edge.node.title }}</h1>

      <div style="padding:56.25% 0 0 0;position:relative;">
        <iframe 
          :src="edge.node.fullVideo.url + '?autoplay=0&color=505050&title=0&byline=0&portrait=0'"
          style="position:absolute;top:0;left:0;width:50%;height:50%;" 
          frameborder="0" 
          webkitallowfullscreen mozallowfullscreen allowfullscreen>
        </iframe>
      </div>
      
      <hr>
    </div> -->

  </Layout>
</template>

<page-query>
{
  RootsAndYouth: allRootsAndYouth {
    edges {
      node {
        id
        pageTitle
        headingImg
        content
        slides {
          orderNo
          img
        }
        slideDuration
        videos {
          title
          subText
          url
          orderNo
          duration
        }
        fullVideo {
          title
          text
          url
          duration
        }
      }
    }
  }	
}
</page-query>


<script scoped>
import SlideshowImages from '../components/SlideshowImages2.vue'

export default {
  metaInfo() {
    return {
      title: this.$page.RootsAndYouth.edges[0].node.pageTitle,  // <-- "this" is the Vue instance with $page
    }
  },

  data() {
    return {      
    }
  },

  computed: {
    titleImg() {
      return this.$page.RootsAndYouth.edges[0].node.headingImg
    },
    slides() {
      return this.$page.RootsAndYouth.edges[0].node.slides
    },  
    mainText(){
      return this.$page.RootsAndYouth.edges[0].node.content
    },
  },

  components: {
    'slideshow-images':     require('../components/SlideshowImages2.vue').default,
  },
}
</script>



<style scoped>
@font-face {
  font-family: NeueHaasGroteskText Pro6;
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-65md.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

body {
  background-color: #dddddd
}

.main-col {
  padding: 0 6.5%; 
  
}

.slideshowOverlay {
  z-index: 100;
  height: 100%;
  top: 0;
  position: absolute;
}

.slideshowOverlay .mainContent{
  /* position: relative; */
  /* position: absolute; */
  /* top: -423px; */
  /* top: 60%; */
  z-index: 500;
  /* height: 0; */
  width: 100%;
  /* margin: 0 18%; */
  text-align: center;
  padding-top: 30%;
  padding-left: 19%;
  padding-right: 19%;
}

.titleImg {
  /* display: inline-block; */
  width: 100%;
  max-width: 1492px;
  height: auto;
  /* position: relative; */
  margin: auto;

  /* position: absolute;
  top: 223px;
  z-index: 500; */
}

.mainText {
  color: #FFFFFF;
  /* font-size: 30px; */
  font-size: 1.85rem;
  font-family: 'NeueHaasGroteskText Pro6';
  font-feature-settings: 'liga';
  font-weight: 500;
  /* text-align: center; */
  text-shadow: 2px 2px 5px rgba(0,0,0,0.65);
  line-height: 43px;
  letter-spacing: 2px;    
}


@media (min-width : 768px) and (max-width : 1024px) {
  .slideshowOverlay .mainContent{
    padding-top: 25%;
    padding-left: 15%;
    padding-right: 15%;
  }

  .mainText {
    font-size: 1.25rem;
    line-height: 30px;
  }
}

@media (max-width : 767px) {
  .slideshowOverlay .mainContent{
    padding-top: 20%;
    padding-left: 10%;
    padding-right: 10%;
  }

  .mainText {
    font-size: 1.0rem;
    line-height: 20px;
  }
}

</style>
