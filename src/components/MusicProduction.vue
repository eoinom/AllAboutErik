<template>
  <b-container fluid id="productionContainer">
    <b-row no-gutters>
      <b-col>
        <p class="titleText">{{ titleText }}</p>
        
        <div id="imgAndTracksDiv">
          <img :src="image" />
          
          <div :style="tracksDivStyles" id="tracksDiv">
            <div v-for="(track, iTrack) in tracks" :key="iTrack">
              <p class="trackTitleText">{{ track.title }}</p>
              <audio-player :src="track.track" secondaryColor="#E30829" padding="0px 0px" />
            </div>
          </div>
        </div>

      </b-col>
    </b-row>
  </b-container>
</template>


<script scoped>
import AudioPlayer from './AudioPlayer'

export default { 
  name: 'MusicProduction',

  props: {
    writer: {
      type: String
    },
    artist: {
      type: String
    },
    image: {
      type: String
    },
    backgroundImg: {
      type: String
    },
    tracks: {
      type: Array
    }
  },
  
  computed: {
    titleText() {
      let titleText = ''
      if (this.writer != '') {
        titleText = 'WRITER: ' + this.writer
      }
      if (this.artist != '') {
        if (this.writer != '') {
          titleText += ' // '
        }
        titleText += 'ARTIST: ' + this.artist
      }
      return titleText
    },
    tracksDivStyles() {
      return {
        '--bgImg': 'url("' + this.backgroundImg + '")'
      }
    }
  },

  components: {
    AudioPlayer
  },
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lato:700,900&display=swap');

#imgAndTracksDiv {
  display: flex;
  width: 100%; 
  text-align: left;
}
  
#tracksDiv {
  background: #F3F3F3 var(--bgImg) no-repeat center center;
  background-color: rgba(221,221,221,0.35);
  background-size: cover;
  display: inline-block; 
  vertical-align: top; 
  flex-grow: 1;
}

.titleText {
  color: #E30829;
  font-family: 'Lato', sans-serif;
  font-feature-settings: 'liga';
  letter-spacing: 4px;
  line-height: 18px;
  font-size: 15px;
  font-weight: 700;
  text-align: left;
  text-transform: uppercase;
  margin: 0px;
  padding: 5px 0px;
}

.trackTitleText {
  color: white;
  font-family: 'Lato', sans-serif;
  font-feature-settings: 'liga';
  letter-spacing: 5px;
  line-height: 18px;
  font-size: 15px;
  font-weight: 900;
  text-align: left;
  text-transform: uppercase;
  margin: 0px;
  padding: 7px 18px;
}

</style>
