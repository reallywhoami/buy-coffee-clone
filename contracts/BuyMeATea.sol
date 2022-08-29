// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract BuyMeATea is Ownable {
    // Event to emit when a donate is received.
    event Donate(address tipper, uint256 time, string name, string message);

    /**
     * @dev Sends the entire balance stored in this contract to the owner.
     */
    function withdraw() external onlyOwner {
        // Global variable msg.sender can be used because
        // onlyOwner modifier is applied.
        console.log(
            "Withdrawing %s ether (wei) from %s to %s",
            address(this).balance,
            address(this),
            msg.sender
        );
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }

    /**
     * @dev Buys a tea for the contract owner.
     * @param _name name of the tea buyer
     * @param _message a nice message from the tea buyer
     */
    function donate(string memory _name, string memory _message)
        external
        payable
    {
        require(msg.value > 0, "Can't buy a tea with no ether.");
        emit Donate(msg.sender, block.timestamp, _name, _message);
    }
}
