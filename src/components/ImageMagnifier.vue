<template>
  <div class="image-magnifier" 
    @mouseenter="handleOver"
    @mousemove="handleMove"
    @mouseleave="handleOut"
    :style="magnifierStyle"
  >
    <span class="helper" /> <!-- For centering the img vertically in the div, https://stackoverflow.com/a/7310398/13159696 -->

    <img
      :src="src"
      class="image-magnifier__img"
      ref="img"
      id="img"
      @load="emitImageLoaded()"
    />

    <div 
      v-if="windowWidth > 1366"
      class="image-magnifier__zoom" 
      :class="zoomClass" 
      :style="zoomStyle" 
      ref="zoom" 
      v-show="zoomShow" 
    >
      <img 
        class="image-magnifier__zoomImg" 
        :src="zoomSrc" 
        :style="zoomImgStyle" 
      />
    </div>
    
  </div>
</template>


<script>
  export default {
    // Code adapted from: https://github.com/anthinkingcoder/vue-image-magnifier/blob/master/src/components/ImageMagnifier.vue
    name: "ImageMagnifier",

    props: {
      src: {},
      zoomSrc: {},
      zoom: {
        type: Number,
        default: 6
      },
      zoomDiameter: {
        type: Number,
        default: 500
      },
      zoomRadius: {
        default: '0%'
      },
      zoomClass: {},
      delayIn: {
        type: Number,
        default: 0
      },
      delayOut: {
        type: Number,
        default: 0
      },
      showCursor: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        zoomShow: false,
        imgRect: '',        
        zoomX: 0,
        zoomY: 0,
        zoomImage: '',
        zoomImgWidth: 0,
        zoomImgHeight: 0,
        zoomPosition: {
          x: 0,
          y: 0
        },
        zoomInTimeoutId: null,
        zoomOutTimeoutId: null,
        windowWidth: 0.0
      }
    },

    computed: {
      magnifierStyle() {
        return {
          position: 'relative',
          cursor: this.showCursor ? 'move' : 'none',
        }
      },
      zoomStyle() {
        return {
          '--zoomDiameter' : this.zoomDiameter + 'px',
          '--zoomDiameter' : this.zoomDiameter + 'px',
          '--zoomX' : this.zoomX + 'px',
          '--zoomY' : this.zoomY + 'px',
          '--zoomRadius' : this.zoomRadius
        }
      },
      zoomImgStyle() {
        return {
          '--zoomImgWidth' : this.zoomImgWidth + 'px',
          '--zoomImgHeight' : this.zoomImgHeight + 'px',
          '--zoomPositionX' : -this.zoomPosition.x + 'px',
          '--zoomPositionY' : -this.zoomPosition.y + 'px'
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
    },
    
    methods: {
      emitImageLoaded() {
        const img_element = document.getElementById('img')
        this.$emit('imgloaded', img_element)
      },
      handleOver() {
        clearTimeout(this.zoomOutTimeoutId);
        this.calcZoomSize();
        if (this.delayIn === 0) {
          this.zoomShow = true;
        } else {
          this.zoomInTimeoutId = setTimeout(() => {
            this.zoomShow = true;
          }, this.delayIn)
        }
      },
      
      calcZoomSize() {
        this.imgRect = this.$refs.img && this.$refs.img.getBoundingClientRect();

        // Calculate large image width and height
        if (this.imgRect && this.zoom) {
          this.zoomImgWidth = this.zoom * this.imgRect.width;
          this.zoomImgHeight = this.zoom * this.imgRect.height;
        }
      },
      
      handleMove(e) {
        if (!this.imgRect) {
          return;
        }
        this.zoomX = (e.clientX - this.imgRect.left) - (this.zoomDiameter / 2);
        this.zoomY = (e.clientY - this.imgRect.top) - (this.zoomDiameter / 2);
        
        // Calculate large image offset
        this.zoomPosition.x = this.zoomX * (this.zoomImgWidth / this.imgRect.width) + this.zoomDiameter / 2
        this.zoomPosition.y = this.zoomY * (this.zoomImgHeight / this.imgRect.height) + this.zoomDiameter / 2
      },
      
      handleOut() {
        clearTimeout(this.zoomInTimeoutId);
        if (this.delayOut === 0) {
          this.zoomShow = false;
        } else {
          this.zoomOutTimeoutId = setTimeout(() => {
            this.zoomShow = false;
          }, this.delayOut);
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
.helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.image-magnifier {
  width: fit-content;
  max-width: 90%;

  &__img {
    width: auto;
    height: auto;		
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; 
    vertical-align: middle;
    padding: 0px;
  }

  &__zoom {
    width: var(--zoomDiameter);
    height: var(--zoomDiameter);
    position: absolute;
    left: var(--zoomX);
    top: var(--zoomY);
    overflow: hidden;
    z-index: 2000;
    border: 1px solid #000;
    border-radius: var(--zoomRadius);
    background-color: #000;
    pointer-events: none;
  }

  &__zoomImg {
    width: var(--zoomImgWidth);
    height: var(--zoomImgHeight);
    will-change: transform;
    transform: translate(var(--zoomPositionX), var(--zoomPositionY));
    pointer-events: none;
  }
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .image-magnifier {
    max-width: 85%;
  }
}
</style>