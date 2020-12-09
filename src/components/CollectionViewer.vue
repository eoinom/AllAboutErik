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
            <g-link :to="'/collections/' + prevCollection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="prevCollection.title" class="nav_link nav_link_small" id="nav_prev">
              <g-image alt="previous" src="../assets/images/previous-collection-2lines-white.png" class="hideOnHover" />
              <g-image alt="previous" src="../assets/images/previous-collection-2lines-yellow.png" class="showOnHover" />
            </g-link>

            <g-link :to="'/collections/' + prevCollection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="prevCollection.title" class="nav_link nav_link_big" id="nav_prev">
              <g-image alt="previous" src="../assets/images/previous-collection-1line-white.png" class="hideOnHover" />
              <g-image alt="previous" src="../assets/images/previous-collection-1line-yellow.png" class="showOnHover" />
            </g-link>
          </b-col>
          
          <b-col cols="8" lg="7" xl="4">
            <div v-if="windowWidth > 1366" class="collection-viewer__text">HOVER OVER IMAGE FOR CLOSE-UP</div>
          </b-col>
          
          <b-col cols="2" lg="" xl="4">
            <g-link :to="'/collections/' + nextCollection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="nextCollection.title" class="nav_link nav_link_small" id="nav_next">
              <g-image alt="previous" src="../assets/images/next-collection-2lines-white.png" class="hideOnHover" />
              <g-image alt="previous" src="../assets/images/next-collection-2lines-yellow.png" class="showOnHover" />
            </g-link>

            <g-link :to="'/collections/' + nextCollection.link" v-b-tooltip.hover="{ variant: 'secondary' }" :title="nextCollection.title" class="nav_link nav_link_big" id="nav_next">
              <g-image alt="previous" src="../assets/images/next-collection-1line-white.png" class="hideOnHover" />
              <g-image alt="previous" src="../assets/images/next-collection-1line-yellow.png" class="showOnHover" />
            </g-link>
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
            <div class="collection-viewer__image" style="position:relative">
              <image-magnifier 
                :src="image.img"
                :zoom-src="image.img"
                :zoom="2"                    
                :zoom-diameter=500
                zoom-radius="50%"
                :show-cursor="false"
                @imgloaded="imageLoaded($event, imageIndex)"
              />
              
              <div v-if="isOldTime" class="collections_headerLinkText">
                <span>READ ALL ABOUT IT</span>
                <br>
                <span>KEEP SCROLLING</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div id="leftArrowContainer" v-if="currentIndex > 0" @click="prev()">
        <img
          alt="Left arrow, click for previous image" 
          src="../assets/images/arrow-left.png" 
          id="prevArrowImg"
          class="prevArrow arrowImg" 
        />
        <img
          alt="Left arrow, click for previous image" 
          src="../assets/images/arrow-left-hover-yellow.png" 
          id="prevArrowImg-hover"
          class="prevArrow arrowImg" 
        />
      </div>

      <div id="rightArrowContainer" v-if="currentIndex + 1 < images.length" @click="next()">
        <img
          alt="Right arrow, click for next image" 
          src="../assets/images/arrow-right.png" 
          id="nextArrowImg"
          class="nextArrow arrowImg"
        />
        <img
          alt="Right arrow, click for next image" 
          src="../assets/images/arrow-right-hover-yellow.png" 
          id="nextArrowImg-hover"
          class="nextArrow arrowImg" 
        />
      </div>

      <g-link v-if="!isOldTime" :to="{ path: '/collections/', query: { playMusic: 'false' }}" class="nav_link pt-3" id="nav_back">
        <g-image alt="Back to collections menu" src="../assets/images/back-to-collections-menu-1line-white.png" class="hideOnHover" />
        <g-image alt="Back to collections menu" src="../assets/images/back-to-collections-menu-1line-yellow.png" class="showOnHover" />
      </g-link>

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
    },
    isOldTime: {
      type: Boolean,
      default: false,
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
      headerHeight: 0,
      windowWidth: 0.0,
      interval: null
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

  mounted() {
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', () => {  
      this.windowWidth = window.innerWidth
    })
    window.addEventListener('orientationchange', () => {  
      this.windowWidth = window.innerWidth
    })
    
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
    clearInterval(this.interval);
    this.unbindEvents();
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
      this.interval = setInterval(function () {    
        let navLinksEl = document.getElementById('navLinksRow')
        this.headerHeight = this.getElementOffset(navLinksEl).top
      }.bind(this), 500);
    }
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
  --arrowOffset:  8.5%;
}

.nav_link {
  margin: 0px;
  padding: 0px;
  padding-top: 8px;
  width: fit-content;
  z-index: 1000;
}
#nav_prev {
  text-align: left;
  padding-left: var(--linkGutter);
}
#nav_next {
  text-align: right;
  float: right;
  padding-right: var(--linkGutter);
}
#nav_back {
  position: fixed;
  top: auto;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  padding: 0 20px;
  img {
    max-width: 100%;
  }
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
      max-width: 90%;
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

.arrowImg {
  width: 7.0%;
  max-width: 26px;
  min-width: 15px;
  padding: 0;
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
.nextArrow {
  right: var(--arrowOffset);
}
.prevArrow {
  left: var(--arrowOffset);
}

#prevArrowImg-hover, 
#leftArrowContainer:hover #prevArrowImg {
  display: none;
}
#leftArrowContainer:hover #prevArrowImg-hover {
  display: inline;
}

#nextArrowImg-hover, 
#rightArrowContainer:hover #nextArrowImg {
  display: none;
}
#rightArrowContainer:hover #nextArrowImg-hover {
  display: inline;
}

.collections_headerLinkText {
  display: block;
  color: #fff;
  font-family: 'Francois One', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 0.875rem;
  letter-spacing: 0.8px;
  text-align: center;
  line-height: 20px;
  margin: 0 auto;
  padding: 0px;
  width: 100%;
  position: absolute;
  bottom: 35px;
  left: 0;
}
.collections_headerLinkText > span:nth-of-type(2) {
  font-size: 0.75rem;
  bottom: 25px;
}



/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  * {
    --linkGutter: 25px;
    --arrowOffset: 3.0%;
  }
}

/* special breakpoint */
@media only screen and (max-width: 338.98px) {
  .collection-viewer {
    &__text {
      letter-spacing: 3px;
    }
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  * {
    --linkGutter: calc(25px + 20 * (100vw - 576px) / (768 - 576) ); /* varies between 25px - 45px */
    --arrowOffset: 3.0%;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) { 
  * {
    --arrowOffset: 4.5%;
  }
  #nav_back.nav_link_big {
    display: block;
  }
  #nav_back.nav_link_small {
    display: none;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {  
  * {
    --linkGutter: 25px;
    --arrowOffset: 4.5%;
  }
  #nav_prev {
    text-align: center;
    padding-right: var(--linkGutter);
    padding-left: var(--linkGutter);
  }
  #nav_next {
    text-align: center;
    padding-right: var(--linkGutter);
    padding-left: var(--linkGutter);
  }
}
</style>