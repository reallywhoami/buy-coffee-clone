// import { contractAddress } from '../frontend/config'

async function main() {
  const tip = { value: ethers.utils.parseEther('1') }
  const BuyMeATea = await ethers.getContractFactory('BuyMeATea')
  const contract = await BuyMeATea.attach(
    '0x5fbdb2315678afecb367f032d93f642f64180aa3'
  )
  const [owner, tipper1, tipper2, tipper3] = await ethers.getSigners()

  await contract.connect(tipper1).donate('Jake', 'Nice job', tip)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
