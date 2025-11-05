import { artifacts } from "hardhat";
import fs from "fs";

async function main() {
  const artifact = await artifacts.readArtifact("QinqinPaintNFT");
  const bytecode = artifact.deployedBytecode;
  console.log("Bytecode size:", bytecode.length / 2 / 1024, "KB");
}

main();
