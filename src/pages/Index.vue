<template>
  <Layout>

    <BackgroundMusic
      :audioFile="audioFile"
      :audioDuration="audioDuration"
      :audioFadeInDuration="audioFadeInDuration"
      :audioFadeOutDuration="audioFadeOutDuration"
    />

    <b-container fluid>
      <div class="contentContainer">
        <div class="content">

          <div class="mainContent">
            <g-image alt="All About Erik logo" v-if="titleImg != null" :src="titleImg" class="titleImg"/>
            <span v-html="mainText" class="homePgMainText" />
          </div>

          <div class="secondaryContent">
            <span v-html="creditText" class="homePgCreditText" />
          </div>

        </div>
      </div>
    </b-container>

    <div class="slideshow">
      <SlideshowKenBurns :slides="slides" />
    </div>

  </Layout>
</template>

<page-query>
{
  HomePage: allHomePage(sortBy: "orderNo") {
    edges {
      node {
        pageTitle
        headingImg
        content
        creditText
        bgAudio
        bgAudioDuration
        bgAudioFadeInDuration
        bgAudioFadeOutDuration
        slides {
          orderNo
          img
          opacity
          duration
          scaleFrom
          scaleTo
          panStart
        }
      }
    }
  }
}
</page-query>


<script>
import BackgroundMusic from '../components/BackgroundMusic.vue'
import SlideshowKenBurns from '../components/SlideshowKenBurns.vue'

export default {
  metaInfo() {    // https://github.com/gridsome/gridsome/issues/306 (How do you use the queried GraphQL data in the <script>?)
    return {
      title: this.$page.HomePage.edges[0].node.pageTitle,  // <-- "this" is the Vue instance with $page
    }
  },
  
  components: {
    'SlideshowKenBurns': require('../components/SlideshowKenBurns.vue').default,
    BackgroundMusic
  },

  computed: {
    titleImg() {
      return this.$page.HomePage.edges[0].node.headingImg
    },
    slides() {
      return this.$page.HomePage.edges[0].node.slides
    },
    images() {
      return this.slides.map(a => a.img)
    },    
    mainText(){
      return this.$page.HomePage.edges[0].node.content
    },
    creditText(){
      return this.$page.HomePage.edges[0].node.creditText
    },
    audioFile() {
      return this.$page.HomePage.edges[0].node.bgAudio
    },
    audioDuration() {
      return this.$page.HomePage.edges[0].node.bgAudioDuration
    },
    audioFadeInDuration() {
      return this.$page.HomePage.edges[0].node.bgAudioFadeInDuration
    },
    audioFadeOutDuration() {
      return this.$page.HomePage.edges[0].node.bgAudioFadeOutDuration
    }
  }
}
</script>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Libre+Baskerville&display=swap');

.slideshow {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.layout {
  padding: 0
}

.contentContainer {
  /* Absolute Centering in CSS: https://codepen.io/shshaw/full/gEiDt */
  position: absolute;
  width: 80%;
  margin: auto;
  left: 0;
  right: 0;
  top: 14%;
  z-index: 100;
  height: 86%;
}

.content{
  position: relative;
  height: 100%;
}

.mainContent{
  position: relative;
}

.titleImg {
  display: block;
  width: 100%;
  max-width: 1492px;
  height: auto;
  position: relative;
  margin: auto;
}

.homePgMainText {
  color: white;
  font-family: 'Libre Baskerville', serif;
  font-size: calc(1em + 0.5vw);
  text-align: center;
  width: 80%;
  line-height: 135%;
  z-index: 100;
  position: relative;
}

.secondaryContent{
  position: absolute;
  bottom: 50px;
  text-align: center;
  right: -6.5%;
}

.homePgCreditText {
  color: white;
  font-family: 'Libre Baskerville', serif;
  font-size: 14px;
  bottom: 0;
}



/* Centre credit text when aspect ratio <= 1.0 */
@media only screen and (max-aspect-ratio: 1/1) {
  .secondaryContent{
    position: absolute;
    bottom: 50px;
    right: 0;
    width: 100%;
    text-align: center;
  }
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .openbtn {
    top: 25px;
    left: 25px;
  }
  .homePgMainText {
    font-size: calc(0.75em + 0.75vw);
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .openbtn {
    top: 35px;
    left: 35px;
  }
  .homePgMainText {
    font-size: calc(0.65em + 0.65vw);
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .openbtn {
    top: 46px;
    left: 46px;
  }
  .homePgMainText {
    font-size: calc(0.875em + 0.625vw);
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) { 
  .homePgMainText {
    font-size: calc(0.875em + 0.625vw);
  }
}

</style>
