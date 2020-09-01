// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'  (import happens in custom.scss now instead)
import 'bootstrap-vue/dist/bootstrap-vue.css'
import KsVueFullpage from '~/components/ks-vue-fullpage.js'   // copied js page into project and made some custom modifications to try fix touchpad scrolling issue (skipping sections)
import 'ks-vue-fullpage/dist/ks-vue-fullpage.min.css'
import '~/assets/styles.css'
import '~/assets/custom.scss'


export default function (Vue, { router, head, isClient, appOptions }) {
  // for getting page leave transitions to work (https://github.com/gridsome/gridsome/issues/24)
  appOptions.render = h =>
    h(
      "transition",
      { props: { name: "page" } },
      // The router-view component as defined in 0.5.4
      [h("router-view", { attrs: { id: "app" } })]
    );
  
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.use(BootstrapVue, {
    breakpoints: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
  })

  // ks-vue-fullpage: (ref: https://github.com/pirony/ks-vue-fullpage)
  Vue.use(KsVueFullpage)

  // vue-scrollto (ref: https://github.com/rigor789/vue-scrollto)
  const VueScrollTo = require('vue-scrollto')
  Vue.use(VueScrollTo)

  // Add a meta tag
  head.meta.push({
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
  })
}