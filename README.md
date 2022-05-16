# Fruit King

Live site link [Fruit King](https://assignment-11-90949.web.app/).
API Link https://nameless-escarpment-48784.herokuapp.com/


### Description
This website is managing fruit stock for supplier


### Technology used in this project
 - Express
 - Mongoose
 - JsonWebToken
 - Morgan
 - Body Parser
 - Dotenv
 - CORS

### API Doc (Name (Route) [ Method ])
 - Home ("/") [ GET ]
 - Login ("/login") [ POST ]
 - Register ("/Register") [ POST ]
 - Add Item ("/inventory") [ POST ]
 - Update Stock ("/invventory") [ PUT ]
 - Get All Item ("/inventory?size=1&page=1") [ GET ]
 - Get Logged in User Items ("/inventory/me?size=10&page=1") [ GET ]
 - Get Single Item ("/inventory/ID}) [ GET ]
 - Delete Single Item ("/inventory/ID}) [ DELETE ]