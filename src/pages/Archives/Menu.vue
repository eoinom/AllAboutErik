<template>
  <Layout>

    <b-container fluid class="main-col m-0, p-0">
      <b-row no-gutters class="mb-1 px-1">
        <b-col class="slideshowCol">

          <!-- SLIDESHOW OVERLAY -->
          <div class="slideshowOverlayMenu mb-3">
            <div class="mainContent mx-auto">

              <g-image alt="Archives title image" v-if="titleImg != null" :src="titleImg" id="titleImg" class="mb-md-1 mb-lg-2 mb-xl-3"/>

              <div v-html="slideshowText" id="slideshowText" />

            </div>
          </div>

        </b-col>
      </b-row>
    </b-container>

    <!-- TILES -->
    <ArchivesTiles :tiles="tiles" />    

    <BackToTop />
  </Layout>
</template>

<page-query>
{
  Archives: allArchivesIndex {
    edges {
      node {
        pageTitle
        titleImg
        content
        tiles {
          text
          opacity
          img
          img_bright
        }
      }
    }
  }
}
</page-query>


<script scoped>
import ArchivesTiles from '../../components/ArchivesTiles.vue'
import BackToTop from '../../components/BackToTop.vue'

export default { 
  metaInfo() {
    return {
      title: this.$page.Archives.edges[0].node.pageTitle
    }
  },

  components: {
    ArchivesTiles,
    BackToTop
  },

  computed: {
    node() {
      return this.$page.Archives.edges[0].node
    },
    titleImg() {
      return this.node.titleImg
    },
    slideshowText() {
      return this.node.content
    },
    tiles() {
      return this.node.tiles
    }
  }  
}
</script>



<style scoped lang="scss">

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.layout {
  padding: 0;
}

.row {
  margin-bottom: 20px;
}

.main-col {
  max-width: 100%;
  z-index: 0;
}

.slideshowCol {
  position: relative;
  width: auto;
  text-align: center;
  overflow-x: hidden;
  overflow-y: hidden;
}

.slideshowOverlayMenu {
  z-index: 10;
  width: 100%;
  padding-top: 60px;
}

.mainContent{
  max-width: 1289px;
  padding-left: 5%;
  padding-right: 5%;
  text-align: center;
  z-index: 20;
}

#titleImg {
  width: 70%;
  max-width: 538px;
  min-width: 250px;
  height: auto;
  margin: auto;
  padding-bottom: 15px;
}

#slideshowText {
  color: #FFFFFF;
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 2.0625rem;
  letter-spacing: 2px;
  text-align: center;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

@media only screen and (max-width: 1199.98px) {
  #slideshowText {
    font-size: calc(1rem + 6 * (100vw - 300px) / (1200 - 300) ); /* varies between 16px (1rem) at 300px vw and 22px (1.375rem) at 1200px vw */
    line-height: calc(1.0625rem + 16 * (100vw - 300px) / (1200 - 300) ); /* varies between 17px (1.0625rem) at 300px vw and 33px (2.0625rem) at 1200px vw */
  }
}

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) and (orientation: landscape) {
  #slideshowText {
    font-size: 14.5px;
  }
  .slideshowOverlay {
    padding-bottom: 0px;
    margin-bottom: 8px !important;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) and (orientation: landscape) {
  #slideshowText {
    font-size: 16px;
  }
  .slideshowOverlay {
    padding-bottom: 4px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) and (orientation: landscape) {
  #slideshowText {
    font-size: 18px;
  }
  .slideshowOverlay {
    padding-bottom: 4px;
  }
}

</style>
