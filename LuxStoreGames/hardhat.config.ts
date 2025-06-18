import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.8.20" },  
      { version: "0.8.28" }
    ]
  },
  networks: {
    hardhat: {},
    goerli: {
      url: process.env.GOERLI_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  paths: {
    sources:   "./contracts",
    tests:     "./test",
    cache:     "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};

export default config;
