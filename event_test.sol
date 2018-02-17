pragma solidity ^0.4.19;

contract Event_test {
    
    event Button1(string _message);
    event Button2(string _message);
    
    
    
    function button_1_clicked() public{
        string memory _msg = "Button1 clicked";
        Button1(_msg);
    }
    
    function button_2_clicked() public{
        string memory _msg = "Button2 clicked";
        Button2(_msg);
    }
    
}