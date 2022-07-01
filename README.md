 # Server and Router

## Uses :

 > const { startServer,router } = require( 'server' );


 > router needs list of handlers 
 
Each handler need to call another handler if can't handle.

Start Server : 

> startServer(PORT,router(handlers))
