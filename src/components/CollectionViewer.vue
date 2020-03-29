<template>
  <transition name="fade">
    <div
      v-if="typeof index === 'number'"
      class="collection-viewer"
      @touchstart="touchstartHandler"
      @touchmove="touchmoveHandler"
      @touchend="touchendHandler"
      :style="viewerStyles"
    >
      <div class="collection-viewer__modal" :style="`background: ${background}`" >
        <div :class="['collection-viewer__spinner', !isImageLoaded || 'hide']" >
          <div class="collection-viewer__dot" :style="`border-color: ${interfaceColor}`" />
          <div class="collection-viewer__dot" :style="`border-color: ${interfaceColor}`" />
          <div class="collection-viewer__dot" :style="`border-color: ${interfaceColor}`" />
        </div>
        
        <b-container fluid>
          <b-row align-h="between" id="navLinks">
            <g-link :to="'/collections/' + prevCollection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="prevCollection.title" class="nav_link nav_link_small" id="nav_previous">PREV</g-link>
            <g-link :to="'/collections/' + prevCollection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="prevCollection.title" class="nav_link nav_link_big" id="nav_previous">PREVIOUS COLLECTION</g-link>
          
            <div class="collection-viewer__text collection-viewer__textcenter">HOVER OVER IMAGE FOR CLOSE-UP</div>
            
            <g-link :to="'/collections/' + nextCollection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="nextCollection.title" class="nav_link nav_link_small" id="nav_next">NEXT</g-link>
            <g-link :to="'/collections/' + nextCollection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="nextCollection.title" class="nav_link nav_link_big" id="nav_next">NEXT COLLECTION</g-link>
          </b-row>
        </b-container>

        <div class="collection-viewer__container">
          <ul class="collection-viewer__content">
            <li
              v-for="(image, imageIndex) in formattedImages"
              :key="imageIndex"
              :style="`transform: translate3d(${currentIndex * -100}%, 0px, 0px);`"
              class="collection-viewer__image-container"
            >
              <div class="collection-viewer__image">
                  <image-magnifier 
                    :src="image.img"
                    :zoom-src="image.img"
                    :zoom="2"                    
                    zoom-diameter=500
                    zoom-radius="50%"
                    :show-cursor="false"
                    @imgloaded="imageLoaded($event, imageIndex)"
                  />                 
              </div>
            </li>
          </ul>
        </div>

        <div id="leftArrowContainer" v-if="currentIndex > 0" @click="prev()">
          <img
            alt="Left arrow, click for previous image" 
            src="../assets/images/arrow-left.png" 
            id="prevImageImg"
            class="collection-viewer__prev arrowImg" 
          />
          <img
            alt="Left arrow, click for previous image" 
            src="../assets/images/arrow-left-hover.png" 
            id="prevImageImg-hover"
            class="collection-viewer__prev arrowImg" 
          />
        </div>

        <div id="rightArrowContainer" v-if="currentIndex + 1 < images.length" @click="next()">
          <img
            alt="Right arrow, click for next image" 
            src="../assets/images/arrow-right.png" 
            id="nextImageImg"
            class="collection-viewer__next arrowImg"
          />
          <img
            alt="Right arrow, click for next image" 
            src="../assets/images/arrow-right-hover.png" 
            id="nextImageImg-hover"
            class="collection-viewer__next arrowImg" 
          />
        </div>

        <g-link to="/collections/" class="nav_link pt-3" id="nav_back">BACK TO COLLECTIONS MENU</g-link>
      </div>

    </div>
  </transition>
</template>

<script>
import ImageMagnifier from './ImageMagnifier.vue'

const keyMap = {
  LEFT: 37,
  RIGHT: 39,
  ESC: 27,
};

export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 1,
    },
    disableScroll: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0, 0.8)',
    },
    interfaceColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.8)',
    },
    prevCollection: {
      type: Object
    },
    nextCollection: {
      type: Object
    }
  },

  data() {
    return {
      currentIndex: this.index,
      isImageLoaded: false,
      bodyOverflowStyle: '',
      touch: {
        count: 0,
        x: 0,
        y: 0,
        multitouch: false,
        flag: false,
      },
      glassElCreated: false,
      showMagnifier: false,
      zoom: 6,
      headerEl: null,
      headerHeight: 0
    };
  },

  computed: {
    formattedImages() {
      return this.images.map(image => (typeof image === 'string'
        ? { url: image } : image
      ));
    },
    viewerStyles() {
      return {
        '--headerHeight': this.headerHeight + 'px'
      }
    }
  },

  watch: {
    index(val) {
      if (!document)  return;      
      this.currentIndex = val;
      if (this.disableScroll && typeof val === 'number') {
        document.body.style.overflow = 'hidden';
      } else if (this.disableScroll && !val) {
        document.body.style.overflow = this.bodyOverflowStyle;
      }
    },
    // currentIndex(val) {
    //   this.setImageLoaded(val);
    // },
    
  },

  methods: {
    prev() {
      if (this.currentIndex === 0) return;
      this.currentIndex -= 1;
    },
    next() {
      if (this.currentIndex === this.images.length - 1) return;
      this.currentIndex += 1
    },
    imageLoaded(img_el, imageIndex) {
      img_el.classList.add('loaded');
      if (imageIndex === this.currentIndex) {
        this.isImageLoaded = !img_el ? false : img_el.classList.contains('loaded');
      }
    },
    shouldPreload(index) {
      const el = this.getImageElByIndex(index) || {};
      const { src } = el;
      return !!src
       || index === this.currentIndex
       || index === this.currentIndex - 1
       || index === this.currentIndex + 1;
    },
    bindEvents() {
      document.addEventListener('keydown', this.keyDownHandler, false);
    },
    unbindEvents() {
      document.removeEventListener('keydown', this.keyDownHandler, false);
    },
    touchstartHandler(event) {
      this.touch.count += 1;
      if (this.touch.count > 1) {
        this.touch.multitouch = true;
      }
      this.touch.x = event.changedTouches[0].pageX;
      this.touch.y = event.changedTouches[0].pageY;
    },
    touchmoveHandler(event) {
      if (this.touch.flag || this.touch.multitouch) return;
      const touchEvent = event.touches[0] || event.changedTouches[0];
      if (touchEvent.pageX - this.touch.x > 40) {
        this.touch.flag = true;
        this.prev();
      } else if (touchEvent.pageX - this.touch.x < -40) {
        this.touch.flag = true;
        this.next();
      }
    },
    touchendHandler() {
      this.touch.count -= 1;
      if (this.touch.count <= 0) {
        this.touch.multitouch = false;
      }
      this.touch.flag = false;
    },
    keyDownHandler(event) {
      switch (event.keyCode) {
        case keyMap.LEFT:
          this.prev();
          break;
        case keyMap.RIGHT:
          this.next();
          break;
        default:
          break;
      }
    },
    getElementOffset(el) {
      let top = 0;
      let left = 0;
      let element = el;

      // Loop through the DOM tree
      // and add it's parent's offset to get page offset
      do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);

      return {
        top,
        left,
      }
    },
    observeNavLinksPosition() {
      let interval = setInterval(function () {    
        let navLinksEl = document.getElementById('navLinks')
        this.headerHeight = this.getElementOffset(navLinksEl).top
      }.bind(this), 500);
    }
  },

  mounted() {
    if (!document)  return;

    this.observeNavLinksPosition()
    
    this.bodyOverflowStyle = document.body.style.overflow;
    this.bindEvents();
  },

  beforeDestroy() {
    if (!document) return;
    if (this.disableScroll) {
      document.body.style.overflow = this.bodyOverflowStyle;
    }
    this.unbindEvents();
  },

  components: {
    ImageMagnifier
  }
};
</script>

<style lang="scss" scoped>

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}


.nav_link {
  color: white;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-style: italic;
  font-size: 28px;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(28,16,23,0.83);
  margin: 0px;
  padding: 0px 45px;
  z-index: 1000;
}
.nav_link_small {
  display: none;
}
.nav_link_big {
  display: inline;
}
#nav_back { 
  display: block;
  position: fixed;
  top: auto;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
}
#nav_prev:hover, #nav_previous:hover, #nav_next:hover, #nav_back:hover {
  color:	#EED047;
  cursor: pointer;
}

.collection-viewer {
  &__modal {
    // position: fixed;
    position: relative;
    display: block;
    z-index: 501;
    // top: 0;
    left: 0;
    width: 100%;
    // height: calc(100vh - 203px);  // 203px is the height of the banner
    height: calc(100vh - var(--headerHeight));
    overflow: hidden;
  }
  &__content {
    height: 100%;
    width: 100%;
    white-space: nowrap;
    padding: 0;
    margin: 0;
  }
  &__container {
    position: absolute;
    z-index: 502;
    display: block;
    width: 100%;
    // top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
    height: 100%;
  }
  &__image-container {
    display: inline-table;
    vertical-align: middle;
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: left .4s ease, transform .4s ease, -webkit-transform .4s ease;
  }
  &__image {
    & {
      // display: inline-block;
      position: relative;
      margin: 0 auto;
      max-width: 85%;
      max-height: 100%;
      // height: calc(100vh - 203px - 20px);  // 203px is the height of the banner
      height: calc(100vh - var(--headerHeight) - 20px);  // 203px is the height of the banner
      // padding: 3.5vh 0;
      padding: 20px 0 80px 0;
      display: flex;
      justify-content: center;
    }
    & img {
      & {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        object-fit: contain;
        opacity: 0;
        transition: opacity .2s;
      }
      &.loaded{
        opacity: 1;
      }
    }
  }
  &__text {    
    font-family: 'NeueHaasGroteskText Pro55', sans-serif;
    font-feature-settings: 'liga';
    font-weight: 400;
    text-align: center;
    line-height: 13px;
    color: #FFFFFF;
    font-size: 10px;
    letter-spacing: 4px;
    margin: 14px 0px;
    padding: 0px;
  }
  &__next,
  &__prev {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 1002;
    display: block;
    background: transparent;
    border: 0;
    line-height: 0;
    outline: none;
    cursor: pointer;
  }
  &__next {
    right: 8.5%;
    vertical-align: middle;
  }
  &__prev {
    left: 8.5%;
  }
  &__spinner {
    & {
      position: absolute;
      z-index: 503;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 auto;
      display: block;
      height: 15px;
      width: auto;
      box-sizing: border-box;
      text-align: center;
    }
    &.hide {
      display: none;
    }
  }
  &__dot {
    & {
      float: left;
      margin: 0 calc(15px / 2);
      width: 15px;
      height: 15px;
      border: calc(15px / 5) solid rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      transform: scale(0);
      box-sizing: border-box;
      animation: spinner-animation 1000ms ease infinite 0ms;
    }
    &:nth-child(1) {
      animation-delay: calc(300ms * 1);
    }
    &:nth-child(2) {
      animation-delay: calc(300ms * 2);
    }
    &:nth-child(3) {
      animation-delay: calc(300ms * 3);
    }
  }
}
// // transition fade on opening / closing of lightbox
// .fade-enter-active, .fade-leave-active {
//   position: fixed;
//   z-index: 1000;
//   // transition: opacity 0.2s;
//   transition: opacity 0.5s ease;
// }
// .fade-enter, .fade-leave-to {
//   position: fixed;
//   opacity: 0;
//   z-index: 1000;
// }
@keyframes spinner-animation {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.arrowImg {
  width: 7.0%;
  max-width: 26px;
  min-width: 15px;
  padding: 0;
}
#prevImageImg-hover, 
#leftArrowContainer:hover #prevImageImg {
  display: none;
}
#leftArrowContainer:hover #prevImageImg-hover {
  display: inline;
}

#nextImageImg-hover, 
#rightArrowContainer:hover #nextImageImg {
  display: none;
}
#rightArrowContainer:hover #nextImageImg-hover {
  display: inline;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .collection-viewer {
    // &__text {
    //   font-size: 0.8125rem; /* 13px with 16px default size */
    // }
    &__next {
      right: 1.5%;
    }
    &__prev {
      left: 1.5%;
    }
  }
  .nav_link {
    font-size: 5vw;
  }
  .nav_link_small {
    display: inline;
  }
  .nav_link_big {
    display: none;
  }  
  // #nav_prev {
  //   left: 4%;
  // }
  // #nav_next {
  //   right: 4%;
  // }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .collection-viewer {
    // &__text {
    //   font-size: 0.9375rem; /* 15px with 16px default size */
    // }
    &__next {
      right: 3.0%;
    }
    &__prev {
      left: 3.0%;
    }
  }
  .nav_link {
    font-size: 30px;
  }
  .nav_link_small {
    display: inline;
  }
  .nav_link_big {
    display: none;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) { 
  .collection-viewer {
    // &__text {
    //   font-size: 1.0625rem; /* 17px with 16px default size */
    // }
    &__next {
      right: 4.5%;
    }
    &__prev {
      left: 4.5%;
    }
  }
  .nav_link_small {
    display: inline;
  }
  .nav_link_big {
    display: none;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {  
  .collection-viewer{
    // &__text {
    //   font-size: 1.1875rem; /* 19px with 16px default size */
    // }
    &__next {
      right: 6.5%;
    }
    &__prev {
      left: 6.5%;
    }
  }
}
</style>