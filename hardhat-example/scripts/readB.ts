import { createPublicClient, http } from "viem";
import { localhost } from "viem/chains";
import { artifacts } from "hardhat";

async function main() {
  // Get deployed contract artifact
  const artifact = await artifacts.readArtifact("B");

  // Create viem public client
  const publicClient = createPublicClient({
    chain: localhost,
    transport: http(),
  });
  // Replace with your deployed contract address
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  // Read the name
  const name = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: artifact.abi,
    functionName: "name",
  });

  console.log("Name is:", name);
}

//PO.then().then().then().catch().finally();
main().catch((err)=>{ 
    console.log('err >>',err)
});
