<template>
  <div class="productionTextDiv">
    <p class="title">{{ title }}</p>
    <p class="body">{{ body }}</p>
  </div>

</template>


<script scoped>
export default { 
  name: 'MusicProductionText',

  props: {
    title: {
      type: String
    },
    body: {
      type: String
    }    
  }
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lora:400,700&display=swap');

.productionTextDiv {
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: #FCFEF4;
  border-radius: 9px;
  padding: 15px 20px;

  color: white;
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
}

.title {
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  letter-spacing: 3px;
  line-height: 20px;
  text-transform: uppercase;
  margin: 0px;
  padding-bottom: 10px;
}

.body {
  font-size: 17px;
  font-weight: 400;
  text-align: justify;
  letter-spacing: 2px;
  line-height: 20px;
  margin: 0px;
  padding: 0px;
}

</style>
