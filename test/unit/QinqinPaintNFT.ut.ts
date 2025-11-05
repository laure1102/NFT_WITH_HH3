import assert from "node:assert/strict";
import { describe, it ,beforeEach} from "node:test";

import { network } from "hardhat";
import { parseUnits } from "viem";
import {QinqinPaintNFTModule} from "../../ignition/modules/QinqinPaintNFTModule.js";

describe("unit test for QinqinPaintNFT", async()=>{
    const {viem, ignition} = await network.connect();
    const publicClient = await viem.getPublicClient();

    let qpNFT: any;
    let wallet1,wallet2;
    beforeEach(async()=>{
        const qpNFTDeployments = await ignition.deploy(QinqinPaintNFTModule);
        qpNFT = qpNFTDeployments.qpNFT;
        console.log(`qpNFT contract's address: ${qpNFT.address}`);
        const [w1,w2] = await viem.getWalletClients();
        wallet1 = w1;
        wallet2 = w2;
    });

    it("unit test the token name",async()=>{
        const testStr = `${await qpNFT.read.name()}_${await qpNFT.read.symbol()}`;
        assert.equal(testStr,"QinqinPaintNFT_QPNFT");
    });
});