<template>

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

</template>


<script scoped>
const slugify = require('@sindresorhus/slugify')

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
      link: this.collection.hasOwnProperty('title') ? slugify(this.collection.title) : '',
      image: this.collection.hasOwnProperty('thumbnailImg') ? this.collection.thumbnailImg : '',
      hoverImage: this.collection.hasOwnProperty('thumbnailHoverImg') ? this.collection.thumbnailHoverImg : ''
    }
  }
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lora:700&display=swap');

.collection {
  cursor: pointer;
  display: block;
  position: relative;
  width: 354.8px;
  height: 552px;
  margin: 0 auto;
}

.collectionImgDiv {
  padding: 0;
  /* height: 552px; */
  /* max-width: 354.8px; */
  width: 100%;
  height: 100%;
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



/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .collection {
    width: 248.36px;
    height: 386.4px;
  }
  .text {
    /* line-height: 17px;
    line-height: 1;
    width: calc(100% - 8px - 16px);
    padding: 18px 0 18px 16px; */
    transform:scale(0.7,0.7);
    transform-origin: left;
    width: auto;
  }

  .titleText {
    /* font-size: 2.25rem;
    letter-spacing: 9px;
    top: 18.2%; */

    /* transform-origin: initial;    
    transform:scale(0.7,0.7);
    transform-origin: left; */
  }
  .viewCollectionText{
    /* font-size: 1.12rem;
    letter-spacing: 2px;
    top: 72%; */
  }
}

</style>
