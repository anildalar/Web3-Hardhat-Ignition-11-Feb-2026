import { network } from "hardhat";

async function main() {

    const { viem } = await network.connect();

    // get wallet
    const [walletClient] = await viem.getWalletClients();

    // connect to deployed contract
    const anil = await viem.getContractAt(
        "Anil",
        "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
    );

    // READ
    const currentX = await anil.read.x();
    console.log("Current X:", currentX);

    // WRITE
    const hash = await anil.write.setX([50n], {
        account: walletClient.account
    });

    console.log("Transaction hash:", hash);

    // wait for confirmation
    const publicClient = await viem.getPublicClient();

    const receipt = await publicClient.waitForTransactionReceipt({
        hash
    });

    console.log("Updated successfully!");

    // READ again
    const updatedX = await anil.read.x();
    console.log("New X:", updatedX);
}

main().catch(console.error);
