import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var adapter = this.store.adapterFor('game');
    var url = adapter.buildURL('game') + '/leaderboard';

    return adapter.ajax(url, 'GET');
  },

  actions: {
    createNewGame: function() {
      var game = this.store.createRecord('game');
      var route = this;

      game.save().then(function(response) {
        route.transitionTo('games', response.id)
      });
    },
    
    goToGame: function (id) {
      this.transitionTo('games', id)
    }
  }
});
