require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

const { ALCHEMY_API_URL, PRIVATE_KEY } = process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.16',
  },
  paths: {
    artifacts: 'frontend/pages/artifacts',
  },
  networks: {
    goerli: {
      url: ALCHEMY_API_URL,
      accounts: [PRIVATE_KEY],
    },
  },
}
