<template>
  <div v-if="mounted">
    <vue-plyr ref="plyr" :emit="['playing','ended']" @playing="emitGlobalPlayingEvent" @ended="emitGlobalEndedEvent" :style="dynamicStyles">
      <audio>
        <source :src="src" type="audio/mp3"/>
      </audio>
    </vue-plyr>
  </div>
</template>


<script scoped>
import VuePlyr from 'vue-plyr'
import { EventBus } from '../event-bus'

export default { 
  name: 'AudioPlayer',

  components: {
    VuePlyr
  },

  props: {
    src: {
      type: String,
      required: true
    },    
    background: {
      type: String,
      default: 'black',
    },        
    borderRadius: {
      type: String,
      default: '0px',
    },
    iconColor: {
      type: String,
      default: 'grey',
    },
    iconHoverColor: {
      type: String,
      default: 'white',
    },          
    secondaryColor: {
      type: String,
      default: '#00b3ff',
    },  
    padding: {
      type: String,
      default: '5px',
    }, 
  },

  data() {
    return {
      mounted: false
    };
  },
  
  computed: {
    dynamicStyles() {
      return {
        '--background': this.background,
        '--borderRadius': this.borderRadius,
        '--iconColor': this.iconColor,
        '--iconHoverColor': this.iconHoverColor,
        '--secondaryColor': this.secondaryColor,
        '--padding': this.padding
      }
    }
  },

  mounted() {
    this.mounted = true
    EventBus.$on('backgroundMusicPlaying', this.eventBusListener)
  },

  beforeDestroy() {
    EventBus.$off('backgroundMusicPlaying', this.eventBusListener)
  },

  methods: {
    emitGlobalPlayingEvent() {
      EventBus.$emit('audioPlaying')
    },

    emitGlobalEndedEvent() {
      EventBus.$emit('audioEnded')
    },

    eventBusListener() {
      this.$refs.plyr.player.pause()
    },

    play() {
      this.$refs.plyr.player.play()
    },

    stop() {
      this.$refs.plyr.player.stop()
    }
  }
}
</script>



<style>

.plyr--audio .plyr__controls {
  background: var(--background) !important;
  border-radius: var(--borderRadius) !important;
  color: var(--iconColor) !important;
  padding: var(--padding) !important;  
}

.plyr--audio .plyr__control.plyr__tab-focus, .plyr--audio .plyr__control:hover, .plyr--audio .plyr__control[aria-expanded=true] {
  background: var(--secondaryColor) !important;  
  color: var(--iconHoverColor) !important;  
}

.plyr--full-ui input[type=range] {
  color: var(--secondaryColor) !important; 
}

</style>
