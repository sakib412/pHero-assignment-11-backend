"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = require("body-parser");

require("dotenv/config");

var _config2 = _interopRequireDefault(require("./config"));

var _errorHandler = _interopRequireDefault(require("./middleware/errorHandler"));

var _response = require("./utils/response");

var _db = require("./utils/db");

var _auth = _interopRequireDefault(require("./routes/auth.router"));

var _inventory = _interopRequireDefault(require("./routes/inventory.router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)(); // Middleware

exports.app = app;
app.disable('x-powered-by');
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)(_config2.default.env == 'dev' || _config2.default.env == 'development' ? 'dev' : 'combine')); // Routes

app.get('/', (req, res) => {
  res.json((0, _response.successResponse)({
    "message": "Server is running"
  }));
});
app.use('/', _auth.default);
app.use('/inventory', _inventory.default); // async function run() {
//     try {
//         // update inventory
//         app.put("/updateInventory/:id", async (req, res) => {
//             const id = req.params.id;
//             const data = req.body;
//             const filter = { _id: ObjectId(id) };
//             const result = inventoryCollection.updateOne(
//                 filter,
//                 { $set: data },
//                 { upsert: true }
//             );
//             res.send(result);
//         });
//     } finally {
//     }
// }

app.use(_errorHandler.default);

const start = async () => {
  try {
    await (0, _db.connect)();
    app.listen(_config2.default.port, () => {
      console.log(`REST API on http://localhost:${_config2.default.port}/`);
    });
  } catch (e) {
    console.error(e);
  }
};

exports.start = start;