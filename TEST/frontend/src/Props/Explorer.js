import { Outlet } from "react-router-dom"
import "./explorer.css"
import { Link ,useNavigate} from "react-router-dom"
import logo from "./3.png"
import PropertyList from "./Enlist";
import React,{useState} from 'react';
import {ethers} from 'ethers';
import background from "../bg/estate3.jpg";
import View from "./View";

function Explorer(){
    let navigate = useNavigate(); 
    const loginBtn = () =>{ 
      let path = `/login`; 
      navigate(path);
    }
    const regBtn = () =>{ 
        let path = `/register`; 
        navigate(path);
    }
    const ExpBtn = () =>{ 
        let path = `/test`; 
        navigate(path);
    }
    // const ethers = require("ethers")
    const [errorMessage,setErrorMessage] = useState();
    const [defaultAccount,setDefaultAccount] = useState();
    const [userBalance,setUserbalace] = useState();
    const connectWallet = () => {
        if (window.ethereum){
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChanged([result[0]])
            })
        } else {
            setErrorMessage('Install Metamask!')
        }
    }

    const accountChanged = (accountName) => {
        setDefaultAccount(accountName)
        getUserBalance(accountName)
    }

    const getUserBalance = (accountAddress) => {
        window.ethereum.request({method: 'eth_getBalance', params: [String(accountAddress),"latest"]})
        .then(balance => {
            setUserbalace(ethers.utils.formatEther(balance));
        })
    }
    // const networks = {
    //     localhostNet: {
    //         chainId: `0x${Number(1337).toString(16)}`,
    //         chainName: "Localhost",
    //         nativeCurrency: {
    //           name: "Localhost 8545",
    //           symbol: "ETH",
    //           decimals: 18
    //         },
    //         rpcUrls: ["http://localhost:8545"],
    //       }
    //     }
    
    return (
        <div style={{ backgroundImage: `url(${background})`, backgroundSize:`cover`, height:`100%`} }>
        <div className="container-fluid" >
            <div className="row justify-content-between">
            <nav className="navbar">
        <div className="logo">
            <img src={logo} className="logo-img" alt="logo" width="50" height="60"></img>
        </div>
        <div className="menu search">
            <div className="search-bar">
                <input type="text" className="search-input search-block"/>
                <button className="search-btn search-block"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>
        <div className="menu">
            <span><button className="regBtn" onClick={ExpBtn}>Test</button></span>
        </div>
        <div className="menu">
            <span><button className="login" onClick={loginBtn}>Login</button></span>
        </div>
        <div className="menu">
            <span><button className="regBtn" onClick={regBtn}>Register</button></span>
        </div>
        <div>
            {/* <h6>MetaMask Wallet</h6> */}
            <button onClick={connectWallet}>Connect Wallet</button>
            <h6>Address: {defaultAccount} </h6>
            <h6>Balance is :{userBalance} </h6>
        </div>
    </nav>
     </div>
<div style={{ backgroundImage: `url(${background})`, backgroundSize:`cover`} }>
        <div className="col-10 border-start border-secondary">
                    <View />
                </div>
</div>
        </div>
</div>
    )

}
export default Explorer