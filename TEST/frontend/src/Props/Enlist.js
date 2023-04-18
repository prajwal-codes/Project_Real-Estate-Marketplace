import { useState, useEffect } from "react";
import "../Style.css"

function ListItem(props) {
	return (
		<div className="d-flex">
			<div>
				<img src={"/user/pic/" + props?.post?.pic} className="user-small-image rounded rounded-circle" alt="" />
			</div>
			<div className="align-self-center">
				<span className="ms-3">{props?.post?.name}</span>
			</div>
		</div>
	);
}

function PropertyList() {
	const [List, setList] = useState([]);

	const getPropertyList = function () {
		fetch("/user/post", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => setList(data))
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getPropertyList();
	}, []);

	return (
		<div className="container-fluid p-0">
			{List.map((post) => {
				return (
					<div className="row p-0">
						<div className="col-12 px-3 border bg-white">
							<ListItem post={post} />
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default PropertyList;
