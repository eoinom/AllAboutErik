<template>
  <transition name="fade">
    <div
      v-if="typeof index === 'number'"
      class="image-lightbox"
      @touchstart="touchstartHandler"
      @touchmove="touchmoveHandler"
      @touchend="touchendHandler"
    >
      <div class="image-lightbox__modal" :style="`background: ${background}`" >
        <div :class="['image-lightbox__spinner', !isImageLoaded || 'hide']" >
          <div class="image-lightbox__dot" :style="`border-color: ${interfaceColor}`" />
          <div class="image-lightbox__dot" :style="`border-color: ${interfaceColor}`" />
          <div class="image-lightbox__dot" :style="`border-color: ${interfaceColor}`" />
        </div>

        <div v-show="isImageLoaded" class="image-lightbox__text">
          HOVER OVER IMAGE FOR CLOSE-UP
        </div>

        <div class="image-lightbox__container">
          <ul class="image-lightbox__content">
            <li
              v-for="(image, imageIndex) in formattedImages"
              :key="imageIndex"
              :style="`transform: translate3d(${currentIndex * -100}%, 0px, 0px);`"
              class="image-lightbox__image-container"
            >
              <div class="image-lightbox__image">
                
                <!-- image magnifier (ref: https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp) -->
                <div class="img-magnifier-container">
                  <img
                    :ref="`lg-img-${imageIndex}`"
                    :src="shouldPreload(imageIndex) ? image.img : false"
                    @load="imageLoaded($event, imageIndex)"
                    :id="`lg-img-${imageIndex}`"
                    @mouseover="magnify(`lg-img-${imageIndex}`, 3)"
                  >
                </div>

              </div>
            </li>
          </ul>
        </div>

        <div id="leftArrowContainer" v-if="currentIndex > 0" @click="prev()">
          <img
            alt="Left arrow, click for previous image" 
            src="../assets/images/arrow-left.png" 
            id="prevImageImg"
            class="image-lightbox__prev arrowImg" 
          />
          <img
            alt="Left arrow, click for previous image" 
            src="../assets/images/arrow-left-hover.png" 
            id="prevImageImg-hover"
            class="image-lightbox__prev arrowImg" 
          />
        </div>

        <div id="rightArrowContainer" v-if="currentIndex + 1 < images.length" @click="next()">
          <img
            alt="Right arrow, click for next image" 
            src="../assets/images/arrow-right.png" 
            id="nextImageImg"
            class="image-lightbox__next arrowImg"
          />
          <img
            alt="Right arrow, click for next image" 
            src="../assets/images/arrow-right-hover.png" 
            id="nextImageImg-hover"
            class="image-lightbox__next arrowImg" 
          />
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
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
      glassElCreated: false
    };
  },

  computed: {
    formattedImages() {
      return this.images.map(image => (typeof image === 'string'
        ? { url: image } : image
      ));
    }
  },

  watch: {
    index(val) {
      if (!document) return;
      this.currentIndex = val;
      if (this.disableScroll && typeof val === 'number') {
        document.body.style.overflow = 'hidden';
      } else if (this.disableScroll && !val) {
        document.body.style.overflow = this.bodyOverflowStyle;
      }
    },
    currentIndex(val) {
      this.setImageLoaded(val);
    },
  },
  mounted() {
    if (!document) return;
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
  methods: {
    prev() {
      if (this.currentIndex === 0) return;
      this.currentIndex -= 1;
      this.$emit('slide', { index: this.currentIndex });
    },
    next() {
      if (this.currentIndex === this.images.length - 1) return;
      this.currentIndex += 1
      this.$emit('slide', { index: this.currentIndex });
    },
    imageLoaded($event, imageIndex) {
      const { target } = $event;
      target.classList.add('loaded');
      if (imageIndex === this.currentIndex) {
        this.setImageLoaded(imageIndex);
      }
    },
    getImageElByIndex(index) {
      const elements = this.$refs[`lg-img-${index}`] || [];
      return elements[0];
    },
    setImageLoaded(index) {
      const el = this.getImageElByIndex(index);
      this.isImageLoaded = !el ? false : el.classList.contains('loaded');
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

    magnify(imgID, zoom) {
      var img, glass, w, h, bw;
      img = document.getElementById(imgID);
      
      /* Create magnifier glass: */
      if (!this.glassElCreated) {
        glass = document.createElement("DIV");
        glass.setAttribute("class", "img-magnifier-glass");
        this.glassElCreated = true
      }

      /* Insert magnifier glass: */
      img.parentElement.insertBefore(glass, img);

      /* Set background properties for the magnifier glass: */
      glass.style.backgroundImage = "url('" + img.src + "')";
      glass.style.backgroundRepeat = "no-repeat";
      glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
      glass.style.backgroundColor = 'white'
      bw = 3;
      w = glass.offsetWidth / 2;
      h = glass.offsetHeight / 2;

      /* Execute a function when someone moves the magnifier glass over the image: */
      glass.addEventListener("mousemove", moveMagnifier);
      img.addEventListener("mousemove", moveMagnifier);

      /*and also for touch screens:*/
      glass.addEventListener("touchmove", moveMagnifier);
      img.addEventListener("touchmove", moveMagnifier);
      function moveMagnifier(e) {
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;

        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > img.width - (w / zoom)) {
          // x = img.width - (w / zoom);
          glass.style.display = 'none'
        }
        else if (x < w / zoom) {
          // x = w / zoom;
          glass.style.display = 'none'
        }
        else if (y > img.height - (h / zoom)) {
          // y = img.height - (h / zoom);
          glass.style.display = 'none'
        }
        else if (y < h / zoom) {
          // y = h / zoom;
          glass.style.display = 'none'
        }
        else {
          /* Set the position of the magnifier glass: */
          glass.style.display = 'block'
          glass.style.left = (x - w) + "px";
          glass.style.top = (y - h) + "px";
          /* Display what the magnifier glass "sees": */
          glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
        }
      }

      function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
      }
    }
  },
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


// image magnifier (ref: https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp)
.img-magnifier-container {
  position: relative;
}
// See styles.css for .img-magnifier-glass


.image-lightbox {
  &__modal {
    position: fixed;
    display: block;
    z-index: 1001;
    // top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 203px);  // 203px is the height of the banner
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
    z-index: 1002;
    display: block;
    width: 100%;
    top: 0;
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
      height: calc(100vh - 203px - 20px);  // 203px is the height of the banner
      padding: 3.5vh 0;
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
    margin: 14px;
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
      z-index: 1003;
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
  .image-lightbox{
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
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .image-lightbox{
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
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) { 
  .image-lightbox{
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
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {  
  .image-lightbox{
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