<template>
  <Layout> 
    <header id="header" :style="headerStyle">
      <g-image :src="titleImg" id="titleImg" class="my-4" />
    </header>

    <b-container fluid id="mainContainer" class="pb-5 pb-xl-3 px-1">

      <!-- VIDEOS -->
      <b-row no-gutters align-h="center" id="videos" class="mt-2 mt-sm-3">
        <b-col cols="6" sm="4" xl="3" align-self="center" v-for="(video, index) in videos" :key="video.title" @click="videoIndex = index" @mouseover="videoIndexHover = index" @mouseleave="videoIndexHover = null" class="mb-2 px-2 mb-sm-3 px-sm-3">

          <div class="videoThumbnailContainer">
            
            <div class="thumbnailImgContainer" :style="vignetteStyles">
              <g-image :alt="video.title" v-if="video.thumbnailImg != null" :src="video.thumbnailImg" class="thumbnailImg"/>
            </div>

            <div class="thumbnailImgTextOverlay">
              <transition name="fade">
                <div class="showOnHover">
                  <h4 class="videoTitle mb-1 mb-sm-2 mb-lg-4">{{ video.title }}</h4>
                  <span 
                    class="videoSubText" 
                    :class="index === 6 ? 'hideText' : ''">
                    {{ video.subText }}
                  </span>
                </div>
              </transition>
            </div>

            <div class="durationBanner">
              <p v-if="video.duration != null" class="videoDurationText ">
                {{ durationInMinsText(video.duration) }} 
              </p>
              <br>
              <g-image alt="Play symbol" src="~/assets/images/playarrowcircle-black.png" class="thumbnailPlayVideoImg" />
            </div>

          </div>
        </b-col>
      </b-row>

    </b-container>


    <!-- <BackgroundMusic
      :audioFile="$page.TheEpisodes.edges[0].node.bgAudio"
      :audioDuration="$page.TheEpisodes.edges[0].node.bgAudioDuration"
      :audioFadeInDuration="$page.TheEpisodes.edges[0].node.bgAudioFadeInDuration"
      :audioFadeOutDuration="$page.TheEpisodes.edges[0].node.bgAudioFadeOutDuration"
    /> -->
    
    <VideoLightBox
      :videos="videos"
      :index="videoIndex"
      :disable-scroll="true"
      @close="videoIndex = null"
    />

    <ScrollToTop 
      text="BACK TO THE TOP"
      :includeArrow="true"
    />

  </Layout>
</template>

<page-query>
{
  ShortFilms: allShortFilms {
    edges {
      node {
        id
        pageTitle
        headerBgImg
        titleImg
        mainVideoUrl
        videos {
          title
          subText
          url
          thumbnailImg
          duration
        }
      }
    }
  }	
}
</page-query>


<script scoped>
import BackgroundMusic from '../components/BackgroundMusic.vue'
import VideoLightBox from '../components/VideoLightBox.vue'
import ScrollToTop from '../components/ScrollToTop.vue'

export default { 
  metaInfo() {
    return {
      title: this.$page.ShortFilms.edges[0].node.pageTitle
    }
  },

  data() {
    return {
      videoIndex: null,
      videoIndexHover: null,
    }
  },

  computed: {
    headerBgImg() {
      return this.$page.ShortFilms.edges[0].node.headerBgImg
    },
    titleImg() {
      return this.$page.ShortFilms.edges[0].node.titleImg
    },    
    // mainImg(){
    //   return this.$page.ShortFilms.edges[0].node.mainImg
    // },
    mainText(){
      return this.$page.ShortFilms.edges[0].node.content
    },
    videos() {
      return this.$page.ShortFilms.edges[0].node.videos
    },
    headerStyle() {
      return {
        '--headerBgImg': 'url(' + this.headerBgImg + ')'
      }
    },
  },

  methods: {
    durationInMinsText(secs) {
      let mins = Math.floor(secs / 60)
      if (mins >= 60) {
        let hrs = Math.floor(mins / 60)
        mins = mins - (hrs * 60)
        if (mins < 10)
          mins = '0' + mins
        if (hrs == 1)
          return '1 hr ' + mins + ' min'
        else
          return hrs + ' hrs ' + mins + ' min'
      }
      else {
        secs = secs - (mins * 60)
        if (secs < 10)
          secs = '0' + secs
        return mins + ':' + secs + ' min'
      }
    },
    shortText(text) {
      if (text.length <= 30) {
        return {
          textAlign: "center",
          marginTop: "32px",
          marginBottom: "32px"
        }
      }
    }
  },

  mounted() {
  },

  components: {
    BackgroundMusic,
    VideoLightBox,
    ScrollToTop
  },
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lora:700i&display=swap');

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

#titleImg {
  max-width: 70%;
}

#mainContainer {
  width: 100%;
  max-width: 1396px;
  padding: 0;
  text-align: center;
}

#mainImg {
  max-width: 100%;
}

#mainImgText {
  color: white;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.75rem;  /* 28px with 16px default size */  
  letter-spacing: 1px;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.29);
  line-height: 40px;  

  position: absolute;
  bottom: 25px;
  left: 0;
  margin-left: 12%;
  margin-right: 12%;
}

.videoThumbnailContainer {
  position: relative;
  cursor: pointer;
}


.thumbnailImg {
  width: 100%;
  max-width: 100%;
  height: auto;  
  position: relative;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.thumbnailImgTextOverlay {
  color: #FFFFFF;
  position: absolute;
  text-align: center;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
}

.videoTitle {
  font-family: 'Open Sans Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 300;
  font-size: 1.875rem;
  line-height: 1.875rem;
  letter-spacing: 9px;
  text-transform: uppercase;
}

.videoSubText {
  display: inline-block;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1.4375rem;
  letter-spacing: 1px;
}

.videoDurationText {
  display: inline;
  font-family: 'Lora', serif;
  font-weight: 700;
  font-size: 1rem;
}

.thumbnailPlayVideoImg {
  width: 12.7%;
  min-width: 25px;
  max-width: 40px;
  height: auto;  
  position: relative;
}

.durationBanner {
  color: black; 
  background-color: white;
  width: 100%; 
  height: 0;
  position: absolute; 
  bottom: 0; 
  font-size: 14px;
  transition: all 0.3s ease-in 0.2s;
}

.showOnHover {
  opacity: 0;
  transition: all 0.3s ease-in 0.2s;
}
.videoThumbnailContainer:hover .showOnHover {
  opacity: 1;
}
.videoThumbnailContainer:hover .thumbnailImg {
  opacity: 0.5;
}
.videoThumbnailContainer:hover .durationBanner {
  height: 25%;
  padding: 8px 0px;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

@media (max-width: 400px) {
  #titleImg {
    max-width: 60%;
  }
}
@media (min-width: 400.01px) and (max-width: 575.98px) {
  #titleImg {
    max-width: 65%;
  }
}

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {  
  #mainImgText {
    /* font-size: 1.2rem;  19.2px with 16px default size       */
    /* line-height: 27px;   */
    font-size: 3.33vw;
    line-height: 4.68vw; 

    letter-spacing: 1px;
    bottom: 0px;
    margin-left: 6%;
    margin-right: 6%;
  }
  .videoTitle {
    font-size: 5vw;
    line-height: 5vw;
    letter-spacing: 7px;
  }
  .videoSubText {
    font-size: 3.5vw;
    line-height: 4.5vw;
    margin-bottom: 8px;
  }
  .playIconRow {
    display: none;
  }
  .thumbnailImgOverlay {
    display: inline;
  }
  .thumbnailImgOverlay .videoDurationText {
    font-size: 3.5vw;
  }
  .showOnHover {
    opacity: 1;
  }
  .thumbnailImg {
    opacity: 0.5;
  }
  .durationBanner {
    height: 30% !important;
    padding: 4px 0px !important;
  }
  .hideText {
    display: none;
  }
}
@media (max-width: 370px) {
  .durationBanner {
    padding: 1px 0px !important;
  }
}
@media (max-width: 350px) {
  .durationBanner {
    height: 32% !important;
    padding: 0px 0px !important;
  }
}


/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  #mainImgText {
    font-size: 2.712vw;
    line-height: 3.906vw; 

    letter-spacing: 1px;
    bottom: 19px;
    margin-left: 8%;
    margin-right: 8%;
  }
  .videoTitle {
    font-size: 4vw;
    line-height: 4vw;
    letter-spacing: 7px;
  }
  .videoSubText {
    font-size: 2vw;
    line-height: 2vw;
    margin-bottom: 24px;
  }
  .playIconRow {
    display: none;
  }
  .thumbnailImgOverlay {
    display: inline;
  }
  .thumbnailImgOverlay .videoDurationText {
    font-size: 3vw;
  }
  .showOnHover {
    opacity: 1;
  }
  .thumbnailImg {
    opacity: 0.5;
  }
  .durationBanner {
    height: 28% !important;
    padding: 6px 0px !important;
  }
  .hideText {
    display: none;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  #mainImgText {
    font-size: 1.5rem;  /* 19.2px with 16px default size */  
    letter-spacing: 1px;
    line-height: 34px;  
    bottom: 21px;
    margin-left: 10%;
    margin-right: 10%;
  }
  .playIconRow {
    position: relative;
    bottom: 5px;
    left: 0;
    margin: 0;
  }
  .showOnHover {
    opacity: 1;
  }
  .thumbnailImg {
    opacity: 0.5;
  }
  .durationBanner {
    height: 25% !important;
    padding: 4px 0px !important;
  }
  .hideText {
    display: none;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  #mainImgText {
    font-size: 1.625rem;  /* 19.2px with 16px default size */  
    letter-spacing: 1px;
    line-height: 36.5px;  
    bottom: 23px;
    margin-left: 11%;
    margin-right: 11%;
  }
  .playIconRow {
    position: relative;
    bottom: 5px;
    left: 0;
    margin: 0;
  }
}

</style>
