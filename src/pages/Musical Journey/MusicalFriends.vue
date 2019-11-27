<template>
  <Layout class="pb-5">
    <img :src="backgroundImgUrl" id="bgImg" :style="bgStyles" />

    <header id="header" :style="headerStyles">
      <g-image :src="titleImg" id="titleImg" />
      <span v-html="titleSubText" id="titleSubText" />
      <div id="scrollDownContainer">
        <ScrollDownArrow
          scrollToElement="#friends"
        />
      </div>
      <p id="targetForOpacity"></p>
    </header>
    
    <div id="topOfFriends"></div>

    <!-- LAYOUT FOR LARGE DESKTOPS -->
    <b-container v-if="windowWidth >= 1830" fluid style="max-width:1540px;" :style="friendsOpacity" id="friends" class="main-col px-0 mt-4 mb-5">

      <b-row no-gutters>
        <b-col style="max-width:652px" class="mr-3">

          <friend-card
            :friend="friends[0]"
            :index=0
            :imgPosition="friends[0].imgPosition"
            :height="Number(544)"
            :imgContainerHeight="Number(333)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[1]"
            :index=1
            :imgPosition="friends[1].imgPosition"
            :imgContainerWidth="Number(370)"
            :imgContainerHeight="Number(442)"
            :imgHeight="Number(442)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[2]"
            :index=2
            :imgPosition="friends[2].imgPosition"
            :imgContainerWidth="Number(359)"
            :imgContainerHeight="Number(384)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[3]"
            :index=3
            :imgPosition="friends[3].imgPosition"
            :height="Number(812)"
            :imgContainerHeight="Number(622)"
            :imgMoveDownPercent="Number(-27)"
            :imgScaleToContainerWidth="true"
            class="mb-3"
          />
        </b-col>

        <b-col style="max-width:872px">
          <b-row no-gutters class="mb-3">
            <b-col style="max-width:431px" class="mr-3">
              <friend-card
                :friend="friends[4]"
                :index=4
                :imgPosition="friends[4].imgPosition"
                :height="Number(688)"
                :imgContainerHeight="Number(398)"
                :imgMoveLeftPercent="Number(19)"
                :imgHeight="Number(420)"
              />
            </b-col>

            <b-col style="max-width:425px">
              <friend-card
                :friend="friends[5]"
                :index=5
                :imgPosition="friends[5].imgPosition"
                :height="Number(688)"
                :imgContainerHeight="Number(450)"
              />
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col>
              <friend-card
                :friend="friends[6]"
                :index=6
                :imgPosition="friends[6].imgPosition"
                :imgContainerWidth="Number(547)"
                :imgContainerHeight="Number(441)"
                :imgMoveLeftPercent="Number(26)"
                class="mb-3"
              />

              <friend-card
                :friend="friends[7]"
                :index=7
                :imgPosition="friends[7].imgPosition"
                :height="Number(648)"
                :imgContainerHeight="Number(457)"
                :imgScaleToContainerWidth="true"
                class="mb-3"
              />

              <friend-card
                :friend="friends[8]"
            :index=8
                :imgPosition="friends[8].imgPosition"
                :height="Number(413.017)"
                :imgContainerWidth="Number(536)"
                :imgContainerHeight="Number(387)"
                class="mb-3"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:1540px;" class="mt-0">
        <b-col class="mb-3">
          <friend-card
            :friend="friends[9]"
            :index=9
            :imgPosition="friends[9].imgPosition"
            :imgContainerWidth="Number(1015)"
            :imgContainerHeight="Number(435)"
            :imgMoveDownPercent="Number(-24)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mt-0">
        <b-col style="max-width:793px" class="mb-3 mr-3">
          <friend-card
            :friend="friends[10]"
            :index=10
            :imgPosition="friends[10].imgPosition"
            :width="Number(793)"
            :height="Number(503)"
            :imgContainerWidth="Number(487)"
            :imgContainerHeight="Number(503)"
          />
        </b-col>

        <b-col style="max-width:731px" class="mb-3">
          <friend-card
            :friend="friends[11]"
            :index=11
            :imgPosition="friends[11].imgPosition"
            :height="Number(503)"
            :imgContainerWidth="Number(731)"
            :imgContainerHeight="Number(306)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

      <b-row no-gutters>
        <b-col style="max-width:388.5px" class="mb-3 mr-3">
          <friend-card
            :friend="friends[12]"
            :index=12
            :imgPosition="friends[12].imgPosition"
            :imgContainerHeight="Number(538)"
            :imgMoveLeftPercent="Number(8)"
            :height="Number(927.33)"
          />
        </b-col>

        <b-col style="max-width:388.5px" class="mb-3 mr-3">
          <friend-card
            :friend="friends[13]"
            :index=13
            :imgPosition="friends[13].imgPosition"
            :imgContainerHeight="Number(581)"
            :height="Number(927.33)"
            :imgMoveLeftPercent="Number(6)"
          />
        </b-col>

        <b-col style="width:731px">
          <b-row no-gutters>
            <b-col class="mb-3">
              <friend-card
                :friend="friends[14]"
                :index=14
                :imgPosition="friends[14].imgPosition"
                :imgContainerWidth="Number(400)"
                :imgContainerHeight="Number(408)"
              />
            </b-col>

            <b-col class="mb-3">
              <friend-card
                :friend="friends[15]"
                :index=15
                :imgPosition="friends[15].imgPosition"
                :imgContainerHeight="Number(310)"
                :imgContainerWidth="Number(731)"
                :imgScaleToContainerWidth="true"
                :height=Number(503.305)
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <!-- END OF LAYOUT FOR LARGE DESKTOPS -->



    <!-- LAYOUT FOR MEDIUM DESKTOPS -->
    <b-container v-if="windowWidth >= 1380 && windowWidth < 1830" fluid style="max-width:1215px;" :style="friendsOpacity" id="friends" class="main-col px-0 mt-4 mb-5">

      <b-row no-gutters>
        <b-col style="max-width:652px" class="mr-3">

          <friend-card
            :friend="friends[0]"
            :index=0
            :imgPosition="friends[0].imgPosition"
            :height="Number(544)"
            :imgContainerHeight="Number(333)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[1]"
            :index=1
            :imgPosition="friends[1].imgPosition"
            :imgContainerWidth="Number(370)"
            :imgContainerHeight="Number(442)"
            :imgHeight="Number(442)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[2]"
            :index=2
            :imgPosition="friends[2].imgPosition"
            :imgContainerWidth="Number(359)"
            :imgContainerHeight="Number(404)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[3]"
            :index=3
            :imgPosition="friends[3].imgPosition"
            :height="Number(812)"
            :imgContainerHeight="Number(622)"
            :imgMoveDownPercent="Number(-27)"
            :imgScaleToContainerWidth="true"
            class="mb-3"
          />
        </b-col>

        <b-col style="max-width:547px">
          <friend-card
            :friend="friends[4]"
            :index=4
            :imgPosition="friends[4].imgPosition"
            :height="Number(663)"
            :imgContainerHeight="Number(416)"
            :imgMoveLeftPercent="Number(10)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[5]"
            :index=5
            imgPosition="right" 
            :imgContainerHeight="Number(442)"
            :imgHeight="Number(442)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[6]"
            :index=6
            imgPosition="top"
            :height="640"
            :imgContainerWidth="Number(547)"
            :imgContainerHeight="Number(391)"
            :imgHeight="Number(411)"
            :imgMoveLeftPercent="Number(22)"
            :imgMoveDownPercent="Number(-3)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[7]"
            :index=7
            imgPosition="left"
            :imgContainerWidth="Number(270)"
            :imgContainerHeight="Number(457)"
            :imgHeight="Number(457)"
            :imgMoveLeftPercent="Number(38)"
            class="mb-3"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:1215px;" class="mb-3 mt-0">
        <b-col>
          <friend-card
            :friend="friends[8]"
            :index=8
            :imgPosition="friends[8].imgPosition"
            :imgContainerWidth="Number(650)"
            :imgContainerHeight="Number(435)"
            :imgHeight="Number(850)"
            :imgMoveLeftPercent="Number(10)"
            :imgMoveDownPercent="Number(-10)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:1215px;" class="mb-3 mt-0">
        <b-col>
          <friend-card
            :friend="friends[9]"
            :index=9
            :imgPosition="friends[9].imgPosition"
            :imgContainerWidth="Number(801)"
            :imgContainerHeight="Number(435)"
            :imgMoveDownPercent="Number(-24)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3 mt-0">
        <b-col style="max-width:656px" class="mr-3">
          <friend-card
            :friend="friends[10]"
            :index=10
            :imgPosition="friends[10].imgPosition"
            :width="Number(656)"
            :imgContainerWidth="Number(384)"
            :imgContainerHeight="Number(503)"
            :imgMoveLeftPercent="Number(12)"
          />
        </b-col>

        <b-col style="max-width:546px">
          <friend-card
            :friend="friends[11]"
            :index=11
            :imgPosition="friends[11].imgPosition"
            :height="Number(503)"
            :imgContainerWidth="Number(546)"
            :imgContainerHeight="Number(280)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3 mt-0">
        <b-col style="max-width:1215px">
          <friend-card
            :friend="friends[15]"
            :index=15
            imgPosition="right"
            :imgContainerWidth="Number(655)"
            :imgContainerHeight="Number(310)"
            :imgMoveLeftPercent="Number(5)"
            :imgMoveDownPercent="Number(0)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:1215px" class="mb-3">
        <b-col style="max-width:388.5px" class="mr-3">
          <friend-card
            :friend="friends[12]"
            :index=12
            :imgPosition="friends[12].imgPosition"
            :height="Number(927.33)"
            :imgContainerHeight="Number(538)"
            :imgMoveLeftPercent="Number(8)"
          />
        </b-col>

        <b-col style="max-width:388.5px" class="mr-3">
          <friend-card
            :friend="friends[13]"
            :index=13
            :imgPosition="friends[13].imgPosition"
            :imgContainerHeight="Number(581)"
            :height="Number(927.33)"
            :imgMoveLeftPercent="Number(6)"
          />
        </b-col>

        <b-col style="max-width:438px">
          <friend-card
            :friend="friends[14]"
            :index=14
            imgPosition="top"
            :imgContainerHeight="Number(600)"
            :height="Number(927.33)"
            :imgMoveLeftPercent="Number(0)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

    </b-container>
    <!-- END OF LAYOUT FOR MEDIUM DESKTOPS -->



    <!-- LAYOUT FOR SMALL DESKTOPS -->
    <b-container v-if="windowWidth >= 992 && windowWidth < 1380" fluid style="max-width:832px;" :style="friendsOpacity" id="friends" class="main-col px-0 mt-4 mb-5">

      <b-row no-gutters style="max-width:832px" class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[0]"
            :index=0
            imgPosition="top"
            :height="Number(544)"
            :imgContainerHeight="Number(355)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px" class="mb-3">
        <b-col style="max-width:408px" class="mr-3">
          <friend-card
            :friend="friends[1]"
            :index=1
            imgPosition="top"
            :height="Number(750)"
            :imgContainerWidth="Number(408)"
            :imgContainerHeight="Number(420)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>

        <b-col style="max-width:408px">
          <friend-card
            :friend="friends[2]"
            :index=2
            imgPosition="bottom"
            :height="Number(750)"
            :imgContainerWidth="Number(408)"
            :imgContainerHeight="Number(480)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px" class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[3]"
            :index=3
            imgPosition="left"
            :height="Number(622)"
            :imgContainerHeight="Number(622)"
            :imgContainerWidth="Number(460)"
            :imgWidth="Number(480)"
            :imgMoveDownPercent="Number(0)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px" class="mb-3">
        <b-col style="max-width:408px" class="mr-3">
          <friend-card
            :friend="friends[4]"
            :index=4
            :imgPosition="friends[4].imgPosition"
            :height="Number(690)"
            :imgContainerHeight="Number(380)"
            :imgMoveLeftPercent="Number(20)"
            :imgHeight="Number(420)"
          />
        </b-col>

        <b-col style="max-width:408px">
          <friend-card
            :friend="friends[5]"
            :index=5
            :imgPosition="friends[5].imgPosition"                 
            :height="Number(690)"
            :imgContainerHeight="Number(460)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px" class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[6]"
            :index=6
            imgPosition="top"
            :height="615"
            :imgContainerWidth="Number(832)"
            :imgContainerHeight="Number(410)"
            :imgMoveLeftPercent="Number(0)"
            :imgMoveDownPercent="Number(-3)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px" class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[7]"
            :index=7
            imgPosition="left"
            :imgContainerWidth="Number(270)"
            :imgContainerHeight="Number(457)"
            :imgHeight="Number(500)"
            :imgMoveLeftPercent="Number(15)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px;" class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[8]"
            :index=8
            :imgPosition="friends[8].imgPosition"
            :imgContainerWidth="Number(432)"
            :imgContainerHeight="Number(435)"
            :imgHeight="Number(650)"
            :imgMoveLeftPercent="Number(18)"
            :imgMoveDownPercent="Number(0)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px;" class="mb-3">
        <b-col class="">
          <friend-card
            :friend="friends[9]"
            :index=9
            imgPosition="top"
            :height="Number(682)"
            :imgContainerWidth="Number(832)"
            :imgContainerHeight="Number(435)"
            :imgMoveDownPercent="Number(-24)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px;" class="mb-3">
        <b-col style="max-width:408px" class="mr-3">
          <friend-card
            :friend="friends[10]"
            :index=10
            imgPosition="bottom"
            :height="Number(690)"
            :imgContainerWidth="Number(408)"
            :imgContainerHeight="Number(360)"
            :imgMoveLeftPercent="Number(3)"
            :imgWidth="Number(460)"       
          />
        </b-col>

        <b-col style="max-width:408px">
          <friend-card
            :friend="friends[11]"
            :index=11
            :imgPosition="friends[11].imgPosition"
            :height="Number(690)"
            :imgContainerWidth="Number(408)"
            :imgContainerHeight="Number(400)"
            :imgMoveLeftPercent="Number(66)"
            :imgHeight="Number(700)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px;" class="mb-3">
        <b-col style="max-width:832px" class="">
          <friend-card
            :friend="friends[15]"
            :index=15
            imgPosition="bottom"
            :height="Number(585)"
            :imgContainerWidth="Number(832)"
            :imgContainerHeight="Number(400)"
            :imgMoveDownPercent="Number(0)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px" class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[14]"
            :index=14
            :imgPosition="friends[14].imgPosition"
            :imgContainerWidth="Number(406)"
            :imgContainerHeight="Number(450)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px" class="mb-3">
        <b-col style="max-width:408px" class="mr-3">
          <friend-card
            :friend="friends[12]"
            :index=12
            :imgPosition="friends[12].imgPosition"
            :height="Number(914)"
            :imgContainerWidth="Number(408)"
            :imgContainerHeight="Number(538)"
            :imgMoveLeftPercent="Number(2)"
          />
        </b-col>

        <b-col style="max-width:408px">
          <friend-card
            :friend="friends[13]"
            :index=13
            :imgPosition="friends[13].imgPosition"
            :height="Number(914)"
            :imgContainerWidth="Number(408)"
            :imgContainerHeight="Number(581)"
            :imgMoveLeftPercent="Number(6)"
          />
        </b-col>
      </b-row>

    </b-container>
    <!-- END OF LAYOUT FOR SMALL DESKTOPS -->



    <!-- LAYOUT FOR TABLETS -->
    <b-container v-if="windowWidth >= 768 && windowWidth < 992" fluid style="max-width:728px;" :style="friendsOpacity" id="friends" class="main-col px-0 mt-4 mb-5">

      <b-row no-gutters class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[0]"
            :index=0
            imgPosition="top"
            :height="Number(544)"
            :imgContainerHeight="Number(355)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>
      
      <b-row no-gutters class="mb-3">
        <b-col style="max-width:calc(50% - 8px)" class="mr-3">
          <friend-card
            :friend="friends[1]"
            :index=1
            imgPosition="top"
            :height="Number(750)"
            :imgContainerHeight="Number(376)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>

        <b-col style="max-width:calc(50% - 8px)">
          <friend-card
            :friend="friends[2]"
            :index=2
            imgPosition="bottom"
            :height="Number(750)"
            :imgContainerHeight="Number(440)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[3]"
            :index=3
            imgPosition="left"
            :height="Number(622)"
            :imgContainerHeight="Number(622)"
            :imgContainerWidth="Number(460)"
            :imgWidth="Number(480)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col style="max-width:calc(50% - 8px)" class="mr-3">
          <friend-card
            :friend="friends[4]"
            :index=4
            :imgPosition="friends[4].imgPosition"
            :height="Number(690)"
            :imgContainerHeight="Number(340)"
            :imgMoveLeftPercent="Number(20)"
            :imgHeight="Number(380)"
          />
        </b-col>

        <b-col style="max-width:calc(50% - 8px)">
          <friend-card
            :friend="friends[5]"
            :index=5
            :imgPosition="friends[5].imgPosition"                 
            :height="Number(690)"
            :imgContainerHeight="Number(460)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[6]"
            :index=6
            imgPosition="top"
            :height="Number(598)"
            :imgContainerHeight="Number(392)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[7]"
            :index=7
            imgPosition="left"
            :imgContainerWidth="Number(270)"
            :imgContainerHeight="Number(457)"
            :imgHeight="Number(500)"
            :imgMoveLeftPercent="Number(25)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[8]"
            :index=8
            :imgPosition="friends[8].imgPosition"
            :imgContainerWidth="Number(432)"
            :imgContainerHeight="Number(435)"
            :imgHeight="Number(650)"
            :imgMoveLeftPercent="Number(18)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[9]"
            :index=9
            imgPosition="top"
            :height="Number(682)"
            :imgContainerHeight="Number(435)"
            :imgMoveDownPercent="Number(-8)"
            :imgWidth="Number(800)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col style="max-width:calc(50% - 8px)" class="mr-3">
          <friend-card
            :friend="friends[10]"
            :index=10
            imgPosition="bottom"
            :height="Number(710)"
            :imgContainerHeight="Number(304)"
            :imgHeight="Number(377)"       
          />
        </b-col>

        <b-col style="max-width:calc(50% - 8px)">
          <friend-card
            :friend="friends[11]"
            :index=11
            :imgPosition="friends[11].imgPosition"
            :height="Number(710)"
            :imgContainerHeight="Number(398)"
            :imgMoveLeftPercent="Number(81)"
            :imgHeight="Number(700)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[15]"
            :index=15
            imgPosition="bottom"
            :height="Number(585)"
            :imgContainerHeight="Number(380)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[14]"
            :index=14
            :imgPosition="friends[14].imgPosition"
            :imgContainerHeight="Number(450)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>
      
      <b-row no-gutters class="mb-3">
        <b-col style="max-width:calc(50% - 8px)" class="mr-3">
          <friend-card
            :friend="friends[12]"
            :index=12
            :imgPosition="friends[12].imgPosition"
            :height="Number(823)"
            :imgContainerHeight="Number(446)"
            :imgScaleToContainerWidth="true"
          />
        </b-col>

        <b-col style="max-width:calc(50% - 8px)">
          <friend-card
            :friend="friends[13]"
            :index=13
            :imgPosition="friends[13].imgPosition"
            :height="Number(823)" 
            :imgContainerHeight="Number(452)"       
            :imgScaleToContainerWidth="true"
          />
        </b-col>
      </b-row>

    </b-container>
    <!-- END OF LAYOUT FOR TABLETS -->



    <!-- LAYOUT FOR LANDSCAPE PHONES -->
    <b-container v-if="windowWidth >= 576 && windowWidth < 768" fluid style="max-width:536px;" :style="friendsOpacity" id="friends" class="main-col px-0 mt-4 mb-5">

      <b-row no-gutters>
        <b-col style="max-width:536px;">
          <friend-card
            :friend="friends[0]"
            :index=0
            imgPosition="top"
            :height="Number(544)"
            :imgContainerHeight="Number(317)"
            :imgScaleToContainerWidth="true"
            class="mb-3"
          />

          <friend-card
            :friend="friends[1]"
            :index=1
            imgPosition="left"
            :height="Number(436)"
            :imgContainerWidth="Number(250)"
            :imgHeight="Number(436)"
            :imgMoveLeftPercent="Number(3)"
            class="mb-3"
          />
          
          <friend-card
            :friend="friends[2]"
            :index=2
            imgPosition="right"
            :height="Number(416)"
            :imgContainerWidth="Number(284)"
            :imgHeight="Number(416)"
            :imgMoveLeftPercent="Number(5)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[3]"
            :index=3
            imgPosition="left"
            :height="Number(416)"
            :imgContainerWidth="Number(284)"
            :imgContainerHeight="Number(416)"
            :imgWidth="Number(300)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[4]"
            :index=4
            :imgPosition="friends[4].imgPosition"
            :height="Number(609)"
            :imgContainerHeight="Number(360)"
            :imgScaleToContainerWidth="true"
            class="mb-3"
          />

          <friend-card
            :friend="friends[5]"
            :index=5
            imgPosition="right"                 
            :height="Number(400)"
            :imgContainerHeight="Number(400)"
            :imgContainerWidth="Number(276)"
            :imgHeight="Number(400)"
            :imgMoveLeftPercent="Number(3)"
            class="mb-3"
          />
          
          <friend-card
            :friend="friends[6]"
            :index=6
            imgPosition="top"
            :height="Number(570)"
            :imgContainerHeight="Number(320)"
            :imgHeight="Number(340)"
            :imgMoveLeftPercent="Number(9)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[7]"
            :index=7
            imgPosition="left"
            :imgContainerWidth="Number(268)"
            :imgContainerHeight="Number(457)"
            :imgHeight="Number(500)"
            :imgMoveLeftPercent="Number(46)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[8]"
            :index=8
            :imgPosition="friends[8].imgPosition"
            :imgContainerWidth="Number(268)"
            :imgContainerHeight="Number(457)"
            :imgHeight="Number(530)"
            :imgMoveLeftPercent="Number(32)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[9]"
            :index=9
            imgPosition="top"
            :height="Number(673)"
            :imgContainerHeight="Number(360)"
            :imgMoveLeftPercent="Number(7)"
            :imgWidth="Number(600)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[10]"
            :index=10
            imgPosition="bottom"
            :height="Number(673)"
            :imgContainerHeight="Number(381)"
            :imgMoveDownPercent="Number(-3)"
            :imgScaleToContainerWidth="true"
            class="mb-3"
          />

          <friend-card
            :friend="friends[12]"
            :index=12
            imgPosition="left"
            :imgContainerWidth="Number(268)"
            :imgContainerHeight="Number(458)"
            :imgHeight="Number(480)"
            :imgMoveLeftPercent="Number(20)"
            class="mb-3"
          />
          
          <friend-card
            :friend="friends[13]"
            :index=13
            imgPosition="right"
            :imgContainerWidth="Number(268)"
            :imgContainerHeight="Number(458)"
            :imgHeight="Number(530)"
            :imgMoveLeftPercent="Number(20)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[11]"
            :index=11
            :imgPosition="friends[11].imgPosition"
            :height="Number(604)"
            :imgContainerHeight="Number(398)"
            :imgMoveLeftPercent="Number(25)"
            :imgHeight="Number(700)"
            class="mb-3"
          />          
          
          <friend-card
            :friend="friends[14]"
            :index=14
            :imgPosition="friends[14].imgPosition"
            :imgContainerWidth="Number(268)"
            :imgContainerHeight="Number(457)"
            :imgHeight="Number(457)"
            :imgMoveLeftPercent="Number(5)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[15]"
            :index=15
            imgPosition="bottom"
            :height="Number(588)"
            :imgContainerHeight="Number(340)"
            :imgScaleToContainerWidth="true"
            class="mb-3"
          />
        </b-col>
      </b-row>

    </b-container>
    <!-- END OF LAYOUT FOR LANDSCAPE PHONES -->


    
    <!-- LAYOUT FOR PORTRAIT PHONES -->
    <b-container v-if="windowWidth < 576" fluid style="max-width:536px;width:93%; margin:0 auto;" :style="friendsOpacity" id="friends" class="main-col px-0 mt-4 mb-5">

      <b-row no-gutters>
        <b-col style="max-width:93%; margin:0 auto;">

          <friend-card
            :friend="friends[0]"
            :index=0
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgHeight="440"
            :imgCenterHoriz="true"
            class="mb-3"
          />

          <friend-card
            :friend="friends[1]"
            :index=1
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgScaleToFillContainer="true"
            class="mb-3"
          />
          
          <friend-card
            :friend="friends[2]"
            :index=2
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgScaleToFillContainer="true"
            class="mb-3"
          />

          <friend-card
            :friend="friends[3]"
            :index=3
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgScaleToFillContainer="true"
            :imgMoveDownPercent="-15"
            class="mb-3"
          />

          <friend-card
            :friend="friends[4]"
            :index=4
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgScaleToFillContainer="true"
            :imgCenterHoriz="true"
            class="mb-3"
          />

          <friend-card
            :friend="friends[5]"
            :index=5
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgScaleToFillContainer="true"
            class="mb-3"
          />
          
          <friend-card
            :friend="friends[6]"
            :index=6
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgScaleToFillContainer="true"
            :imgCenterHoriz="true"
            class="mb-3"
          />

          <friend-card
            :friend="friends[7]"
            :index=7
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgHeight="350"
            :imgMoveLeftPercent="12.5"
            class="mb-3"
          />

          <friend-card
            :friend="friends[8]"
            :index=8
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgScaleToFillContainer="true"
            class="mb-3"
          />

          <friend-card
            :friend="friends[9]"
            :index=9
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgScaleToFillContainer="true"
            :imgCenterHoriz="true"
            class="mb-3"
          />

          <friend-card
            :friend="friends[10]"
            :index=10
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgScaleToFillContainer="true"
            class="mb-3"
          />

          <friend-card
            :friend="friends[11]"
            :index=11
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgScaleToFillContainer="true"
            :imgCenterHoriz="true"
            class="mb-3"
          />

          <friend-card
            :friend="friends[12]"
            :index=12
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgScaleToFillContainer="true"
            :imgCenterVert="true"
            class="mb-3"
          />
          
          <friend-card
            :friend="friends[13]"
            :index=13
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgScaleToFillContainer="true"
            :imgMoveDownPercent="-9"
            class="mb-3"
          />  
          
          <friend-card
            :friend="friends[14]"
            :index=14
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgScaleToFillContainer="true"
            class="mb-3"
          />

          <friend-card
            :friend="friends[15]"
            :index=15
            imgPosition="top"
            :imgContainerHeight="Number(300)"
            :imgHeight="400"
            :imgCenterHoriz="true"
            class="mb-3"
          />
        </b-col>
      </b-row>

    </b-container>
    <!-- END OF LAYOUT FOR PORTRAIT PHONES -->



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
import ScrollDownArrow from '../../components/ScrollDownArrow.vue'
import ScrollToTop from '../../components/ScrollToTop.vue'

export default {
  metaInfo() {
    return {
      title: this.$page.MusicalFriends.edges[0].node.pageTitle
    }
  },

  data() {
    return {
      scrollY: 0.0,
      targetPosY: 0.0,
      windowWidth: 0.0,
      windowHeight: 0.0,
      bgImgWidth: 2560.0,
      bgImgHeight: 1380.0
    }
  },

  computed: {
    backgroundImgUrl() {
      return this.$page.MusicalFriends.edges[0].node.backgroundImg
    },
    titleImg() {
      return this.$page.MusicalFriends.edges[0].node.titleImg
    },    
    titleSubText() {
      return this.$page.MusicalFriends.edges[0].node.content
    },
    friends() {
      return this.$page.MusicalFriends.edges[0].node.friends
    },
    scrollTargetPos() {
      // return 0.72 * this.targetPosY
      return this.targetPosY
    },
    friendsOpacity() {
      let css = {}
      css.opacity = this.scrollY < this.scrollTargetPos ? this.scrollY / this.scrollTargetPos : 1.0
      return css
    },
    bgImgAspectRatio() {      
      return this.bgImgHeight > 0 ? this.bgImgWidth / this.bgImgHeight : 0.0
    },
    windowAspectRatio() {
      return this.windowWidth / this.windowHeight
    },
    bgStyles() {
      let css = {}
      css.opacity = this.scrollY < this.scrollTargetPos ? 1.0 - (this.scrollY / this.scrollTargetPos) : 0.0
      if (this.bgImgAspectRatio <= this.windowAspectRatio)
        css.width = this.windowWidth + 'px';
      else
        css.height = this.windowHeight + 'px';
      return css
    },
    paddingTop() {
      return (this.windowHeight / 2) - 150
    },
    headerStyles() {
      let css = {}
      css.opacity = this.bgStyles.opacity
      css.paddingTop = this.paddingTop + 'px'
      return css
    }
  },

  methods: {
    scrollFunction() {
      // console.log('in scroll EventListener');      
      if (this.scrollY != window.pageYOffset) {
        this.scrollY = window.pageYOffset 
        // console.log('this.scrollY = ' + this.scrollY);
        let bodyRect = document.body.getBoundingClientRect()
        let element = document.getElementById('topOfFriends')
        let elemRect = element.getBoundingClientRect()
        this.targetPosY = elemRect.top - bodyRect.top
        // console.log('in scrollFunction, elemRect.top - bodyRect.top = ' + elemRect.top + ' - ' + bodyRect.top + ' = ' + this.targetPosY);
      }
    },
    addScrollListener() {
      // console.log('in addScrollListener');      
      window.addEventListener('scroll', this.scrollFunction);
    }
  },

  mounted() {
    this.addScrollListener()
    
    setTimeout(function(){
      if (window.pageYOffset != 0) {
        window.scrollTo(0, 0); // scroll to top of page (avoid inconsistent behaviour of using browser back button)
        this.scrollY = window.pageYOffset
      }
      let bodyRect = document.body.getBoundingClientRect()
      let element = document.getElementById('topOfFriends')      
      let elemRect = element.getBoundingClientRect()
      this.targetPosY = elemRect.top - bodyRect.top
      // console.log('in mounted setTimeout, elemRect.top - bodyRect.top = ' + elemRect.top + ' - ' + bodyRect.top + ' = ' + this.targetPosY);
    }.bind(this), 500);

    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
      // console.log('in resize EventListener');      
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight

        let bodyRect = document.body.getBoundingClientRect()
        let element = document.getElementById('topOfFriends')
        let elemRect = element.getBoundingClientRect()
        this.targetPosY = elemRect.top - bodyRect.top
        // console.log('in resize, elemRect.top - bodyRect.top = ' + elemRect.top + ' - ' + bodyRect.top + ' = ' + this.targetPosY);
      });
    })
  },

  components: {
    FriendCard,
    ScrollDownArrow,
    ScrollToTop
  },
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Merriweather:900&display=swap');

.layout {
  padding-top: 8px;
}

#bgImg {
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0%);
  width: auto;
  height: auto;
  min-height: 100%;
  min-width: 100%;    
  overflow: hidden;
  z-index: -1;
}

#header {
  text-align: center;
}

#titleImg {
  width: 100%;
  max-width: 1324px;
  min-width: 350px;
  height: auto;
  margin: auto;
  padding-left: 115px;
  padding-right: 115px;
}

#titleSubText {
  color: white;
  font-family: 'Merriweather', serif;
  font-feature-settings: 'liga';
  font-size: 28px;
  font-weight: 900;
  line-height: 40px;
  letter-spacing: 6px;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.29);
  transition: inherit;
}

#scrollDownContainer {
  margin-top: 80px;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  #titleImg {
    padding-left: 50px;
    padding-right: 50px;
  }
  #titleSubText {
    font-size: 16px;
    line-height: 22.85px;
    letter-spacing: 3.4px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  #titleImg {
    padding-left: 75px;
    padding-right: 75px;
  }
  #titleSubText {
    font-size: 20px;
    line-height: 28.5px;
    letter-spacing: 4.3px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  #titleImg {
    padding-left: 100px;
    padding-right: 100px;
  }
  #titleSubText {
    font-size: 24px;
    line-height: 34px;
    letter-spacing: 5.1px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  #titleImg {
    padding-left: 105px;
    padding-right: 105px;
  }
}

</style>
