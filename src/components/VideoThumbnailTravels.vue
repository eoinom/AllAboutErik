<template>
  <div class="videoThumbnailContainer">              
    <div>
      <g-image :alt="video.title" v-if="video.thumbnailImg != null" :src="video.thumbnailImg" class="thumbnailImg"/>
    </div>

    <div class="thumbnailImgTextOverlay">
      <div class="showOnHover">
        <h4 class="playVideoText mb-1 mb-sm-2 mb-lg-4">PLAY VIDEO</h4>
        <span v-if="video.duration != null" class="videoDurationText ">
            {{ durationInMinsText(video.duration) }} 
          </span>
      </div>
    </div>

    <b-container fluid class="captionBanner p-2">
      <b-row align-h="center" align-v="center" style="height:100%">
        <b-col align-self="center">
          <h4 class="videoTitle">{{ video.title }}</h4>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script scoped>
export default { 
  name: 'VideoThumbnailTravels',

  props: {
    video: {
      type: Object
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
    }
  }
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lora:700i&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.videoThumbnailContainer {
  position: relative;
  cursor: pointer;
}

.thumbnailImg {
  width: 100%;
  max-width: 100%;
  height: auto;  
  position: relative;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.thumbnailImgTextOverlay {
  color: #FFFFFF;
  position: absolute;
  text-align: center;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
}

.playVideoText {
  font-family: 'Open Sans Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 300;
  font-size: 2.3125rem;
  line-height: 2.3125rem;
  letter-spacing: 9px;
  text-transform: uppercase;
}

.videoDurationText {
  display: inline;
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 2.125rem;
  letter-spacing: 2px;
}

.captionBanner {
  color: white; 
  background-color: black;
  width: 100%; 
  height: 115px;
  position: block; 
  bottom: 0; 
  font-size: 14px;
  transition: all 0.3s ease-in 0.0s;
}

.videoTitle {
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 1.0625rem;
  line-height: 1.375rem;
  letter-spacing: 7px;
  text-transform: uppercase;
}

.showOnHover {
  opacity: 0;
  transition: all 0.3s ease-in 0.2s;
}
.videoThumbnailContainer:hover .showOnHover {
  opacity: 1;
}
.videoThumbnailContainer:hover .thumbnailImg {
  opacity: 0.5;
}
.videoThumbnailContainer:hover .captionBanner {
  color: black; 
  background-color: white;
}



/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

@media only screen and (max-width: 400px) {
  #titleImg {
    max-width: 60%;
  }
}
@media only screen and (min-width: 400.01px) and (max-width: 575.98px) {
  #titleImg {
    max-width: 65%;
  }
}


/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {  
  .playVideoText {
    font-size: calc(1.875rem + 7 * (100vw - 375px) / (576 - 375));
    line-height: calc(1.875rem + 7 * (100vw - 375px) / (576 - 375));
    letter-spacing: 9px;
  }
  .videoDurationText {
    font-size: calc(1.125rem + 6 * (100vw - 375px) / (576 - 375));
  }
  .videoTitle {
    font-size: calc(0.9375rem + 1 * (100vw - 375px) / (576 - 375));
    line-height: calc(1.25rem + 1 * (100vw - 375px) / (576 - 375));
    letter-spacing: calc(0.3125rem + 1 * (100vw - 375px) / (576 - 375));
  }
  .captionBanner {
    height: calc(90px + 25 * (100vw - 375px) / (576 - 375));
    /* color: black; 
    background-color: white; */
  }
  .showOnHover {
    opacity: 1;
  }
  .thumbnailImg {
    opacity: 0.5;
  }
  .hideText {
    display: none;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .playVideoText {
    font-size: 4.8vw;
    line-height: 4.8vw;
    letter-spacing: 8px;
  }
  .videoDurationText {
    font-size: 2.86vw;
  }
  .videoTitle {
    font-size: calc(1rem + 1 * (100vw - 576px) / (768 - 576));
    line-height: calc(1.3125rem + 1 * (100vw - 576px) / (768 - 576));
    letter-spacing: calc(0.375rem + 1 * (100vw - 576px) / (768 - 576));
  }
  .captionBanner {
    height: calc(100px + 15 * (100vw - 576px) / (768 - 576));
    /* color: black; 
    background-color: white; */
  }
  .showOnHover {
    opacity: 1;
  }
  .thumbnailImg {
    opacity: 0.5;
  }
  .hideText {
    display: none;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  /* .captionBanner {
     color: black; 
    background-color: white;
  } */
  .showOnHover {
    opacity: 1;
  }
  .thumbnailImg {
    opacity: 0.5;
  }
  .hideText {
    display: none;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) { 
  .videoTitle {
    font-size: calc(1rem + 1 * (100vw - 992px) / (1200 - 992));
    line-height: calc(1.3125rem + 1 * (100vw - 992px) / (1200 - 992));
    letter-spacing: calc(0.375rem + 1 * (100vw - 992px) / (1200 - 992));
  }
  .captionBanner {
    height: calc(100px + 15 * (100vw - 992px) / (1200 - 992));
  }
}

</style>
