
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Games', function(table){
    table.increments('GameID');
    table.integer('MatchID').references('Matches.MatchID').onDelete('CASCADE');
    table.integer('GameNumber');
    table.boolean('GameFinished');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Games');
};
