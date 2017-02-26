
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Archers', function(table){
    table.increments('ArcherID');
    table.string('ScreenName');
    table.string('Password');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Archers');
};
