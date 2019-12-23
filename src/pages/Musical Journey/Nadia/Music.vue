<template>
  <Layout> 
    <b-container fluid class="main-col">

    </b-container>
  </Layout>
</template>

<page-query>
{
  NadiaMusic: allNadiaMusic {
    edges {
      node {
        id
        pageTitle
        titleText
        tracks {
          title
          url
          image
          imgPosition
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
      title: this.$page.NadiaMusic.edges[0].node.pageTitle
    }
  },

  data() {
    return {
    }
  },

  computed: {
    title() {
      return this.$page.NadiaMusic.edges[0].node.titleText
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
