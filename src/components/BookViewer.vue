<template>
  <ClientOnly>
    <Flipbook 
      class="flipbook" 
      :pages="pages"
      :pagesHiRes="pagesHiRes"
      :startPage="startPage"
      :flipDuration="flipDuration"
      v-slot="flipbook"
      ref="flipbook"
      @flip-left-start="onFlipLeftStart()"
      @flip-left-end="onFlipLeftEnd()"
      @flip-right-start="onFlipRightStart()"
      @flip-right-end="onFlipRightEnd()"
      @zoom-start="onZoomStart()"
      @zoom-end="onZoomEnd()"
    >
      <div class="action-bar">
        <FirstPageIcon
          class="btn left"
          :class="{ disabled: !flipbook.canFlipLeft }"
          @click="flipToPage(1)"
          v-b-tooltip.hover="{ variant: 'secondary' }" 
          title="First page"
          id="firstpage_icon"
        />
        <LeftIcon
          class="btn left"
          :class="{ disabled: !flipbook.canFlipLeft }"
          @click="flipbook.flipLeft"
          v-b-tooltip.hover="{ variant: 'secondary' }" 
          title="Previous page"
          id="left_icon"
        />
        <MinusIcon
          class="btn minus"
          :class="{ disabled: !flipbook.canZoomOut }"
          @click="flipbook.zoomOut"
          v-b-tooltip.hover="{ variant: 'secondary' }" 
          title="Zoom out"
          id="minus_icon"
        />
        <span class="page-num">
          Page {{ flipbook.page }} of {{ flipbook.numPages }}
        </span>
        <PlusIcon
          class="btn plus"
          :class="{ disabled: !flipbook.canZoomIn }"
          @click="flipbook.zoomIn"
          v-b-tooltip.hover="{ variant: 'secondary' }" 
          title="Zoom in"
          id="plus_icon"
        />
        <RightIcon
          class="btn right"
          :class="{ disabled: !flipbook.canFlipRight }"
          @click="flipbook.flipRight"
          v-b-tooltip.hover="{ variant: 'secondary' }" 
          title="Next page"
          id="right_icon"
        />
        <LastPageIcon
          class="btn right"
          :class="{ disabled: !flipbook.canFlipRight }"
          @click="flipToPage(pages.length)"
          v-b-tooltip.hover="{ variant: 'secondary' }" 
          title="Last page"
          id="lastpage_icon"
        />
      </div>
    </Flipbook>
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

export default { 
  name: 'BookViewer',

  components: {
    Flipbook: () => import("flipbook-vue"),
    FirstPageIcon, LeftIcon, RightIcon, LastPageIcon, PlusIcon, MinusIcon
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
    }
  },

  data() {
    return {     
      hasMouse: true,
      pageNum: null,
      flipDuration: 1000
    }
  },

  methods: {
    flipToPage(page) { // not index mode
      if (page > this.$refs.flipbook.numPages) {
        console.error("Page out of range")
      }

      page = page - 1 // make the page indexed by 0

      let method = page > this.$refs.flipbook.currentPage ? 'Right' : 'Left' // Direction to go
      let flips = Math.abs(page - this.$refs.flipbook.currentPage) // number of flips to do

      if (!this.$refs.flipbook.singlePage) {
        // If is not in single page mode, the flips are divided by 2 cause in each flip show 2 pages
        flips = Math.floor(flips / 2)
      }

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
            if (flips == 0) {
              clearInterval(interval)
              this.flipDuration = 1000
            }
          }
        }, 100);
      }
    },
    onFlipLeftStart(page) {
      console.log('flip-left-start', page)
    },
    onFlipLeftEnd(page) {
      console.log('flip-left-end', page)
      window.location.hash = '#' + page
    },
    onFlipRightStart(page) {
      console.log('flip-right-start', page)
    },
    onFlipRightEnd(page) {
      console.log('flip-right-end', page)
      window.location.hash = '#' + page
    },
    onZoomStart(zoom) {
      console.log('zoom-start', zoom)
    },
    onZoomEnd(zoom) {
      console.log('zoom-end', zoom)
    },
    setPageFromHash() {
      n = parseInt(window.location.hash.slice(1), 10)
      if (isFinite(n))
        this.pageNum = n
    }
  }
}
</script>



<style scoped lang="scss">
.flipbook {
  width: 100%;
  height: 60vh;
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
}

.action-bar .btn svg {
  bottom: 0;
}

.action-bar .btn:not(:first-child) {
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
  margin-left: 40px;
}

// .flipbook .viewport {
//   width: 90vw;
//   height: calc(100vh - 50px - 40px);
// }

.flipbook .bounding-box {
  box-shadow: 0 0 20px #000;
}
</style>
