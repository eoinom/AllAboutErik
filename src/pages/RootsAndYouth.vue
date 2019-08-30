<template>
  <Layout>    
   
    <br>
    <h2>Roots and Youth</h2>
    <div v-for="edge in $page.rootsVideos.edges" :key="edge.node.id">
      <h1>{{ edge.node.title }}</h1>
      <br>Length: {{ edge.node.length }}
      <br>Caption: {{ edge.node.caption }}
      <div style="padding:56.25% 0 0 0;position:relative;">
        <iframe 
          :src="edge.node.url + '?autoplay=0&color=505050&title=0&byline=0&portrait=0'"
          style="position:absolute;top:0;left:0;width:100%;height:100%;" 
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
  rootsVideos: allRootsVideo(sortBy: "title", order: ASC) {
    totalCount
    edges {
      node {
        id
        title
        url
        length
        caption
      }
    }
  }
}
</page-query>


<script>
export default {
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>



<style>
.home-links a {
  margin-right: 1rem;
}
</style>
