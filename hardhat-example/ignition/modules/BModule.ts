import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
export default buildModule("BModule", (m) => {
    //const ceo1 = new Class("Constrcturo Params")
    // ceo1.member
    // ceo1.property
    // ceo1.method();
  const b = m.contract("B",["Anil"]); //We can pass contract params
  return { b };
});