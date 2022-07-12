 # Server and Router

## Uses :

 > const { server,router } = require( 'server' );


 > router needs list of handlers 
 
Each handler need to call another handler if can't handle.

Start Server : 

> server(PORT,router(handlers))

## Default Handlers:

> const { commonHandlers } = require('server');

commonHandlers contains 

  1. logHandler
  2. errorHandler
  3. parseForm  --> It parse form and add in req.formData