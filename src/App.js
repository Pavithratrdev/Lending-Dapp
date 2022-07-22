import {useState} from 'react'
import './App.css';
import {Container,Row,Col, Card,Button,Form} from 'react-bootstrap'
import LendBorrowArtifact from "./abis/lendborrow.json";
import { ethers } from "ethers";
import { CONTRACT_ADDR } from "./constants";

function App() {

  const [deposit, setDopsit] = useState("");
  const [widthDraw, setWidthDraw] = useState("");


  function onDepostHandle(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);   //Connecting to node via metamask
    const signer = provider.getSigner(); //Connecting to wallet
    const contract = new ethers.Contract(CONTRACT_ADDR, LendBorrowArtifact.abi, signer); 
    contract.deposittoken({value:deposit});
    console.log(CONTRACT_ADDR,signer,LendBorrowArtifact.abi)
    setDopsit("");
  }

  function onWidthDrawHandle(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);   //Connecting to node via metamask
    const signer = provider.getSigner(); //Connecting to wallet
    const contract = new ethers.Contract(CONTRACT_ADDR, LendBorrowArtifact.abi, signer); 
    contract.withdrawtoken("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",widthDraw);
    console.log(widthDraw)
    setWidthDraw("");
  }

  if (window.ethereum) {  
    // res[0] for fetching a first wallet
    window.ethereum
      .request({ method: "eth_requestAccounts" })      
  } else {
    alert("install metamask extension!!");
  }

  console.log(deposit)

  return (
    <div className="App">
      <Container  fluid>
        <Row >
          <Col className='d-flex justify-content-center align-item-center'>
            <Row>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png" width='200px' height="400px" className="rounded float-start" alt="..."></img>
            <Col className='d-flex justify-content-center align-item-center'>
          <Button variant="primary" type='submit' className="bg-danger " >Connect to Wallet </Button>
          </Col >
          </Row>
          
          
          </Col>
          
          <Col className='d-flex justify-content-center mt-5'>
          <Card xs={12} md={10} className="text-center">
            <Card.Header>DAPP</Card.Header>
            <Card.Body>
              <Card.Title>Deposit</Card.Title>
              <Form>
              <Form.Control size="lg" type="text" value={deposit} placeholder="Deposit" onChange={(e) => setDopsit(e.target.value)} />
              <br/>
                <Button variant="primary" type='button' onClick={onDepostHandle}>Deposit</Button>
                </Form>
                <br/>
                <Card.Title>WidthDraw</Card.Title>
              <Form>
              <Form.Control size="lg" type="text" value={widthDraw} placeholder="With Draw" onChange={(e) => setWidthDraw(e.target.value)} />
              <br/>
                <Button variant="primary" type='button' onClick={onWidthDrawHandle}>WithDraw</Button>
                </Form>
            </Card.Body>
          </Card>
                    
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
