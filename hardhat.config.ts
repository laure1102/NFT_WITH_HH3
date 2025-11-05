import type { HardhatUserConfig } from "hardhat/config";
import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";
import hardhatVerify from "@nomicfoundation/hardhat-verify";

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin, hardhatVerify],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY1"),configVariable("SEPOLIA_PRIVATE_KEY2")],
    },
    ethereum: {
      type: "http",
      chainType: "l1",
      url: configVariable("ETHEREUM_RPC_URL"),
      accounts: [configVariable("ETHEREUM_PRIVATE_KEY1"),configVariable("ETHEREUM_PRIVATE_KEY2")],
      gas:"auto", // 让 Hardhat 自动估算
      gasMultiplier:2, // 放宽估算结果（乘2倍）
      gasPrice: 1_000_000_000, // 固定 1 gwei
      timeout: 180000, //3分钟
    },
  },
  verify: {
    etherscan: {
      apiKey: configVariable("ETHERSCAN_API_KEY"),
    },
  },
};

export default config;