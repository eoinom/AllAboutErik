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
        <!-- <p><span class="text-titles" id="u703734">Musical Credits</span></p> -->
        <p><span class="text-titles">Credits</span></p>
        <p>&nbsp;</p>
        <br>
        <!-- <p><span class="text-main">Home page – Wildwood Flower by John Sebastian</span></p>
        <p><span class="text-main">Roots &amp; Youth – Body and Soul by Coleman Hawkins</span></p>
        <p><span class="text-main">Musical Journey Episodes – Harpoon by John Sebastian</span></p>
        <p><span class="text-main">Musical Friends – Japanese Silky by Norman Greenbaum</span></p>
        <p><span class="text-main">Early Productions – Green Rocky Road by Tim Hardin</span></p>
        <p><span class="text-main">Discography – Brief Synthophonia by Sopwith Camel</span></p>
        <p><span class="text-main">Shorts – Sweet Moments by The Blue Velvet Band</span></p>
        <p><span class="text-main">Travels – Ramblin Man by The Blue Velvet Band</span></p>
        <p><span class="text-main">Collections – Dicky by Edwardo Unz</span></p>
        <p><span class="text-main">Publications – 5 Pennies by Norman Greenbaum</span></p>
        <p><span class="text-main">Archives – Fond Affection by The Blue Velvet Band</span></p>
        <p>&nbsp;</p> -->

        <ul style="list-style-type:none; padding-left:0">
          <li><span class="text-main">Home page – Wildwood Flower by John Sebastian</span></li>
          <li><span class="text-main">Roots &amp; Youth – Body and Soul by Coleman Hawkins</span></li>
          <li><span class="text-main">Musical Journey Episodes – Harpoon by John Sebastian</span></li>
          <li><span class="text-main">Musical Friends – Japanese Silky by Norman Greenbaum</span></li>
          <li><span class="text-main">Early Productions – Green Rocky Road by Tim Hardin</span></li>
          <li><span class="text-main">Discography – Brief Synthophonia by Sopwith Camel</span></li>
          <li><span class="text-main">Shorts – Sweet Moments by The Blue Velvet Band</span></li>
          <li><span class="text-main">Travels – Ramblin Man by The Blue Velvet Band</span></li>
          <li><span class="text-main">Collections – Dicky by Edwardo Unz</span></li>
          <li><span class="text-main">Publications – 5 Pennies by Norman Greenbaum</span></li>
          <li><span class="text-main">Archives – Fond Affection by The Blue Velvet Band</span></li>
        </ul>

        <br>
        <!-- <p><span class="text-titles">VISUAL CREDITS</span></p> -->
        <p><span class="text-main">I want to thank my old buddy Henry Diltz for his contribution of photographs and his terrific long hand script included throughout this website. To all the photographers and musicians whose work I have so freely borrowed I extend my heartfelt thanks.</span></p>
        <br>
        <p>&nbsp;</p>
        <br>
        <p><span class="text-titles">WEBSITE CREDITS</span></p>
        <p>&nbsp;</p>
        <br>
        <!-- <p><span class="text-main">Website Designer: Lindsey Brady</span></p> -->
        <p><span class="text-main">Designer: Lindsey Brady</span></p>
        <br>
        <!-- <p><span class="text-main">Website Developer: Eoin O’Malley</span></p> -->
        <p><span class="text-main">Developer: Eoin O’Malley</span></p>

        <!-- <ul style="list-style-type:none; padding-left:0">
          <li><span class="text-main">Designer: Lindsey Brady</span></li>
          <li><span class="text-main">Developer: Eoin O’Malley</span></li>
        </ul> -->

        <br>
        <p>&nbsp;</p>
        <br>
        <p><span class="text-titles">CONTENT CREDITS</span></p>
        <p>&nbsp;</p>
        <br>
        <p><span class="text-main">Video Editing: Lindsey Brady &amp; Heather Young</span></p>
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
  resize: vertical; /* Allow the user to vertically resize the textarea (not horizontally) */


  color: #91465A;
  background-color: #DDD;
  font-family: Helvetica, Helvetica Neue, Arial, sans-serif;
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
  letter-spacing: 1.25px;
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
