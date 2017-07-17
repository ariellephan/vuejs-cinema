<template lang="html">
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item v-for="movie in filteredMovies" class="movie"
        v-bind:movie="movie.movie"
        v-bind:sessions="movie.sessions"
        v-bind:day="day"
        v-bind:time="time">
      </movie-item>
    </div>
    <div v-else-if="movies.length">
      No Results.
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres.js';
  import times from '../util/times.js';
  import MovieItem from './MovieItem.vue';

  export default {
  props: ['genre', 'time', 'movies', 'day'],
  methods: {
    moviePassesGenresFilter(movie) {
      if (!this.genre.length) {
        return true;
      } else {
        let movieGenres = movie.movie.Genre.split(", ");
        let matched = true;
        this.genre.forEach(genre => {
          if (!movieGenres.includes(genre)) {
            matched = false;
          }
        });
        return matched;
      }
      //this.genre.find(genre => movie.genre === genre);
    },
    sessionPassesTimeFilter(session) {
      if (!this.day.isSame(this.$moment(session.time), 'day')) {
        return false;
      } else if (this.time.length  === 0 || this.time.length === 2) {//check both or unchecked both
        return true;
      } else if (this.time[0] === times.AFTER_6PM) {
        return this.$moment(session.time).hour() >= 18;
      } else {
        return this.$moment(session.time).hour() < 18;
      }
    }
  },
  components: {
    MovieItem
  },
  computed: {
    filteredMovies() {
      return this.movies
              .filter(this.moviePassesGenresFilter)
              .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
      // if (!this.genre.length) return this.movies;
      // return this.movies.filter(movie => this.genre.find(genre => movie.genre === genre));
    }
  },
  created() {
    console.log(this.$moment);
  }
}
</script>

<style lang="css">
</style>
