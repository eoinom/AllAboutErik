<template>
  <div v-if="addBtnToDOM" id="backToMenuContainer">
    <a :href="link">
      <button id="backToMenuBtn" class="hide">
        {{ text }}
      </button>
    </a>
  </div>
</template>


<script scoped>
export default {
  name: 'BackToMenu',

  props: {
    text: {
      default: 'BACK TO MENU',
      type: String
    },
    link: {
      default: '',
      type: String
    },
    showAtPosY: {
      default: 800,
      type: Number
    }
  },

  data() {
    return {
      scrollPosY: 0.0
    }
  },

  computed: {
    addBtnToDOM() {  
      return this.scrollPosY >= this.showAtPosY
    }
  },

  mounted() {
    var myScrollFunc = function() {      
      this.scrollPosY = window.scrollY
      var btnElement = document.getElementById("backToMenuBtn");
      if (btnElement !== null) {
        if (this.scrollPosY >= 800) {        
          btnElement.className = "show"
        } 
        else {
          btnElement.className = "hide"
        }
      }
    }.bind(this);
    window.addEventListener("scroll", myScrollFunc);
  }
}
</script>


<style scoped>

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

#backToMenuContainer {
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
	text-align: center;
}

#backToMenuBtn {  
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);

  font-family: 'NeueHaasGroteskText Pro55', Arial;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  text-rendering: auto;
  letter-spacing: 1px;
  
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

#backToMenuBtn:hover {
  background: rgb(153,153,153);
  color: white;
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
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  button {      
    font-size: 12px;
    padding: 12.75px;
    border-radius: 4.5px;   
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 

}
</style>
