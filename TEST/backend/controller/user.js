const User = require("../models/User");

exports.updateUser = (req, res, next) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			$set: {
				name: req.body.name,
				email: req.body.email,
				gender: req.body.gender,
				phone: req.body.phone,
				pic: req.file?.filename,
			},
		},
		{ new: true }
	)
		.then((data) => {
			res.send({ type: "success", msg: "Successfully updated profile" });
		})
		.catch((err) => {
			console.log(err);
			res.send({ type: "error", msg: "Failed to update the profile" });
		});
};
exports.getPic = (req, res, next) => {
	const { userpic } = req.params ;
	const picName = userpic ;
	// res.sendFile(picName, { root: "media/user/pic" });
	res.sendFile(picName, { root: "media/user/pic/" ,headers: { 'Content-Type': 'image/jpeg' }});
	// User.findOne({ _id: req.user._id })
	// 	.then((usr) => {
	// 		if (usr) {
	// 			res.sendFile(usr.pic, { root: "media/user" });
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		res.send({ type: "error", msg: "File not found" });
	// 	});
	// res.send("djkf")
};

exports.getPersonList = (req, res) => {
	User.find({ _id: { $ne: req.user._id } }, { _id: 1, name: 1, pic: 1 })
		.then((usrs) => {
			res.send(usrs);
		})
		.catch((err) => {
			console.log(err);
			res.send({ type: "error", msg: "Failed to fetch persons" });
		});
};

