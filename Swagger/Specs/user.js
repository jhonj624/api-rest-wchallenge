/**
 * @swagger
 *
 * paths:
 *   /users:
 *     post:
 *       tags:
 *         - "User"
 *       description: "Register a new user"
 *       produces:
 *         - "application/json"
 *       parameters:
 *         - in: "body"
 *           name: "data"
 *           description: "json with user registration data"
 *           required: true
 *           schema:
 *             $ref: "#/definitions/User"
 *       responses:
 *         '200':
 *           description: "User created successfully"
 *         '400':
 *           description: "Bad request: some mistake or missing data"
 *
 *   /login:
 *     post:
 *       tags:
 *         - "Auth"
 *       description: "Login User"
 *       produces:
 *         - "application/json"
 *       parameters:
 *         - in: "body"
 *           name: "data"
 *           description: "Data in Json format"
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Login"
 *       responses:
 *         200:
 *           description: "Login successfully"
 *         400:
 *           description: "Bad request: some mistake or missing data"
 *   /currencies:
 *     post:
 *       tags:
 *         - "User"
 *       description: "User can add cryptocurrencies to follow, wich are validate with Coingecko APi"
 *       produces:
 *         - "application/json"
 *       parameters:
 *         - in: "header"
 *           name: "x-token"
 *           type: "string"
 *           required: true
 *           description: " Authorization token"
 *         - in: "body"
 *           name: data
 *           description: json with array of cryptocurrencies ids
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Cryptocurrency"
 *       responses:
 *         200:
 *           description: "Crypto currencies successfully added"
 *         400:
 *           description: "Validate mistakes or missing data"
 *         401:
 *           description: "There is no token or a wrong token in the request"
 * definitions:
 *   User:
 *     required:
 *       - "name"
 *       - "lastname"
 *       - "username"
 *       - "password"
 *       - "coin"
 *     properties:
 *       name:
 *         type: "string"
 *         example: "John"
 *       lastname:
 *         type: "string"
 *         example: "Doe"
 *       username:
 *         type: "string"
 *         example: "JhonDoe"
 *       password:
 *         type: "string"
 *         example: "Abcd1234"
 *       coin:
 *         type: "string"
 *         description: "Must be ARS, USD or EUR"
 *         example: "ARS"
 *   Login:
 *     properties:
 *       username:
 *         type: "string"
 *         example : "test1"
 *       password:
 *         type: "string"
 *         example: "passwaord"
 *   Cryptocurrency:
 *     properties:
 *       ids:
 *         type: string
 *         example: ["litecoin", "ethereum", "dogecoin"]
 */
