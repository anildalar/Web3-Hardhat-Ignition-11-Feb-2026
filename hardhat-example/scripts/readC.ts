import { artifacts } from "hardhat";
import { createPublicClient, http } from "viem";
import { localhost } from "viem/chains";


//1. Define function
async function main(){
    console.log("OK123");
    console.log('artifacts >>',artifacts);
    const artifact2 = await artifacts.readArtifact("C");
    console.log('artifacts2 >>',artifact2);
    console.log('artifacts2.abi >>',artifact2.abi);

    // Create viem public client
    const publicClient = createPublicClient({
        chain: localhost,
        transport: http(),
    });
    const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
    console.log('publicClient >>',publicClient);
       let fn = await publicClient.readContract({
            address: contractAddress as `0x${string}`,
            abi:artifact2.abi,
            functionName: "fname"
        });
        console.log('firstName >>>>',fn);
}

//2. Call
main();

