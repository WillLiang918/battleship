import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'https://battleship-rails-api.herokuapp.com'
});