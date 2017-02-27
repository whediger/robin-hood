
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Archers').del()
    .then(function () {
      return knex('Archers').insert([
        {ScreenName: 'JoeBlow', Password: 'open'},
        {ScreenName: 'SallyMae', Password: 'open'},
        {ScreenName: 'ScreenName', Password: 'open'}
      ]);
    });
};
