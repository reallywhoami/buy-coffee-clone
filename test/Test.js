const { expect } = require('chai')
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { anyUint } = require('@nomicfoundation/hardhat-chai-matchers/withArgs')

describe('Buy me a tea contract', function () {
  const tip = { value: ethers.utils.parseEther('1') }
  const oneEther = ethers.utils.parseEther('1')

  async function deployBuyMeATeaFixture() {
    // Get the ContractFactory and Signers.
    const BuyMeATea = await ethers.getContractFactory('BuyMeATea')
    const buyMeATea = await BuyMeATea.deploy()
    await buyMeATea.deployed()
    const contractAddress = buyMeATea.address

    const [owner, tipper1, tipper2, tipper3] = await ethers.getSigners()

    return { buyMeATea, contractAddress, owner, tipper1, tipper2, tipper3 }
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { buyMeATea, owner } = await loadFixture(deployBuyMeATeaFixture)

      expect(await buyMeATea.owner()).to.equal(owner.address)
    })
  })

  describe('Transactions', function () {
    it('Should tip', async function () {
      const { buyMeATea, contractAddress, tipper1, tipper2, tipper3 } =
        await loadFixture(deployBuyMeATeaFixture)

      await expect(
        await buyMeATea.connect(tipper1).donate('Jake', 'Nice job', tip)
      ).to.changeEtherBalances(
        [tipper1, contractAddress],
        [(-oneEther).toString(), oneEther.toString()]
      )

      await expect(
        await buyMeATea.connect(tipper2).donate('Caleb', 'Thanks!', tip)
      ).to.changeEtherBalances(
        [tipper2, contractAddress],
        [(-oneEther).toString(), oneEther.toString()]
      )

      await expect(
        await buyMeATea.connect(tipper3).donate('Monica', 'Cool', tip)
      ).to.changeEtherBalances(
        [tipper3, contractAddress],
        [(-oneEther).toString(), oneEther.toString()]
      )

      expect(await ethers.provider.getBalance(contractAddress)).to.equal(
        ethers.utils.parseEther('3')
      )
    })

    it('Should emit events', async function () {
      const { buyMeATea, tipper1, tipper2, tipper3 } = await loadFixture(
        deployBuyMeATeaFixture
      )

      await expect(
        await buyMeATea.connect(tipper1).donate('Jake', 'Nice job', tip)
      )
        .to.emit(buyMeATea, 'NewDonate')
        .withArgs(tipper1.address, oneEther, 'Jake', 'Nice job')

      await expect(
        await buyMeATea.connect(tipper2).donate('Caleb', 'Thanks!', tip)
      )
        .to.emit(buyMeATea, 'NewDonate')
        .withArgs(tipper2.address, oneEther, 'Caleb', 'Thanks!')

      await expect(
        await buyMeATea.connect(tipper3).donate('Monica', 'Cool', tip)
      )
        .to.emit(buyMeATea, 'NewDonate')
        .withArgs(tipper3.address, oneEther, 'Monica', 'Cool')
    })

    it('Should withdraw', async function () {
      const { buyMeATea, contractAddress, owner, tipper1 } = await loadFixture(
        deployBuyMeATeaFixture
      )

      await buyMeATea.connect(tipper1).donate('Jake', 'Nice job', tip)
      const balanceAfterTip = await ethers.provider.getBalance(contractAddress)
      expect(balanceAfterTip).to.equal(oneEther)

      await expect(await buyMeATea.withdraw()).changeEtherBalances(
        [contractAddress, owner],
        [(-oneEther).toString(), oneEther.toString()]
      )

      const balanceAfterWithdrawal = await ethers.provider.getBalance(
        contractAddress
      )
      expect(balanceAfterWithdrawal).to.equal(0)
    })

    it('Should revert withdrawal', async function () {
      const { buyMeATea, tipper1 } = await loadFixture(deployBuyMeATeaFixture)

      await expect(buyMeATea.connect(tipper1).withdraw()).to.be.revertedWith(
        'Ownable: caller is not the owner'
      )
    })
  })
})
