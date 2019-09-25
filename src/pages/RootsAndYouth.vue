<template>
  <Layout> 

    <b-container fluid class="main-col">
      
      <b-row no-gutters style="max-height:1224px; width:auto;" class="mb-1 px-1">
        <b-col style="background-color:orange; max-height:1224px; width:auto;">
          
          <div class="slideshow">
            <slideshow-images :slides="slides" />
          </div>
          
          <b-container fluid class="slideshowOverlay">
            <b-row>
              <b-col class="mainContent">
                <g-image alt="All About Erik logo" v-if="titleImg != null" :src="titleImg" class="titleImg"/>
                <span v-html="mainText" class="mainText" />
                <br />
                <g-image alt="Scroll text" v-if="titleImg != null" src="~/assets/images/scroll.png" class=""/>
                <br />
                <g-image alt="All About Erik logo" v-if="titleImg != null" src="~/assets/images/arrow-full-down.png" class=""/>
              </b-col>
            </b-row>
          </b-container>

        </b-col>
      </b-row>

      <b-row no-gutters class="mb-1">
        <b-col cols="12" lg="6" v-for="video in videos" :key="video.title" class="my-1 px-1">
          <!-- <div style="padding:56.25% 0 0 0;position:relative;z-index:900">
            <iframe 
              :src="video.url + '?autoplay=0&color=505050&title=0&byline=0&portrait=0'"
              style="position:absolute;top:0;left:0;width:1000px;height:500px;" 
              frameborder="0" 
              webkitallowfullscreen mozallowfullscreen allowfullscreen>
            </iframe>
          </div> -->
          <g-image :alt="video.title" v-if="video.thumbnailImg != null" :src="video.thumbnailImg" class="thumbnailImg"/>
        </b-col>
      </b-row>

      <b-row no-gutters class="pb-2 px-1">
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
          thumbnailImg
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
      title: this.$page.RootsAndYouth.edges[0].node.pageTitle
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
    videos() {
      return this.$page.RootsAndYouth.edges[0].node.videos
    }
  },

  methods: {
  },

  mounted() {
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

.layout {
  background-color: #dddddd
}

.row {
  margin-bottom: 20px;
}

.main-col {
  padding: 0 6%; 
  
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
  padding-top: 32%;
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

.thumbnailImg {
  /* width: 1092px; */
  width: 100%;
  height: auto;
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
