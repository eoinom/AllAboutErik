<template>
  <Layout> 
    <b-container fluid class="main-col">

      <!-- HEADER SLIDESHOW -->
      <b-row no-gutters style="max-height:1224px; width:auto;" class="mb-1 px-1">
        <b-col class="slideshowCol">
          
          <slideshow-images :slides="slides" />
          
          <b-container fluid class="slideshowOverlay">
            <b-row>
              <b-col class="mainContent">
                
                <g-image alt="All About Erik logo" v-if="titleImg != null" :src="titleImg" id="titleImg" class="mb-md-1 mb-lg-2 mb-xl-3"/>
                
                <span v-html="mainText" id="mainText" />    

                <!-- Scroll with arrow images - hidden on xs (e.g. portrait mobile devices) -->
                <div class="d-none d-sm-inline" v-scroll-to="{ el:'#videos', duration:1500, easing:'ease' }">
                  <p class="mb-0 mt-md-1 mt-lg-2 mt-xl-5">
                    <g-image alt="Scroll text" v-if="titleImg != null" src="~/assets/images/scroll.png" id="scrollImg" />
                  </p>
                  <p class="my-0 my-lg-1 my-xl-2">
                    <g-image alt="Scroll arrow" v-if="titleImg != null" src="~/assets/images/arrow-full-down.png" id="scrollArrowImg" />
                  </p>
                </div>

              </b-col>
            </b-row>
          </b-container>

        </b-col>
      </b-row>

      <!-- VIDEOS -->
      <b-row no-gutters id="videos" class="mb-1">
        <b-col cols="12" lg="6" v-for="video in videos" :key="video.title" class="my-1 px-1">
          <!-- <div style="padding:56.25% 0 0 0;position:relative;z-index:900">
            <iframe 
              :src="video.url + '?autoplay=0&color=505050&title=0&byline=0&portrait=0'"
              style="position:absolute;top:0;left:0;width:1000px;height:500px;" 
              frameborder="0" 
              webkitallowfullscreen mozallowfullscreen allowfullscreen>
            </iframe>
          </div> -->
          <div class="videoThumbnailContainer">
            
            <div class="thumbnailImgContainer">
              <g-image :alt="video.title" v-if="video.thumbnailImg != null" :src="video.thumbnailImg" class="thumbnailImg"/>
            </div>

            <div class="thumbnailImgTextOverlay">
              <span class="videoTitle">{{ video.title }} </span>
              <p class="videoSubText">{{ video.subText }} </p>

              <p class="mb-0 mb-lg-1 mb-xl-2">
                <g-image alt="Play symbol" v-if="video.url != null" src="~/assets/images/playarrowcircle.png" class="thumbnailPlayVideoImg" />
              </p>
              <p v-if="video.duration != null" class="videoDurationText">
                {{ durationInMinsText(video.duration) }} 
              </p>
            </div>

          </div>
        </b-col>
      </b-row>

      <!-- COMPLETE FILM -->
      <b-row v-if="fullVideo != null" no-gutters class="mb-0 px-1">
        <b-col>
          <b-row id="completeFilmContainer" class="mx-0 mb-2">
            <b-col class="completeFilmContent">
              <b-row align-v="center" align-h="center" class="mb-0 py-4">

                <b-col cols="auto" id="completeFilmPlayIconCol" style="text-align:right" class="pr-1">
                  <g-image alt="Play symbol" src="~/assets/images/playarrowcircle-black.png" id="fullVideoPlayImg"/>
                  <g-image alt="Play symbol" src="~/assets/images/playarrowcircle-hover.png" id="fullVideoPlayImg-hover"/>
                </b-col>

                <b-col cols="auto" id="completeFilmIconTextCol" style="text-align:left" class="pl-1">
                  <p class="playFilmText mb-0">
                    PLAY FILM
                  </p>
                  <p v-if="fullVideo.duration != null" class="fullVideoDurationText mb-2">
                    {{ durationInMinsText(fullVideo.duration) }} 
                  </p>
                </b-col>

                <b-col cols="auto">
                  <p id="completeFilmSubText" class="mb-0 mt-1">{{ fullVideo.text }} </p>  
                </b-col>

              </b-row>
            </b-col>
          </b-row>
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
    },
    fullVideo() {
      return this.$page.RootsAndYouth.edges[0].node.fullVideo
    }
  },

  methods: {
    durationInMinsText(secs) {
      let mins = Math.floor(secs / 60)
      secs = secs - (mins * 60)
      if (secs < 10)
        secs = '0' + secs
      return mins + ':' + secs + ' min'
    }
  },

  mounted() {
  },

  components: {
    'slideshow-images':     require('../components/SlideshowImages2.vue').default,
  },
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lora:700i&display=swap');

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
  background-color: #dddddd
}

.row {
  margin-bottom: 20px;
}

.main-col {
  padding: 0 6%;   
}

.slideshowCol {
  position: relative;
  max-height:1224px; 
  width:auto;
  text-align: center;
}

.slideshowOverlay {
  z-index: 100;
  height: 100%;
  top: 0;
  position: absolute;
}

.slideshowOverlay .mainContent{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-bottom: 2%;
  padding-left: 19%;
  padding-right: 19%;
  text-align: center;
  z-index: 500;
}

#titleImg {
  width: 100%;
  max-width: 1492px;
  height: auto;
  margin: auto;
}

#mainText {
  color: #FFFFFF;  
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-size: 1.85rem;
  font-weight: 500;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.65);
  line-height: 43px;
  letter-spacing: 2px;    
}

#scrollImg {
  width: 11.5%;
  max-width: 157px;
  min-width: 78.5px;
}

#scrollArrowImg {
  width: 2.8%;
  max-width: 38px;
  min-width: 19px;
}


.videoThumbnailContainer {
  /* position: relative;
  box-shadow: inset 0px 0px 150px rgba(0,0,0,0.5);
  z-index: 1; */
}

/* .thumbnailImgContainer::before {
  content: "";
  box-shadow: inset 0px 0px 150px rgba(0,0,0,0.5), inset 0px 0px 150px rgba(0,0,0,0.5);
} */

.thumbnailImgContainer {
  background: black;
  box-shadow: inset 0px 0px 150px rgba(0,0,0,0.5), inset 0px 0px 150px rgba(0,0,0,0.5);
  z-index: 2;
}

.thumbnailImg {
  width: 100%;
  height: auto;  
  opacity: 0.84;
  position: relative;
  z-index: 0;
}

.thumbnailImgTextOverlay {
  color: #FFFFFF;
  position: absolute;
  text-align: center;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.videoTitle {
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 2.5625rem;
  text-transform: uppercase;
  letter-spacing: 16px;
}

.videoSubText {
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.4375rem;
  letter-spacing: 1px;
}

.thumbnailPlayVideoImg {
  display: none;
  width: 18%;
  height: auto;  
  position: relative;
  padding-top: 12%;
}

.videoDurationText {
  display: none;
  font-family: 'Lora', serif;
  font-weight: 700;
  font-size: 1.6rem;
}

.videoThumbnailContainer:hover .videoTitle, .videoThumbnailContainer:hover .videoSubText {
  display: none;
}
.videoThumbnailContainer:hover .thumbnailPlayVideoImg, .videoThumbnailContainer:hover .videoDurationText {
  display: inline;
}
.videoThumbnailContainer:hover .thumbnailImg {
  opacity: 1;
}

/* FOR CHECKING THE HOVERED STATE */
/* .videoTitle, .videoSubText {
  display: none;
}

.thumbnailPlayVideoImg, .videoDurationText {
  display: inline;
} 
.thumbnailImg {
  opacity: 1;
}*/

#completeFilmContainer {
  background-color: #FFFFFF;
  text-align: center;
}

.completeFilmContent:hover .playFilmText,
.completeFilmContent:hover .fullVideoDurationText,
.completeFilmContent:hover #completeFilmSubText {
  color:	#EED047;
}
.completeFilmContent #fullVideoPlayImg-hover {
  display: none;
}
.completeFilmContent:hover #fullVideoPlayImg-hover {
  display: inline;
}
.completeFilmContent:hover #fullVideoPlayImg {
  display: none;
}

.playFilmText {
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-weight: 500;
  /* font-size: 1.125rem; */
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 5px;
}

.fullVideoDurationText {
  font-family: 'Lora', serif;
  font-weight: 700;
  /* font-size: 1.6rem; */
  font-size:14px;
  margin-top: -2px;
}

#completeFilmSubText {
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.4375rem;
  /* color:blueviolet; */
  /* font-size: 23px; */
  letter-spacing: 1px;
  text-align: justify;
  line-height: 35px;
  max-width: 420px;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .layout, .main-col {
    padding: 0 0;   
  }
  .slideshowOverlay .mainContent {
    /* padding-bottom: 0.5%; */
    padding-left: 15%;
    padding-right: 15%;
  }
  #mainText {
    font-size: 0.9rem;
    line-height: 14px;
    margin-bottom: 0px;
  }
  #mainText > p {
    margin-bottom: 0px !important;
  }
  .videoTitle {
    font-size: 1.6622rem;
    letter-spacing: 8.4324px;
  }
  .videoSubText {
    font-size: 0.756rem;
    letter-spacing: 0.5259px;
  }
  .videoDurationText {
    font-size: 0.8414rem;
  }
  #completeFilmSubText {
    font-size: 1.2rem;
    text-align: center;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  #mainText {
    font-size: 0.9rem;
    line-height: 14px;
  }
  #mainText p {
    margin-bottom: 0px !important;
  }
  .videoTitle {
    font-size: 1.6622rem;
    letter-spacing: 8.4324px;
  }
  .videoSubText {
    font-size: 0.756rem;
    letter-spacing: 0.5259px;
  }
  .videoDurationText {
    font-size: 0.8414rem;
  }
  #completeFilmSubText {
    font-size: 1.32rem;
    text-align: center;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  #mainText {
    font-size: 1.2rem;
    line-height: 24px;
  }
  .videoTitle {
    font-size: 2.0778rem;
    letter-spacing: 13px;
  }
  .videoSubText {
    font-size: 1.1655rem;
    letter-spacing: 0.8108px;
  }
  .videoDurationText {
    font-size: 1.2972rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  #mainText {
    font-size: 1.5rem;
    line-height: 33px;
  }
  .videoTitle {
    font-size: 2.0778rem;
    letter-spacing: 13px;
  }
  .videoSubText {
    font-size: 1.1655rem;
    letter-spacing: 0.8108px;
  }
  .videoDurationText {
    font-size: 1.2972rem;
  }
}

</style>
