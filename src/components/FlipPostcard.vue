<template>
  <div class="flip-card" :style="dimStyles">
    <img v-if="seeTheBack" src="../assets/images/see-the-back.png" alt="See the back" class="flip-card-seeTheBack"  @click="lightBoxOpen()">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="imgFront" :alt="caption" :style="dimStyles">
      </div>
      <div class="flip-card-back">
        <img :src="imgBack" :alt="caption" :style="dimStyles">
      </div>
    </div>
    <p class="caption">{{ caption }}</p> 

  <ImageLightBox
    :images="postcardImage"
    :index="postcardIndex"
    :disable-scroll="true"
    @close="postcardIndex = null; postcardImage = null"
    :centreTitle=true
  />

  </div>
</template>


<script scoped>
import ImageLightBox from './ImageLightBox.vue'

export default { 
  name: 'FlipPostcard',

  props: {
    imgFront: {
      type: String
    },
    imgBack: {
      type: String
    },
    caption: {
      type: String
    },
    width: {
      type: Number
    }, 
    height: {
      type: Number
    },
    seeTheBack: {
      type: Boolean,
      default: false
    },
    backText: {
      type: String
    },    
    backTextIsHTML: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      postcardIndex: null,
      postcardImage: null
    }
  },

  computed: {
    dimStyles() {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    }
  },

  methods: {    
    lightBoxOpen() {
      if (this.backTextIsHTML) {
        this.postcardImage = [{
          'img': this.imgBack, 
          'HTMLcaption': this.backText
        }]
      }
      else {
        this.postcardImage = [{
          'img': this.imgBack, 
          'caption': this.backText
        }]
      }
      this.postcardIndex = 0
    }
  },

  components: {
    ImageLightBox
  },
}
</script>



<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Crimson+Text:600,600i&display=swap');

.caption {      
  font-family: 'Crimson Text', serif;
  font-feature-settings: 'liga';
  font-style: italic;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.375rem;
  letter-spacing: 1px;
  text-align: left;
  margin: 0px;
  padding: 12px 0;
}


// From: https://www.w3schools.com/howto/howto_css_flip_card.asp
.flip-card {
  position: relative;
  background-color: transparent;
}
.flip-card-seeTheBack {
  position: absolute;
  top: -45px;
  right: -45px;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: #bbb;
  color: black;
}

/* Style the back side */
.flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}

</style>
