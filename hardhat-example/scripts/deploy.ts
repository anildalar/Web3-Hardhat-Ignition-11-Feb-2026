import { network } from "hardhat";
import { mainnet } from "viem/chains";
const { viem } = await network.connect({network: "localhost"});
async function main(){
    console.log("Deploying contract Hello...");
    const contract = await viem.deployContract("A");
    console.log("Contract deployed at:", contract.address);
}
main().catch(console.error)