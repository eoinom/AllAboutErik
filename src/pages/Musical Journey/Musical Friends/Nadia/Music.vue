<template>
  <Layout> 
    <b-container class="main-col pt-5">
      
      <div style="text-align: center">
        <h1 class="heading">{{ title }}</h1>
      </div>

      <br><br>
      
      <div v-for="(track, index) in tracks" :key="index" class="mb-3">

        <b-row v-if="index % 2 === 0" align-h="end" align-v="center">
          <b-col cols="auto" class="pr-2">
            <p class="trackTitle textAlignEnd">{{ track.title }}</p>
            <p class="trackCaption textAlignEnd">{{ track.caption }}</p>
          </b-col>
          <b-col cols="auto" class="pl-2">
            <g-image :src="track.image" class="trackImg my-3" />
          </b-col>
        </b-row>

        <b-row v-else align-h="left" align-v="center">
          <b-col cols="auto" class="pr-2">
            <g-image :src="track.image" class="trackImg my-3" />
          </b-col>
          <b-col cols="auto" class="pl-2">
            <p class="trackTitle">{{ track.title }}</p>
            <p class="trackCaption">{{ track.caption }}</p>
          </b-col>
        </b-row>

        <audio-player :src="track.url" secondaryColor="#E7413F" padding="5px 0px" />

        <hr class="style-two">
      </div>

    </b-container>
  </Layout>
</template>

<page-query>
{
  NadiaMusic: allNadiaMusic {
    edges {
      node {
        id
        pageTitle
        titleText
        tracks {
          title
          caption
          url
          image
        }
      }
    }
  }	
}
</page-query>


<script scoped>
import AudioPlayer from '../../../../components/AudioPlayer'

export default { 
  metaInfo() {
    return {
      title: this.$page.NadiaMusic.edges[0].node.pageTitle
    }
  },

  computed: {
    title() {
      return this.$page.NadiaMusic.edges[0].node.titleText
    },
    tracks() {
      return this.$page.NadiaMusic.edges[0].node.tracks
    }
  },

  components: {
    AudioPlayer
  },
}
</script>



<style scoped>
@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../../../../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../../../../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../../../../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../../../../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}
@font-face {
  font-family: NeueHaasGroteskText Pro75Bd;
  src: url('../../../../assets/fonts/nhaasgrotesktxpro-75bd.woff') format('woff'), /* Pretty Modern Browsers */
       url('../../../../assets/fonts/nhaasgrotesktxpro-75bd.ttf') format('ttf');
  font-weight: normal;
}

.main-col {
  /* padding: 0 6%; */
  padding: 0 0;
  max-width: 915px;
}

.heading {
  color: white; 
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-size: 2.625rem;
  font-weight: 400;
  text-shadow: 1px 1px 2px rgba(28,16,23,0.83);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.trackTitle {
  color: #e7413f; 
  font-family: 'NeueHaasGroteskText Pro75Bd';
  font-feature-settings: 'liga';
  font-size: 2.625rem;
  font-weight: 400;
  margin-bottom: 0;
}

.trackCaption {
  color: #cecece; 
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0;
}

.trackImg {
  height: 86px;
  display: block;
}

.textAlignEnd {
  text-align: end;
}

hr.style-two {
  /* https://css-tricks.com/examples/hrs/ */
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(231, 65, 63, 0.1), rgba(231, 65, 63, 0.75), rgba(231, 65, 63, 0.1));
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {

}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {

}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 

}

</style>
