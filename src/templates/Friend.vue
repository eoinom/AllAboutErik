<template>
  <Layout> 
    <b-container fluid class="main-col">
      
      <h1 id="heading"> {{ heading }} </h1>
  	  <div v-html="$page.friend.content" id="mainContent" />

    </b-container>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  friend: friends(id: $id) {
    name
    heading
    content
  }
}
</page-query>


<script scoped>

export default { 
  metaInfo() {
    return {
      title: this.name
    }
  },

  data() {
    return {
    }
  },

  computed: {
    name() {
      return this.$page.friend.name
    },
    heading() {
      return this.$page.friend.heading ? this.$page.friend.heading : this.name
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
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

#heading {
  color: #FFFFFF;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 42px;
  font-style: normal;
  text-align: left;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(28,16,23,0.83);
  letter-spacing: 2px;
  line-height: 50px;
  margin: 0px;
  padding: 0px;
}

#mainContent {
  color: #FFFFFF;
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 32px;
  text-align: justify;
  text-shadow: 0px 0px 250px #1C0F07,0px 0px 250px #1C0F07/* glow */,1px 1px 2px rgba(28,16,23,0.89)/* drop shadow*/;
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
