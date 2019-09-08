<template>
  <Layout>

    <g-image alt="All About Erik logo" v-if="titleImg != null" :src="titleImg" class="titleImg"/>

    <span v-html="mainText" class="homePgMainText"> </span>
    
    <span v-html="creditText" class="homePgCreditText"> </span>

    <slideshow-images
      :slides="slides"
    />
    
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

.titleImg {
  max-width:1492px; 
  position:absolute; 
  left:530px; 
  top:180px; 
  z-index:100;
}

.homePgMainText {
  color: white; 
  font-family: 'Libre Baskerville', serif;
  font-size: 29px; 
  position: absolute; 
  left: 610px; 
  top: 410px; 
  text-align: center;
  line-height: 50%;
  z-index: 100;
}

.homePgCreditText {
  color: white; 
  font-family: 'Libre Baskerville', serif;
  font-size: 14px; 
  position: absolute; 
  right: 90px; 
  bottom: 40px; 
  line-height: 50%;
  z-index: 100;
}
</style>
