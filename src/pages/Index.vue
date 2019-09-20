<template>
  <Layout>

    <div class="container">
      <div class="contentContainer">
        <div class="content">

          <div class="mainContent">
            <g-image alt="All About Erik logo" v-if="titleImg != null" :src="titleImg" class="titleImg"/>
            <span v-html="mainText" class="homePgMainText" />
          </div>

          <div class="secondaryContent">
            <span class="icon">
              <font-awesome :icon="audioFontAwesomeIcon" @click="clickAudioIcon()"/>
            </span>
            <br />
            <span v-html="creditText" class="homePgCreditText" />
          </div>

        </div>
      </div>
    </div>

    <div class="slideshow">
      <slideshow-images
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
import SlideshowImages from '../components/SlideshowImages.vue'

export default {
  metaInfo() {    // https://github.com/gridsome/gridsome/issues/306 (How do you use the queried GraphQL data in the <script>?)
    return {
      title: this.$page.HomePage.edges[0].node.pageTitle,  // <-- "this" is the Vue instance with $page
    }
  },

  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
      audioPlaying: false,
      audioMuted: true
    }
  },

  computed: {
    slides() {
      return this.$page.HomePage.edges[0].node.slides
    },
    images() {      
      return this.slides.map(a => a.img)
    },
    titleImg() {
      return this.$page.HomePage.edges[0].node.headingImg
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
    audioFontAwesomeIcon() {
      if (!this.audioPlaying)
        return ['fas', 'fa-play']
      else
        return this.audioMuted ? ['fas', 'volume-mute'] : ['fas', 'volume-up']
    },
    // audioMuted: {
    //   get: function () {
    //     return document.getElementById('bgAudio').muted;
    //   },
    //   set: function (muteVal) {
    //     console.log('muteVal = ' + muteVal);
    //     let audioEl = document.getElementById('bgAudio');
    //     console.log('in audioMuted setter, audioEl:');
    //     document.getElementById('bgAudio').muted = muteVal
    //   }
    // }
  },

  methods: {
    clickAudioIcon() {
      let audioEl = document.getElementById('bgAudio');
  
      if (!this.audioPlaying) {
        let promise = audioEl.play(); 
        // audioEl.muted = true;
        if (promise !== undefined) {
          promise.then(_ => {
            // Autoplay started!
            this.audioPlaying = true;
            this.audioMuted = false;
          }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
            this.audioPlaying = false;
            this.audioMuted = false;
          });
        }
      }
      else {
        audioEl.muted = !audioEl.muted;        
        this.audioMuted = !this.audioMuted
      }
    },
    getSoundAndFadeAudio() {    
      var sound = document.getElementById('bgAudio');
      sound.volume = 0.0            

      // Fade In
      var fadeInEndPoint = this.bgAudioFadeInDuration;   //seconds
      var fadeAudioIn = setInterval(function () {
        console.log('sound currentTime (fadeIn): ' + sound.currentTime);
        if ((sound.currentTime < fadeInEndPoint) && (sound.volume != 1.0)) {
          sound.volume = (sound.currentTime / fadeInEndPoint) * 1.0;
        }
        if ((sound.currentTime >= fadeInEndPoint) || (sound.volume >= 1.0)) {
          console.log('clearing fadeInt interval');
          clearInterval(fadeAudioIn);
          sound.volume = 1.0
        }
      }, 400);

      // Fade Out
      // var fadeOutPoint = sound.duration - 5; 
      var fadeOutPoint = this.audioDuration - this.bgAudioFadeOutDuration; 
      var fadeAudioOut = setInterval(function () {
        console.log('sound currentTime (fadeOut): ' + sound.currentTime);
        if ((sound.currentTime >= fadeOutPoint) && (sound.volume != 0.0)) {
          sound.volume -= 0.1;
        }
        if (sound.volume === 0.0) {
          console.log('clearing fadeOut interval');
          clearInterval(fadeAudioOut);
        }
      }, 400);
    }
  },

  components: {
    'slideshow-images':     require('../components/SlideshowImages.vue').default,
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight
      });
    })

    // let audioEl = document.getElementById('bgAudio'); 
    // audioEl.muted = true;

    let promise = document.getElementById('bgAudio').play(); 
    
    // audioEl.muted = true;

    if (promise !== undefined) {
      promise.then(_ => {
        // Autoplay started!
        this.getSoundAndFadeAudio();
        this.audioPlaying = true;
        this.audioMuted = false;
      }).catch(error => {
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
        console.error(error);
        this.audioPlaying = false;
        this.audioMuted = false;
        console.log('Promise rejected in mounted');        
      });
    }
    else {
      this.audioPlaying = true;
      this.audioMuted = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Libre+Baskerville&display=swap');


$items: 14;
$animation-time: 5s;
$transition-time: 3s;
$scale: 10%;

$total-time: ($animation-time * $items);
$scale-base-1: (1 + $scale / 100%);

.slideshow {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.slideshow-image {
  position: absolute;
  width: 100%;
  height: 100%;
  background: no-repeat 50% 50%;
  background-size: cover;
  animation-name: kenburns;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: $total-time;
  transform-origin: top left;
  opacity: 0.6;
  transform: scale($scale-base-1);

  @for $i from 1 through $items {
    &:nth-child(#{$i}) {
      animation-name: kenburns-#{$i};
      z-index: ($items - $i);
    }
  }
}

@for $i from 1 through $items {
  @keyframes kenburns-#{$i} {
    $animation-time-percent: percentage($animation-time / $total-time);
    $transition-time-percent: percentage($transition-time / $total-time);

    $t1: ($animation-time-percent * ($i - 1) - $transition-time-percent / 2);
    $t2: ($animation-time-percent * ($i - 1) + $transition-time-percent / 2);
    @if($t1 < 0%) { $t1: 0%; }
    @if($t2 < 0%) { $t2: 0%; }

    $t3: ($animation-time-percent * ($i) - $transition-time-percent / 2);
    $t4: ($animation-time-percent * ($i) + $transition-time-percent / 2);
    @if($t3 > 100%) { $t3: 100%; }
    @if($t4 > 100%) { $t4: 100%; }

    $t5: (100% - $transition-time-percent / 2);
    $t6: (($t4 - $t1) * 100% / $t5);

    #{$t1} { opacity: 1; transform: scale($scale-base-1); }
    #{$t2} { opacity: 1; }
    #{$t3} { opacity: 1; }
    #{$t4} { opacity: 0; transform: scale(1); }

    @if($i != $items) {
      100% { opacity: 0; transform: scale($scale-base-1); }
    }

    @if($i == 1) {
      $scale-plus: ($scale * (100% - $t5) / $t4);
      $scale-plus-base-1: (1 + ($scale + $scale-plus) / 100%);

      #{$t5} { opacity: 0; transform: scale($scale-plus-base-1); }
      100% { opacity: 1; }
    }
  }
}



.layout {
  padding: 0
}

.container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  overflow: hidden;
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

.icon {
  font-size: 3em; 
  color: white;
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

</style>
