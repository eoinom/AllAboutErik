<template>
  

  <Layout> 
    <header id="header" :style="headerStyle">
      <g-image :src="titleImg" id="titleImg" class="my-4" />
    </header>

    <b-container fluid id="mainContainer">

      <b-row no-gutters style="" class="">
        <b-col class="">
          <g-image :src="mainImg" id="" class="" />
        </b-col>
      </b-row>

      <!-- VIDEOS -->
      <b-row no-gutters v-for="(video, index) in videos" :key="video.title" @click="videoIndex = index" @mouseover="videoIndexHover = index" @mouseleave="videoIndexHover = null" class="mb-1">
        <b-col cols="7" class="my-1 px-1">
          <div class="thumbnailImgContainer" :style="vignetteStyles">
            <g-image :alt="video.title" v-if="video.thumbnailImg != null" :src="video.thumbnailImg" class="thumbnailImg"/>
          </div>
        </b-col>

        <b-col cols="5" class="my-1 px-1">
          <div class="videoTextContainer m-4">
            <h2 v-if="video.title != null" class="videoTitle" /> {{ video.title }} </h2>
            <p v-if="video.subText != null" class="videoSubText" /> {{ video.subText }} </p>
          </div>
        </b-col>
      </b-row>

      

    </b-container>
  </Layout>
</template>

<page-query>
{
  TheEpisodes: allTheEpisodes {
    edges {
      node {
        id
        pageTitle
        headerBgImg
        titleImg
        content
        mainImg
        videos {
          title
          subText
          url
          thumbnailImg
          orderNo
          duration
        }
      }
    }
  }	
}
</page-query>


<script scoped>

export default { 
  metaInfo() {
    return {
      title: this.$page.TheEpisodes.edges[0].node.pageTitle
    }
  },

  data() {
    return {
    }
  },

  computed: {
    headerBgImg() {
      return this.$page.TheEpisodes.edges[0].node.headerBgImg
    },
    titleImg() {
      return this.$page.TheEpisodes.edges[0].node.titleImg
    },    
    mainImg(){
      return this.$page.TheEpisodes.edges[0].node.mainImg
    },
    mainText(){
      return this.$page.TheEpisodes.edges[0].node.content
    },
    videos() {
      return this.$page.TheEpisodes.edges[0].node.videos
    },
    headerStyle() {
      return {
        '--headerBgImg': 'url(' + this.headerBgImg + ')'
      }
    },
  },

  methods: {
  },

  mounted() {
  },

  components: {
  },
}
</script>



<style scoped>

.layout {
  padding: 0;
  background-color: #dddddd;
}

#header {
  background-image: var(--headerBgImg);
  background-color: rgba(0, 0, 0, 0.32);
  background-color: #ADADAD;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
}

#headerImg {
  /* opacity: 0.5; */
  /* z-index: 200000;
  color: white;
  background-color: white; */
}

#mainContainer {
  max-width: 1316px;
  text-align: center;
}

.videoTextContainer {
  background-color: white;
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
