<template>

  <g-link :to="'/publications/' + link" class="publication">
    <div class="publicationImgDiv">
      <img :src="image" class="thumbnailImg hideOnHover" />
      <img :src="hoverImage" class="thumbnailImg showOnHover"/>
    </div>

    <div>
      <span class="hoverText">MORE INFO</span>
    </div>
  </g-link>

</template>


<script scoped>
const slugify = require('@sindresorhus/slugify')

export default { 
  name: 'PublicationThumbnail',

  props: {
    publication: {
      type: Object
    }    
  },

  data() {
    return {
      link: this.publication.hasOwnProperty('title') ? slugify(this.publication.title) : '',
      image: this.publication.hasOwnProperty('thumbnailImg') ? this.publication.thumbnailImg : '',
      hoverImage: this.publication.hasOwnProperty('thumbnailHoverImg') ? this.publication.thumbnailHoverImg : ''
    }
  }
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lora:700&display=swap');

* {
  --defaultWidth: 357.8px;
  --defaultHeight: 626px;
  --scale: 1.0;
}

.publication {
  cursor: pointer;
  display: block;
  position: relative;
  margin: 0 auto;
}

.publicationImgDiv {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: row;
}

.publicationImgDiv .thumbnailImg  {
  flex: 1;
  -webkit-box-flex: 1;
  max-width: 80vw;
  height: auto;
  max-height: 100%;
  max-height: calc(var(--scale) * var(--defaultHeight));
}

.thumbnailImg.showOnHover, .publication:hover .thumbnailImg.hideOnHover {
  display: none;
  opacity: 0;
  transition: all 0.4s ease-in 0.1s;  /* Are these transitions working?! */
}
.thumbnailImg.hideOnHover, .publication:hover .thumbnailImg.showOnHover {
  display: block;
  opacity: 1;
  transition: all 0.4s ease-in 0.1s;
}

.hoverText {
  color: black;
  background-color: rgba(221,221,221,0.74);
  display: none;
  text-align: left;
  position: absolute;
  top: 72%;
  font-family: 'Open Sans Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 300;
  font-size: calc(var(--scale) * 2.25rem);
  line-height: 1;
  letter-spacing: calc(var(--scale) * 9px);
  width: 400px;
  max-width: calc(100% - 8px - 16px);
  padding-top: calc(var(--scale)*18px);
  padding-bottom: calc(var(--scale)*18px);
  padding-right: 0px;
  padding-left: calc(var(--scale)*16px);
  text-transform: uppercase;
}
.publication:hover .hoverText {
  display: inline;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  * {
    --scale: 0.45;
  }
}

/* Special breakpoint, Extra small devices (portrait phones, less than 400px) */
@media only screen and (max-width: 399.98px) {
  * {
    --scale: 0.35;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  * {    
    --scale: 0.55934;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  * {    
    --scale: 0.7;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  * {    
    --scale: 0.7;
  }
}

/* Special breakpoint */
@media only screen and (min-width: 1200px) and (max-width: 1399.98px) {
  * {
    --scale: 0.7;
  }
}

/* Special breakpoint */
@media only screen and (min-width: 1400px) and (max-width: 1599.98px) {
  * {
    --scale: 0.85;
  }
}
</style>
