var knex = require('../db/knex');

module.exports = {

  getUsers: function(){
    return knex('Archers');
  }
}
