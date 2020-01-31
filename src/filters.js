import Vue from 'vue';
import moment from 'moment';

Vue.filter('formatDate', val => {
  if (!val) {
    return '-';
  }
  const date = val.toDate();
  return moment(date).fromNow();
});