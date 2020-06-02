<template>

  <!-- Scroll with arrow images - hidden on xs (e.g. portrait mobile devices) -->
  <div v-scroll-to="{ el:scrollToElement, duration:1500, easing:'ease' }" id="scrollImgContainer">
    <p class="mb-0 mt-md-1 mt-lg-2 mt-xl-5">
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
  width: 11.5vw;
  max-width: 157px;
  min-width: 78.5px;
}

#scrollArrowImg {
  width: 2.8vw;
  max-width: 38px;
  min-width: 19px;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  #scrollImg {
    width: 20vw;
  }
  #scrollArrowImg {
    width: 5vw;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  #scrollImg {
    width: 15vw;
  }
  #scrollArrowImg {
    width: 4vw;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {

}

</style>
