// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

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
}
