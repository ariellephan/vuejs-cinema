<template lang="html">
  <div class="" id="detail" v-if="movie">
    <movie-item v-bind:movie="movie.movie" v-bind:sessions="[]"></movie-item>
  </div>
  <div class="" v-else>

  </div>
</template>

<script>
import MovieItem from './MovieItem.vue';
export default {
  props: ['movies'],
  computed: {
    movie() {
      let movie = this.movies.find(movie => movie.id === this.$route.params.id);
      return movie ? movie : null;
    }
  },
  components: {
    MovieItem
  }
}
</script>

<style lang="css">
</style>
