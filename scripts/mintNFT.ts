import assert from "node:assert/strict";
import { describe, it ,beforeEach} from "node:test";

import { network } from "hardhat";
import { parseUnits } from "viem";
import {QinqinPaintNFTModule} from "../ignition/modules/QinqinPaintNFTModule.js";

async function mint(tokenUri:string){
    const {viem, ignition} = await network.connect("ethereum");
    const publicClient = await viem.getPublicClient();
    const qpNFTDeployments = await ignition.deploy(QinqinPaintNFTModule);
    const qpNFT = qpNFTDeployments.qpNFT;
    console.log(`qpNFT contract's address: ${qpNFT.address}`);
    const [wallet1] = await viem.getWalletClients();
    const hash = await qpNFT.write.safeMint([wallet1.account.address, tokenUri]);
    const transaction = await publicClient.waitForTransactionReceipt(
        { 
            confirmations: 5, //等待5个区块确认
            hash: hash
        }
    );
    console.log("mint success!");
}

async function main(){
    // await mint("ipfs://QmS9qexFbDd43wA3ZqwbUwPJ25mrtyDhEZqGQYvFGAHAyS");
    // await mint("ipfs://Qme4bUjbWQeFpbUSs5BeS13yhULqmkeHXdB8u6jxLX1Tkr");
}

await main();