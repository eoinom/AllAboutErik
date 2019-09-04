<template>
  <Layout>
    
    <br>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <!-- <g-image alt="Example image" src="~/favicon.png" width="135" /> -->
    
    <!-- <h2>Latest blog posts</h2>
    <div v-for="edge in $page.posts.edges" :key="edge.node.id">
      <h1>{{ edge.node.title }}</h1>
      <br>Date: {{ edge.node.date }}
      <div v-html="edge.node.content"></div>
      <hr>
    </div> -->


    <!-- <p class="home-links">
      <a href="https://gridsome.org/docs" target="_blank" rel="noopener">Gridsome Docs</a>
      <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
    </p> -->

  </Layout>
</template>

<page-query>
# query Post {
#   posts: allPost(sortBy: "date", order: ASC) {
#     totalCount
#     edges {
#       node {
#         id
#         title
#         excerpt
#         date
#         headings {
#           value
#         }
#         content
#       }
#     }
#   }
# }
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
export default {
  metaInfo() {    // https://github.com/gridsome/gridsome/issues/306 (How do you use the queried GraphQL data in the <script>?)
    return {      
      title: this.$page.HomePage.edges[0].node.pageTitle,  // <-- "this" is the Vue instance with $page
    }
  }
}
</script>

<style>
/* .home-links a {
  margin-right: 1rem;
} */
</style>
