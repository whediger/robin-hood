
exports.seed = function(knex, Promise) {
  return knex('Archers').del()
  .then(function(){
    return knex('Matches').del();
  }).then(function(){
    return knex('Games').del();
  }).then(function(){
    return knex('Rounds').del();
  });
};
