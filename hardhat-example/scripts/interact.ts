// import { NamedImport } from 'hardhat';
import { network } from "hardhat"; 
import EscrowAtrifact  from "../artifacts/contracts/Escrow.sol/Escrow.json" 
import { parseEther } from "viem";
//1. function defination is one time process
function anil(){
    let PO = new Promise((request,resolve)=>{
        setTimeout(()=>{
             resolve(10);
        },10000);
    });
    return PO;
}
async function main(){
    console.log("I am inside the main function");
    //const x = await PO;
    //const x = await anil();
    //console.log(x);

    //let connect viem with hardhat
    // Ths is an example of destructing
    const { viem } = await network.connect();
    console.log(viem);
    const [ buyer,seller,arbitrator ] = await viem.getWalletClients();

    console.log('buyer >',buyer);
    console.log('buyer addrs >',buyer.account.address);
    console.log('seller >',seller);
    console.log('seller addrs >',seller.account.address);
    console.log('arbitrator >',arbitrator);
    console.log('arbitrator addrs >',arbitrator.account.address);

    const publicClient  = await viem.getPublicClient();
    console.log('publicClents >>>',publicClient);
    const escrowAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // ✅ create deal
    const createHash = await buyer.writeContract({
        address:escrowAddress,
        abi: EscrowAtrifact.abi,
        functionName: "createDeal",
        args: [seller.account.address,arbitrator.account.address]
    });
    console.log('createHash >>>>>',createHash);  

    await publicClient.waitForTransactionReceipt({ hash: createHash });
    console.log("Deal created!");

    //Now buyer will lock the funds

    const lockHash = await buyer.writeContract({
        address: escrowAddress,
        abi: EscrowAtrifact.abi,
        functionName: "lockFunds",
        args : [1],
        value: parseEther("1"),
    });

    await publicClient.waitForTransactionReceipt({ hash: lockHash });

    console.log("Funds locked!");



};


//3. Function calling/invoking is many time process
main().catch((err)=>{ console.log(err) });