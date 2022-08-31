// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract BuyMeATea is Ownable {
    event NewDonate(address tipper, uint256 value, string name, string message);

    struct Donate {
        address tipper;
        uint256 value;
        string name;
        string message;
    }

    Donate[] donates;

    /**
     * @dev Sends the entire balance stored in this contract to the owner.
     */
    function withdraw() external onlyOwner {
        // Global variable msg.sender can be used for
        // gas optimization because onlyOwner modifier is applied.
        console.log(
            "Withdrawing %s wei from %s to %s",
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

        donates.push(Donate(msg.sender, msg.value, _name, _message));
        console.log(
            "Donated %s by %s with message: %s",
            msg.value,
            _name,
            _message
        );
        emit NewDonate(msg.sender, msg.value, _name, _message);
    }

    /**
     * @dev Returns all donates to a user.
     */
    function getDonates() external view returns (Donate[] memory) {
        return donates;
    }
}
