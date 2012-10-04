var connect = require('connect');

connect()
  // disabled compress for development where data size isn't enough to make it worth
  // .use( connect.compress() )
  .use( connect.logger() )
  .use( connect.static( __dirname + '/') )
  // also experiencing worse performance in dev while using in-memory caching
  // .use( connect.staticCache() )
  .listen( 3000 );