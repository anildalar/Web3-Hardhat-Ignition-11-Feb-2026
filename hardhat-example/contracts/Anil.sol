// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Anil{
    //1. Property/STATE VARIABLES
    uint public x;
    //4. ERRORS
    //5. ENUMS
    //6. STRUCT
    //7. EVENT Decleration
    event XValue(uint newXValue);

    //2. Constructor
    constructor(){
        x = 10; //defualt value
    }
    

    //3. Method
    function setX(uint _x) public{
        x = _x;
        //Define the event before calling
        emit XValue(_x);
    }

}



