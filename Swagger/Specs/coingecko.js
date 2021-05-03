/**
 *
 * @swagger
 *
 * paths:
 *   /coins:
 *     get:
 *       tags:
 *         - "Coingecko"
 *       description: "List cryptocurrencies from coingecko market"
 *       produces:
 *         - "application/json"
 *       parameters:
 *         - in: "header"
 *           name: "x-token"
 *           type: "string"
 *           required: true
 *           description: " Authorization token"
 *         - in: "query"
 *           name: "page"
 *           type: "number"
 *           description: "page to be reviewed - default 1"
 *         - in: "query"
 *           name: "per_page"
 *           type: "number"
 *           description: "Number of cryptos per page - default 25"
 *       responses:
 *         200:
 *           description: "Cryptocurrencies successfully obtained"
 *         401:
 *           description: "There is no token or a wrong token in the request"
 *   /top:
 *     get:
 *       tags:
 *         - "Coingecko"
 *       description: "List top N of user cryptopcurrencies"
 *       produces:
 *         - "application/json"
 *       parameters:
 *         - in: "header"
 *           name: "x-token"
 *           type: "string"
 *           required: true
 *           description: " Authorization token"
 *         - in: "query"
 *           name: "top"
 *           type: "number"
 *           description: "crypto currencies to be listed"
 *         - in: "query"
 *           name: "order"
 *           type: "string"
 *           description: "Must be ASC=ascending, DESC=descending"
 *       responses:
 *         200:
 *           description: "Cryptocurrencies top were successfully obtained"
 *         401:
 *           description: "There is no token or a wrong token in the request"
 *
 *
 */