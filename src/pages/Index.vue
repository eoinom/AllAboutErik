<template>
  <Layout>

    <b-container fluid>
      <div class="soundIconContainer">
        <span v-b-tooltip.hover="{ variant: 'light' }" :title="tooltipText">
          <g-image v-if="audioPlaying && !audioMuted" alt="Mute background music" src="~/assets/images/sound-playing.png" class="audioIcon" @click="clickAudioIcon()" />
          <g-image v-if="!audioPlaying || audioMuted" alt="Play background music" src="~/assets/images/sound-muted.png" class="audioIcon" @click="clickAudioIcon()" />          
        </span>
      </div>

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
      <slideshow-kenburns
        :slides="slides"
      />
    </div>

    <audio loop id="bgAudio" duration=123>
      <source :src="audioFile" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>

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
import SlideshowKenBurns from '../components/SlideshowKenBurns.vue'

export default {
  metaInfo() {    // https://github.com/gridsome/gridsome/issues/306 (How do you use the queried GraphQL data in the <script>?)
    return {
      title: this.$page.HomePage.edges[0].node.pageTitle,  // <-- "this" is the Vue instance with $page
    }
  },

  data() {
    return {
      audioPlaying: false,
      audioMuted: true,
      audioFinished: false,
      leavingPage: false,
      pageFadeOutDuration: 1.4,       //seconds
      audioTimeAtStartPageLeave: 0    //seconds
    }
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
    },
    tooltipText() {
      if (this.audioPlaying && !this.audioMuted) {
        return 'Mute background music'
      }
      else if (this.audioPlaying && this.audioMuted) {
        return 'Unmute background music'
      }
      return 'Play background music'
    }
  },

  methods: {
    clickAudioIcon() {
      let audioEl = document.getElementById('bgAudio');

      if (!this.audioPlaying) {
        this.playAndFadeAudio()
      }
      else {
        audioEl.muted = !audioEl.muted;
        this.audioMuted = !this.audioMuted
      }
    },
    playAndFadeAudio() {
      let promise = document.getElementById('bgAudio').play();
      if (promise !== undefined) {
        promise.then(_ => {          
          this.audioPlaying = true;
          this.audioMuted = false;
          this.getSoundAndFadeAudio();
        }).catch(error => {
          console.error(error);
          this.audioPlaying = false;
          this.audioMuted = false;
          console.log('Error playing background audio'); 
        });
      }
      else {
        this.audioPlaying = false;
        this.audioMuted = false;
      }
    },
    getSoundAndFadeAudio() {
      if (this.audioPlaying) {
        let sound = document.getElementById('bgAudio');
        sound.volume = 0.0
        sound.currentTime = 0

        // Fade In
        let fadeInEndPoint = this.audioFadeInDuration;   //seconds
        let fadeAudioIn = setInterval(function () {
          if ((sound.currentTime < fadeInEndPoint) && (sound.volume != 1.0)) {
            sound.volume = Math.min((sound.currentTime / fadeInEndPoint) * 1.0, 1.0);
          }
          if ((sound.currentTime >= fadeInEndPoint) || (sound.volume >= 1.0)) {
            clearInterval(fadeAudioIn);
            sound.volume = 1.0
          }
        }, 200);

        // Fade Out
        let audioDuration = this.audioDuration;
        let fadeOutDuration = this.audioFadeOutDuration;
        let fadeOutPoint = audioDuration - fadeOutDuration;
        if (fadeOutPoint <= fadeInEndPoint) {
          fadeOutPoint = fadeInEndPoint
        }
        let fadeAudioOut = setInterval(function() {
          this.audioFinished = false
          if ((sound.currentTime >= fadeOutPoint) && (sound.volume != 0.0)) {
            sound.volume = Math.max(0.0, 1.0 * ((audioDuration - sound.currentTime) / fadeOutDuration));
          }
          else if (this.leavingPage) {
            sound.volume = Math.max(0.0, 1.0 * ((this.audioTimeAtStartPageLeave + this.pageFadeOutDuration - sound.currentTime) / this.pageFadeOutDuration));
          }

          if (sound.volume === 0.0) {
            this.audioPlaying = false
            this.audioFinished = true             
            clearInterval(fadeAudioOut);
          }
        }.bind(this), 200)
      }
    },
  },

  watch: {
    audioFinished: function (val) {      
      if (val) {
        // play audio again with fade in/out        
        this.playAndFadeAudio()
      }
    }
  },

  components: {
    'slideshow-kenburns':     require('../components/SlideshowKenBurns.vue').default,
  },

  mounted() {
    this.playAndFadeAudio()

    document.body.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, false);
  },
  beforeDestroy() {  
    // set data for fading out audio
    this.leavingPage = true
    let sound = document.getElementById('bgAudio');
    this.audioTimeAtStartPageLeave = sound.currentTime
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

.soundIconContainer{
  position: absolute;
  top: 52px;
  right: 7.3%;
  z-index: 1000;
}

.secondaryContent{
  position: absolute;
  bottom: 50px;
  text-align: center;
  right: -6.5%;
}

.audioIcon {
  max-width: 72px;
  height: auto;
}

.homePgCreditText {
  color: white;
  font-family: 'Libre Baskerville', serif;
  font-size: 14px;
  bottom: 0;
}



/* Centre credit text when aspect ratio <= 1.0 */
@media (max-aspect-ratio: 1/1) {
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
@media (max-width: 575.98px) {
  .openbtn {
    top: 25px;
    left: 25px;
  }
  .soundIconContainer{
    position: absolute;
    top: 17px;
    right: 7.3%;
    z-index: 1000;
  }
  .audioIcon {
    max-width: 52px;
  }
  .homePgMainText {
    font-size: calc(0.75em + 0.75vw);
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .openbtn {
    top: 35px;
    left: 35px;
  }
  .soundIconContainer{
    position: absolute;
    top: 28px;
    right: 7.3%;
    z-index: 1000;
  }
  .audioIcon {
    max-width: 57px;
  }
  .homePgMainText {
    font-size: calc(0.65em + 0.65vw);
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .openbtn {
    top: 46px;
    left: 46px;
  }
  .soundIconContainer{
    position: absolute;
    top: 40px;
    right: 7.3%;
    z-index: 1000;
  }
  .audioIcon {
    max-width: 62px;
  }
  .homePgMainText {
    font-size: calc(0.875em + 0.625vw);
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  .soundIconContainer{
    position: absolute;
    top: 54px;
    right: 7.3%;
    z-index: 1000;
  }
  .audioIcon {
    max-width: 67px;
  }
  .homePgMainText {
    font-size: calc(0.875em + 0.625vw);
  }
}

</style>
