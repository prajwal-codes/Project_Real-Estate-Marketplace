import {useState, useEffect} from "react"
import TestPost from "./TestPost"

function TestFeed() {
	const [posts, setPosts] = useState([]);

	const getPosts = function () {
		fetch("/post/all", {
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
		<div className="container-fluid">
			<div className="row">
				<div className="col-4 mt-2 mb-2 fs-3">Feed</div>
			</div>
			<div className="col-4">
				{posts.map(postData => <TestPost postData={postData}/>)}
			</div>
		</div>
	);
}

export default TestFeed;