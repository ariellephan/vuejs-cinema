<template lang="html">
  <div class="movie">
    <div class="movie-col-left">
      <img v-bind:src="movie.Poster" alt="">
    </div>
    <div class="movie-col-right">
      <div class="movie-title">
        <router-link :to="{ name: 'movie', params: { id: movie.imdbID} }">
          <h2>{{ movie.Title }}</h2>
        </router-link>
        <span class="movie-rating">{{ movie.Rated }}</span>
      </div>
      <div class="movie-sessions">
        <div class="session-time-wrapper" v-for="session in filterSessions(sessions)">
          <div class="session-time">
            {{ formatSessionTime(session.time) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import times from '../util/times.js';
  export default {
    props: ['movie', 'sessions', 'day', 'time'],
    methods: {
      formatSessionTime(raw) {
        return this.$moment(raw).format('h:mm A');
      },
      filterSessions(sessions) {
        return sessions.filter(this.sessionPassesTimeFilter);
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
    }
  }
</script>

<style lang="css">
</style>
