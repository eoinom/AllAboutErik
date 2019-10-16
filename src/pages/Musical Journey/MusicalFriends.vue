<template>
  <Layout> 
    <!-- <b-container fluid class="main-col"> -->
    <b-container fluid style="max-width:1540px;" class="main-col px-0">

      <b-row no-gutters class="mt-2">
        <!-- <b-col style="max-width:375px" class=""> -->
        <b-col cols="5" class="pr-3">
          <friend-card
            :friend="friends[0]"
            imgContainerHeight=190
            imgContainerWidth=375
            imgWidth=375
            class="mb-3"
          />

          <friend-card
            :friend="friends[1]"
            imgContainerHeight=276
            imgContainerWidth=280
            imgHeight=276
            class="mb-3"
          />

          <friend-card
            :friend="friends[2]"
            imgContainerHeight=230
            imgContainerWidth=213
            imgHeight=276
            imgWidth=213
            class="mb-3"
          />

          <friend-card
            :friend="friends[3]"
            imgContainerHeight=385
            class="mb-3"
          />
        </b-col>

        <!-- <b-col style="max-width:425px" class=""> -->
        <b-col cols="7" class="">
          <friend-card
            :friend="friends[4]"
            imgContainerHeight=385
            class="mb-3"
          />

          <friend-card
            :friend="friends[5]"
            imgContainerHeight=385
            class="mb-3"
          />

          <friend-card
            :friend="friends[6]"
            imgContainerHeight=385
            class="mb-3"
          />

          <friend-card
            :friend="friends[7]"
            imgContainerHeight=385
            class="mb-3"
          />

          <friend-card
            :friend="friends[8]"
            imgContainerHeight=385
            class="mb-3"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="" class="mt-2">
        <b-col class="">
          <friend-card
            :friend="friends[9]"
            imgContainerHeight=385
            class="mb-3"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="" class="mt-2">
        <b-col class="">
          <friend-card
            :friend="friends[10]"
            imgContainerHeight=385
            class="mb-3"
          />
        </b-col>

        <b-col class="">
          <friend-card
            :friend="friends[11]"
            imgContainerHeight=385
            class="mb-3"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="" class="mt-2">
        <b-col class="">
          <friend-card
            :friend="friends[12]"
            imgContainerHeight=385
            class="mb-3"
          />
        </b-col>

        <b-col class="">
          <friend-card
            :friend="friends[13]"
            imgContainerHeight=385
            class="mb-3"
          />
        </b-col>

        <b-col class="">
          <b-row no-gutters style="" class="mt-2">
            <b-col class="">
              <friend-card
                :friend="friends[14]"
                imgContainerHeight=385
                class="mb-3"
              />
            </b-col>

            <b-col class="">
              <friend-card
                :friend="friends[15]"
                imgContainerHeight=385
                class="mb-3"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <!-- <friend-card
        :friend="friends[0]"
        imgContainerHeight=350
        imgContainerWidth=690
        imgWidth=690
        class="mb-3"
        style="transform: scale(0.5); transform-origin: top-left;"
      /> -->

      

      <friend-card
        :friend="friends[11]"
        imgContainerHeight=500
        class="mb-3"
      />

    </b-container>
  </Layout>
</template>

<page-query>
{
  MusicalFriends: allMusicalFriends {
    edges {
      node {
        id
        pageTitle
        backgroundImg
        titleImg
        content
        friends {
          name
          text
          link
          orderNo
          thumbnailImg
          imgOrientation
          imgPosition
        }
      }
    }
  }	
}
</page-query>


<script scoped>
import FriendCard from '../../components/FriendCard.vue'

export default { 
  metaInfo() {
    return {
      title: this.$page.MusicalFriends.edges[0].node.pageTitle
    }
  },

  data() {
    return {
    }
  },

  computed: {
    titleImg() {
      return this.$page.MusicalFriends.edges[0].node.titleImg
    },
    friends() {
      return this.$page.MusicalFriends.edges[0].node.friends
    }
  },

  methods: {
  },

  mounted() {
  },

  components: {
    FriendCard
  },
}
</script>



<style scoped>


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {

}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {

}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 

}

</style>
