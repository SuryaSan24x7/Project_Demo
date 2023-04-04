import "../Style.css"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
function Post(props) {
	const navigate=useNavigate();
	const [msg, setMsg] = useState("");
	const [postData, setPostData] = useState({
		postName: props?.postData?.postName,
		postMarks: props?.postData?.postMarks,
		postAdmin:props?.postData?.postAdmin,
        postToken:props?.postData?.postToken
	  });
	
	return (
		<div className="container-fluid p-3 border bg-white shadow mb-2">
			<div className="d-flex">
			</div>
			<div className="row">
				<div className="col mt-1 mb-2">
					<span>{props?.postData?.postName}</span>
					<span>{props?.postData?.postMarks}</span>
                    <span>{props?.postData?.postToken}</span>
				</div>
			</div>
		</div>
	);
}

export default Post;
