const path = require("path");
const dotenv = require("dotenv");

const ENV = process.env.NODE_ENV || "development";

// load correct .env file
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${ENV}`)
});

// export validated envs
module.exports = {
  ENV,
  PORT: Number(process.env.PORT),
//   IVERILOG_PATH: process.env.IVERILOG_PATH,
//   VVP_PATH: process.env.VVP_PATH,
//   YOSYS_PATH: process.env.YOSYS_PATH,
//   DOT_PATH: process.env.DOT_PATH,
//   SIMULATION_DIR: process.env.SIMULATION_DIR,
//   TEMP_DIR: process.env.TEMP_DIR,
  MAX_EXECUTION_TIME: Number(process.env.MAX_EXECUTION_TIME),
  ENABLE_LOGS: process.env.ENABLE_LOGS === "true"
};
