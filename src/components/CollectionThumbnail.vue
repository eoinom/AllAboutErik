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

* {
  --defaultWidth: 354.8px;
  --defaultHeight: 552px;
  --scale: 1.0;
}

.collection {
  cursor: pointer;
  display: block;
  position: relative;
  width: calc(var(--scale) * var(--defaultWidth));
  height: calc(var(--scale) * var(--defaultHeight));
  margin: 0 auto;
}

.collectionImgDiv {
  padding: 0;
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
  font-feature-settings: 'liga';
  line-height: 1;
  width: calc(100% - 8px - 16px);
  padding: calc(var(--scale)*(18px 0 18px 16px));
  text-transform: uppercase;
}

.titleText {
  color: black;
  background-color: rgba(221,221,221,0.74);
  font-family: 'Open Sans Condensed', sans-serif;
  font-weight: 300;
  font-size: calc(var(--scale) * 2.25rem);
  letter-spacing: calc(var(--scale) * 9px);
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
  font-size: calc(var(--scale) * 1.12rem);
  letter-spacing: calc(var(--scale) * 2px);
  position: absolute;
  top: 72%;
  display: none;
}
.collection:hover .viewCollectionText {
  display: inline;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  * {    
    --scale: 0.65;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  * {    
    --scale: 0.55934;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  * {    
    --scale: 0.7;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  * {    
    --scale: 0.7;
  }
}

/* Special breakpoint */
@media (min-width: 1200px) and (max-width: 1499.98px) {
  * {    
    --scale: 0.9;
  }
}
</style>
