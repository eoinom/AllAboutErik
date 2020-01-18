<template>
  <div class="soundIconContainer">
    <span v-b-tooltip.hover="{ variant: 'light' }" :title="tooltipText">
      <img v-if="audioPlaying && !audioMuted" alt="Mute background music" src="../assets/images/sound-playing.png" class="audioIcon" @click="clickAudioIcon()" />
      <!-- <img v-if="!audioPlaying || audioMuted" alt="Play background music" src="../assets/images/sound-muted.png" class="audioIcon" @click="clickAudioIcon()" />           -->
      <img v-else alt="Play background music" src="../assets/images/sound-muted.png" class="audioIcon" @click="clickAudioIcon()" />          
    </span>

    <!-- <audio loop id="bgAudio" :duration="audioDuration"> -->
    <!-- <audio id="bgAudio" :duration="audioDuration" :onPlay="getSoundAndFadeAudio()"> -->
      <!-- <source :src="audioFile" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio> -->
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
      // let audioEl = document.getElementById('bgAudio');
      let audioEl = this.audio;

      if (!this.audioPlaying) {
        this.playAndFadeAudio()
      }
      else {
        audioEl.muted = !audioEl.muted;
        this.audioMuted = !this.audioMuted
      }
    },
    playAndFadeAudio() {
      console.log('in playAndFadeAudio');
      // let promise = document.getElementById('bgAudio').play();
      // var audio = new Audio(this.audioFile)
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
      console.log('in getSoundAndFadeAudio');
      
      if (this.audioPlaying) {
        // let sound = document.getElementById('bgAudio');
        let sound = this.audio
        console.log('sound:');
        console.log(sound);
        
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
          console.log('sound.volume in = ' + sound.volume);
          
        }, 200);

        // Fade Out
        let audioDuration = this.audioDuration;
        let fadeOutDuration = this.audioFadeOutDuration;
        let fadeOutPoint = audioDuration - fadeOutDuration;
        let pageFadeOutDuration = this.pageFadeOutDuration;
        if (fadeOutPoint <= fadeInEndPoint) {
          fadeOutPoint = fadeInEndPoint
        }
        let fadeAudioOut = setInterval(function() {
          this.audioFinished = false
          if ((sound.currentTime >= fadeOutPoint) && (sound.volume != 0.0)) {
            // sound.volume = Math.max(0.0, 1.0 * ((audioDuration - sound.currentTime) / fadeOutDuration));
            sound.volume = Math.max(0.0, (audioDuration - sound.currentTime) / fadeOutDuration);
          }
          else if (this.leavingPage) {
            // sound.volume = Math.max(0.0, 1.0 * ((this.audioTimeAtStartPageLeave + this.pageFadeOutDuration - sound.currentTime) / this.pageFadeOutDuration));
            console.log('in leavingPage fade out');
            console.log('pageFadeOutDuration: ' + pageFadeOutDuration);
            console.log('sound.currentTime: ' + sound.currentTime);
            
            // sound.volume = Math.max(0.0, (pageFadeOutDuration - sound.currentTime) / pageFadeOutDuration);
            sound.volume = Math.max(0.0, (this.audioTimeAtStartPageLeave + pageFadeOutDuration - sound.currentTime) / pageFadeOutDuration);
            console.log('sound.volume leavingPage = ' + sound.volume);
          }
          
          console.log('sound.volume out = ' + sound.volume);

          if (sound.volume === 0.0 && !this.audioMuted && !this.leavingPage) {
            this.audioPlaying = false
            this.audioFinished = true             
            clearInterval(fadeAudioOut);
          }
          if (sound.volume === 0.0 && this.leavingPage) {
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
        console.log('in audioFinished watcher');
            
        this.playAndFadeAudio()
      }
    }
  },

  mounted() {
    console.log('in mounted');
    this.audio = new Audio(this.audioFile)
    this.playAndFadeAudio()
  },

  beforeDestroy() {  
    // set data for fading out audio
    console.log('in beforeDestroy');
    this.leavingPage = true
    // let sound = document.getElementById('bgAudio');
    let sound = this.audio
    this.audioTimeAtStartPageLeave = sound.currentTime
    
    console.log('this.audioTimeAtStartPageLeave = ' + this.audioTimeAtStartPageLeave);
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
