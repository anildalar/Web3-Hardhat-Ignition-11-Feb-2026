// 1. Import modules.
import { createPublicClient, http } from 'viem'
import { hardhat, mainnet } from 'viem/chains'
 
// 2. Set up your client with desired chain & transport.
const client = createPublicClient({
  chain: hardhat,
  transport: http(),
})
 
// 3. Consume an action!
const blockNumber = await client.getBlockNumber();

console.log(blockNumber);