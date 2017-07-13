<template lang="html">
  <div id="movie-list">
    <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}</div>
  </div>
</template>

<script>
  import genres from '../util/genres.js';
  export default {
  data() {
    return {
      movies: [
        { title: 'Pulp Fiction', genre: genres.CRIME },
        { title: 'Home Alone', genre: genres.COMEDY },
        { title: 'Austin Powers', genre: genres.COMEDY }
      ]
    };
  },
  props: ['genre', 'time'],
  methods: {
    moviePassesGenresFilter(movie) {
      if (!this.genre.length) return true;
      this.genre.find(genre => movie.genre === genre);
    }
  },
  computed: {
    filteredMovies() {
      //return this.movies.filter(this.moviePassesGenresFilter);
      if (!this.genre.length) return this.movies;
      return this.movies.filter(movie => this.genre.find(genre => movie.genre === genre));
    }
  }
}
</script>

<style lang="css">
</style>
