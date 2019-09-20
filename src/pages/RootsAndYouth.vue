<template>
  <Layout>    
   
    <br>
    <!-- <h2>Roots and Youth</h2> -->
    <h2>{{ $page.RootsAndYouth.edges[0].node.pageTitle }}</h2>
    <div v-for="edge in $page.RootsAndYouth.edges" :key="edge.node.id">
      <h1>{{ edge.node.title }}</h1>

      <div style="padding:56.25% 0 0 0;position:relative;">
        <iframe 
          :src="edge.node.fullVideo.url + '?autoplay=0&color=505050&title=0&byline=0&portrait=0'"
          style="position:absolute;top:0;left:0;width:50%;height:50%;" 
          frameborder="0" 
          webkitallowfullscreen mozallowfullscreen allowfullscreen>
        </iframe>
      </div>
      
      <hr>
    </div>

  </Layout>
</template>

<page-query>
{
  RootsAndYouth: allRootsAndYouth {
    edges {
      node {
        id
        pageTitle
        headingImg
        content
        slides {
          orderNo
          img
        }
        slideDuration
        videos {
          title
          subText
          url
          orderNo
          duration
        }
        fullVideo {
          title
          text
          url
          duration
        }
      }
    }
  }	
}
</page-query>


<script>
export default {
  metaInfo() {    // https://github.com/gridsome/gridsome/issues/306 (How do you use the queried GraphQL data in the <script>?)
    return {
      title: this.$page.RootsAndYouth.edges[0].node.pageTitle,  // <-- "this" is the Vue instance with $page
    }
  },
}
</script>



<style scoped>
/* .home-links a {
  margin-right: 1rem;
} */

body {
  background-color: #dddddd
}
</style>
