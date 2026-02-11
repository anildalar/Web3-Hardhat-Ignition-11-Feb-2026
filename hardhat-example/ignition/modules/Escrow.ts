import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


export default buildModule("EscrowModule",(m)=>{
        const escrow = m.contract("Escrow");
            // { P : V }
            // { P  : P } = { P }
        return {escrow}
});