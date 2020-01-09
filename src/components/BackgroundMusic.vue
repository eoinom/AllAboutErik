<template>
  <div class="soundIconContainer">
    <span v-b-tooltip.hover="{ variant: 'light' }" :title="tooltipText">
      <g-image v-if="audioPlaying && !audioMuted" alt="Mute background music" src="~/assets/images/sound-playing.png" class="audioIcon" @click="clickAudioIcon()" />
      <g-image v-if="!audioPlaying || audioMuted" alt="Play background music" src="~/assets/images/sound-muted.png" class="audioIcon" @click="clickAudioIcon()" />          
    </span>

    <audio loop id="bgAudio" duration=123>
      <source :src="audioFile" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
</template>


<script scoped>
export default { 
  name: '',

  props: {
    audioFile: {
      type: String
    },
    audioDuration: {
      type: Number
    },
    audioFadeInDuration: {
      type: Number,
      default: 5
    },
    audioFadeOutDuration: {
      type: Number,
      default: 5
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

  mounted() {
    this.playAndFadeAudio()
  },

  beforeDestroy() {  
    // set data for fading out audio
    this.leavingPage = true
    let sound = document.getElementById('bgAudio');
    this.audioTimeAtStartPageLeave = sound.currentTime
  },

  components: {
  },
}
</script>



<style scoped>

.soundIconContainer{
  position: absolute;
  top: 52px;
  right: 7.3%;
  z-index: 1000;
}

.audioIcon {
  max-width: 72px;
  height: auto;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .soundIconContainer{
    position: absolute;
    top: 17px;
    right: 7.3%;
    z-index: 1000;
  }
  .audioIcon {
    max-width: 52px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .soundIconContainer{
    position: absolute;
    top: 28px;
    right: 7.3%;
    z-index: 1000;
  }
  .audioIcon {
    max-width: 57px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .soundIconContainer{
    position: absolute;
    top: 40px;
    right: 7.3%;
    z-index: 1000;
  }
  .audioIcon {
    max-width: 62px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  .soundIconContainer{
    position: absolute;
    top: 52px;
    right: 7.3%;
    z-index: 1000;
  }
  .audioIcon {
    max-width: 67px;
  }
}

</style>
