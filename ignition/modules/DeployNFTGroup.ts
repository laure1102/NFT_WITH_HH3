import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import {QinqinPaintNFTModule} from "./QinqinPaintNFTModule.js";

export default buildModule("DeployNFTGroup",(m)=>{
    const {qpNFT} = m.useModule(QinqinPaintNFTModule); 
    return {qpNFT};
});