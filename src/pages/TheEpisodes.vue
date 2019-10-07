<template>
  <Layout> 
    <b-container fluid class="main-col">

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
    titleImg() {
      return this.$page.TheEpisodes.edges[0].node.titleImg
    },    
    mainImg(){
      return this.$page.RootsAndYouth.edges[0].node.mainImg
    },
    mainText(){
      return this.$page.RootsAndYouth.edges[0].node.content
    },
    videos() {
      return this.$page.RootsAndYouth.edges[0].node.videos
    }
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
