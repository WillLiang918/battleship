import Ember from 'ember';

export default Ember.Component.extend({
  className: function() {
    var cell = this.get('cell');
    if (cell.checked && !cell.available) {
      return 'hit';
    } else if (cell.checked) {
      return 'checked';
    }
  }.property('cell'),
  
  imgSource: function () {
    if (this.get('cell').has_player_ship) {
      return "http://icons.iconarchive.com/icons/unclebob/spanish-travel/48/ship-icon.png";
    }
  }.property('cell'),
  
  actions: {
    selectTile: function(x, y) {
      this.sendAction('selectTile', x, y);
    }
  }
});