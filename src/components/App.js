import React, { Component } from 'react'
import Web3 from 'web3'

import Token from '../abis/Token.json'
import Usdt from '../abis/Usdt.json'
import EthSwap from '../abis/Swap.json'

//import EthSwap from '../abis/EthSwap.json'
import Navbar from './Navbar'
import Main from './Main'
import ClipLoader from "react-spinners/ClipLoader";
import LoadWallet from './LoadWallet'
import Home from './Home'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

// import 'react-toastify/dist/ReactToastify.css';


class App extends Component {

  constructor(props) {
    super(props)    
    this.handleClick = this.handleClick.bind(this);
    // this.notify = this.notify.bind(this);
    this.state = {
      account: '', //contract deployer account[0]
      token: {}, //Deployed instance of EXN contract in KOVAN
      usdt: {}, //Deployed instance of EXN contract in KOVAN
      ethSwap: {}, //Deployed instance of ethSwap contract in KOVAN
      ethBalance: '0',
      tokenBalance: '0',
      tokenBalanceusdt: '0',
      loading: true,
      walletLoaded: false,
      txState : '',
      price:'',
      priceStable:'',
      web3Socket: {},
      ethSwapWebSocket: {},
      lastReceivedEvent: { 'Event' : 'no event'}      
    }
  }

  //  notify = () => toast("Wow so easy!");

  async loadWallet() {    
    this.setState({ loading: true })
    await this.loadWeb3()
    await this.loadBlockchainData()    
    //  await this.loadEthSwapWebSocket();    

    //subscribe to event TokenPurchased 
    // await this.state.ethSwapWebSocket.events.TokensPurchased({})
    // .on('data', async (event) =>{
    //     let amount = event.returnValues._value.toString()
    //     window.alert('EXN Token purchased: ' + window.web3.utils.fromWei(amount, 'Ether'))
    //     console.log('EXN TokenPurchase tx confirmed \n')
    //     console.log('From account: ', event.returnValues._from.toString())        
    //     console.log('Amount in EXN: ', window.web3.utils.fromWei(amount, 'Ether') )
    //     this.setState({ lastReceivedEvent : event.returnValues})
    //     console.log(event.returnValues)    
    // })
    // .on('error', (error) => {
    //   this.setState({ lastReceivedEvent : error})
    //   console.log(error);
    // })
    
    //subscribe to event TokenSold
    // await this.state.ethSwapWebSocket.events.TokensSold({})
    // .on('data', async (event) =>{
    //     let amount = event.returnValues._value.toString()
    //     window.alert('EXN Token Sold: ' + window.web3.utils.fromWei(amount, 'Ether'))
    //     console.log('EXN TokenPurchase tx confirmed \n')
    //     console.log('From account: ', event.returnValues._from.toString())        
    //     console.log('Amount in EXN: ', window.web3.utils.fromWei(amount, 'Ether') )
    //     this.setState({ lastReceivedEvent : event.returnValues})
    //     console.log(event.returnValues)        
    // })
    // .on('error', (error) => {
    //   this.setState({ lastReceivedEvent : error});
    //   console.log(error);
    // }) 

    this.setState({ loading: false });   

  }

  //Load EthSwap instance via infura webSocket API
  async loadEthSwapWebSocket(){
    console.log(this.state.price)
    const URL = `https://data-seed-prebsc-2-s1.binance.org:8545`
    let web3Socket = new Web3(new Web3.providers.WebsocketProvider(URL));
    
    if (web3Socket){      
      const web3 = window.web3
      const networkId =  await web3.eth.net.getId()
      // const ethSwapWebSocketData = EthSwap.networks[networkId]
      // if(ethSwapWebSocketData) {


        // =========== contract address ===========
        const ethSwapWebSocket = await new web3Socket.eth.Contract(EthSwap, "0x9b069c5A12c82cF3d74359F793DF3b2753Df6B35")
        this.setState({ ethSwapWebSocket })


    //   } else {
    //     window.alert('EthSwap contract not deployed to detected network.')
    //   }    
    // } else{
    //   window.alert('Could not establish web socket connection to infura')
     }     
  }

  //Load EthSwap and EXN token instances via Metamask web3
  async loadBlockchainData() {
    console.log("loadb start");
    // this.setState({loading : false})   
    const web3 = window.web3  
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    console.log("acc" , accounts[0]);
     const ethBalance = await web3.eth.getBalance(this.state.account)
     this.setState({ ethBalance })

    console.log("bal" , ethBalance);

    // Load EXN Token
    const networkId =  await web3.eth.net.getId()
    // const tokenData = Token.networks[networkId]
    // if(tokenData) {
      const token = new web3.eth.Contract(Token, "0xaf8f027582d2b0f2E0F35d78b79f5a450f037439")
      this.setState({ token })
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      this.setState({ tokenBalance: tokenBalance.toString() })
    //  console.log("EXN Token address: ", tokenData.address)
    // } else {
    //   window.alert('Token contract not deployed to detected network.')
    // }

    console.log("token bal" , tokenBalance);


    // Load EthSwap
    // const ethSwapData = await EthSwap.networks[networkId]
    // if(ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap, "0x9b069c5A12c82cF3d74359F793DF3b2753Df6B35")
      this.setState({ ethSwap })
      console.log('ethSwap.options.address:' + this.state.ethSwap.options.address)      
    // } else {
    //   window.alert('EthSwap contract not deployed to detected network.')
    // }    
      const price = await ethSwap.methods.price().call();
      // const totalSupply = await instance.methods.totalSupply().call();
      // this.setState({ totalSupply: totalSupply });
      this.setState({ price : price })
      console.log("price is" , price);
      const priceStable = await ethSwap.methods.priceStable().call();
      this.setState({ priceStable : priceStable })
      console.log("stableprice is" , priceStable);
 

    //load USDT 
    const usdt = new web3.eth.Contract(Usdt, "0x0EB11261F9F778fEfd688e2dfAdB77862E96605b")
      this.setState({ usdt })
      let tokenBalanceusdt = await usdt.methods.balanceOf(this.state.account).call()
      this.setState({ tokenBalanceusdt: tokenBalanceusdt.toString() })
     // console.log("EXN Token address: ", tokenData.address)
     console.log("loadb end");

  }  

  async loadWeb3() {
    if (window.ethereum) 
    {
        
      window.web3 = new Web3(window.ethereum);
      //window.web3 = new Web3("http://localhost:8545")
      //window.web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'))
      await window.ethereum.enable();
      await window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.web3.eth.getAccounts();            
        this.setState({ account: accounts[0] })  
         this.setState({loading : false})     
      })
      this.setState({walletLoaded : true});      
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      this.setState({walletLoaded : false});      
    }
    
  } 

  // buyTokens = async (etherAmount) => {
  //   this.setState({ loading: true })
  //   await this.state.ethSwap.methods.buyTokens().send({ value: etherAmount, from: this.state.account })
  //     .on('transactionHash', (hash) => {
  //       this.setState({ txState: 'onTxHash' })
  //     })
  //     .on('confirmation', async (confirmationNumber, receipt) =>{        
  //       this.setState({ txState: 'onConfirmation' })
  //       const web3 = window.web3  
  //       const ethBalance = await web3.eth.getBalance(this.state.account)        
  //       let tokenBalance = await this.state.token.methods.balanceOf(this.state.account).call()
  //       this.setState({ 
  //         ethBalance : ethBalance ,
  //         tokenBalance: tokenBalance.toString() ,           
  //        })
  //       console.log("BuyTokens.on.Confirmation: ConfirmationNumber: " + confirmationNumber + " -> Receip.events: " + JSON.stringify(receipt))
  //     })
  //   this.setState({
  //     txState: '',
  //     loading: false
  //     })    
  // }  

  sellTokens = async (tokenAmount) => {
    console.log("this.state.ethSwap.address: " + this.state.ethSwap.options.address)
    this.setState({ loading: true })
    await this.state.token.methods.approve(this.state.ethSwap.options.address, tokenAmount).send({ from: this.state.account })
    .on('transactionHash', async (hash) => {
      
    }).then(async ()=>{
      this.setState({ txState: 'onTxHash' })
      await this.state.ethSwap.methods.swapToCoin(tokenAmount).send({ from: this.state.account })        
      .on('transactionHash', (hash) => {
        this.setState({ txState: 'onTxHash' })
        })
      .on('confirmation', async (confirmationNumber, receipt) =>{      
        this.setState({ txState: 'onConfirmation' })
        const web3 = window.web3  
        const ethBalance = await web3.eth.getBalance(this.state.account)
        let tokenBalance = await this.state.token.methods.balanceOf(this.state.account).call()
        this.setState({ 
          ethBalance : ethBalance ,
          tokenBalance: tokenBalance.toString() ,             
        })
        console.log("SellTokens.on.Confirmation: ConfirmationNumber: " + confirmationNumber + " -> Receip.events: " + JSON.stringify(receipt))
      })
  this.setState({
    loading: false ,
    txState: '' })    
    })
  }

  // ===============Buy================
  buyTokens = async (tokenAmount) => {
    console.log("this.state.ethSwap.address: " +this.state.ethSwap.options.address)
    this.setState({ loading: true })
    await this.state.ethSwap.methods.swapToToken().send({ from: this.state.account  , value : tokenAmount})        
    .on('transactionHash', (hash) => {
      this.setState({ txState: 'onTxHash' })
      })
    .on('confirmation', async (confirmationNumber, receipt) =>{      
      this.setState({ txState: 'onConfirmation' })
      const web3 = window.web3  
      const ethBalance = await web3.eth.getBalance(this.state.account)
      let tokenBalance = await this.state.usdt.methods.balanceOf(this.state.account).call()
      this.setState({ 
        ethBalance : ethBalance ,
        tokenBalance: tokenBalance.toString() ,             
      })
      console.log("SellTokens.on.Confirmation: ConfirmationNumber: " + confirmationNumber + " -> Receip.events: " + JSON.stringify(receipt))
    })
this.setState({
  loading: false ,
  txState: '' })        

  //  await this.state.usdt.methods.approve(this.state.ethSwap.options.address, tokenAmount).send({ from: this.state.account })
    // .then(async ()=>{
    //   this.setState({ txState: 'onTxHash' })
    //     await this.state.ethSwap.methods.swapToToken(tokenAmount).send({ from: this.state.account })        
    //     .on('transactionHash', (hash) => {
    //       this.setState({ txState: 'onTxHash' })
    //       })
    //     .on('confirmation', async (confirmationNumber, receipt) =>{      
    //       this.setState({ txState: 'onConfirmation' })
    //       const web3 = window.web3  
    //       const ethBalance = await web3.eth.getBalance(this.state.account)
    //       let tokenBalance = await this.state.usdt.methods.balanceOf(this.state.account).call()
    //       this.setState({ 
    //         ethBalance : ethBalance ,
    //         tokenBalance: tokenBalance.toString() ,             
    //       })
    //       console.log("SellTokens.on.Confirmation: ConfirmationNumber: " + confirmationNumber + " -> Receip.events: " + JSON.stringify(receipt))
    //     })
    // this.setState({
    //   loading: false ,
    //   txState: '' })        
    // })
  }
  // ================== Buy end ==============

  async handleClick(){       
      if (!this.state.walletLoaded) {
          await this.loadWallet();
      } else {            
        this.setState({walletLoaded : false}); ;
      }      
      console.log('TypeOf: ', typeof this.state.lastReceivedEvent)
  }


  render() {
    let content;    
    if (this.state.walletLoaded){
      if(this.state.loading) {
        let txStatus;
        switch(this.state.txState){
          case 'onTxHash':
            txStatus = 'Transaction Hash received from Blockchain  network...';
            break;
          case 'onConfirmation':
            txStatus = 'Confirmation received from Blockchain network...';
            break;
          case 'onReceipt':
            txStatus = 'Tx receipt received from Blockchain network. See console logs...';
            break;
          case 'onError':
            txStatus = 'Tx error received from Blockchain network. Tx reverted...';
            break;
          default :
            txStatus = '' ;
        }
        content = <div>
             {/* <ClipLoader color={'#16BE9C'} loading={true}  size={70} /> */}
          <p id="loader" className="text-center"><ClipLoader color={'#000000'} loading={true}  size={50} /></p>
          <br/>
          <p className='tx'>{txStatus}</p>
        </div>
      }else {
        const events = this.state.lastReceivedEvent;
        content = 
        
        <div className="row" style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              }}
        >
       
          <div className="col-md-6">
            <Main
              ethBalance={this.state.ethBalance}
              tokenBalance={this.state.tokenBalance}
              buyTokens={this.buyTokens}
              sellTokens={this.sellTokens}
              price = {this.state.price}
              priceStable = {this.state.priceStable}
            />            
          </div>          
          {/* <div className="col-md-6" >
            <LoadWallet handleClick={this.handleClick} walletLoaded={this.state.walletLoaded} />  
            <br/>
            
            <ul>
            {Object.keys(events).map((event, index) => <li key={index}>{event} : {events[event]}</li>)}
            </ul>           
          </div> */}
        </div>  
      }
    }
    else {
      content = <div style={{ alignItems: "center" }}>
        <div className="container" >
        <h3>Welcome</h3>
         <ul>
         <li><h5>Click the button below to connect Metamask wallet.</h5></li>
         {/* <li><h5>Don't forget to select "RinkeyBy Test Network" in Metamask App.</h5></li>                       */}
          
        </ul>   
        <LoadWallet handleClick={this.handleClick} walletLoaded={this.state.walletLoaded} />
        </div>
      </div>

    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://alejoacosta.ar"
                  tEXNet="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
