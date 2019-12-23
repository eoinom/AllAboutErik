<template>
  <Layout>   
    <MusicalFriendsComponent
      :menuOnly="true"
    />
  </Layout>
</template>

<script scoped>
import MusicalFriendsComponent from '../../components/MusicalFriendsComponent.vue'

export default {
  metaInfo() {
    return {
    }
  },

  data() {
    return {
    }
  },

  components: {
    MusicalFriendsComponent
  },
}
</script>

<style scoped>

</style>
