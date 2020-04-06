<template>
  <Layout>
    <div class="container">
      
      <g-image :src="titleImg" id="titleImg" class="py-5" />

      <span v-html="mainText" class="text-main" />
      
      <!-- CONTACT FORM -->
      <div class="form-container mb-5">
        <form name="contact" method="POST" netlify data-netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="contact" /> <!-- Hidden honeypot field to prevent against bot spam -->

          <label for="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name..">

          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Your email..">

          <label for="message">Message</label>
          <textarea id="message" name="message" placeholder="Your message.." style="height:200px"></textarea>

          <input type="submit" value="Submit">
        </form>
      </div>

      <!-- CREDITS -->
      <div class="pb-5">
        <p class="text-titles">Credits</p>
        <br>

        <ul style="list-style-type:none; padding-left:0">
          <li v-for="(credit, i) in musicalCredits" :key="'credit'+i">
            <span class="text-main">{{ credit.pageName }} – {{ credit.trackTitle }} by {{ credit.artist }}</span>
          </li>
        </ul>

        <br>
        <p class="text-main">{{ musicalCreditsText }}</p>
        <br><br>
        
        <div v-for="(creditSection, i) in otherCredits" :key="'creditSection'+i">
          <p class="text-titles">{{ creditSection.heading }}</p>
          <br>
          <span v-html="renderMarkdown(creditSection.text)" class="text-main" />
          <br>
        </div>

      </div>    
    </div>

  	<!-- BACKGROUND VIDEO -->
    <video autoplay loop muted id="contactBgVideo">
      <source :src="bgVideo.videoSrcWebm" type="video/webm">
      <source :src="bgVideo.videoSrcMP4" type="video/mp4">
    </video>

  </Layout>
</template>


<page-query>
{
  Contact: allContact {
    edges {
      node {
        id
        pageTitle
        headingImg
        content
        musicalCreditsHeading
        musicalCredits {
          pageName
          trackTitle
          artist
        }
        musicalCreditsText
        otherCredits {
          heading
          text
        }
        bgVideo {
          videoSrcWebm
          videoSrcMP4
        }
      }
    }
  }	
}
</page-query>


<script>
const MarkdownIt = require('markdown-it')

export default {
  metaInfo() {
    return {
      title: this.node.pageTitle
    }
  },

  computed: {
    node() {
      return this.$page.Contact.edges[0].node
    },
    titleImg() {
      return this.node.headingImg
    },
    mainText(){
      return this.node.content
    },
    musicalCreditsHeading(){
      return this.node.musicalCreditsHeading
    },
    musicalCredits(){
      return this.node.musicalCredits
    },
    musicalCreditsText(){
      return this.node.musicalCreditsText
    },
    otherCredits(){
      return this.node.otherCredits
    },
    bgVideo(){
      return this.node.bgVideo
    }
  },

  methods: {    
    renderMarkdown(text) {
      const md = new MarkdownIt()
      return md.render(text) 
    }
  }
}
</script>


<style lang="scss" scoped>

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

#contactBgVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  opacity: 0.22;
  z-index: -1;
}

.container {
  max-width: 900px;
}

#titleImg {
  display: block;
  width: 100%;
  height: auto;
  max-width: 800px;
  margin: 0 auto;
}

/* Form adapted from https://www.w3schools.com/howto/howto_css_contact_form.asp */

/* Add a background color and some padding around the form */
.form-container {
  // border-radius: 5px;
  // background-color: #f2f2f2;
  background-color: transparent;
  // padding: 20px;
  padding: 20px 0;
}

/* Style inputs with type="text", select elements and textareas */
input[type=text], input[type=email], textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */ 
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical; /* Allow the user to vertically resize the textarea (not horizontally) */


  color: #91465A;
  background-color: #DDD;
  font-family: Helvetica, "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  font-style: italic;
}
input[type=text]:hover, input[type=email]:hover, textarea:hover,
input[type=text]:focus, input[type=email]:focus, textarea:focus {
  background-color: #FFF;
}

/* Style the submit button with a specific background color etc */
input[type=submit] {
  background-color: #406689;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'NeueHaasGroteskText Pro55', sans-serif;
  font-weight: 400;
  font-size: 1.125em;
  // letter-spacing: 1.25px;
  letter-spacing: 5px;
  text-transform: uppercase;
}

/* When moving the mouse over the submit button, add a darker green color */
input[type=submit]:hover {
  // opacity: 0.65;
  color: #EECF49;
  // background-color: #AFBBBD;
}

label {
  color: #406689;
  font-family: 'NeueHaasGroteskText Pro55', sans-serif;
  font-weight: 400;
  // font-size: 1.25em;

  text-shadow: 6px 6px 8px rgba(0,0,0,0.5);
  font-size: 1.3125rem;
  line-height: 1.3125rem;
  letter-spacing: 5px;
  text-transform: uppercase;
}

p {
  font-family: 'NeueHaasGroteskText Pro55', sans-serif;
  font-feature-settings: 'liga';
  font-size: 14px;
  line-height: 0px;
  text-shadow: 6px 6px 8px rgba(0,0,0,0.5);
  margin: 0px;
  padding: 0px;
}

.text-titles {
  color: #F2F2F2;
  font-family: 'NeueHaasGroteskText Pro55', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 21px;
  letter-spacing: 5px;
  line-height: 25px;
  text-shadow: 6px 6px 8px rgba(0,0,0,0.5);
  text-transform: uppercase;
}

.text-main {
  color: #F2F2F2;
  font-family: 'NeueHaasGroteskText Pro55', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 1px;
  line-height: 24px;
  text-shadow: 6px 6px 8px rgba(0,0,0,0.5);
}

li {
  padding: 4px 0;
}

</style>
