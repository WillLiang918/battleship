import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectTile: function (x, y) {
      this.sendAction('selectTile', x, y);
    }
  }
});