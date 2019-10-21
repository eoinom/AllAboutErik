<template>
<div class="layout">
    <h3 id="top">Test Scroll To Top Button</h3>
    <p> NeueHaasGroteskText Pro55 font</p>

    <div id="scrollToTopContainer">
        <button v-scroll-to="{ el:'body', duration:1500, easing:'ease' }" id="scrollToTopBtn" class="show">      
        {{ text }}
        <svg v-if="includeArrow" viewBox="0 0 20 20" width="20" height="20" id="arrow">
        <line x1="1" y1="13" x2="9" y2="4.5" />
            <line x1="8" y1="4.5" x2="16" y2="13" />
        </svg>
        </button>    
    </div>
  </div>
</template>


<script scoped>
export default {
  name: 'ScrollToTop',

  props: {
    text: {
      default: 'SCROLL TO TOP',
      type: String,
    },
    includeArrow: {
      default: true,
      type: Boolean,
    },
  },

  mounted() {
    var myID = document.getElementById("scrollToTopBtn");

    // var myScrollFunc = function() {
    //   var y = window.scrollY;
    //   if (y >= 800) {
    //     myID.className = "show"
    //   } else {
    //     myID.className = "hide"
    //   }
    // };
    // window.addEventListener("scroll", myScrollFunc);
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lora:400,400i,700&display=swap');
/* @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap'); */

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-65md.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}


.layout {
    background-color: white;
    width: 3000px;
    height: 3000px;
}

#scrollToTopContainer {
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
	text-align: center;
}

#scrollToTopBtn {  
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);

  /* font-family: Arial, sans-serif; */
  /* font-family: 'Lora', serif; */
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-weight: 400;
  /* font-style: italic; */
  font-size: 14px;
  text-align: center;
  text-rendering: auto;
  
  padding: 15px;
  z-index: 999;

  background: rgba(20,20,20, 1);
  border: 0px solid rgba(56,56,56, 1);
  outline: none;
  color: rgb(203,203,201);
  border-radius: 5px;

  transition: visibility 0.8s, opacity 0.8s; 
  visibility: visible;
}

button:hover {
  background: rgb(153,153,153);
  color: white;
}
button:hover #arrow > line {
  stroke: rgb(255,255,255);
}

#arrow {
  margin-left: 5px;
  margin-right: -3px;
}
#arrow > line {
  stroke: rgb(203,203,201);
  stroke-width: 2px;
}

.hide {
  opacity: 0;
}
.show {
  opacity: 1;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  button {
    font-size: 10px;
    padding: 10.5px;    
    border-radius: 4px;   
  }
  #arrow {
    width: 15px;
    height: 15px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  button {      
    font-size: 12px;
    padding: 12.75px;
    border-radius: 4.5px;   
  }
  #arrow {
    width: 17.5px;
    height: 17.5px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 

}
</style>
