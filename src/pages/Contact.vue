<template>
  <Layout>

    <div class="container">
      
      <!-- <g-image :src="titleImg" id="titleImg" /> -->
      <g-image src="https://res.cloudinary.com/all-about-erik/image/upload/v1586088192/Contact/contact-and-credits_lgaabq.png" id="titleImg" class="py-5" />

      <p class="text-main">Please use this form to send any comments or questions about the website or if you want to get in touch.</p>
      
      <div class="form-container mb-5">
        <form name="contact" method="POST" netlify data-netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="contact" /> <!-- Hidden honeypot field to prevent against bot spam -->

          <label for="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name..">

          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Your email..">

          <!-- The default subject for all form notifications is as follows:
          Form submission from {YOUR-FORM-NAME} form
          To override this, add a subject field to your form, and the value of that field will be used for the notification email subject. 
          This field does not need to be visible to your users. -->
          <!-- <label v-show="false" for="subject">Subject</label> -->
          <!-- <textarea v-show="false" id="subject" name="subject" placeholder="Your subject.." style="height:50px"></textarea> -->

          <label for="message">Message</label>
          <textarea id="message" name="message" placeholder="Your message.." style="height:200px"></textarea>

          <input type="submit" value="Submit">

        </form>
      </div>


      <div class="pb-5">
        <p id="u703734-2"><span class="text-titles" id="u703734">Musical Credits</span></p>
        <p id="u703734-3">&nbsp;</p>
        <br>
        <p id="u703734-5"><span class="text-main" id="u703734-4">Home page – Wildwood Flower by John Sebastian</span></p>
        <p id="u703734-7"><span class="text-main" id="u703734-6">Roots &amp; Youth – Body and Soul by Coleman Hawkins</span></p>
        <p id="u703734-9"><span class="text-main" id="u703734-8">Musical Journey Episodes – Harpoon by John Sebastian</span></p>
        <p id="u703734-11"><span class="text-main" id="u703734-10">Musical Friends – Japanese Silky by Norman Greenbaum</span></p>
        <p id="u703734-13"><span class="text-main" id="u703734-12">Early Productions – Green Rocky Road by Tim Hardin</span></p>
        <p id="u703734-15"><span class="text-main" id="u703734-14">Discography – Brief Synthophonia by Sopwith Camel</span></p>
        <p id="u703734-17"><span class="text-main" id="u703734-16">Shorts – Sweet Moments by The Blue Velvet Band</span></p>
        <p id="u703734-19"><span class="text-main" id="u703734-18">Travels – Ramblin Man by The Blue Velvet Band</span></p>
        <p id="u703734-21"><span class="text-main" id="u703734-20">Collections – Dicky by Edwardo Unz</span></p>
        <p id="u703734-23"><span class="text-main" id="u703734-22">Publications – 5 Pennies by Norman Greenbaum</span></p>
        <p id="u703734-25"><span class="text-main" id="u703734-24">Archives – Fond Affection by The Blue Velvet Band</span></p>
        <p id="u703734-26">&nbsp;</p>
        <br>
        <p id="u703734-28"><span class="text-titles" id="u703734-27">VISUAL Credits</span></p>
        <p>&nbsp;</p>
        <br>
        <p id="u703734-31"><span class="text-main" id="u703734-30">I want to thank my old buddy Henry Diltz for his contribution of photographs and his terrific long hand script included throughout this website. I want to extend my appreciation to all the other photographers whose work I borrowed for this project.</span></p>
        <p>&nbsp;</p>
        <br>
        <p id="u703734-33">&nbsp;</p>
        <br>
        <p id="u703734-35"><span class="text-titles" id="u703734-34">WEBSITE Credits</span></p>
        <p>&nbsp;</p>
        <br>
        <p id="u703734-38"><span class="text-main" id="u703734-37">Website Designer: Lindsey Brady</span></p>
        <p id="u703734-39">&nbsp;</p>
        <br>
        <p id="u703734-41"><span class="text-main" id="u703734-40">Website Developer: Eoin O’Malley</span></p>
        <p>&nbsp;</p>
        <br>
        <p id="u703734-44"><span class="text-titles" id="u703734-43">CONTENT Credits</span></p>
        <p id="u703734-45">&nbsp;</p>
        <br>
        <p id="u703734-47"><span class="text-main" id="u703734-46">Video Editing: Lindsey Brady &amp; Heather Young</span></p>
        <p id="u703734-48">&nbsp;</p>
        <br>
        <p id="u703734-50"><span class="text-main" id="u703734-49">To all the photographers and musicians whose work I have so freely borrowed I extend my heartfelt thanks.</span></p>
      </div>    
    </div>


    <video autoplay loop muted id="contactBgVideo">
      <!-- <source src="somevideo.webm" type="video/webm"> -->
      <source src="https://res.cloudinary.com/all-about-erik/video/upload/v1586089708/Contact/water-3_kygpep.mp4" type="video/mp4">
    </video>

  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Contact'
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
  resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
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
  letter-spacing: 1.25px;
  // text-transform: uppercase;
}

/* When moving the mouse over the submit button, add a darker green color */
input[type=submit]:hover {
  opacity: 0.65;
}

label {
  font-family: 'NeueHaasGroteskText Pro55', sans-serif;
  color: #406689;
  font-size: 1.25em;
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

</style>
