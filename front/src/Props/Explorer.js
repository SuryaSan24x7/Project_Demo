import {useState, useEffect} from "react"
import { useAuth } from "../Auth/Auth"
import Post from "./Post"

import { useNavigate } from "react-router-dom"
function Explorer() {
	const [posts, setPosts] = useState([]);
	const {user,logout} = useAuth()
	const navigate = useNavigate()
	const EnterData = () =>{ 
		let path = `/data`; 
		navigate(path);
	  }
	  
	const getPosts = function () {
		fetch("/post/lists", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				if (!data.msg) setPosts(data);
			})
			.catch((err) => console.log(err));
	};
	useEffect(()=>{
		getPosts()
	},[])
	return (
		<div className="container-fluid"><div>
			<h6>{user.name} is logged in...</h6>
		</div>
			<div>
			<button className="logOut" onClick={()=>{logout().then(res => {
					navigate("/")
				})}}>Log Out</button>
			<button className="dataentry" onClick={EnterData}>Data Entry

				</button>
			</div>
			<div className="row">
				<div className="col-4 mt-2 mb-2 fs-3">Explorer</div>
			</div>
			<div className="col-4">
				{posts.map(postData => <Post postData={postData}/>)}
			</div>
		</div>
	);
}

export default Explorer;