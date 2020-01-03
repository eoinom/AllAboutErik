<template>
  <vue-plyr :style="dynamicStyles">
    <audio>
      <source :src="src" type="audio/mp3"/>
    </audio>
  </vue-plyr>
</template>


<script scoped>
export default { 
  name: 'AudioPlayer',

  props: {
    src: {
      type: String
    },    
    background: {
      type: String,
      default: 'black',
    },        
    borderRadius: {
      type: String,
      default: '0px',
    },
    iconColor: {
      type: String,
      default: 'grey',
    },
    iconHoverColor: {
      type: String,
      default: 'white',
    },          
    secondaryColor: {
      type: String,
      default: '#00b3ff',
    },  
    padding: {
      type: String,
      default: '5px',
    }, 
  },
  
  computed: {
    dynamicStyles() {
      return {
        '--background': this.background,
        '--borderRadius': this.borderRadius,
        '--iconColor': this.iconColor,
        '--iconHoverColor': this.iconHoverColor,
        '--secondaryColor': this.secondaryColor,
        '--padding': this.padding
      }
    },
  }
}
</script>



<style>

.plyr--audio .plyr__controls {
  background: var(--background) !important;
  border-radius: var(--borderRadius) !important;
  color: var(--iconColor) !important;
  padding: var(--padding) !important;  
}

.plyr--audio .plyr__control.plyr__tab-focus, .plyr--audio .plyr__control:hover, .plyr--audio .plyr__control[aria-expanded=true] {
  background: var(--secondaryColor) !important;  
  color: var(--iconHoverColor) !important;  
}

.plyr--full-ui input[type=range] {
  color: var(--secondaryColor) !important; 
}

</style>
