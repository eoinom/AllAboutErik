<template>
  

  <Layout> 
    <header id="header" :style="headerStyle">
      <g-image :src="titleImg" id="titleImg" class="my-4" />
    </header>

    <b-container fluid id="mainContainer" class="pb-5">

      <b-row no-gutters style="" class="mt-2">
        <b-col class="">
          <g-image :src="mainImg" id="" class="" />
          <span v-html="mainText" id="mainImgText" />
        </b-col>
      </b-row>

      <!-- VIDEOS -->
      <b-row no-gutters v-for="(video, index) in videos" :key="video.title" @click="videoIndex = index" @mouseover="videoIndexHover = index" @mouseleave="videoIndexHover = null" style="cursor:pointer" class="mt-3">
        <b-col class="thumbnailImgContainer">
          <g-image :alt="video.title" v-if="video.thumbnailImg != null" :src="video.thumbnailImg" class="thumbnailImg"/>
          <span v-if="index < videos.length-1" class="imgNumberText" > 
            {{ index + 1 }} 
          </span>
        </b-col>

        <b-col class="videoContentContainer px-5">
          <b-row align-v="center" align-h="center" class="mb-0 pt-4">
            <b-col cols="auto" id="videoTextContainer" class="mt-2">
              <h2 v-if="video.title != null" class="videoTitle mb-4"> {{ video.title }} </h2>
              <p v-if="video.subText != null" class="videoSubText" :style="shortText(video.subText)"> {{ video.subText }} </p>
            </b-col>
          </b-row>

          <b-row align-h="center" class="playIconRow mb-0 py-4">
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
        videos {
          title
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
import VideoLightBox from '../components/VideoLightBox.vue'

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
          marginTop: "32px"
        }
      }
    }
  },

  mounted() {
  },

  components: {
    VideoLightBox
  },
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lora:700i&display=swap');
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
  background-color: #dddddd;
}

#header {
  background-image: var(--headerBgImg);
  background-color: rgba(0, 0, 0, 0.32);
  background-color: #ADADAD;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
}

#headerImg {
  /* opacity: 0.5; */
  /* z-index: 200000;
  color: white;
  background-color: white; */
}

#mainContainer {
  max-width: 1316px;
  padding: 0;
  text-align: center;
}

#mainImgText {
  color: white;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 28px;
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
  width: 100%;
}

.thumbnailImg {
}

.imgNumberText {
  color: white;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 8.125rem;  /* 130px with 16px default size */  
  letter-spacing: 3px;
  line-height: 130px;  

  position: absolute;
  bottom: 25px;
  left: 0;
  margin-left: 4.5%;
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
