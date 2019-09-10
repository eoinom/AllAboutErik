<template>
  <Layout>

    <!-- <div class="flex-container"> -->
    <div class="container">
      <div class="slideshow">
        <slideshow-images
          :slides="slides"
        />
      </div>

      <div class="mainContent">
        <g-image alt="All About Erik logo" v-if="titleImg != null" :src="titleImg" class="titleImg"/>

        <span v-html="mainText" class="homePgMainText" />  
      </div>

      <!-- <span class="homePgMainText">
        <p>
          As a boy growing up in the Midwest, I never had a clear idea of what I’d end up doing in life.
          <br>The currents just carried me along.
        </p>
        <p>
          I played banjo, but quit to become a music publisher and record producer.
          <br>I fished, traveled, scuba-dived, collected, and fell in love.
        </p>
        <p>
          I took a lifelong trip into exciting and uncharted waters.
          <br>This stuff is about what happened along the way.
        </p>
      </span>    -->

      <div class="homePgCreditText">
        <span v-html="creditText" />
      </div>
    </div>

  </Layout>
</template>

<page-query>
{
  HomePage: allHomePage(sortBy: "orderNo") {
    edges {
      node {
        pageTitle
        headingImg
        content
        creditText
        slides {
          orderNo
          img
          opacity
          duration
          scaleFrom
          scaleTo
          panStart
        }
      }
    }
  }	
}
</page-query>


<script>
import SlideshowImages from '../components/SlideshowImages.vue'

export default {
  metaInfo() {    // https://github.com/gridsome/gridsome/issues/306 (How do you use the queried GraphQL data in the <script>?)
    return {      
      title: this.$page.HomePage.edges[0].node.pageTitle,  // <-- "this" is the Vue instance with $page
    }
  },
  
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0
    }
  },

  computed: {
    slides() {
      return this.$page.HomePage.edges[0].node.slides
    },
    titleImg() {
      return this.$page.HomePage.edges[0].node.headingImg
    },
    mainText(){
      return this.$page.HomePage.edges[0].node.content
    },
    creditText(){
      return this.$page.HomePage.edges[0].node.creditText
    }
  },

  components: {
    'slideshow-images':     require('../components/SlideshowImages.vue').default,
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {        
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight
      });
    })
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Libre+Baskerville&display=swap');

.layout {
  padding: 0
}

/* .flex-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.flex-container > div {
  text-align: center;
} */

.container {
  /* color: white; */
  /* text-align: center; */
  position: absolute;
  width: 100%;
  /* display: flex;
  justify-content: center;
  flex-direction: column; */
}

/* .slideshow {
  position: relative;
  margin: auto;  
} */

/* .titleImgContainer {  
  position: absolute; 
  margin: auto;  
  left: 0; 
  right: 0;
  top: 20%;
  width: 100%;
} */

.mainContent{
  /* Absolute Centering in CSS: https://codepen.io/shshaw/full/gEiDt */
  position: absolute;   
  width: 80%;
  margin: auto;  
  left: 0; 
  right: 0;
  top: 14%;
}

.titleImg {  
  display: block;  
  width: 100%;
  max-width: 1492px; 
  height: auto;
  /* z-index:90; */

  /* Absolute Centering in CSS: https://codepen.io/shshaw/full/gEiDt */
  /* position: absolute;   
  margin: auto;  
  left: 0; 
  right: 0;
  top: 14%; */

  position: relative;
  margin: auto;  
  /* left: 0; 
  right: 0; */
}


.homePgMainText {
  color: white; 
  font-family: 'Libre Baskerville', serif;
  /* font-size: 29px;  */
  font-size: calc(1em + 0.5vw); 
  text-align: center;
  /* position: absolute;    */
  /* top: 410px; 
  left: 610px;  */
  /* left: 50%;  */
  width: 80%;
  /* margin-left: auto;
  margin-right: auto; */
  line-height: 135%;
  z-index: 100;

  /* position: absolute;   
  margin: auto;  
  margin-top: 100px;
  left: 0; 
  right: 0;
  top: 32%; */

  position: relative;   
}

.homePgCreditText {
  color: white; 
  font-family: 'Libre Baskerville', serif;
  font-size: 14px; 
  position: absolute; 
  /* right: 90px;  */
  right: 3.5%; 
  bottom: 40px; 
  line-height: 50%;
  /* z-index: 100; */
}

/* Centre credit text when aspect ratio <= 1.0 */
@media (max-aspect-ratio: 1/1) {
  .homePgCreditText {
    margin: auto;  
    left: 0; 
    right: 0;
    text-align: center;
  }
}


</style>
