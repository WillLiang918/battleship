import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createNewGame: function () {
      var game = this.store.createRecord('game');
      var route = this;
      
      this.controller.resetState();

      game.save().then(function (response) {
        route.transitionTo('games', response.id)
      });
    }
  }
});
