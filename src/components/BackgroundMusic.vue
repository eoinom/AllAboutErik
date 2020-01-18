<template>
  <div class="soundIconContainer">
    <span v-b-tooltip.hover="{ variant: 'light' }" :title="tooltipText">
      <img v-if="audioPlaying && !audioMuted" alt="Mute background music" src="../assets/images/sound-playing.png" class="audioIcon" @click="clickAudioIcon()" />
      <img v-else alt="Play background music" src="../assets/images/sound-muted.png" class="audioIcon" @click="clickAudioIcon()" />          
    </span>    
  </div>
</template>


<script scoped>
export default { 
  name: 'BackgroundMusic',

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
      audio: null,
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
      if (!this.audioPlaying) {
        this.playAndFadeAudio()
      }
      else {
        this.audio.muted = !this.audio.muted;
        this.audioMuted = !this.audioMuted
      }
    },
    playAndFadeAudio() {
      let promise = this.audio.play()
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
        console.log('promise undefined'); 
        this.audioPlaying = false;
        this.audioMuted = false;
      }
    },
    getSoundAndFadeAudio() {      
      if (this.audioPlaying) {        
        this.audio.volume = 0.0
        this.audio.currentTime = 0

        // Fade In
        let fadeAudioIn = setInterval(function () {
          if ((this.audio.currentTime < this.audioFadeInDuration) && (this.audio.volume != 1.0)) {
            this.audio.volume = Math.min((this.audio.currentTime / this.audioFadeInDuration) * 1.0, 1.0);
          }
          if ((this.audio.currentTime >= this.audioFadeInDuration) || (this.audio.volume >= 1.0)) {
            clearInterval(fadeAudioIn);
            this.audio.volume = 1.0
          }          
        }.bind(this), 200);

        // Fade Out
        let fadeOutPoint = this.audioDuration - this.audioFadeOutDuration;
        let fadeAudioOut = setInterval(function() {
          this.audioFinished = false
          if ((this.audio.currentTime >= fadeOutPoint) && (this.audio.volume != 0.0)) {
            this.audio.volume = Math.max(0.0, (this.audioDuration - this.audio.currentTime) / this.audioFadeOutDuration);
          }
          else if (this.leavingPage) {
            this.audio.volume = Math.max(0.0, (this.audioTimeAtStartPageLeave + this.pageFadeOutDuration - this.audio.currentTime) / this.pageFadeOutDuration);
          }

          if (this.audio.volume === 0.0 && !this.audioMuted && !this.leavingPage) {
            this.audioPlaying = false
            this.audioFinished = true             
            clearInterval(fadeAudioOut);
          }
          if (this.audio.volume === 0.0 && this.leavingPage) {
            this.audioPlaying = false
            this.audioFinished = false             
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
    this.audio = new Audio(this.audioFile)
    this.playAndFadeAudio()
  },

  beforeDestroy() {  
    // set data for fading out audio
    this.leavingPage = true
    this.audioTimeAtStartPageLeave = this.audio.currentTime
  }
}
</script>



<style scoped>

.soundIconContainer{
  position: fixed;
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
