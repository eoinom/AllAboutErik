<template>
  <Layout> 
    <b-container class="main-col pt-5">
      <div style="text-align: center">
        <h1 class="text caps">{{ title }}</h1>
      </div>
      <br><br>
      <div v-for="(track, index) in tracks" :key="index">
        <g-image :src="track.image" :class="track.imgPosition" class="trackImg my-3" />
        <mediaelement class="" :source="track.url"></mediaelement>
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
import mediaelement from 'vue-mediaelement';

export default { 
  metaInfo() {
    return {
      title: this.$page.NadiaMusic.edges[0].node.pageTitle
    }
  },

  data() {
    return {
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

  methods: {
  },

  mounted() {
  },

  components: {
    // 'mediaelement': vueMediaelement
    // mediaelement
  },
}
</script>



<style scoped>

@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url('../../../../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../../../../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../../../../assets/fonts/nhaasgrotesktxpro-65md.woff') format('woff'), /* Pretty Modern Browsers */
       url('../../../../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.main-col {
  /* padding: 0 6%; */
  padding: 0 0;
  max-width: 915px;
}

.text {
  color: white; 
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-size: 2.5rem;
  font-weight: 500;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.65);
  letter-spacing: 2px;  
}

.caps {
  text-transform: uppercase;
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
