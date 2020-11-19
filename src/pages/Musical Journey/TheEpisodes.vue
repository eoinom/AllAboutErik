<template>
  <Layout> 
    
    <BackgroundMusic
      :audioFile="$page.TheEpisodes.edges[0].node.bgAudio"
      :audioDuration="$page.TheEpisodes.edges[0].node.bgAudioDuration"
      :audioFadeInDuration="$page.TheEpisodes.edges[0].node.bgAudioFadeInDuration"
      :audioFadeOutDuration="$page.TheEpisodes.edges[0].node.bgAudioFadeOutDuration"
    />

    <header id="header" :style="headerStyle">
      <g-image :src="titleImg" id="titleImg" class="my-4" />
    </header>

    <b-container fluid id="mainContainer" class="mb-3 pb-5 pb-xl-3 px-1">

      <b-row no-gutters class="mt-2">
        <b-col>
          <g-image :src="mainImg" id="mainImg" />
          <span v-html="mainText" id="mainImgText" />
        </b-col>
      </b-row>

      <!-- VIDEOS -->
      <b-row no-gutters v-for="(video, index) in videos" :key="video.title" @click="videoIndex = index" @mouseover="videoIndexHover = index" @mouseleave="videoIndexHover = null" style="cursor:pointer" class="mt-3">
        
        <b-col cols="12" xl="7" class="thumbnailImgContainer">
          <g-image :alt="video.title" v-if="video.thumbnailImg != null" :src="video.thumbnailImg" class="thumbnailImg"/>
          
          <span v-if="index < videos.length-1" class="imgNumberText" > 
            {{ index + 1 }} 
          </span>

          <div class="thumbnailImgOverlay">
            <p class="mb-0 mb-lg-1 mb-xl-2">
              <g-image alt="Play symbol" v-if="video.url != null" src="~/assets/images/playarrowcircle.png" class="thumbnailPlayVideoImg thumbnailImgHovered" />
            </p>
            <p v-if="video.duration != null" class="videoDurationText thumbnailImgHovered">
              {{ durationInMinsText(video.duration) }} 
            </p>
          </div>
        </b-col>

        <b-col cols="12" xl="5" class="videoContentContainer px-5">
          <b-row align-v="center" align-h="center" class="mb-0 pt-2 pt-md-3 pt-xl-4">
            <b-col cols="auto" id="videoTextContainer" class="mt-2">
              <h2 v-if="video.title != null" class="videoTitle mb-4"> {{ video.shortTitle }} </h2>
              <p v-if="video.subText != null" class="videoSubText" :style="shortText(video.subText)"> {{ video.subText }} </p>
            </b-col>
          </b-row>

          <b-row align-h="center" class="playIconRow mb-0 py-2 py-md-3 py-xl-4">
            <b-col cols="auto" id="playIconCol" style="text-align:right" class="pr-1">
              <g-image alt="Play symbol" src="~/assets/images/playarrowcircle-black.png" class="playIconImg"/>
              <g-image alt="Play symbol" src="~/assets/images/playarrowcircle-hover.png" class="playIconImg-hover"/>
            </b-col>

            <b-col cols="auto" style="text-align:left" class="playIconTextCol pl-1">
              <p v-if="index < videos.length-1" class="playVideoText mb-0">
                PLAY EPISODE
              </p>
              <p v-else class="playVideoText mb-0">
                PLAY FILM
              </p>
              <p v-if="video.duration != null" class="videoDurationText mb-2">
                {{ durationInMinsText(video.duration) }} 
              </p>
            </b-col>
          </b-row>

        </b-col>
      </b-row>
    </b-container>

    
    <VideoLightBox
      :videos="videos"
      :index="videoIndex"
      :disable-scroll="true"
      @close="videoIndex = null"
    />

    <BackToTop />

  </Layout>
</template>

<page-query>
{
  TheEpisodes: allTheEpisodes {
    edges {
      node {
        id
        pageTitle
        headerBgImg
        titleImg
        content
        mainImg
        bgAudio
        bgAudioDuration
        bgAudioFadeInDuration
        bgAudioFadeOutDuration
        videos {
          title
          shortTitle
          subText
          url
          thumbnailImg
          orderNo
          duration
        }
      }
    }
  }	
}
</page-query>


<script scoped>
import BackgroundMusic from '../../components/BackgroundMusic.vue'
import VideoLightBox from '../../components/VideoLightBox.vue'
import BackToTop from '../../components/BackToTop.vue'

export default { 
  metaInfo() {
    return {
      title: this.$page.TheEpisodes.edges[0].node.pageTitle
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
      return this.$page.TheEpisodes.edges[0].node.headerBgImg
    },
    titleImg() {
      return this.$page.TheEpisodes.edges[0].node.titleImg
    },    
    mainImg(){
      return this.$page.TheEpisodes.edges[0].node.mainImg
    },
    mainText(){
      return this.$page.TheEpisodes.edges[0].node.content
    },
    videos() {
      return this.$page.TheEpisodes.edges[0].node.videos
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
    BackToTop
  },
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lora:700i&display=swap');
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');

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
  background-color: #dddddd;
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
  max-width: 1316px;
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

.thumbnailImgContainer {
  max-width: 100%;
}

.thumbnailImg {
  width: 100%;
}

.imgNumberText {
  color: white;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 8.125rem;   /* 130px with 16px default size   */
  /* font-size: 11vw; */
  line-height: 130px;  
  position: absolute;
  bottom: 25px;
  left: 0;
  margin-left: 4.5%;
}

.thumbnailImgOverlay {
  display: none;
  color: #FFFFFF;
  position: absolute;
  text-align: center;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  opacity: 0.8;
  transition: opacity 0.25s ease;
}

.thumbnailImgOverlay:hover {
  opacity: 1;
}

.thumbnailImgOverlay .thumbnailPlayVideoImg {
  width: 18%;
  height: auto;  
  position: relative;
  padding-top: 12%;
}

.thumbnailImgOverlay .videoDurationText {
  font-family: 'Lora', serif;
  font-weight: 700;
  font-size: 1.6rem;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.65);
  padding-top: 5px;
}

.videoContentContainer {
  background-color: white;
}

.videoTitle {
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 2.9375rem;  /* 47px with 16px default size */
  line-height: 47px;  
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #000000; 
}

.videoSubText {
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.4375rem;  /* 23px with 16px default size */
  line-height: 35px;
  text-align: justify;
  letter-spacing: 1px;  
  color: #000000;  
}

.playIconRow {
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -120px;
  margin-top: -30px;
}

.playIconRow:hover {
  color: #EED047;
}

.playVideoText {
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.125rem;   /* 18px at 16px default size */
  text-transform: uppercase;
  letter-spacing: 5px;
}

.videoDurationText {
  font-family: 'Lora', serif;
  font-weight: 700;
  font-size: 0.875rem;   /* 14px at 16px default size */
  margin-top: -2px;
}

.playIconImg-hover {
  display: none;
}
.playIconImg-hover {
  display: inline;
  cursor: pointer;
}
.playIconImg {
  display: none;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

@media only screen and (max-width: 400px) {
  #titleImg {
    max-width: 60%;
  }
}
@media only screen and (min-width: 400.01px) and (max-width: 575.98px) {
  #titleImg {
    max-width: 65%;
  }
}

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {  
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
  .imgNumberText {
    font-size: 11vw;
    line-height: 11vw; 
    bottom: 3vw;
  }
  .videoTitle {
    font-size: 6vw;
    line-height: 6vw;
  }
  .videoSubText {
    font-size: 3.5vw;
    line-height: 4.5vw;
    margin-bottom: 24px;
  }
  .playIconRow {
    display: none;
  }
  .thumbnailImgOverlay {
    display: inline;
  }
  .thumbnailImgOverlay .videoDurationText {
    /* font-size: 0.8414rem; */
    font-size: 3.5vw;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  #mainImgText {
    /* font-size: 1.35rem;  20.83px with 16px default size       */
    /* line-height: 30px;   */
    font-size: 2.712vw;
    line-height: 3.906vw; 

    letter-spacing: 1px;
    bottom: 19px;
    margin-left: 8%;
    margin-right: 8%;
  }
  .imgNumberText {
    font-size: 11vw;
    line-height: 11vw; 
    bottom: 3vw;
  }
  .videoTitle {
    font-size: 6vw;
    line-height: 6vw;
  }
  .videoSubText {
    font-size: 3vw;
    line-height: 4vw;
    margin-bottom: 24px;
  }
  .playIconRow {
    display: none;
  }
  .thumbnailImgOverlay {
    display: inline;
  }
  .thumbnailImgOverlay .videoDurationText {
    /* font-size: 0.8414rem; */
    font-size: 3vw;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  #mainImgText {
    font-size: 1.5rem;  /* 19.2px with 16px default size */  
    letter-spacing: 1px;
    line-height: 34px;  
    bottom: 21px;
    margin-left: 10%;
    margin-right: 10%;
  }
  .imgNumberText {
    font-size: 11vw;
    line-height: 11vw; 
    bottom: 3vw;
  }
  .playIconRow {
    position: relative;
    bottom: 5px;
    left: 0;
    margin: 0;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) { 
  #mainImgText {
    font-size: 1.625rem;  /* 19.2px with 16px default size */  
    letter-spacing: 1px;
    line-height: 36.5px;  
    bottom: 23px;
    margin-left: 11%;
    margin-right: 11%;
  }
  .imgNumberText {
    font-size: 11vw;
    line-height: 11vw; 
    bottom: 3vw;
  }
  .playIconRow {
    position: relative;
    bottom: 5px;
    left: 0;
    margin: 0;
  }
}

</style>
