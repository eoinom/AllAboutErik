<template>

  <!-- Scroll with arrow images - hidden on xs (e.g. portrait mobile devices) -->
  <div v-scroll-to="{ el:scrollToElement, duration:1500, easing:'ease' }" id="scrollImgContainer">
    <p class="mb-0 mt-sm-1 mt-md-3 mt-lg-4 mt-xl-5">
      <img alt="Scroll text" src="../assets/images/scroll.png" id="scrollImg" />
    </p>
    <p class="my-0 my-lg-1 my-xl-2">
      <img alt="Scroll arrow" src="../assets/images/arrow-full-down.png" id="scrollArrowImg" />
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
  }
}
</script>


<style scoped lang="scss">

#scrollImgContainer {
  cursor: pointer;
}

#scrollImg {
  max-width: 157px;
  min-width: 78.5px;
  width: calc(78.5px + 78.5 * (100vw - 250px) / (1366 - 250) );
}

#scrollArrowImg {
  max-width: 38px;
  min-width: 19px;
  width: calc(19px + 19 * (100vw - 250px) / (1366 - 250) );
}

</style>
