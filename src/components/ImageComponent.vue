<template>
  <g-image :src="require('!!assets-loader!~/assets/images/' + imageFile)" />
  <!-- <g-image :src="require('~/assets/images/' + imageFile)" /> -->
</template>

<script>
export default {
  props: {
    imageFile: ''
  },
  mounted() {
    console.log('imageFile: ' + this.imageFile)
  }
}
</script>