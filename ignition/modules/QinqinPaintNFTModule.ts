import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export const QinqinPaintNFTModule = buildModule("QinqinPaintNFTModule", (m) => {
  const qpNFT = m.contract("QinqinPaintNFT");

  return { qpNFT };
});