const fs = require('fs')
const { EDIT_DISTANCE_THRESHOLD } = require('hardhat/internal/constants')

async function main() {
  const BuyMeACoffee = await ethers.getContractFactory('BuyMeATea')
  const buyMeACoffee = await BuyMeACoffee.deploy()
  await buyMeACoffee.deployed()
  console.log(`BuyMeACoffee deployed to: ${buyMeACoffee.address}`)

  fs.writeFileSync(
    './frontend/config.js',
    `export const contractAddress ='${buyMeACoffee.address}'`
  )
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
