<template>
  <Layout class="pb-5">
    <img :src="backgroundImgUrl" id="bgImg" :style="bgOpacity" />

    <header id="header" :style="headerStyles">
      <g-image :src="titleImg" id="titleImg" />
      <span v-html="titleSubText" id="titleSubText" />
      <div id="scrollDownContainer">
        <ScrollDownArrow
          scrollToElement="#friends"
        />
      </div>
    </header>

    <!-- LAYOUT FOR LARGE DESKTOPS -->
    <b-container v-if="windowWidth >= 1830" fluid style="max-width:1540px;" :style="friendsOpacity" id="friends" class="main-col px-0 mt-4 mb-5">

      <b-row no-gutters>
        <b-col style="max-width:652px" class="mr-3">

          <friend-card
            :friend="friends[0]"
            :imgPosition="friends[0].imgPosition"
            :height="Number(544)"
            :imgContainerHeight="Number(333)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[1]"
            :imgPosition="friends[1].imgPosition"
            :imgContainerWidth="Number(370)"
            :imgContainerHeight="Number(442)"
            :imgHeight="Number(442)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[2]"
            :imgPosition="friends[2].imgPosition"
            :imgContainerWidth="Number(359)"
            :imgContainerHeight="Number(384)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[3]"
            :imgPosition="friends[3].imgPosition"
            :height="Number(812)"
            :imgContainerHeight="Number(622)"
            :imgMoveDownPercent="Number(-27)"
            imgScaleToContainerWidth=true
            class="mb-3"
          />
        </b-col>

        <b-col style="max-width:872px">
          <b-row no-gutters class="mb-3">
            <b-col style="max-width:431px" class="mr-3">
              <friend-card
                :friend="friends[4]"
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
                :imgPosition="friends[6].imgPosition"
                :imgContainerWidth="Number(547)"
                :imgContainerHeight="Number(441)"
                :imgMoveLeftPercent="Number(26)"
                class="mb-3"
              />

              <friend-card
                :friend="friends[7]"
                :imgPosition="friends[7].imgPosition"
                :height="Number(648)"
                :imgContainerHeight="Number(457)"
                imgScaleToContainerWidth=true
                class="mb-3"
              />

              <friend-card
                :friend="friends[8]"
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
            :imgPosition="friends[11].imgPosition"
            :height="Number(503)"
            :imgContainerWidth="Number(731)"
            :imgContainerHeight="Number(306)"
            imgScaleToContainerWidth=true
          />
        </b-col>
      </b-row>

      <b-row no-gutters>
        <b-col style="max-width:388.5px" class="mb-3 mr-3">
          <friend-card
            :friend="friends[12]"
            :imgPosition="friends[12].imgPosition"
            :imgContainerHeight="Number(538)"
            :imgMoveLeftPercent="Number(8)"
            :height="Number(927.33)"
          />
        </b-col>

        <b-col style="max-width:388.5px" class="mb-3 mr-3">
          <friend-card
            :friend="friends[13]"
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
                :imgPosition="friends[14].imgPosition"
                :imgContainerWidth="Number(400)"
                :imgContainerHeight="Number(408)"
              />
            </b-col>

            <b-col class="mb-3">
              <friend-card
                :friend="friends[15]"
                :imgPosition="friends[15].imgPosition"
                :imgContainerHeight="Number(310)"
                :imgContainerWidth="Number(731)"
                imgScaleToContainerWidth=true
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
            :imgPosition="friends[0].imgPosition"
            :height="Number(544)"
            :imgContainerHeight="Number(333)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[1]"
            :imgPosition="friends[1].imgPosition"
            :imgContainerWidth="Number(370)"
            :imgContainerHeight="Number(442)"
            :imgHeight="Number(442)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[2]"
            :imgPosition="friends[2].imgPosition"
            :imgContainerWidth="Number(359)"
            :imgContainerHeight="Number(404)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[3]"
            :imgPosition="friends[3].imgPosition"
            :height="Number(812)"
            :imgContainerHeight="Number(622)"
            :imgMoveDownPercent="Number(-27)"
            imgScaleToContainerWidth=true
            class="mb-3"
          />
        </b-col>

        <b-col style="max-width:547px">
          <friend-card
            :friend="friends[4]"
            :imgPosition="friends[4].imgPosition"
            :height="Number(663)"
            :imgContainerHeight="Number(416)"
            :imgMoveLeftPercent="Number(10)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[5]"
            imgPosition="right" 
            :imgContainerHeight="Number(442)"
            :imgHeight="Number(442)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[6]"
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
            :imgPosition="friends[11].imgPosition"
            :height="Number(503)"
            :imgContainerWidth="Number(546)"
            :imgContainerHeight="Number(280)"
            imgScaleToContainerWidth=true
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3 mt-0">
        <b-col style="max-width:1215px">
          <friend-card
            :friend="friends[15]"
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
            :imgPosition="friends[12].imgPosition"
            :height="Number(927.33)"
            :imgContainerHeight="Number(538)"
            :imgMoveLeftPercent="Number(8)"
          />
        </b-col>

        <b-col style="max-width:388.5px" class="mr-3">
          <friend-card
            :friend="friends[13]"
            :imgPosition="friends[13].imgPosition"
            :imgContainerHeight="Number(581)"
            :height="Number(927.33)"
            :imgMoveLeftPercent="Number(6)"
          />
        </b-col>

        <b-col style="max-width:438px">
          <friend-card
            :friend="friends[14]"
            imgPosition="top"
            :imgContainerHeight="Number(600)"
            :height="Number(927.33)"
            :imgMoveLeftPercent="Number(0)"
            imgScaleToContainerWidth=true
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
            :imgPosition="friends[5].imgPosition"                 
            :height="Number(690)"
            :imgContainerHeight="Number(460)"
            imgScaleToContainerWidth=true
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px" class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[6]"
            imgPosition="top"
            :height="615"
            :imgContainerWidth="Number(832)"
            :imgContainerHeight="Number(410)"
            :imgMoveLeftPercent="Number(0)"
            :imgMoveDownPercent="Number(-3)"
            imgScaleToContainerWidth=true
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px" class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[7]"
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
            imgPosition="bottom"
            :height="Number(585)"
            :imgContainerWidth="Number(832)"
            :imgContainerHeight="Number(400)"
            :imgMoveDownPercent="Number(0)"
            imgScaleToContainerWidth=true
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px" class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[14]"
            :imgPosition="friends[14].imgPosition"
            :imgContainerWidth="Number(406)"
            :imgContainerHeight="Number(450)"
            imgScaleToContainerWidth=true
          />
        </b-col>
      </b-row>

      <b-row no-gutters style="max-width:832px" class="mb-3">
        <b-col style="max-width:408px" class="mr-3">
          <friend-card
            :friend="friends[12]"
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
            imgPosition="top"
            :height="Number(544)"
            :imgContainerHeight="Number(355)"
            imgScaleToContainerWidth=true
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col style="max-width:356px" class="mr-3">
          <friend-card
            :friend="friends[1]"
            imgPosition="top"
            :height="Number(750)"
            :imgContainerWidth="Number(356)"
            :imgContainerHeight="Number(376)"
            imgScaleToContainerWidth=true
          />
        </b-col>

        <b-col style="max-width:356px">
          <friend-card
            :friend="friends[2]"
            imgPosition="bottom"
            :height="Number(750)"
            :imgContainerWidth="Number(356)"
            :imgContainerHeight="Number(440)"
            imgScaleToContainerWidth=true
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[3]"
            imgPosition="left"
            :height="Number(622)"
            :imgContainerHeight="Number(622)"
            :imgContainerWidth="Number(460)"
            :imgWidth="Number(480)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col style="max-width:356px" class="mr-3">
          <friend-card
            :friend="friends[4]"
            :imgPosition="friends[4].imgPosition"
            :height="Number(690)"
            :imgContainerHeight="Number(340)"
            :imgMoveLeftPercent="Number(20)"
            :imgHeight="Number(380)"
          />
        </b-col>

        <b-col style="max-width:356px">
          <friend-card
            :friend="friends[5]"
            :imgPosition="friends[5].imgPosition"                 
            :height="Number(690)"
            :imgContainerHeight="Number(460)"
            imgScaleToContainerWidth=true
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[6]"
            imgPosition="top"
            :height="Number(598)"
            :imgContainerHeight="Number(392)"
            imgScaleToContainerWidth=true
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[7]"
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
            imgPosition="top"
            :height="Number(682)"
            :imgContainerHeight="Number(435)"
            :imgMoveDownPercent="Number(-8)"
            :imgWidth="Number(800)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col style="max-width:356px" class="mr-3">
          <friend-card
            :friend="friends[10]"
            imgPosition="bottom"
            :height="Number(690)"
            :imgContainerHeight="Number(316)"
            :imgWidth="Number(420)"       
          />
        </b-col>

        <b-col style="max-width:356px">
          <friend-card
            :friend="friends[11]"
            :imgPosition="friends[11].imgPosition"
            :height="Number(690)"
            :imgContainerHeight="Number(398)"
            :imgMoveLeftPercent="Number(82)"
            :imgHeight="Number(700)"
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[15]"
            imgPosition="bottom"
            :height="Number(585)"
            :imgContainerHeight="Number(380)"
            imgScaleToContainerWidth=true
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col>
          <friend-card
            :friend="friends[14]"
            :imgPosition="friends[14].imgPosition"
            :imgContainerHeight="Number(450)"
            imgScaleToContainerWidth=true
          />
        </b-col>
      </b-row>

      <b-row no-gutters class="mb-3">
        <b-col style="max-width:356px" class="mr-3">
          <friend-card
            :friend="friends[12]"
            :imgPosition="friends[12].imgPosition"
            :height="Number(914)"
            :imgContainerHeight="Number(538)"
            :imgMoveLeftPercent="Number(10)"
          />
        </b-col>

        <b-col style="max-width:356px">
          <friend-card
            :friend="friends[13]"
            :imgPosition="friends[13].imgPosition"
            :height="Number(914)"
            :imgContainerHeight="Number(561)"
            :imgMoveLeftPercent="Number(10)"
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
            imgPosition="top"
            :height="Number(544)"
            :imgContainerHeight="Number(317)"
            imgScaleToContainerWidth=true
            class="mb-3"
          />

          <friend-card
            :friend="friends[1]"
            imgPosition="left"
            :height="Number(436)"
            :imgContainerWidth="Number(250)"
            :imgHeight="Number(436)"
            :imgMoveLeftPercent="Number(3)"
            class="mb-3"
          />
          
          <friend-card
            :friend="friends[2]"
            imgPosition="right"
            :height="Number(416)"
            :imgContainerWidth="Number(284)"
            :imgHeight="Number(416)"
            :imgMoveLeftPercent="Number(5)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[3]"
            imgPosition="left"
            :height="Number(416)"
            :imgContainerWidth="Number(284)"
            :imgContainerHeight="Number(416)"
            :imgWidth="Number(300)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[4]"
            :imgPosition="friends[4].imgPosition"
            :height="Number(609)"
            :imgContainerHeight="Number(360)"
            imgScaleToContainerWidth=true
            class="mb-3"
          />

          <friend-card
            :friend="friends[5]"
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
            imgPosition="top"
            :height="Number(570)"
            :imgContainerHeight="Number(320)"
            :imgHeight="Number(340)"
            :imgMoveLeftPercent="Number(9)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[7]"
            imgPosition="left"
            :imgContainerWidth="Number(268)"
            :imgContainerHeight="Number(457)"
            :imgHeight="Number(500)"
            :imgMoveLeftPercent="Number(46)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[8]"
            :imgPosition="friends[8].imgPosition"
            :imgContainerWidth="Number(268)"
            :imgContainerHeight="Number(457)"
            :imgHeight="Number(530)"
            :imgMoveLeftPercent="Number(32)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[9]"
            imgPosition="top"
            :height="Number(673)"
            :imgContainerHeight="Number(360)"
            :imgMoveLeftPercent="Number(7)"
            :imgWidth="Number(600)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[10]"
            imgPosition="bottom"
            :height="Number(673)"
            :imgContainerHeight="Number(381)"
            :imgMoveDownPercent="Number(-3)"
            imgScaleToContainerWidth=true
            class="mb-3"
          />

          <friend-card
            :friend="friends[12]"
            imgPosition="left"
            :imgContainerWidth="Number(268)"
            :imgContainerHeight="Number(458)"
            :imgHeight="Number(480)"
            :imgMoveLeftPercent="Number(20)"
            class="mb-3"
          />
          
          <friend-card
            :friend="friends[13]"
            imgPosition="right"
            :imgContainerWidth="Number(268)"
            :imgContainerHeight="Number(458)"
            :imgHeight="Number(530)"
            :imgMoveLeftPercent="Number(20)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[11]"
            :imgPosition="friends[11].imgPosition"
            :height="Number(604)"
            :imgContainerHeight="Number(398)"
            :imgMoveLeftPercent="Number(25)"
            :imgHeight="Number(700)"
            class="mb-3"
          />          
          
          <friend-card
            :friend="friends[14]"
            :imgPosition="friends[14].imgPosition"
            :imgContainerWidth="Number(268)"
            :imgContainerHeight="Number(457)"
            :imgHeight="Number(457)"
            :imgMoveLeftPercent="Number(5)"
            class="mb-3"
          />

          <friend-card
            :friend="friends[15]"
            imgPosition="bottom"
            :height="Number(588)"
            :imgContainerHeight="Number(340)"
            imgScaleToContainerWidth=true
            class="mb-3"
          />
        </b-col>
      </b-row>

    </b-container>
    <!-- END OF LAYOUT FOR LANDSCAPE PHONES -->


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
      windowWidth: 0.0,
      windowHeight: 0.0,
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
    friendsOpacity() {
      let css = {}
      css.opacity = this.scrollY < 700 ? this.scrollY / 700 : 1.0
      return css
    },
    bgOpacity() {
      let css = {}
      css.opacity = this.scrollY < 700 ? 1.0 - (this.scrollY / 700) : 0.0
      return css
    },
    headerStyles() {
      let css = {}
      css.opacity = this.bgOpacity.opacity
      css.paddingTop = ((this.windowHeight / 2) - 150) + 'px'
      return css
    }
  },

  methods: {
  },

  mounted() {
    this.scrollY = window.pageYOffset 
    window.addEventListener('scroll', () => {
      if (this.scrollY != window.pageYOffset) {
        this.scrollY = window.pageYOffset     
      }
    });

    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight
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
  min-width: 100%;
  max-height: 100%;
  /* top: 0;
  left: 0;
  right: 0;
  margin: 0 auto; */

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}

#header {
  text-align: center;
  /* margin-top: 480px; */
}

#titleImg {
  width: 100%;
  max-width: 1094px;
  min-width: 350px;
  height: auto;
  margin: auto;
  padding-left: 150px;
  padding-right: 150px;
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
  

}

</style>
