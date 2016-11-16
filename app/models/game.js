import DS from 'ember-data';

export default DS.Model.extend({
  cells: DS.attr(),

  placeShip: function (id, x, y) {
    var adapter = this.store.adapterFor('game');
    var url     = adapter.buildURL('game') + '/place_ship';

    return adapter.ajax(url, 'PUT', {
      data: {
        id: id,
        position_x: x,
        position_y: y
      }
    });
  },
  
  strike: function (id, x, y) {
    var adapter = this.store.adapterFor('game');
    var url     = adapter.buildURL('game') + '/strike';

    return adapter.ajax(url, 'PUT', {
      data: {
        id: id,
        position_x: x,
        position_y: y
      }
    });
  },

  submitInitials: function (id, initials) {
    var adapter = this.store.adapterFor('game');
    var url     = adapter.buildURL('game') + '/submit_initials';

    return adapter.ajax(url, 'PUT', {
      data: {
        id: id,
        initials: initials
      }
    });
  }
});
