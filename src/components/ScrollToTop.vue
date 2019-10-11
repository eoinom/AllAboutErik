<template>
  <div>
    <button v-scroll-to="{ el:'body', duration:1500, easing:'ease' }" id="scrollToTopBtn" class="hide">      
      {{ text }}
      <svg v-if="includeArrow" viewBox="0 0 20 20" width="20" height="20" id="arrow">
      <line x1="1" y1="13" x2="9" y2="4.5" />
        <line x1="8" y1="4.5" x2="16" y2="13" />
      </svg>
    </button>    
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
      default: false,
      type: Boolean,
    },
  },

  mounted() {
    var myID = document.getElementById("scrollToTopBtn");

    var myScrollFunc = function() {
      var y = window.scrollY;
      if (y >= 800) {
        myID.className = "show"
      } else {
        myID.className = "hide"
      }
    };
    window.addEventListener("scroll", myScrollFunc);
  }
}
</script>


<style scoped>
/* @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap'); */

button {
  position: fixed;  
  bottom: 0;
  
  /* To center horizontally (will not center vertically and won't work in IE6/7.) */
  width: fit-content;
  margin: 1.5% auto; 
  left: 0;
  right: 0;

  /* font-family: 'Source Sans Pro', Arial, sans-serif; */
  font-family: Arial, sans-serif;
  font-feature-settings: 'liga';
  font-size: 14px;
  text-align: center;
  text-rendering: auto;
  
  transform-origin: left top;
  padding: 15px;
  z-index: 999;
  display: inline-block;
  background: rgba(20,20,20, 1);
  border: 0px solid rgba(56,56,56, 1);
  outline: none;
  color: rgb(203,203,201);
  border-radius: 5px;

  transition: visibility 0.8s, opacity 0.8s; 
  transition-delay: 0s;
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
