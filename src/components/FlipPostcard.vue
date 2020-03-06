<template>
  <div class="flip-card" :style="flipCardStyles">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="imgFront" :alt="caption">
      </div>
      <div class="flip-card-back">
        <img :src="imgBack" :alt="caption">
      </div>
    </div>
    <p class="caption">{{ caption }}</p>    
  </div>
</template>


<script scoped>
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
  },

  computed: {
    flipCardStyles() {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    }
  }
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
  background-color: transparent;
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
