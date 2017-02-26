
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Matches', function(table){
    table.increments('MatchID');
    table.integer('ArcherID').references('Archers.ArcherID').onDelete('CASCADE');
    table.timestamp('DateTime').defaultTo(knex.fn.now());
    table.string('ScoreKeeper');
    table.string('Location');
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Matches');
};
