import Vue from 'vue';
import './style.scss';

import genres from './util/genres.js';

import VueResource from 'vue-resource';
Vue.use(VueResource); //install module to instance method

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', {
  get() { return this.$root.moment }
});

import { checkFilter } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {
  get() { return this.$root.bus }
});

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes';
const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment(),
    bus
  },
  methods: {

  },
  created() {
    this.$http.get('/api').then(response => {
      this.movies = response.body;
    });
    this.$bus.$on('check-filter', checkFilter.bind(this));
  },
  router
});
