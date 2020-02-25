<template>
  <Layout>

    <BackgroundMusic
      :audioFile="$page.MusicalFriends.edges[0].node.bgAudio"
      :audioDuration="$page.MusicalFriends.edges[0].node.bgAudioDuration"
      :audioFadeInDuration="$page.MusicalFriends.edges[0].node.bgAudioFadeInDuration"
      :audioFadeOutDuration="$page.MusicalFriends.edges[0].node.bgAudioFadeOutDuration"
    />
       
    <MusicalFriendsComponent
      :menuOnly="false"
    />
    
  </Layout>
</template>

<page-query>
{
  MusicalFriends: allMusicalFriends {
    edges {
      node {
        bgAudio
        bgAudioDuration
        bgAudioFadeInDuration
        bgAudioFadeOutDuration
      }
    }
  }
}
</page-query>

<script scoped>
import BackgroundMusic from '../../components/BackgroundMusic.vue'
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
    BackgroundMusic,
    MusicalFriendsComponent
  },
}
</script>

<style scoped>

</style>
