
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Rounds', function(table){
    table.increments('RoundID');
    table.integer('GameID').references('Games.GameID').onDelete('CASCADE');
    table.integer('RoundNumber');
    table.string('FirstShotScore', 1);
    table.string('SecondShotScore', 1);
    table.string('ThirdShotScore', 1);
    table.string('FourthShotScore', 1);
    table.string('FifthShotScore', 1);
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Rounds');
};
