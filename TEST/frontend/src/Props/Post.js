import "../Style.css"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
function Post(props) {
	const navigate=useNavigate();
	const [msg, setMsg] = useState("");
	const [postData, setPostData] = useState({
		postType: props?.postData?.postType,
		postCity: props?.postData?.postCity,
		postState: props?.postData?.postState,
		postDistrict: props?.postData?.postDistrict,
		postYear: props?.postData?.postYear,
		postDimensions: props?.postData?.postDimensions,
		postSqArea: props?.postData?.postSqArea,
		postText: props?.postData?.postText,
		postImage: props?.postData?.postImage,
		postOwner:props?.postData?.postOwner
	  });
	
	const CartBtn = () =>{ 
        fetch("/cart", {
            method: "POST",
			headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(props)
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
			navigate('/cart');
        };
	return (
		<div className="container-fluid p-3 border bg-white shadow mb-2">
			<div className="d-flex">
				<div>
					<img
						src={"media/user/pic/"+props?.postData?.userId?.pic}
						alt="user"
						className="user-small-image rounded rounded-circle"
					/>
				</div>
				<div className="ms-3">
					<span className="fs-5 fw-bold">{props?.postData?.userId?.name}</span>
				</div>
			</div>
			<div className="row">
				<div className="col mt-1 mb-2">
					<span>{props?.postData?.postType}</span>
					<span>{props?.postData?.postCity}</span>
					<span>{props?.postData?.postState}</span>
					<span>{props?.postData?.postDistrict}</span>
					<span>{props?.postData?.postYear}</span>
					<span>{props?.postData?.postDimensions}</span>
					<span>{props?.postData?.postSqArea}</span>
					<span>{props?.postData?.postText}</span>
					<span>{props?.postData?.postOwner}</span>
				</div>
			</div>
			<div className="row">
				<img src={"/post/pic/"+props?.postData?.postImage} alt="post" className="post-image" />
				
			</div>
			<span><button className="CartBtn" onClick={CartBtn}>Add to Cart</button></span>
		</div>
	);
}

export default Post;
