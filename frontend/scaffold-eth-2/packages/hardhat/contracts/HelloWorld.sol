// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import { useState, useEffect } from 'react'

contract HelloWorld {
    string private text;

    constructor() {
        text = "Hello World";
    }

    function helloWorld() public view returns (string memory)  {
        return text;
    }

    function setText(string memory newText) public {
        text = newText;
    }
}