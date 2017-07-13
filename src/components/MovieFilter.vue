<template lang="html">
  <div id="movie-filter">
    <h2>Filter Results</h2>
    <div class="filter-group">
      <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres.js';
  export default {
    data() {
      return {
        genres
      }
    },
    methods: {
      checkFilter(category, title, checked) {
        this.$emit('check-filter', category, title, checked);
      }
    },
    components: {
      'check-filter': {
        data() {
          return {
            checked: false
          }
        },
        props: ['title'],
        template: `<div v-bind:class="{ 'check-filter': true, active: checked}" v-on:click="checkFilter">
          <span class="checkbox"></span>
          <span class="check-filter-title">{{ title }}</span>
        </div>`,
        methods: {
          checkFilter() {
            this.checked = !this.checked;
            this.$emit("check-filter", 'genre', this.title, this.checked);
          }
        }
      }
    }
  }
</script>

<style lang="css">
</style>
