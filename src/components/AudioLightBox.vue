<template>
  <transition name="fade">
    <div
      v-if="typeof index === 'number'"
      class="audio-lightbox"
      @touchstart="touchstartHandler"
      @touchmove="touchmoveHandler"
      @touchend="touchendHandler"
    >
      <div
        class="audio-lightbox__modal"
        :style="`background: ${background}`"
      >
        <div
          :class="['audio-lightbox__spinner', !isAudioLoaded || 'hide']"
        >
          <div
            class="audio-lightbox__dot"
            :style="`border-color: ${interfaceColor}`"
          />
          <div
            class="audio-lightbox__dot"
            :style="`border-color: ${interfaceColor}`"
          />
          <div
            class="audio-lightbox__dot"
            :style="`border-color: ${interfaceColor}`"
          />
        </div>

        <div class="audio-lightbox__container">
          <ul class="audio-lightbox__content">
            <li
              v-for="(audio, audioIndex) in formattedAudios"
              :key="audioIndex"
              :style="`transform: translate3d(${currentIndex * -100}%, 0px, 0px);`"
              class="audio-lightbox__audio-container"
            >
              <div class="audio-lightbox__audio" :style="audioContainerCss">

                <div style="width:100%;height:100%;position:relative;">                  
                  <iframe 
                    width="100%" 
                    height="300" 
                    scrolling="no" 
                    frameborder="no" 
                    allow="autoplay"
                    :ref="`lg-audio-${audioIndex}`"
                    @load="audioLoaded($event, audioIndex)" 
                    class="audioFrame"
                    :id="'audio_' + audioIndex" 
                    :src="audios[audioIndex].url" >
                  </iframe>
                </div>

                <div
                  v-if="showCaption && (audio.caption || audio.title) && isAudioLoaded"
                  class="audio-lightbox__text"
                  :style="audioTitleCss"
                >
                  {{ audio.caption || audio.title }}
                </div>

              </div>
            </li>
          </ul>
        </div>

        <div id="leftArrowContainer" v-if="currentIndex > 0" @click="prev()">
          <g-image 
            alt="Left arrow, click for previous audio" 
            src="~/assets/images/arrow-left.png" 
            id="prevAudioImg"
            class="audio-lightbox__prev arrowImg" 
          />
          <g-image 
            alt="Left arrow, click for previous audio" 
            src="~/assets/images/arrow-left-hover.png" 
            id="prevAudioImg-hover"
            class="audio-lightbox__prev arrowImg" 
          />
        </div>

        <div id="rightArrowContainer" v-if="currentIndex + 1 < audios.length" @click="next()">
          <g-image 
            alt="Right arrow, click for next audio" 
            src="~/assets/images/arrow-right.png" 
            id="nextAudioImg"
            class="audio-lightbox__next arrowImg"
          />
          <g-image 
            alt="Right arrow, click for next audio" 
            src="~/assets/images/arrow-right-hover.png" 
            id="nextAudioImg-hover"
            class="audio-lightbox__next arrowImg" 
          />
        </div>

        <div id="closeImgContainer" @click="close()">
          <g-image 
            alt="Right arrow, click for next audio" 
            src="~/assets/images/lightbox-close.png" 
            id="closeImg"
            class="audio-lightbox__close" 
          />
          <g-image 
            alt="Right arrow, click for next audio" 
            src="~/assets/images/lightbox-close-hover.png" 
            id="closeImg-hover"
            class="audio-lightbox__close" 
          />
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
import { EventBus } from '../event-bus'

const keyMap = {
  LEFT: 37,
  RIGHT: 39,
  ESC: 27,
};
export default {
  props: {
    audios: {
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
    showCaption: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentIndex: this.index,
      isAudioLoaded: false,
      bodyOverflowStyle: '',
      touch: {
        count: 0,
        x: 0,
        y: 0,
        multitouch: false,
        flag: false,
      },
      windowWidth: 0,
      windowHeight: 0
    };
  },
  computed: {
    formattedAudios() {
      return this.audios.map(audio => (typeof audio === 'string'
        ? { url: audio } : audio
      ));
    },
    audioContainerCss() {
      let css = {}
      css.width = ((0.8 * this.windowWidth) - 80) + 'px'
      css.height = '300px'
      return css
    },
    audioTitleCss() {
      let css = {}
      let containerHeight = 300  
      css.padding = 0
      css.top = (containerHeight + 40) + 'px'
      css.left = '0px'
      css.textAlign = 'left'
      return css
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
      this.setAudioLoaded(val);
    },
  },
  mounted() {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight

    this.$nextTick(() => {
      window.addEventListener('resize', () => {        
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight 
      });
    })

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
    close() {
      this.$emit('close');
    },
    prev() {
      if (this.currentIndex === 0) return;
      // this.pauseAudio(this.currentIndex)
      this.currentIndex -= 1;
      this.$emit('slide', { index: this.currentIndex });
    },
    next() {
      if (this.currentIndex === this.audios.length - 1) return;
      // this.pauseAudio(this.currentIndex)
      this.currentIndex += 1
      this.$emit('slide', { index: this.currentIndex });
    },
    // pauseAudio (index) {
    //   var iframe = document.getElementById('audio_' + index)
    //   var player = new Player(iframe)
    //   player.pause();
    // },
    stopAudio (index) {
      var iframe = document.getElementById('audio_' + index)
      if ( iframe ) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
      }
    },
    audioLoaded($event, audioIndex) {
      EventBus.$emit('lightboxMediaLoaded');    // used to mute page background music   
      const { target } = $event;
      target.classList.add('loaded');
      if (audioIndex === this.currentIndex) {
        this.setAudioLoaded(audioIndex);
      }
    },
    getAudioElByIndex(index) {
      const elements = this.$refs[`lg-audio-${index}`] || [];
      return elements[0];
    },
    setAudioLoaded(index) {
      console.log('in setAudioLoaded, index = ' + index);
      const el = this.getAudioElByIndex(index);
      this.isAudioLoaded = !el ? false : el.classList.contains('loaded');
    },
    shouldPreload(index) {
      const el = this.getAudioElByIndex(index) || {};
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
        case keyMap.ESC:
          this.close();
          break;
        default:
          break;
      }
    },
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

.audio-lightbox {
  &__modal {
    position: fixed;
    display: block;
    z-index: 1001;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  &__audio-container {
    display: inline-table;
    vertical-align: middle;
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: left .4s ease, transform .4s ease, -webkit-transform .4s ease;
  }
  &__audio {
    & {
      display: inline-block;
      position: relative;
      margin: 0 auto;
      max-width: 100%;
      max-height: 100vh;
    }
    & .audioFrame {
      & {
        max-width: 100%;
        max-height: 100vh;
        opacity: 0;
        transition: opacity .2s;
      }
      &.loaded{
        opacity: 1;
      }
    }
  }
  &__text {
    position: absolute;
    z-index: 1000;
    display: block;
    margin: 0 auto;
    box-sizing: border-box;

    color: #FFFFFF;    
    font-family: 'NeueHaasGroteskText Pro55', sans-serif;
    font-feature-settings: 'liga';
    font-size: 1.3125rem; /* 21px with 16px default size */
    font-weight: 400;
    letter-spacing: 5px;
    text-transform: uppercase;
    text-rendering: auto;
    // transition: all  .5s ease .0s;
    line-height: 1.3125rem; /* 21px with 16px default size */
    white-space: normal;
    // see audioTitleCss() in computed for further properties
  }
  &__next,
  &__prev,
  &__close {
    position: absolute;
    z-index: 1002;
    display: block;
    background: transparent;
    border: 0;
    line-height: 0;
    outline: none;
    cursor: pointer;
  }
  &__next {
    top: 50%;
    transform: translate(0, -50%);
    right: 8.5%;
    vertical-align: middle;
  }
  &__prev {
    top: 50%;
    transform: translate(0, -50%);
    left: 8.5%;
  }
  &__close {
    top: 40px;
    right: 60px;
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
// transition fade on opening / closing of lightbox
.fade-enter-active, .fade-leave-active {
  position: fixed;
  z-index: 1000;
  // transition: opacity 0.2s;
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  position: fixed;
  opacity: 0;
  z-index: 1000;
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
}
#prevAudioImg-hover, 
#leftArrowContainer:hover #prevAudioImg {
  display: none;
}
#leftArrowContainer:hover #prevAudioImg-hover {
  display: inline;
}

#nextAudioImg-hover, 
#rightArrowContainer:hover #nextAudioImg {
  display: none;
}
#rightArrowContainer:hover #nextAudioImg-hover {
  display: inline;
}

#closeImg, #closeImg-hover {
  width: 7.0%;
  max-width: 38px;
  min-width: 15px;
  padding: 0;
}
#closeImgContainer #closeImg-hover {
  display: none;
}
#closeImgContainer:hover #closeImg-hover {
  display: inline;
}
#closeImgContainer:hover #closeImg {
  display: none;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .audio-lightbox{
    &__text {
      font-size: 0.8125rem; /* 13px with 16px default size */
    }
    &__next {
      right: 1.5%;
    }
    &__prev {
      left: 1.5%;
    }
    &__close {
      top: 10px;
      right: 20px;
    }
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .audio-lightbox{
    &__text {
      font-size: 0.9375rem; /* 15px with 16px default size */
    }
    &__next {
      right: 3.0%;
    }
    &__prev {
      left: 3.0%;
    }
    &__close {
      top: 20px;
      right: 30px;
    }
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) { 
  .audio-lightbox{
    &__text {
      font-size: 1.0625rem; /* 17px with 16px default size */
    }
    &__next {
      right: 4.5%;
    }
    &__prev {
      left: 4.5%;
    }
    &__close {
      top: 30px;
      right: 40px;
    }
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {  
  .audio-lightbox{
    &__text {
      font-size: 1.1875rem; /* 19px with 16px default size */
    }
    &__next {
      right: 6.5%;
    }
    &__prev {
      left: 6.5%;
    }
    &__close {
      top: 40px;
      right: 50px;
    }
  }
}
</style>