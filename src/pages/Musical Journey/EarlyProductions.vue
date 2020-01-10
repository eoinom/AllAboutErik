<template>
  <Layout> 
    <header id="header" :style="headerStyle">
      <g-image :src="titleImg" id="titleImg" class="my-4" />
    </header>

    <b-container fluid id="mainContainer" class="pb-5 px-1">

      <b-row no-gutters style="" class="mt-2">
        <b-col>
          <g-image :src="mainImg" id="mainImg" class="" />
          <span v-html="mainText" id="mainImgText" />
        </b-col>
      </b-row>
      

      <!-- SECTIONS[0] - BOBO THE CHEERLEADER -->
      <b-row no-gutters class="py-4">
        <div style="max-width:805px; flex:1" class="mr-3">
          <music-production 
            v-for="(production, iProd) in sections[0].productions"
            :key="iProd"
            :production="production"
          />
          <button 
            v-for="(lightBox, iLightBox) in sections[0].imageLightboxes" 
            :key="iLightBox + 1" 
            class="lightBoxBtn"
            @click="lightBoxBtnClick(lightBox)">
              {{ lightBox.buttonText }}
          </button>
        </div>
        <div style="width:38.5%; min-width:458px" v-if="sections[0].textBoxes.length > 0">            
          <music-production-text
            v-for="(textBox, iText) in sections[0].textBoxes"
            :key="iText"
            :title="textBox.heading"
            :body="textBox.text"
          />
        </div>
      </b-row>

      <!-- SECTIONS[1] - SOUND OF SUMMER SHOWERS -->
      <b-row no-gutters class="py-4">        
        <div style="width:38.5%; min-width:409px" v-if="sections[1].textBoxes.length > 0" class="">            
          <music-production-text
            v-for="(textBox, iText) in sections[1].textBoxes"
            :key="iText"
            :title="textBox.heading"
            :body="textBox.text"
          />
        </div>
        <div style="max-width:805px; flex:1" class="ml-3">
          <music-production 
            v-for="(production, iProd) in sections[1].productions"
            :key="iProd"
            :production="production"
          />
          <button 
            v-for="(lightBox, iLightBox) in sections[1].imageLightboxes" 
            :key="iLightBox + 1" 
            class="lightBoxBtn"
            @click="lightBoxBtnClick(lightBox)">
              {{ lightBox.buttonText }}
          </button>
        </div>
      </b-row>

      <!-- SECTIONS[2] - A LITTLE LOVIN' -->
      <b-row no-gutters class="py-4">
        <div style="max-width:805px; flex:1" class="mr-3">
          <music-production 
            v-for="(production, iProd) in sections[2].productions"
            :key="iProd"
            :production="production"
          />
          <button 
            v-for="(lightBox, iLightBox) in sections[2].imageLightboxes" 
            :key="iLightBox + 1" 
            class="lightBoxBtn"
            @click="lightBoxBtnClick(lightBox)">
              {{ lightBox.buttonText }}
          </button>
        </div>
        <div style="width:38.5%; min-width:458px" v-if="sections[2].textBoxes.length > 0">            
          <music-production-text
            v-for="(textBox, iText) in sections[2].textBoxes"
            :key="iText"
            :title="textBox.heading"
            :body="textBox.text"
          />
        </div>
      </b-row>

      <!-- SECTIONS[3] - THE SLURP -->
      <b-row no-gutters class="py-4">
        <div style="width:38.5%; min-width:504px; display:flex; flex-direction:column; justify-content:space-between" v-if="sections[3].textBoxes.length > 0">            
          <music-production-text
            v-for="(textBox, iText) in sections[3].textBoxes"
            :key="iText"
            :title="textBox.heading"
            :body="textBox.text"
            style="height:inherit"
          />
          <div>
            <button 
              v-for="(lightBox, iLightBox) in sections[3].imageLightboxes" 
              :key="iLightBox + 1" 
              class="lightBoxBtn"
              @click="lightBoxBtnClick(lightBox)">
                {{ lightBox.buttonText }}
            </button>
          </div>
        </div>
        <div style="max-width:805px; flex:1" class="ml-3">
          <music-production 
            v-for="(production, iProd) in sections[3].productions"
            :key="iProd"
            :production="production"
            :style="iProd == 0 ? 'margin-bottom:5px' : ''"
          />
        </div>
      </b-row>

      <!-- SECTIONS[4] - ROOTY TOOT & WARM BABY -->
      <b-row no-gutters class="py-4">
        <div style="width:38.5%; max-width:422px" v-if="sections[4].textBoxes.length > 0">            
          <music-production-text
            :title="sections[4].textBoxes[0].heading"
            :body="sections[4].textBoxes[0].text"
            style="height:inherit"
          />
        </div>
        <div style="flex:1" class="ml-3">
          <music-production 
            v-for="(production, iProd) in sections[4].productions"
            :key="iProd"
            :production="production"
          />
          
          <div style="width:100%; display: flex; flex-direction: row; flex:1">
            <div style="display: flex; flex-direction: column; flex:1; justify-content:space-between">
              <button 
                v-for="(lightBox, iLightBox) in sections[4].imageLightboxes" 
                :key="iLightBox + 1" 
                class="lightBoxBtn"
                @click="lightBoxBtnClick(lightBox)">
                  {{ lightBox.buttonText }}
              </button>
            </div>

            <div style="width:75.5%; min-width:458px; margin-top:10px" v-if="sections[4].textBoxes.length > 0">            
              <music-production-text
                :title="sections[4].textBoxes[1].heading"
                :body="sections[4].textBoxes[1].text"
              />
            </div>
          </div>
        </div>
        
      </b-row>

      <!-- SECTIONS[5] - CASS, DENNY, JESTER, ZAL -->
      <b-row no-gutters class="py-4">
        <div style="flex:1" class="mr-3">
          <music-production 
            v-for="(production, iProd) in sections[5].productions"
            :key="iProd"
            :production="production"
          />
          <button 
            v-for="(lightBox, iLightBox) in sections[5].imageLightboxes" 
            :key="iLightBox + 1" 
            class="lightBoxBtn"
            @click="lightBoxBtnClick(lightBox)">
              {{ lightBox.buttonText }}
          </button>
        </div>
        <div style="width:347px" v-if="sections[5].textBoxes.length > 0">            
          <music-production-text
            v-for="(textBox, iText) in sections[5].textBoxes"
            :key="iText"
            :title="textBox.heading"
            :body="textBox.text"
            style="height:inherit"
          />
        </div>
      </b-row>

      <!-- SECTIONS[6] - LADY GODIVA' -->
      <b-row no-gutters class="py-4">
        <div style="width:32.3%; min-width:380px" v-if="sections[6].textBoxes.length > 0">            
          <music-production-text
            v-for="(textBox, iText) in sections[6].textBoxes"
            :key="iText"
            :title="textBox.heading"
            :body="textBox.text"
          />
        </div>
        <div style="flex:1" class="ml-3">
          <music-production 
            v-for="(production, iProd) in sections[6].productions"
            :key="iProd"
            :production="production"
          />
          <button 
            v-for="(lightBox, iLightBox) in sections[6].imageLightboxes" 
            :key="iLightBox + 1" 
            class="lightBoxBtn"
            @click="lightBoxBtnClick(lightBox)">
              {{ lightBox.buttonText }}
          </button>
        </div>
      </b-row>

      <!-- SECTIONS[7] - TWEEDLE DUM'S DRIVE-IN -->
      <b-row no-gutters class="py-4">
        <div style="max-width:1095px; flex:1" class="mr-3">
          <music-production 
            v-for="(production, iProd) in sections[7].productions"
            :key="iProd"
            :production="production"
          />          
        </div>
        <div style="min-width: 200px; position:relative" v-if="sections[7].imageLightboxes.length > 0">            
          <button 
            v-for="(lightBox, iLightBox) in sections[7].imageLightboxes" 
            :key="iLightBox + 1" 
            class="lightBoxBtn"
            style="position:absolute; bottom:0; right:0; margin-right:0" 
            @click="lightBoxBtnClick(lightBox)">
              {{ lightBox.buttonText }}
          </button>
        </div>
      </b-row>

      <!-- SECTIONS[8] - THE STRANGERS -->
      <b-row no-gutters class="py-4">
        <div style="width:26.75%; max-width:340px;" v-if="sections[3].textBoxes.length > 0">            
          <music-production-text
            v-for="(textBox, iText) in sections[8].textBoxes"
            :key="iText"
            :title="textBox.heading"
            :body="textBox.text"
            style="height:inherit"
          />
          <div>
            <button 
              v-for="(lightBox, iLightBox) in sections[8].imageLightboxes" 
              :key="iLightBox + 1" 
              class="lightBoxBtn"
              @click="lightBoxBtnClick(lightBox)">
                {{ lightBox.buttonText }}
            </button>
          </div>
        </div>
        <div style="flex:1" class="ml-3">
          <music-production 
            v-for="(production, iProd) in sections[8].productions"
            :key="iProd"
            :production="production"
          />
        </div>
      </b-row>

      <!-- SECTIONS[9] - THE SELLOUTS -->
      <b-row no-gutters class="py-4">
        <div style="max-width:805px; flex:1" class="mr-3">
          <music-production 
            v-for="(production, iProd) in sections[9].productions"
            :key="iProd"
            :production="production"
          />
          <button 
            v-for="(lightBox, iLightBox) in sections[9].imageLightboxes" 
            :key="iLightBox + 1" 
            class="lightBoxBtn"
            @click="lightBoxBtnClick(lightBox)">
              {{ lightBox.buttonText }}
          </button>
        </div>
        <div style="width:38.5%; min-width:458px" v-if="sections[9].textBoxes.length > 0">            
          <music-production-text
            v-for="(textBox, iText) in sections[9].textBoxes"
            :key="iText"
            :title="textBox.heading"
            :body="textBox.text"
          />
        </div>
      </b-row>

      <!-- SECTIONS[10] - KEN & BOBBY FISCHLER -->
      <b-row no-gutters class="py-4">
        <div style="width:32.11%; min-width:246px" v-if="sections[10].textBoxes.length > 0">            
          <music-production-text
            v-for="(textBox, iText) in sections[10].textBoxes"
            :key="iText"
            :title="textBox.heading"
            :body="textBox.text"
          />
        </div>
        <div style="flex:1" class="ml-3">
          <music-production 
            v-for="(production, iProd) in sections[10].productions"
            :key="iProd"
            :production="production"
          />
          <button 
            v-for="(lightBox, iLightBox) in sections[10].imageLightboxes" 
            :key="iLightBox + 1" 
            class="lightBoxBtn"
            @click="lightBoxBtnClick(lightBox)">
              {{ lightBox.buttonText }}
          </button>
        </div>
      </b-row>

      <!-- SECTIONS[11] - RAY ROE -->
      <b-row no-gutters class="py-4">
        <div style="flex:1" class="mr-3">
          <music-production 
            v-for="(production, iProd) in sections[11].productions"
            :key="iProd"
            :production="production"
          />
          <button 
            v-for="(lightBox, iLightBox) in sections[11].imageLightboxes" 
            :key="iLightBox + 1" 
            class="lightBoxBtn"
            @click="lightBoxBtnClick(lightBox)">
              {{ lightBox.buttonText }}
          </button>
        </div>
        <div style="width:25.38%; min-width:246px" v-if="sections[11].textBoxes.length > 0">            
          <music-production-text
            v-for="(textBox, iText) in sections[11].textBoxes"
            :key="iText"
            :title="textBox.heading"
            :body="textBox.text"
          />
        </div>
      </b-row>

      <!-- SECTIONS[12] - KEN MELVILLE -->
      <b-row no-gutters class="py-4">
        <div style="width:29.13%; min-width:280px" v-if="sections[12].textBoxes.length > 0">            
          <music-production-text
            v-for="(textBox, iText) in sections[12].textBoxes"
            :key="iText"
            :title="textBox.heading"
            :body="textBox.text"
          />
        </div>
        <div style="flex:1" class="ml-3">
          <music-production 
            v-for="(production, iProd) in sections[12].productions"
            :key="iProd"
            :production="production"
          />
          <button 
            v-for="(lightBox, iLightBox) in sections[12].imageLightboxes" 
            :key="iLightBox + 1" 
            class="lightBoxBtn"
            @click="lightBoxBtnClick(lightBox)">
              {{ lightBox.buttonText }}
          </button>
        </div>
      </b-row>

      <!-- SECTIONS[13] - TIM HARDIN -->
      <b-row no-gutters class="py-4">
        <div style="flex:1" class="mr-3">
          <music-production 
            v-for="(production, iProd) in sections[13].productions"
            :key="iProd"
            :production="production"
          />
          <button 
            v-for="(lightBox, iLightBox) in sections[13].imageLightboxes" 
            :key="iLightBox + 1" 
            class="lightBoxBtn"
            @click="lightBoxBtnClick(lightBox)">
              {{ lightBox.buttonText }}
          </button>
        </div>
        <div style="width:23.4%; min-width:350px" v-if="sections[13].textBoxes.length > 0">            
          <music-production-text
            v-for="(textBox, iText) in sections[13].textBoxes"
            :key="iText"
            :title="textBox.heading"
            :body="textBox.text"
            style="height:inherit"
          />
        </div>
      </b-row>

      <!-- SECTIONS[14] - PLUMB CREEK BOYS -->
      <b-row no-gutters class="pt-4 pb-5">
        <div style="width:25.5%; min-width:350px" v-if="sections[14].textBoxes.length > 0">            
          <music-production-text
            v-for="(textBox, iText) in sections[14].textBoxes"
            :key="iText"
            :title="textBox.heading"
            :body="textBox.text"
            style="height:inherit"
          />
        </div>
        <div style="flex:1" class="ml-3">
          <music-production 
            v-for="(production, iProd) in sections[14].productions"
            :key="iProd"
            :production="production"
          />
          <button 
            v-for="(lightBox, iLightBox) in sections[14].imageLightboxes" 
            :key="iLightBox + 1" 
            class="lightBoxBtn"
            @click="lightBoxBtnClick(lightBox)">
              {{ lightBox.buttonText }}
          </button>
        </div>
      </b-row>
            
    </b-container>


    <BackgroundMusic
      :audioFile="$page.EarlyProductions.edges[0].node.bgAudio"
      :audioDuration="$page.EarlyProductions.edges[0].node.bgAudioDuration"
      :audioFadeInDuration="$page.EarlyProductions.edges[0].node.bgAudioFadeInDuration"
      :audioFadeOutDuration="$page.EarlyProductions.edges[0].node.bgAudioFadeOutDuration"
    />
    
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
        bgAudio
        bgAudioDuration
        bgAudioFadeInDuration
        bgAudioFadeOutDuration
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
import BackgroundMusic from '../../components/BackgroundMusic.vue'
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
    BackgroundMusic,
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
  
  min-height: 35px;
  margin: 10px 20px 0px 0px;
  padding: 5px 20px;

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
