// Ref: https://alligator.io/vuejs/global-event-bus/
// Global event bus - used to get unrelated parts of an application to talk to each other (inform of certain events)

import Vue from 'vue'
export const EventBus = new Vue()