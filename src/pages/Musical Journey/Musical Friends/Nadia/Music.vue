<template>
  <Layout> 
    <b-container class="main-col pt-5">
      <div style="text-align: center">
        <h1 class="heading">{{ title }}</h1>
      </div>
      <br><br>
      <div v-for="(track, index) in tracks" :key="index">
        <g-image :src="track.image" :class="track.imgPosition" class="trackImg my-3" />
        <audio-player :src="track.url" secondaryColor="#E7413F" padding="5px 0px" />
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
          url
          image
          imgPosition
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
  /* text-shadow: 2px 2px 5px rgba(0,0,0,0.65); */
  text-shadow: 1px 1px 2px rgba(28,16,23,0.83);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.trackImg {
  height: 86px;
  display: block;
}

.left {
  margin-left: 0;
  margin-right: auto;
}

.right {
  margin-left: auto;
  margin-right: 0;
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
