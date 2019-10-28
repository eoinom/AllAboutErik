<template>

  <b-container id="outerContainer" class="" :style="outerContainerDims">   

    <b-row no-gutters class="innerContainerRow">

      <b-col :order="imgOrder" :cols="imgCols" class="thumbnailImgCol" :style="imgContainerDims" :id="'thumbnailImgCol' + this.index" >
        <g-image :src="friend.thumbnailImg" class="thumbnailImg" :style="imgDims" :id="'friendImg' + this.index" />
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
    index: {
      type: Number,
    },
    imgPosition: {
      default: 'top',
      type: String
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
    imgScaleToContainerHeight: {
      default: false,
      type: Boolean
    },
    imgScaleToFillContainer: {
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
    imgCenterHoriz: {
      default: false,
      type: Boolean
    },
    imgCenterVert: {
      default: false,
      type: Boolean
    },
    imgCenterCenter: {
      default: false,
      type: Boolean
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
      friendImgWidth: 0.0,
      friendImgHeight: 0.0,
      thumbnailImgColWidth: 0.0,
      thumbnailImgColHeight: 0.0,
    }
  },

  computed: {
    outerContainerDims() {
      let css = {}
      if (this.imgPosition == 'top' || this.imgPosition == 'bottom') {
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
    imgAspectRatio() {
      return this.friendImgWidth / this.friendImgHeight
    },
    imgContainerAspectRatio() {
      return this.thumbnailImgColWidth / this.thumbnailImgColHeight
    },
    imgContainerDims() {
      let css = {}
      if (this.imgContainerWidth > 0) {
        css.width = this.imgContainerWidth + 'px'
      }
      if (this.imgContainerHeight > 0)
        css.height = this.imgContainerHeight + 'px'
      if (this.imgPosition == 'top' || this.imgPosition == 'bottom')
        css.overflow = 'hidden'
      return css
    },
    imgDims() {
      let css = {}
      if (this.imgCenterHoriz) {
        css.left = '50%'
        let translateX = -50 - this.imgMoveLeftPercent
        css.transform = 'translate(' + translateX + '%, 0%)'
      }
      if (this.imgCenterVert) {
        css.top = '50%'
        let translateY = -50 + this.imgMoveDownPercent
        css.transform = 'translate(0%, ' + translateY + '%)'
      }
      if (this.imgCenterCenter) {
        css.left = '50%'
        css.top = '50%'
        let translateX = -50 - this.imgMoveLeftPercent
        let translateY = -50 + this.imgMoveDownPercent
        css.transform = 'translate(' + translateX + '%, ' + translateY + '%)'
      }
      if (this.imgWidth > 0)
        css.width = this.imgWidth + 'px'
      if (this.imgScaleToContainerWidth)
        css.width = '100%'
      if (this.imgScaleToContainerHeight)
        css.height = '100%'
      if (this.imgScaleToFillContainer) {
        console.log('this.imgAspectRatio:' + this.imgAspectRatio);
        console.log('this.imgContainerAspectRatio:' + this.imgContainerAspectRatio);
        if (this.imgAspectRatio < this.imgContainerAspectRatio) {
          css.width = '100%'
          console.log('css:');
          console.log(css);
        }else {
          css.height = '100%'
          console.log('css:');
          console.log(css);
        }
      }
      if (this.imgHeight > 0)
        css.height = this.imgHeight + 'px'
      if (this.imgMoveLeftPercent !== 0)
        css.right = this.imgMoveLeftPercent + '%'
      if (this.imgMoveDownPercent !== 0)
        css.top = this.imgMoveDownPercent + '%'
      return css
    },
    imgOrder() {
      return (this.imgPosition == 'top' || this.imgPosition == 'left') ? 0 : 2
    },
    imgCols() {
      return (this.imgPosition == 'top' || this.imgPosition == 'bottom') ? "12" : ""
    },
    textCols() {
      return (this.imgPosition == 'top' || this.imgPosition == 'bottom') ? "12" : "6"
    },
    textColDims() {
      let css = {}
      if (this.width > 0 && this.imgContainerWidth > 0) {       
        css.width = (this.width - this.imgContainerWidth) + 'px'
      }
      if (this.imgPosition == 'top' || this.imgPosition == 'bottom') {
        if (this.height > 0 && this.imgContainerHeight > 0) {        
          css.minHeight = (this.height - this.imgContainerHeight) + 'px'
        }
      }
      else {
        if (this.height > 0) {        
          css.minHeight = (this.height) + 'px'
        }
      }
      return css
    }
  },

  methods: {
    // textColDims() {
    //   setTimeout(function(){ 
    //     let css = {}
    //     if (this.width > 0 && this.imgContainerWidth > 0) { 
    //       css.width = (this.width - this.imgContainerWidth) + 'px'
    //     }
    //     if (this.imgPosition == 'top' || this.imgPosition == 'bottom') {
    //       if (this.height > 0 && this.imgContainerHeight > 0) {        
    //         css.height = (this.height - this.imgContainerHeight) + 'px'
    //       }
    //     }
    //     else {
    //       if (this.height > 0) {        
    //         css.height = (this.height - 8) + 'px'
    //       }
    //     }
    //     return css
    //   }, 1000);        
    // },
    // imgContainerDims() {
    //   setTimeout(function(){ 
    //     let css = {}
    //     if (this.imgContainerWidth > 0) {
    //       css.width = this.imgContainerWidth + 'px'
    //     }
    //     if (this.imgContainerHeight > 0)
    //       css.height = this.imgContainerHeight + 'px'
    //     if (this.imgPosition == 'top' || this.imgPosition == 'bottom')
    //       css.overflow = 'hidden'
    //     return css
    //   }, 1000);
    // },
  },

  mounted() {
    let friendImg = document.getElementById('friendImg' + this.index)
    this.friendImgWidth = friendImg.clientWidth
    this.friendImgHeight = friendImg.clientHeight    

    let imgContainer = document.getElementById('thumbnailImgCol' + this.index)
    this.thumbnailImgColWidth = imgContainer.clientWidth
    this.thumbnailImgColHeight = imgContainer.clientHeight    

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.friendImgWidth = friendImg.clientWidth
        this.friendImgHeight = friendImg.clientHeight  
        this.thumbnailImgColWidth = imgContainer.clientWidth
        this.thumbnailImgColHeight = imgContainer.clientHeight
      });
    })
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
  transition: opacity 0.25s ease;
}

.seeMoreBtn:hover {
  opacity: 0.75;
}

.thumbnailImgCol {
  overflow: unset;
 }

.thumbnailImg {
  position: relative;
  transition: 0.8s ease;
}

.innerContainerRow:hover .thumbnailImg{
  transform: scale(1.03, 1.03);
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .textCol {
    padding-bottom: 0px;  /* for the see more button */
  }
  .seeMoreBtnContainer {
    position: relative;
    padding-top: 4px;
  }
}

</style>
