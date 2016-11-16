import Ember from 'ember';

export default Ember.Controller.extend({
  gameStarted: false,
  gameOver: false,
  placeShipText: 'Place your ships!',
  strikeText: 'Select a tile to strike!',
  rows: null,
  playersLastMove: null,
  computersLastMove: null,
  remainingPlayerShips: 10,
  remainingComputerShips: 10,

  gameMessage: function() {
    return this.get('gameStarted') ? this.get('strikeText') : this.get('placeShipText');
  }.property('gameStarted'),

  startingGame: function() {
    if (this.get('model.cells').filterBy('has_player_ship', true).length === 10 && !this.get('gameStarted')) {
      this.set('gameStarted', true);
      swal('The game has started!')
    }
  }.observes('model.cells'),

  buildGrid: function() {
    if (this.get('model')) {
      var rows = [];
      var cells = this.get('model.cells');

      for (let i = 0; i < 5; i++) {
        rows.push(cells.filterBy('position_x', i));
      }

      this.set('rows', rows);
    }
  }.observes('model', 'model.cells'),


  strike: function(x, y) {
    var controller = this;
    var game = this.get('model');
    var gameId = game.get('id');

    game.strike(gameId, x, y).then(function(response) {
      var result = response.result;
      controller.setProperties({
        remainingPlayerShips: response.remaining_player_ships,
        remainingComputerShips: response.remaining_computer_ships,
        playersLastMove: response.players_log,
        computersLastMove: response.computers_log
      });

      controller.set('model.cells', response.cells);

      // TODO: This needs to be refactored.
      if (result) {
        if (result == 'Win') {
          swal({
            title: 'Congratulations',
            text: "You Won!",
            type: 'input',
            showCancelButton: true,
            cancelButtonText: 'Home',
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: 'Submit your initials'
          }, function (inputValue) {

            if (inputValue) {
              game.submitInitials(gameId, inputValue).then(function (response) {
                swal({
                  title: 'Play Again?',
                  showCancelButton: true,
                  cancelButtonText: 'Home',
                  confirmButtonText: 'New Game'
                }, function(isConfirm) {

                  if (isConfirm) {
                    controller.send('createNewGame');
                  } else {
                    controller.resetState();
                    controller.transitionToRoute('home')
                  }
                });
              });
            } else {
              controller.resetState();
              controller.transitionToRoute('home')
            }
          });
        } else if (result == 'Lost') {

          swal({
            title: 'Game Over',
            text: 'You lost.',
            showCancelButton: true,
            cancelButtonText: 'Home',
            confirmButtonText: 'Play Again?',
            closeOnConfirm: true
          }, function (isConfirm) {

            if (isConfirm) {
              controller.send('createNewGame');
            } else {
              controller.resetState();
              controller.transitionToRoute('home')
            }
          });
        }
      }
    }, function(error) {
    });
  },

  placeShip: function(x, y) {
    var controller = this;
    var game = this.get('model');
    var gameId = game.get('id');

    game.placeShip(gameId, x, y).then(function(response) {
      controller.set('model.cells', response.cells);
    });
  },

  resetState: function () {
    this.setProperties({
      gameStarted: false,
      gameOver: false,
      rows: null,
      playersLastMove: null,
      computersLastMove: null,
      remainingPlayerShips: 10,
      remainingComputerShips: 10
    });
  },

  actions: {
    selectTile: function(x, y) {
      if (this.get('gameStarted')) {
        this.strike(x, y);
      } else {
        this.placeShip(x, y);
      }
    },
    
    returnToHome: function () {
      this.resetState();
      this.transitionToRoute('home')
    }
  }
});
