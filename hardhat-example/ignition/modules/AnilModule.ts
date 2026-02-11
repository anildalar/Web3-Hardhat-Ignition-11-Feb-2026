import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("AnilModule", (m) => {
  // Deploy the Anil contract
  const anil = m.contract("Anil");
  // Example: call a function after deployment (optional)
  // m.call(anil, "yourFunction", []);

  return { anil };
});
