<template>
  <b-container fluid id="tilesContainer">
    <b-row no-gutters align-h="center" id="tilesRow" class="mx-3 mx-sm-0 mb-5 pb-4">
      <b-col
        v-for="(tile, index) in tiles"
        :key="index"
        cols="12" md="5" xl="3"
        align-self="center"
        class="tilesCols p-0 m-2 m-sm-3"
      >
        <ArchivesThumbnail :thumbnailObj="tile" />
      </b-col>
    </b-row>
  </b-container>
</template>


<script scoped>
import ArchivesThumbnail from './ArchivesThumbnail.vue'

export default { 
  name: 'ArchivesTiles',

  components: {
    ArchivesThumbnail
  },

  props: {
    tiles: {
      type: Object,
      required: true
    }
  }
}
</script>



<style scoped lang="scss">

#tilesContainer {
  width: 100%;
  max-width: 2048px;
  padding: 0;
  text-align: center;
  z-index: 50;
}

.tilesCols {
  max-width: 480px;
  background-color: black;
}
</style>
