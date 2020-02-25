<template>
  <Layout> 
    <b-container class="main-col pt-5">
      
      <div style="text-align: center">
        <!-- <h1 class="heading">{{ title }}</h1> -->
        <h1 class="heading">Eduardo Unz Music</h1>
      </div>
      
      <div v-for="(track, index) in tracks" :key="index" class="mb-3">

        <b-row v-if="index % 2 === 0" align-h="end" align-v="center">
          <b-col class="">
            <p class="trackTitle textAlignEnd">{{ track.title }}</p>
            <!-- <p class="trackCaption textAlignEnd hideOnMobile">{{ track.caption }}</p> -->
          </b-col>
          <!-- <b-col cols="auto" class="pl-2">
            <g-image :src="track.image" class="trackImg my-3" />
          </b-col>           -->
          <!-- <b-col cols="12" class="pr-4">
            <p class="trackCaption textAlignEnd showOnMobile">{{ track.caption }}</p>
          </b-col> -->
        </b-row>

        <b-row v-else align-h="start" align-v="center">
          <!-- <b-col cols="auto" class="pr-2">
            <g-image :src="track.image" class="trackImg my-3" />
          </b-col> -->
          <b-col class="">
            <p class="trackTitle">{{ track.title }}</p>
            <!-- <p class="trackCaption hideOnMobile">{{ track.caption }}</p> -->
          </b-col>
          <!-- <b-col cols="12" class="pl-4">
            <p class="trackCaption showOnMobile">{{ track.caption }}</p>
          </b-col> -->
        </b-row>

        <audio-player :src="track.url" secondaryColor="#E7413F" padding="5px 0px" />

        <hr class="style-two">
      </div>

      <b-row align-h="center" class="text-center">
        <b-col>
          <g-link to="/musical-journey/musical-friends/eduardo-unz" class="nav_link py-3">BACK TO UNZ</g-link>
        </b-col>
      </b-row>

    </b-container>
  </Layout>
</template>

<page-query>
{
  EduardoUnzMusic: allEduardoUnzMusic {
    edges {
      node {
        id
        pageTitle
        titleText
        tracks {
          title
          url
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
      title: this.$page.EduardoUnzMusic.edges[0].node.pageTitle
    }
  },

  computed: {
    title() {
      return this.$page.EduardoUnzMusic.edges[0].node.titleText
    },
    tracks() {
      return this.$page.EduardoUnzMusic.edges[0].node.tracks
    }
  },

  components: {
    AudioPlayer
  },
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');

/* @font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../../../../assets/fonts/nhaasgrotesktxpro-55rg.eot');
  src: url('../../../../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'),
       url('../../../../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'),
       url('../../../../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg');
  font-weight: normal;
} */
@font-face {
  font-family: NeueHaasGroteskText Pro75Bd;
  src: url('../../../../assets/fonts/nhaasgrotesktxpro-75bd.woff') format('woff'), /* Pretty Modern Browsers */
       url('../../../../assets/fonts/nhaasgrotesktxpro-75bd.ttf') format('ttf');
  font-weight: normal;
}

.main-col {
  padding: 0 0;
  max-width: 915px;
}

.heading {
  color: white; 
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-size: 3.125rem;
  font-weight: 400;
  text-shadow: 1px 1px 2px rgba(28,16,23,0.83);
  text-transform: uppercase;
  letter-spacing: 2px;  
  margin: 0 0 20px 0;
}

.trackTitle {
  color: #e7413f; 
  font-family: 'NeueHaasGroteskText Pro75Bd';
  font-feature-settings: 'liga';
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0;
}

/* .trackCaption {
  color: #cecece; 
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0;
} */

/* .trackImg {
  max-height: 86px;
  display: block;
} */

.textAlignEnd {
  text-align: end;
}

hr.style-two {
  /* https://css-tricks.com/examples/hrs/ */
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(231, 65, 63, 0.1), rgba(231, 65, 63, 0.75), rgba(231, 65, 63, 0.1));
}

.hideOnMobile {
    display: block;
  }
.showOnMobile {
  display: none;
}

.nav_link {
  color: white; 
  display: block;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-style: italic;
  /* font-size: 2.4375rem; */
  font-size: 2rem;
  letter-spacing: 1px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(28,16,23,0.83);
  margin: 0px;
  padding: 0px;
}
.nav_link:hover {
  color:	#EED047;
  cursor: pointer;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .heading {
    font-size: 2.5rem;
    letter-spacing: 1.8px;
    margin: 0 0 15px 0;
  }
  .trackTitle, .nav_link {
    font-size: 1.5rem;
  }
  /* .trackCaption {
    font-size: 0.9rem;
  } */
  .hideOnMobile {
    display: none;
  }
  .showOnMobile {
    display: block;
  }
}

@media (max-width: 340Px) {  /* for iPhone 5 etc. */
  .heading {
    font-size: 2rem;
    letter-spacing: 1.6px;
    margin: 0 0 10px 0;
  }
  .trackTitle {
    font-size: 1.25rem;
  }  
  .nav_link {
    font-size: 1.375rem;
  }
  /* .trackCaption {
    font-size: 0.8rem;
  } */
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {  
  .heading {
    font-size: 2.8rem;
    letter-spacing: 1.8px;
    margin: 0 0 15px 0;
  }
  .trackTitle, .nav_link {
    font-size: 1.5rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .heading {
    font-size: 3rem;
    letter-spacing: 1.8px;
    margin: 0 0 15px 0;
  }
  .trackTitle, .nav_link {
    font-size: 1.75rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 

}

</style>
