//Something in imported from somewhere
//NodeJs
//1. Named Import/Export
//. Default Import/Export

//import { NamedImport } from 'somelib/somelocation'

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


//2. Function invoking/Calling
//functionCall(aa1,aa23);
//functionCall("string",cbfn);
let x = buildModule("CModule",(fa)=>{
       const c =  fa.contract("C");

    //Everyfunction may return something
    // I am returning a JS OBJect { K:V }
    return {"c":c}
});

//Can i export anytihing
export default x;
