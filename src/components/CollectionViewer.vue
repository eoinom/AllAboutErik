<template>
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
      
      <b-container fluid style="padding:0">
        <b-row no-gutters align-v="center" id="navLinksRow">
          <b-col cols="2" lg="" xl="4">
            <g-link :to="'/collections/' + prevCollection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="prevCollection.title" class="nav_link nav_link_small" id="nav_prev">PREV</g-link>
            <g-link :to="'/collections/' + prevCollection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="prevCollection.title" class="nav_link nav_link_big" id="nav_prev">PREVIOUS COLLECTION</g-link>
          </b-col>
          
          <b-col cols="8" lg="7" xl="4">
            <div class="collection-viewer__text collection-viewer__textcenter">HOVER OVER IMAGE FOR CLOSE-UP</div>
          </b-col>
          
          <b-col cols="2" lg="" xl="4">
            <g-link :to="'/collections/' + nextCollection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="nextCollection.title" class="nav_link nav_link_small" id="nav_next">NEXT</g-link>
            <g-link :to="'/collections/' + nextCollection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="nextCollection.title" class="nav_link nav_link_big" id="nav_next">NEXT COLLECTION</g-link>
          </b-col>            
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
                  :zoom-diameter=500
                  zoom-radius="50%"
                  :show-cursor="false"
                  @imgloaded="imageLoaded($event, imageIndex)"
                  :current-index="currentIndex"
                  :images-length="images.length"
                  @prev="prev()"
                  @next="next()"
                />                 
            </div>
          </li>
        </ul>
      </div>

      <!-- <div id="leftArrowContainer" v-if="currentIndex > 0" @click="prev()">
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
      </div> -->

      <g-link to="/collections/" class="nav_link pt-3" id="nav_back">BACK TO COLLECTIONS MENU</g-link>
    </div>

  </div>
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
    }    
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
        let navLinksEl = document.getElementById('navLinksRow')
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

* {
  --linkGutter:  45px;
}

.nav_link {
  color: white;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-style: italic;
  font-size: 1.75rem;
  letter-spacing: 1px;
  line-height: 2.1875rem;
  text-shadow: 1px 1px 2px rgba(28,16,23,0.83);
  margin: 0px;
  padding: 0px;
  z-index: 1000;
}
.nav_link_small {
  display: none;
}
.nav_link_big {
  display: block;
}
#nav_prev {
  text-align: left;
  padding-left: var(--linkGutter);
}
#nav_next {
  text-align: right;
  padding-right: var(--linkGutter);
}
#nav_back { 
  display: block;
  position: fixed;
  top: auto;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  padding: 0;
  width: fit-content;
}
#nav_prev:hover, #nav_next:hover, #nav_back:hover {
  color:	#EED047;
  cursor: pointer;
}

.collection-viewer {
  &__modal {
    position: relative;
    display: block;
    z-index: 501;
    left: 0;
    width: 100%;
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
      position: relative;
      margin: 0 auto;
      max-width: 85%;
      max-height: 100%;
      height: calc(100vh - var(--headerHeight) - 20px);
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
    padding: 0px 20px;
  }
  // &__next,
  // &__prev {
  //   position: absolute;
  //   top: 50%;
  //   transform: translate(0, -50%);
  //   z-index: 1002;
  //   display: block;
  //   background: transparent;
  //   border: 0;
  //   line-height: 0;
  //   outline: none;
  //   cursor: pointer;
  // }
  // &__next {
  //   right: 8.5%;
  //   vertical-align: middle;
  // }
  // &__prev {
  //   left: 8.5%;
  // }
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

@keyframes spinner-animation {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

// .arrowImg {
//   width: 7.0%;
//   max-width: 26px;
//   min-width: 15px;
//   padding: 0;
// }
// #prevImageImg-hover, 
// #leftArrowContainer:hover #prevImageImg {
//   display: none;
// }
// #leftArrowContainer:hover #prevImageImg-hover {
//   display: inline;
// }

// #nextImageImg-hover, 
// #rightArrowContainer:hover #nextImageImg {
//   display: none;
// }
// #rightArrowContainer:hover #nextImageImg-hover {
//   display: inline;
// }

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .collection-viewer {
    &__next {
      right: 1.5%;
    }
    &__prev {
      left: 1.5%;
    }
  }
  * {
    --linkGutter: 25px;
  }
  .nav_link {
    font-size: calc(1.25rem + 4 * (100vw - 350px) / (576 - 350) ); /* varies between 20px - 24px */
  }
  .nav_link_small {
    display: block;
  }
  .nav_link_big {
    display: none;
  }
}

/* special breakpoint */
@media (max-width: 338.98px) {
  .collection-viewer {
    &__text {
      letter-spacing: 3px;
    }
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .collection-viewer {
    &__next {
      right: 3.0%;
    }
    &__prev {
      left: 3.0%;
    }
  }
  * {
    --linkGutter: calc(25px + 20 * (100vw - 576px) / (768 - 576) ); /* varies between 25px - 45px */
  }
  .nav_link {
    font-size: calc(1.5rem + 4 * (100vw - 576px) / (768 - 576) ); /* varies between 24px - 28px */
  }
  .nav_link_small {
    display: block;
  }
  .nav_link_big {
    display: none;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) { 
  .collection-viewer {
    &__next {
      right: 4.5%;
    }
    &__prev {
      left: 4.5%;
    }
  }
  .nav_link_small {
    display: block;
  }
  .nav_link_big {
    display: none;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {  
  .collection-viewer{
    &__next {
      right: 6.5%;
    }
    &__prev {
      left: 6.5%;
    }
  }
  * {
    --linkGutter: 25px;
  }
  #nav_prev {
    text-align: center;
    padding: 0 var(--linkGutter);
  }
  #nav_next {
    text-align: center;
    padding: 0 var(--linkGutter);
  }
}
</style>