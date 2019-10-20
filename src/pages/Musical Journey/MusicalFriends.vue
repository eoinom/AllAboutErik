<template>
  <Layout> 
    <!-- <b-container fluid class="main-col"> -->
    <b-container fluid style="max-width:1540px;" class="main-col px-0">

      <b-row no-gutters class="mt-2">
        <b-col style="max-width:652px" class="mr-3">

          <friend-card
            :friend="friends[0]"
            :imgContainerHeight="Number(333)"
            :height=Number(533)
            class="mb-3"
          />

          <friend-card
            :friend="friends[1]"
            :imgContainerWidth="Number(370)"
            :imgContainerHeight="Number(442)"
            :imgHeight="Number(442)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[2]"
            :imgContainerWidth="Number(359)"
            :imgContainerHeight="Number(384)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[3]"
            :imgContainerHeight="Number(622)"
            :imgMoveDownPercent="Number(-27)" 
            :imgScaleToContainerWidth=true
            class="mb-3"
          />
        </b-col>

        <b-col style="max-width:872px" class="">
          <b-row no-gutters class="">
            <b-col style="max-width:431px" class="mr-3">
              <friend-card
                :friend="friends[4]"
                :imgContainerHeight="Number(458)"
                :imgMoveLeftPercent="Number(23)"
                :height="Number(674)"
                class="mb-3"
              />
            </b-col>

            <b-col style="max-width:425px">
              <friend-card
                :friend="friends[5]"
                :imgContainerHeight="Number(450)"
                :height="Number(674)"
                class="mb-3"
              />
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col>
              <friend-card
                :friend="friends[6]"
                :imgContainerWidth="Number(547)"
                :imgContainerHeight="Number(441)"
                :imgMoveLeftPercent="Number(26)"
                class="mb-3"
              />

              <friend-card
                :friend="friends[7]"
                :imgContainerHeight="Number(457)"
                :height="Number(648)"
                :imgScaleToContainerWidth=true
                class="mb-3"
              />

              <friend-card
                :friend="friends[8]"
                :imgContainerWidth="Number(536)"
                :imgContainerHeight="Number(387)"
                class="mb-3"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:1540px;" class="mt-0">
        <b-col class="">
          <friend-card
            :friend="friends[9]"
            :imgContainerWidth="Number(1015)"
            :imgContainerHeight="Number(435)"
            :imgMoveDownPercent="Number(-24)"
            class="mb-3"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mt-0">
        <b-col style="max-width:793px" class="mr-3">
          <friend-card
            :friend="friends[10]"
            :imgContainerWidth="Number(487)"
            :imgContainerHeight="Number(503)"
            :width="Number(793)"
            class="mb-3"
          />
        </b-col>

        <b-col style="max-width:731px" class="">
          <friend-card
            :friend="friends[11]"
            :imgContainerWidth="Number(731)"
            :imgContainerHeight="Number(306)"
            :height="Number(503)" 
            :imgScaleToContainerWidth=true
            class="mb-3"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="" class="">
        <b-col style="max-width:388.5px" class="mr-3">
          <friend-card
            :friend="friends[12]"
            :imgContainerHeight="Number(538)"
            :imgMoveLeftPercent="Number(8)"
            class="mb-3"
            :height="Number(927.33)"
          />
        </b-col>

        <b-col style="max-width:388.5px" class="mr-3">
          <friend-card
            :friend="friends[13]"
            :imgContainerHeight="Number(581)"
            class="mb-3"
            :height="Number(927.33)"
          />
        </b-col>

        <b-col style="width:731px" class="">
          <b-row no-gutters style="" class="">
            <b-col class="">
              <friend-card
                :friend="friends[14]"
                :imgContainerWidth="Number(400)"
                :imgContainerHeight="Number(408)"
                class="mb-3"
              />
            </b-col>

            <b-col class="">
              <friend-card
                :friend="friends[15]"
                :imgContainerHeight="Number(310)"
                :imgContainerWidth="Number(731)"
                :imgScaleToContainerWidth=true
                :height=Number(503.305)
                class="mb-3"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>

    </b-container>

    <ScrollToTop 
      text="BACK TO THE TOP"
      :includeArrow="true"
    />
    
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
import ScrollToTop from '../../components/ScrollToTop.vue'

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
    FriendCard,
    ScrollToTop
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
