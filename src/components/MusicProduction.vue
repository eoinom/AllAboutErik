<template>
  <b-container fluid id="productionContainer">
    <b-row no-gutters>
      <b-col>
        <p v-if="showTitleCredits" class="titleText">{{ titleText }}</p>
        
        <div id="imgAndTracksDiv">
          <img v-if="showImage" :src="image" />
          
          <div v-if="showTracks" :style="tracksDivStyles" id="tracksDiv">
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
    production: {
      type: Object
    },
    showImage: {
      type: Boolean,
      default: true
    },
    showBgImage: {
      type: Boolean,
      default: true
    },
    showTitleCredits: {
      type: Boolean,
      default: true
    },
    showTracks: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      writer: this.production.hasOwnProperty('writer') ? this.production.writer : '',
      artist: this.production.hasOwnProperty('artist') ? this.production.artist : '',
      image: this.production.hasOwnProperty('image') ? this.production.image : '',
      bgImg: this.production.hasOwnProperty('bgImg') ? this.production.bgImg : '',
      bgImgPos: this.production.hasOwnProperty('bgImgPos') ? this.production.bgImgPos : 'center center',
      bgColor: this.production.hasOwnProperty('bgColor') ? this.production.bgColor : '#000',
      bgOpacity: this.production.hasOwnProperty('bgOpacity') ? this.production.bgOpacity : 0.5,
      tracks: this.production.hasOwnProperty('tracks') ? this.production.tracks : []
    }
  },
  
  computed: {
    titleText() {
      let titleText = ''
      if (this.writer != '') {
         if (this.writer.includes(',') || this.writer.includes('&')) {
          titleText += 'WRITERS: ' + this.writer
        } else {
          titleText += 'WRITER: ' + this.writer
        }
      }
      if (this.artist != '') {
        if (this.writer != '') {
          titleText += ' // '
        }
        if (this.artist.includes(',') || this.artist.includes('&')) {
          titleText += 'ARTISTS: ' + this.artist
        } else {
          titleText += 'ARTIST: ' + this.artist
        }
      }
      return titleText
    },
    tracksDivStyles() {
      return {
        '--bgImg': this.showBgImage ? 'url("' + this.bgImg + '")' : '',
        '--bgImgPos': this.bgImgPos,
        '--bgColor': this.showBgImage ? this.bgColor : 'transparent',
        '--bgOpacity': this.showBgImage ? this.bgOpacity : 0
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

#productionContainer {
  padding: 0px;
  margin: 0px;
}
  
#imgAndTracksDiv {
  display: flex;
  width: 100%; 
  text-align: left;
}
  
#tracksDiv {
  display: inline-block; 
  vertical-align: top; 
  flex-grow: 1;
  position: relative;
}

#tracksDiv:after {
  content : "";
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  background: var(--bgImg) no-repeat var(--bgImgPos);
  background-color: var(--bgColor);
  background-size: cover;
  opacity : var(--bgOpacity);
  width: 100%;
  height: 100%;
  z-index: -1;
}

.titleText {
  color: #E30829;
  font-family: 'Lato', sans-serif;
  font-feature-settings: 'liga';
  letter-spacing: 4px;
  line-height: 1.125rem;
  font-size: 0.9375rem;
  font-weight: 700;
  text-align: left;
  text-transform: uppercase;
  margin: 0px;
  padding: 0px 0px 5px 0px;
}

.trackTitleText {
  color: white;
  font-family: 'Lato', sans-serif;
  font-feature-settings: 'liga';
  letter-spacing: 5px;
  line-height: 1.125rem;
  font-size: 0.9375rem;
  font-weight: 900;
  text-align: left;
  text-transform: uppercase;
  margin: 0px;
  padding: 7px 18px;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {  
  .titleText {
    line-height: 1rem;
    font-size: 0.875rem;
    font-weight: 900;
    text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
  }
  .trackTitleText {
    letter-spacing: 4px;
    line-height: 1rem;
    font-size: 0.875rem;
    padding: 7px 10px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .titleText {
    line-height: 1rem;
    font-size: 0.875rem;
    font-weight: 900;
    text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
  }
  .trackTitleText {
    letter-spacing: 4px;
    line-height: 1rem;
    font-size: 0.875rem;
    padding: 7px 10px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .titleText {
    font-weight: 900;
    text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) { 

}
</style>
