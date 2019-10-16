<template>

  <!-- <b-container id="outerContainer" class="" :style="outerContainerDims"> -->
  <b-container id="outerContainer" class="">

    <b-row no-gutters class="innerContainerRow">

      <!-- <b-col :order="imgOrder" :cols="imgCols" class="thumbnailImgCol" :style="imgContainerDims"> -->
      <b-col :order="imgOrder" class="thumbnailImgCol" :style="imgContainerDims">
        <g-image :src="friend.thumbnailImg" class="thumbnailImg" :style="imgDims" />
      </b-col>

      <!-- <b-col order="1" :cols="textCols" class="px-3 py-2 mt-0"> -->
      <b-col order="1" class="px-3 py-2 mt-0">
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
    }
  },

  data() {
    return {
    }
  },

  computed: {
    outerContainerDims() {
      let css = {}
      if (this.friend.imgPosition == 'top' || this.friend.imgPosition == 'bottom')
        css.width = this.imgContainerWidth + 'px'
      else
        css.height = this.imgContainerHeight + 'px'
      return css
    },
    imgContainerDims() {
      let css = {}
      if (this.imgContainerWidth > 0)
        css.width = this.imgContainerWidth + 'px'
      if (this.imgContainerHeight > 0)
        css.height = this.imgContainerHeight + 'px'
      return css
    },
    imgDims() {
      let css = {}
      if (this.imgWidth > 0)
        css.width = this.imgWidth + 'px'
      if (this.imgHeight > 0)
        css.height = this.imgHeight + 'px'
      return css
    },
    imgOrder() {
      return (this.friend.imgPosition == 'top' || this.friend.imgPosition == 'left') ? 0 : 2
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
@import url('https://fonts.googleapis.com/css?family=Lora&display=swap');

#outerContainer {
  background-color: white;
  padding: 0;
  border-radius: 9px;
  /* width: 375px; */
  width: 100%;
}

.innerContainerRow {
  /* height: 550px; */
  /* height: var(--height); */
  border-radius: 9px;
  overflow: hidden;
}

.textTitle {
  font-family: serif;
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
  font-family: serif;
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
  color: white;
  opacity: 1;
}

.thumbnailImgCol {
  overflow: hidden;
}

.thumbnailImg {
  /* max-width: 100%; */
  /* max-height: 100%; */
}

</style>
