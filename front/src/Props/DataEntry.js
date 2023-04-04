import { useRef, useState } from "react";
import { useAuth } from "../Auth/Auth";
import "../Style.css";
import {ethers} from 'ethers';
import { useNavigate } from "react-router-dom"

function DataEntry() {
   // const ethers = require("ethers")
   const {user} = useAuth();
   const navigate = useNavigate();
   const backBtn = () => {
    let path = `/home/explorer`;
    navigate(path);
}
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

  const [postName, setPostName] = useState("");
  const [postAdmin, setPostAdmin] = useState(user.name);
  const [postMarks,setPostMarks] = useState("");
  const [fromAddress,setfromAddress] = useState("0xc67e5FFF9316476236B104993d91309170bb7BAC");
  const [msg, setMsg] = useState("");
  const createPost = function () {
    var data = new FormData();
    data.append("postName", postName);
    data.append("postMarks",postMarks);
    data.append("postAdmin",postAdmin);
    data.append("userAddress",defaultAccount);
    data.append("fromAddress",fromAddress);
    
    console.log(data);
    console.log(JSON.stringify(data));
    // let formDataObject = Object.fromEntries(data.entries());
  // let formDataJsonString = JSON.stringify(formDataObject);
  // console.log(formDataJsonString);
    fetch("/post", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "success") {
          setMsg(
            <span className="fst-italic text-success">
              <span className="material-icons-outlined">done</span>
              {data.msg}
            </span>
          );
        } else {
          setMsg(
            <span className="fst-italic text-danger">
              <span className="material-icons-outlined">close</span>
              {data.msg}
            </span>
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div>
      <button onClick={backBtn}>Back</button>
      </div>
      <div className="row px-5 pt-3">
        <div className="col-12 fs-3">Enter Students Data</div>
      </div>
      <div className="row p-5">
        <div className="text-center mb-3">{msg}</div>
        <div className="form-floating">
        <div>
            {/* <h6>MetaMask Wallet</h6> */}
            <button onClick={connectWallet}>Connect Wallet</button>
            <h6>Address: {defaultAccount} </h6>
            <h6>Balance is :{userBalance} </h6>
        </div>
          <div className="mb-3">
			<label  className="form-label">
			  Student Name
			</label>
			<input
			  type="text"
			  id="stu_name"
			  name="stu_name"
			  className="form-control"
			  value={postName}
			  onChange={(e) => setPostName(e.target.value)}
			/></div>
			
          
          <div className="mb-3">
			<label  className="form-label">
            Student Marks
			</label>
			<input
			  type="text"
			  id="marks"
			  name="marks"
			  className="form-control"
			  value={postMarks}
			  onChange={(e) => setPostMarks(e.target.value)}
			/>
		  </div>
          <div className="mb-3">
			<label  className="form-label">
            Admin
			</label>
			<input
			  type="text"
			  id="admin"
			  name="admin"
			  className="form-control"
			  value={postAdmin}
			  onChange={(e) => setPostAdmin(user.name)}
			/>
		  </div>
      <div className="mb-3">
			<label  className="form-label">
            fromAddress
			</label>
			<input
			  type="text"
			  id="admin"
			  name="admin"
			  className="form-control"
			  value={fromAddress}
			  onChange={(e) => setfromAddress("0xc67e5FFF9316476236B104993d91309170bb7BAC")}
			/>
		  </div>
      
        
        </div>
        </div>
      <div className="text-center">
        <button className="btn btn-primary px-5" onClick={createPost}>
          Save
        </button>
      </div>
    </div>
  );
}

export default DataEntry;
