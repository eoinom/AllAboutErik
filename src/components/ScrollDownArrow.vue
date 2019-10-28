<template>

  <!-- Scroll with arrow images - hidden on xs (e.g. portrait mobile devices) -->
  <div v-scroll-to="{ el:scrollToElement, duration:1500, easing:'ease' }" id="scrollImgContainer">
    <p class="mb-0 mt-md-1 mt-lg-2 mt-xl-5">
      <g-image alt="Scroll text" src="~/assets/images/scroll.png" id="scrollImg" />
    </p>
    <p class="my-0 my-lg-1 my-xl-2">
      <g-image alt="Scroll arrow" src="~/assets/images/arrow-full-down.png" id="scrollArrowImg" />
    </p>
  </div>

</template>


<script scoped>
export default { 
  name: 'ScrollDownArrow',

  props: {
    scrollToElement: {
      default: '',
      type: String
    }    
  },

  data() {
    return {
    }
  },
}
</script>



<style scoped>

#scrollImgContainer {
  cursor: pointer;
}

#scrollImg {
  width: 11.5%;
  max-width: 157px;
  min-width: 78.5px;
}

#scrollArrowImg {
  width: 2.8%;
  max-width: 38px;
  min-width: 19px;
}

</style>
