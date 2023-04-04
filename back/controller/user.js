const User = require("../models/User");

exports.updateUser = (req, res, next) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			$set: {
				name: req.body.name,
				email: req.body.email,
				gender: req.body.gender,
				phone: req.body.phone
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
