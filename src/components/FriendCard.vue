<template>

  <b-container id="outerContainer" class="" :style="outerContainerDims">   

    <b-row no-gutters class="innerContainerRow">

      <b-col :order="imgOrder" :cols="imgCols" class="thumbnailImgCol" :style="imgContainerDims">
        <g-image :src="friend.thumbnailImg" class="thumbnailImg" :style="imgDims" />
      </b-col>
      
      <b-col order="1" :cols="imgCols" class="px-3 pt-2 mb-0 textCol" :style="textColDims">
        <h3 class="textTitle mb-0 mt-1"> {{ friend.name }} </h3>
        <p class="text mb-2"> {{ friend.text }} </p>
        <div class="seeMoreBtnContainer">
          <button class="seeMoreBtn mt-0 mb-3">...see more</button>
        </div>
      </b-col>

    </b-row>

  </b-container>
</template>


<script scoped>
export default { 
  name: 'FriendCard',

  props: {
    friend: {
      type: Object,
    },
    imgContainerWidth: {
      default: 0,
      type: Number
    },
    imgContainerHeight: {
      default: 0,
      type: Number
    },
    imgWidth: {
      default: 0,
      type: Number
    },
    imgHeight: {
      default: 0,
      type: Number
    },
    imgScaleToContainerWidth: {
      default: false,
      type: Boolean
    },
    imgMoveLeftPercent: {
      default: 0,
      type: Number
    },
    imgMoveDownPercent: {
      default: 0,
      type: Number
    },
    width: {
      default: 0,
      type: Number
    },
    height: {
      default: 0,
      type: Number
    }
  },

  data() {
    return {
    }
  },

  computed: {
    outerContainerDims() {
      let css = {}
      if (this.friend.imgPosition == 'top' || this.friend.imgPosition == 'bottom') {
        if (this.imgContainerWidth > 0) {
          css.width = this.imgContainerWidth + 'px'
        }
      }
      else {
        if (this.imgContainerHeight > 0) {
          css.height = this.imgContainerHeight + 'px'
        }
      }
      return css
    },
    imgContainerDims() {
      let css = {}
      if (this.imgContainerWidth > 0)
        css.width = this.imgContainerWidth + 'px'
      if (this.imgContainerHeight > 0)
        css.height = this.imgContainerHeight + 'px'
      if (this.imgPosition == 'top' || this.imgPosition == 'bottom')
        css.overflow = 'hidden'
      return css
    },
    imgDims() {
      let css = {}
      if (this.imgWidth > 0)
        css.width = this.imgWidth + 'px'
      if (this.imgScaleToContainerWidth)
        css.width = '100%'
      if (this.imgHeight > 0)
        css.height = this.imgHeight + 'px'
      if (this.imgMoveLeftPercent !== 0)
        css.right = this.imgMoveLeftPercent + '%'
      if (this.imgMoveDownPercent !== 0)
        css.top = this.imgMoveDownPercent + '%'      
      return css
    },
    imgOrder() {
      return (this.friend.imgPosition == 'top' || this.friend.imgPosition == 'left') ? 0 : 2
    },
    imgPosition() {
      return this.friend.imgPosition
    },
    imgCols() {
      return (this.friend.imgPosition == 'top' || this.friend.imgPosition == 'bottom') ? "12" : ""
    },
    textCols() {
      return (this.friend.imgPosition == 'top' || this.friend.imgPosition == 'bottom') ? "12" : "6"
    },
    textColDims() {
      let css = {}
      if (this.width > 0 && this.imgContainerWidth > 0) {        
        css.width = (this.width - this.imgContainerWidth) + 'px'
      }
      if (this.imgPosition == 'top' || this.imgPosition == 'bottom') {
        if (this.height > 0 && this.imgContainerHeight > 0) {        
          css.height = (this.height - this.imgContainerHeight) + 'px'
        }
      }
      else {
        if (this.height > 0) {        
          css.height = (this.height - 8) + 'px'
        }
      }
      return css
    }
  },

  methods: {
  },

  mounted() {
  },

  components: {
  },
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lora:400,400i,700&display=swap');

#outerContainer {
  background-color: white;
  padding: 0;
  border-radius: 9px;
  max-width: 100%;
  position: relative;
}

.innerContainerRow {
  border-radius: 9px;
  overflow: hidden;  
}

.textCol {
  background-color: white;
  padding-bottom: 38px;  /* for the see more button */
}

.textTitle {
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 3px;
  line-height: 24px;
  text-align: left;
  text-transform: uppercase;
  color: black;
}

.text {
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 17px;
  letter-spacing: 1px;
  line-height: 21px;
  text-align: justify;
  color: black;
}

.seeMoreBtnContainer {
  position: absolute;
  bottom: 0;
}

.seeMoreBtn {
  width: 182px;
  height: 38px;
  background-color: #333333;
  padding: 0px;
  border-color: transparent;
  border-radius: 9px;
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 17px;
  font-style: italic;
  letter-spacing: 1px;
  text-align: center;
  text-rendering: auto;
  color: white;
  opacity: 1;
}

.seeMoreBtn:hover {
  opacity: 0.75;
}

.thumbnailImgCol {
  overflow: unset;
 }

.thumbnailImg {
  position: relative;
  transition: 0.5s ease;
}

.thumbnailImg:hover {
  transform: scale(1.05, 1.05);
}

</style>
