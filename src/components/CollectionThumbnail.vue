<template>

  <!-- <div class="collection"> -->
  <g-link :to="'/collections/' + link" class="collection">
    <div class="collectionImgDiv">
      <img :src="image" class="thumbnailImg hideOnHover" />
      <img :src="hoverImage" class="thumbnailImg showOnHover"/>
    </div>

    <div>
      <span class="titleText text">{{ title }}</span>
      <span class="viewCollectionText text">VIEW THIS COLLECTION</span>
    </div>
  </g-link>
  <!-- </div> -->

</template>


<script scoped>
export default { 
  name: 'CollectionThumbnail',

  props: {
    collection: {
      type: Object
    }    
  },

  data() {
    return {
      title: this.collection.hasOwnProperty('title') ? this.collection.title : '',
      image: this.collection.hasOwnProperty('thumbnailImg') ? this.collection.thumbnailImg : '',
      hoverImage: this.collection.hasOwnProperty('thumbnailHoverImg') ? this.collection.thumbnailHoverImg : '',
      link: this.collection.hasOwnProperty('link') ? this.collection.link : ''
    }
  }
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lora:700&display=swap');

.collection {
  cursor: pointer;
}

.collectionImgDiv {
  padding: 0;
  height: 552px;
  /* width: calc((100vw - (7 * 2 * 4px)) / 7); */
  /* width: calc((100vw - (7 * 2 * 4px) - 20px) / 7); */
  width: 354.8px;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: row;
}

.collectionImgDiv .thumbnailImg  {
  flex: 1;
  -webkit-box-flex: 1;
  height: 100%;
  /* transition: opacity 2.5s ease; */
}

.thumbnailImg.showOnHover, .collection:hover .thumbnailImg.hideOnHover {
  display: none;
  opacity: 0;
  transition: all 0.4s ease-in 0.1s;  /* Are these transitions working?! */
}
.thumbnailImg.hideOnHover, .collection:hover .thumbnailImg.showOnHover {
  display: block;
  opacity: 1;
  transition: all 0.4s ease-in 0.1s;
}

.text {
  display: block;
  text-align: left;
  line-height: 17px;
  font-feature-settings: 'liga';
  line-height: 1;
  width: calc(100% - 8px - 16px);
  padding: 18px 0 18px 16px;
  text-transform: uppercase;  
}

.titleText {
  color: black;
  background-color: rgba(221,221,221,0.74);
  font-family: 'Open Sans Condensed', sans-serif;
  font-weight: 300;
  font-size: 2.25rem;
  letter-spacing: 9px;
  position: absolute;
  top: 18.2%;
}
.collection:hover .titleText {
  color: white;
  background-color: rgba(0,0,0,0.74);
}

.viewCollectionText{
  color: white;
  background-color: black;
  font-family: 'Lora', serif;
  font-weight: 700;
  font-size: 1.12rem;
  letter-spacing: 2px;
  position: absolute;
  top: 72%;
  display: none;
}
.collection:hover .viewCollectionText {
  display: inline;
}

</style>
