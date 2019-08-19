<template>
  <Layout>    
   
    <h2>Roots and Youth</h2>
    <div v-for="edge in $page.rootsVideos.edges" :key="edge.node.id">
      <h1>{{ edge.node.title }}</h1>
      <br>Length: {{ edge.node.length }}
      <br>Caption: {{ edge.node.caption }}
      <iframe :src="edge.node.url" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfulscreen>
      </iframe>
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
