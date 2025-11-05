import assert from "node:assert/strict";
import { describe, it ,beforeEach} from "node:test";

import { network } from "hardhat";
import { parseUnits } from "viem";
import {QinqinPaintNFTModule} from "../../ignition/modules/QinqinPaintNFTModule.js";

describe("stagging test for QinqinPaintNFT", async()=>{
    const {viem, ignition} = await network.connect("sepolia");
    const publicClient = await viem.getPublicClient();

    let qpNFT: any;
    let wallet1:any;
    let wallet2:any;
    beforeEach(async()=>{
        const qpNFTDeployments = await ignition.deploy(QinqinPaintNFTModule);
        qpNFT = qpNFTDeployments.qpNFT;
        console.log(`qpNFT contract's address: ${qpNFT.address}`);
        const [w1,w2] = await viem.getWalletClients();
        wallet1 = w1;
        wallet2 = w2;
    });

    it("stagging test the token name",async()=>{
        const testStr = `${await qpNFT.read.name()}_${await qpNFT.read.symbol()}`;
        assert.equal(testStr,"QinqinPaintNFT_QPNFT");
    });

    // it("stagging test the mint a token",async()=>{
    //     const tokenUri  = "ipfs://QmS9qexFbDd43wA3ZqwbUwPJ25mrtyDhEZqGQYvFGAHAyS";
    //     const hash = await qpNFT.write.safeMint([wallet2.account.address, tokenUri]);
    //     const transaction = await publicClient.waitForTransactionReceipt(
    //         { 
    //             confirmations: 5, //等待5个区块确认
    //             hash: hash
    //         }
    //     );
    //     assert.equal(1,1,"1!=1");
    // });

    it("stagging test the token uri",async()=>{
        const queryTokenId = 0n;
        const tokenUri = await qpNFT.read.tokenURI([queryTokenId]);
        assert.equal(tokenUri,"ipfs://QmS9qexFbDd43wA3ZqwbUwPJ25mrtyDhEZqGQYvFGAHAyS", "tokenURI is incorrect!");
    });

    // it("stagging test the mint a token",async()=>{
    //     const tokenUri  = "ipfs://Qme4bUjbWQeFpbUSs5BeS13yhULqmkeHXdB8u6jxLX1Tkr";
    //     const hash = await qpNFT.write.safeMint([wallet1.account.address, tokenUri]);
    //     const transaction = await publicClient.waitForTransactionReceipt(
    //         { 
    //             confirmations: 5, //等待5个区块确认
    //             hash: hash
    //         }
    //     );
    //     assert.equal(1,1,"1!=1");
    // });
});