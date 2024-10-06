import * as fs from "fs";
import * as path from "path";

interface DBConfig {
  username: string;
  database: string;
  host: {
    reader: string;
    writer: string;
  };
  dialect: string;
  port: number;
  password: string | undefined;
  dialectOptions: {
    socketPath: string;
  };
}

interface Config {
  testing: DBConfig;
  production: DBConfig;
  local: DBConfig;
}

const config: Config = {
  testing: {
    username: "", // username
    database: "master_testing_db", // database name testing
    host: {
      reader: "",
      writer: "",
    },
    dialect: "postgres",
    port: 5432,
    password: process.env.DEV,
    dialectOptions: {
      socketPath: "",
    },
  },
  production: {
    username: "", // username
    database: "master_testing_db", // database name testing
    host: {
      reader: "",
      writer: "",
    },
    dialect: "postgres",
    port: 5432,
    password: process.env.DEV,
    dialectOptions: {
      socketPath: "",
    },
  },
  local: {
    username: "", // username
    database: "master_testing_db", // database name testing
    host: {
      reader: "",
      writer: "",
    },
    dialect: "postgres",
    port: 5432,
    password: process.env.DEV,
    dialectOptions: {
      socketPath: "",
    },
  },
};

export default config;
