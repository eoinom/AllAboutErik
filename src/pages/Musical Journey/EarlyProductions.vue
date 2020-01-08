<template>
  <Layout> 
    <header id="header" :style="headerStyle">
      <g-image :src="titleImg" id="titleImg" class="my-4" />
    </header>

    <b-container fluid id="mainContainer" class="pb-5 pb-xl-3 px-1">

      <b-row no-gutters style="" class="mt-2">
        <b-col>
          <g-image :src="mainImg" id="mainImg" class="" />
          <span v-html="mainText" id="mainImgText" />
        </b-col>
      </b-row>

      <div v-for="(section, iSect) in sections" :key="iSect">
        <b-row no-gutters class="my-5">
          <b-col cols="6">
            <music-production 
              v-for="(production, iProd) in section.productions"
              :key="iProd"
              :writer="production.writer"
              :artist="production.artist"
              :image="production.image"
              :bgImg="production.bgImg"
              :bgImgPos="production.bgImgPos"
              :bgColor="production.bgColor"
              :bgOpacity="production.bgOpacity"
              :tracks="production.tracks" 
            />
          </b-col>

          <b-col cols="6" v-if="section.textBoxes.length > 0">            
            <music-production-text
              v-for="(textBox, iText) in section.textBoxes"
              :key="iText"
              :title="textBox.heading"
              :body="textBox.text"
            />
          </b-col>
        </b-row>

        <b-row no-gutters v-if="section.imageLightboxes.length > 0" class="mt-2">
          <b-col >
            <button 
              v-for="(lightBox, iLightBox) in section.imageLightboxes" 
              :key="iLightBox" 
              class="lightBoxBtn"
              @click="lightBoxBtnClick(lightBox)">
                {{ lightBox.buttonText }}
            </button>
          </b-col>
        </b-row>

      </div>
      
    </b-container>


    <ImageLightBox
      :images="image"
      :index="imageIndex"
      :disable-scroll="true"
      @close="imageIndex = null; image = null"
    />

    <ScrollToTop 
      text="BACK TO THE TOP"
      :includeArrow="true"
    />

  </Layout>
</template>

<page-query>
{
  EarlyProductions: allEarlyProductions {
    edges {
      node {
        pageTitle
        headerBgImg
        titleImg
        mainImg
        content
        sections {
          textBoxes {
            heading
            text
          }
          productions {
            writer
            artist
            image
            bgImg
            bgImgPos
            bgColor
            bgOpacity
            tracks {
              title
              track
            }
          }
          imageLightboxes {
            buttonText
            caption
            image
          }
        }
      }
    }
  }	
}
</page-query>


<script scoped>
import ImageLightBox from '../../components/ImageLightBox.vue'
import MusicProduction from '../../components/MusicProduction.vue'
import MusicProductionText from '../../components/MusicProductionText.vue'
import ScrollToTop from '../../components/ScrollToTop.vue'

export default { 
  metaInfo() {
    return {
      title: this.$page.EarlyProductions.edges[0].node.pageTitle
    }
  },

  data() {
    return {
      imageIndex: null,
      image: null
    }
  },

  computed: {
    headerBgImg() {
      return this.$page.EarlyProductions.edges[0].node.headerBgImg
    },
    titleImg() {
      return this.$page.EarlyProductions.edges[0].node.titleImg
    },    
    mainImg(){
      return this.$page.EarlyProductions.edges[0].node.mainImg
    },
    mainText(){
      return this.$page.EarlyProductions.edges[0].node.content
    },
    sections() {
      return this.$page.EarlyProductions.edges[0].node.sections
    },
    headerStyle() {
      return {
        '--headerBgImg': 'url(' + this.headerBgImg + ')'
      }
    },
  },

  methods: {
    lightBoxBtnClick(lightBox) {
      this.image = [{
          'img': lightBox.image, 
          'caption': lightBox.caption
        }]
      this.imageIndex = 0
    }
  },

  mounted() {
  },

  components: {
    ImageLightBox,
    MusicProduction,
    MusicProductionText,
    ScrollToTop
  },
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lato:700i&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lora:700i&display=swap');
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url('../../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../../assets/fonts/nhaasgrotesktxpro-65md.woff') format('woff'), /* Pretty Modern Browsers */
       url('../../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.layout {
  padding: 0;
}

#header {
  background-image: var(--headerBgImg);
  background-position: center;
  background-color: rgba(0, 0, 0, 0.32);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
}

#titleImg {
  max-width: 70%;
}

#mainContainer {
  width: 100%;
  max-width: 1316px;
  padding: 0;
  text-align: center;
}

#mainImg {
  width: 100%;
  height: auto;
}

#mainImgText {
  color: white;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.75rem;  /* 28px with 16px default size */  
  letter-spacing: 1px;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.29);
  line-height: 40px;  

  position: absolute;
  bottom: 60px;
  left: 0;
  margin-left: 8%;
  margin-right: 8%;
}

.thumbnailImgContainer {
  max-width: 100%;
}

.thumbnailImg {
  width: 100%;
}

.lightBoxBtn {
  position: relative;
  float: left;
  cursor: pointer;
  pointer-events: auto;

  min-width: 240px;
  height: 35px;
  margin: 0px;
  margin-right: 20px;
  padding: 0px 20px;

  background-color: #406689;
  border-width: 0px;
  border-radius: 9px;

  color: #DDCD95;
  font-family: 'Lato', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 700;
  font-style: italic;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: 3px;
  text-align: center;
  text-transform: uppercase;

  transition-delay: 0.1s;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-property: background-color;
}
.lightBoxBtn:hover {
  background-color: #4B5B45;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

@media (max-width: 400px) {
  #titleImg {
    max-width: 60%;
  }
}
@media (min-width: 400.01px) and (max-width: 575.98px) {
  #titleImg {
    max-width: 65%;
  }
}

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {  
  #mainImgText {
    /* font-size: 1.2rem;  19.2px with 16px default size       */
    /* line-height: 27px;   */
    font-size: 3.33vw;
    line-height: 4.68vw; 

    letter-spacing: 1px;
    bottom: 0px;
    margin-left: 6%;
    margin-right: 6%;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  #mainImgText {
    /* font-size: 1.35rem;  20.83px with 16px default size       */
    /* line-height: 30px;   */
    font-size: 2.712vw;
    line-height: 3.906vw; 

    letter-spacing: 1px;
    bottom: 19px;
    margin-left: 8%;
    margin-right: 8%;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  #mainImgText {
    font-size: 1.5rem;  /* 19.2px with 16px default size */  
    letter-spacing: 1px;
    line-height: 34px;  
    bottom: 21px;
    margin-left: 10%;
    margin-right: 10%;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  #mainImgText {
    font-size: 1.625rem;  /* 19.2px with 16px default size */  
    letter-spacing: 1px;
    line-height: 36.5px;  
    bottom: 23px;
    margin-left: 11%;
    margin-right: 11%;
  }
}

</style>
