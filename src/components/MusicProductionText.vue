<template>
  <div class="productionTextDiv" :class="dynamicClass" :style="dynamicStyles">
    <p v-if="title != null && title != ''" class="title">{{ title }}</p>
    <p v-if="body != null && body != ''" class="body">{{ body }}</p>
  </div>

</template>


<script scoped>
export default { 
  name: 'MusicProductionText',

  props: {
    title: {
      type: String
    },
    body: {
      type: String
    },
    includeBorder: {
      type: Boolean,
      default: true
    },
    divHeight: {
      type: String,
      default: '100%'
    },
    divPadding: {
      type: String,
      default: '15px 20px'
    } 
  },

  computed: {
    dynamicClass() {
      return this.includeBorder ? 'border' : ''
    },
    dynamicStyles() {
      return {
        '--divHeight' : this.divHeight,
        '--divPadding' : this.divPadding
      }
    }
  }
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lora:400,700&display=swap');

.productionTextDiv {
  width: 100%;
  height: var(--divHeight);
  padding: var(--divPadding);

  color: white;
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
}

.border {
  border-style: solid;
  border-width: 1px;
  border-color: #FCFEF4;
  border-radius: 9px;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  text-align: left;
  letter-spacing: 3px;
  line-height: 1.25rem;
  text-transform: uppercase;
  margin: 0px;
  padding-bottom: 10px;
}

.body {
  font-size: 1.0625rem;
  font-weight: 400;
  text-align: justify;
  letter-spacing: 2px;
  line-height: 1.25rem;
  margin: 0px;
  padding: 0px;
}



/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {  
  .title {
    font-size: 1.125rem;
    line-height: 1.125rem;
    padding-bottom: 6px;
  }
  .body {
    font-size: 1rem;
    line-height: 1.125rem;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .title {
    font-size: 1.125rem;
    line-height: 1.125rem;
    padding-bottom: 6px;
  }
  .body {
    font-size: 1rem;
    line-height: 1.125rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 

}

</style>
