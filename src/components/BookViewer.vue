<template>
  <ClientOnly>
    <transition name="fade" mode="out-in">
      <div id="flipbookContainer" :class="{ fullscreenContainer : isFullscreen }">
        <Flipbook 
          class="flipbook"
          :class="{ fullscreen : isFullscreen }"
          :style="{ width: viewportWidth, height: viewportHeight }"
          :pages="pages"
          :pagesHiRes="pagesHiRes"
          :startPage="pageNum"
          :flipDuration="flipDuration"
          v-slot="flipbook"
          ref="flipbook"
          @flip-left-end="onFlipLeftEnd"
          @flip-right-end="onFlipRightEnd"
        >
          <div class="action-bar">

            <div v-if="!flippingToStart" id="firstpage_icon_wrapper">
              <FirstPageIcon                
                class="btn"
                :class="{ disabled: !flipbook.canFlipLeft }"
                @click="flipToStart()"
                id="firstpage_icon"
              />
              <b-tooltip v-if="flipbook.canFlipLeft" target="firstpage_icon_wrapper" triggers="hover" variant="secondary">First page</b-tooltip>
            </div>

            <div v-if="flippingToStart" id="stop_icon_start_wrapper">
              <StopIcon
                class="btn"
                @click="stopFlip = true"
                id="stop_icon_start"
              />
              <b-tooltip target="stop_icon_start_wrapper" triggers="hover" variant="secondary">Stop</b-tooltip>
            </div>

            <div id="left_icon_wrapper" class="btn_wrapper">
              <LeftIcon
                class="btn"
                :class="{ disabled: !flipbook.canFlipLeft }"
                @click="flipbook.flipLeft"
                id="left_icon"
              />
              <b-tooltip v-if="flipbook.canFlipLeft" target="left_icon_wrapper" triggers="hover" variant="secondary">Previous page</b-tooltip>
            </div>

            <div id="minus_icon_wrapper" class="btn_wrapper">
              <MinusIcon
                class="btn"
                :class="{ disabled: !flipbook.canZoomOut }"
                @click="flipbook.zoomOut"
                id="minus_icon"
              />
              <b-tooltip v-if="flipbook.canZoomOut" target="minus_icon_wrapper" triggers="hover" variant="secondary">Zoom out</b-tooltip>
            </div>

            <span class="page-num">
              Page {{ flipbook.page }} of {{ flipbook.numPages }}
            </span>

            <div id="plus_icon_wrapper" class="btn_wrapper">
              <PlusIcon
                class="btn"
                :class="{ disabled: !flipbook.canZoomIn }"
                @click="flipbook.zoomIn"
                id="plus_icon"
              />
              <b-tooltip v-if="flipbook.canZoomIn" target="plus_icon_wrapper" triggers="hover" variant="secondary">Zoom in</b-tooltip>
            </div>

            <div id="right_icon_wrapper" class="btn_wrapper">
              <RightIcon
                class="btn"
                :class="{ disabled: !flipbook.canFlipRight }"
                @click="flipbook.flipRight"
                id="right_icon"
              />
              <b-tooltip v-if="flipbook.canFlipRight" target="right_icon_wrapper" triggers="hover" variant="secondary">Next page</b-tooltip> 
            </div>
            
            <div v-if="!flippingToEnd" id="lastpage_icon_wrapper" class="btn_wrapper">
              <LastPageIcon
                class="btn"
                :class="{ disabled: !flipbook.canFlipRight }"
                @click="flipToEnd()"
                id="lastpage_icon"
              />
              <b-tooltip v-if="flipbook.canFlipRight" target="lastpage_icon_wrapper" triggers="hover" variant="secondary">Last page</b-tooltip> 
            </div>

            <div v-if="flippingToEnd" id="stop_icon_end_wrapper" class="btn_wrapper">
              <StopIcon
                class="btn"
                @click="stopFlip = true"
                id="stop_icon_end"
              />
              <b-tooltip target="stop_icon_end_wrapper" triggers="hover" variant="secondary">Stop</b-tooltip> 
            </div>

            <FullscreenIcon
              v-if="!isFullscreen"
              class="btn"
              @click="toggleFullscreen"
              id="fullscreen_icon"
            />
            <b-tooltip v-if="!isFullscreen" target="fullscreen_icon" triggers="hover" variant="secondary">Fullscreen</b-tooltip> 

            <FullscreenExitIcon
              v-if="isFullscreen"
              class="btn"
              @click="toggleFullscreen"
              id="fullscreenExit_icon"
            />
            <b-tooltip v-if="isFullscreen" target="fullscreenExit_icon" triggers="hover" variant="secondary">Exit fullscreen</b-tooltip> 

          </div>
        </Flipbook>
      </div>
    </transition>
  </ClientOnly>
</template>


<script scoped>
import 'vue-material-design-icons/styles.css'
import FirstPageIcon from 'vue-material-design-icons/PageFirst'
import LeftIcon from 'vue-material-design-icons/ChevronLeft'
import RightIcon from 'vue-material-design-icons/ChevronRight'
import LastPageIcon from 'vue-material-design-icons/PageLast'
import PlusIcon from 'vue-material-design-icons/Plus'
import MinusIcon from 'vue-material-design-icons/Minus'
import FullscreenIcon from 'vue-material-design-icons/Fullscreen'
import FullscreenExitIcon from 'vue-material-design-icons/FullscreenExit'
import StopIcon from 'vue-material-design-icons/Pause'

export default { 
  name: 'BookViewer',

  components: {
    Flipbook: () => import("flipbook-vue"),
    FirstPageIcon, LeftIcon, RightIcon, LastPageIcon, PlusIcon, MinusIcon, FullscreenIcon, FullscreenExitIcon, StopIcon
  },

  props: {
    pages: {
      type: Array,
      required: true
    },
    pagesHiRes: {
      type: Array,
      required: false,
    },
    startPage: {
      type: Number,
      required: false
    },
    isFullscreen: {
      type: Boolean,
      required: false
    },
    viewportWidth: {
      type: String,
      required: false,
      default: '100%'
    },
    viewportHeight: {
      type: String,
      required: false,
      default: '100vh'
    }
  },

  data() {
    return {     
      hasMouse: true,
      pageNum: null,
      flipDuration: 1000,
      flippingToStart: false,
      flippingToEnd: false,
      stopFlip: false
    }
  },

  mounted() {
    if (this.startPage != null) {
      this.pageNum = this.startPage
    }
    else {
      this.setPageFromHash()
    }
    
    window.addEventListener('hashchange', () => this.setPageFromHash())

    window.addEventListener('resize', () => this.reload())
  },

  methods: {
    numFlips(toPage) {
      let flips = Math.abs(toPage - this.$refs.flipbook.currentPage) // number of flips to do

      if (this.$refs.flipbook.displayedPages == 2) {
        // Is in double page mode, therefore divide flips by 2 because in each flip 2 pages are shown
        if (toPage < this.$refs.flipbook.currentPage)
          flips = Math.ceil(flips / 2)
        else
          flips = Math.floor(flips / 2)
      }
      return flips
    },
    flipToPage(toPage) { // not index mode
      if (toPage > this.$refs.flipbook.numPages) {
        console.error("Page out of range")
      }

      let pgIndex = toPage - 1 // get the page indexed by 0
      let method = pgIndex > this.$refs.flipbook.currentPage ? 'Right' : 'Left' // Direction to go

      let flips = this.numFlips(toPage)

      if (flips == 0) {
        // If flips is equal to 0 it means the page is already visible
        return;
      }

      if (flips > 1) { 
        // If the target page is not the next or the previous one, make the flip faster
        this.flipDuration = 300
      }

      this.$refs.flipbook[`flip${method}`](); // make the first flip
      flips-- //subtract one flip

      if (flips > 0) {
        let interval = setInterval(() => {
          if (this.$refs.flipbook[`canFlip${method}`]) {
            this.$refs.flipbook[`flip${method}`]();
            flips--;
            if (flips == 0 || this.stopFlip) {
              clearInterval(interval)
              this.flipDuration = 1000
              this.flippingToStart = false
              this.flippingToEnd = false
              this.stopFlip = false
            }
          }
        }, 100);
      }
    },
    onFlipLeftEnd(page) {
      window.location.hash = '#' + page
    },
    onFlipRightEnd(page) {
      window.location.hash = '#' + page
    },
    setPageFromHash() {
      let n = parseInt(window.location.hash.slice(1), 10)
      if (Number.isInteger(n) && (n > 0) && (n < this.pages.length) )
        this.pageNum = n
    },
    flipToStart() {
      const toPage = 1
      let flips = this.numFlips(toPage) // number of flips to do

      if (flips > 1) {
        this.flippingToStart = true
        this.flipToPage(toPage)
      }
      else
        this.$refs.flipbook.flipLeft()
    },
    flipToEnd() {
      let flips = this.numFlips(this.$refs.flipbook.numPages) // number of flips to do

      if (flips > 1) {
        this.flippingToEnd = true
        this.flipToPage(this.$refs.flipbook.numPages)
      }
      else
        this.$refs.flipbook.flipRight()
    },
    toggleFullscreen() {
      this.$emit('toggleFullscreen')
    },
    reload() {
      this.$emit('reload')
    }
  }
}
</script>



<style scoped lang="scss">

.fullscreenContainer {
  position: fixed;
  display: block;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
}
.fullscreen {  
  width: 90vw !important;
  height: calc(100vh - 40px - 50px) !important;  
  padding-top: 40px;
  padding-bottom: 50px;
  margin: 0 auto;
  z-index: 2000;
}
.fullscreen .container {
  max-width: 100%;
}

.action-bar {
  width: 100%;
  height: 30px;
  padding: 10px 0;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-bar .btn {
  font-size: 30px;
  color: #999;
  padding: 0;
}

.action-bar .btn svg {
  bottom: 0;
}

.action-bar .btn:not(:first-child), .btn_wrapper {
  margin-left: 10px;
}

.has-mouse .action-bar .btn:hover {
  color: #ccc;
  filter: drop-shadow(1px 1px 5px #000);
  cursor: pointer;
}

.action-bar .btn:active {
  filter: none !important;
}

.action-bar .btn.disabled {
  color: #666;
  pointer-events: none;
}

.action-bar .page-num {
  color: white;
  font-size: 1rem;
  margin-left: 30px;
  margin-right: 20px;
}

.flipbook .bounding-box {
  box-shadow: 0 0 20px #000;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave {
  opacity: 1;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease-in;
}
</style>
