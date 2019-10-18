<template>

  <b-container id="outerContainer" class="" :style="outerContainerDims">
  <!-- <b-container id="outerContainer" class=""> -->

    <!-- <b-row no-gutters class="innerContainerRow"> -->

      <!-- <b-col :order="imgOrder" :cols="imgCols" class="thumbnailImgCol" :style="imgContainerDims"> -->
      <!-- <b-col :order="imgOrder" class="thumbnailImgCol" :style="imgContainerDims">
        <g-image :src="friend.thumbnailImg" class="thumbnailImg" :style="imgDims" />
      </b-col> -->

      <!-- <b-col order="1" :cols="textCols" class="px-3 py-2 mt-0"> -->
      <!-- <b-col order="1" class="px-3 py-2 mt-0">
        <h3 class="textTitle mb-0"> {{ friend.name }} </h3>
        <p class="text mb-2"> {{ friend.text }} </p>
        <button class="seeMoreBtn mt-0 mb-1">...see more</button>
      </b-col>

    </b-row> -->

    <!-- Top / Bottom -->
    <b-row v-if="imgPosition == 'top' || imgPosition == 'bottom'" no-gutters class="innerContainerRow">

      <b-col :order="imgOrder" cols="12" class="thumbnailImgCol" :style="imgContainerDims">
        <g-image :src="friend.thumbnailImg" class="thumbnailImg" :style="imgDims" />
      </b-col>

      <b-col order="1" cols="12" class="px-3 py-2 mt-0 textCol">
        <h3 class="textTitle mb-0 mt-1"> {{ friend.name }} </h3>
        <p class="text mb-2"> {{ friend.text }} </p>
        <button class="seeMoreBtn mt-0 mb-1">...see more</button>
      </b-col>

    </b-row>

    <!-- Left / Right -->
    <b-row v-else-if="imgPosition == 'left' || imgPosition == 'right'" no-gutters class="innerContainerRow">
      
      <b-col :order="imgOrder" class="thumbnailImgCol" :style="imgContainerDims">
        <g-image :src="friend.thumbnailImg" class="thumbnailImg" :style="imgDims" />
      </b-col>
      
      <b-col order="1" class="px-3 py-2 mt-0 textCol">
        <h3 class="textTitle mb-0"> {{ friend.name }} </h3>
        <p class="text mb-2"> {{ friend.text }} </p>
        <button class="seeMoreBtn mt-0 mb-1">...see more</button>
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
    imgMoveLeftPercent: {
      default: 0,
      type: Number
    },
    imgMoveDownPercent: {
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
      // if (this.imgPosition == 'top' || this.imgPosition == 'bottom')
      //   css.overflow = 'hidden'
      return css
    },
    imgDims() {
      let css = {}
      if (this.imgWidth > 0)
        css.width = this.imgWidth + 'px'
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
    // imgCols() {
    //   return (this.friend.imgPosition == 'top' || this.friend.imgPosition == 'bottom') ? "12" : "6"
    // },
    textCols() {
      return (this.friend.imgPosition == 'top' || this.friend.imgPosition == 'bottom') ? "12" : "6"
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
  /* width: 375px; */
  max-width: 100%;
  position: relative;
}

.innerContainerRow {
  /* height: 550px; */
  /* height: var(--height); */
  border-radius: 9px;
  overflow: hidden;
}

.textCol {
  background-color: white;
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

.thumbnailImgCol {
  overflow: unset;
  /* align-self: center; */
  /* margin: 0; */
  /* position:absolute;  */
  /* width:100%; */
  /* position: relative;
  padding-bottom: 300px;
  z-index:auto; */
  /* display:table-cell; vertical-align:middle; text-align:center; */
 }

.thumbnailImg {
  /* max-width: 100%; */
  /* max-height: 100%; */
  /* margin-left: auto;
  margin-right: auto;
  display: block; */
  position: relative; 
  /* right:-50%;  */
}

</style>
