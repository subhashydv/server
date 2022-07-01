 # Server and Router

## Uses :

 > const { server,router } = require( 'server' );


 > router needs list of handlers 
 
Each handler need to call another handler if can't handle.

Start Server : 

> server(PORT,router(handlers))
