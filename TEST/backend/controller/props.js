const User = require("./models/POP_test");

exports.updateUser = async(req,res,next) => {
    try{
        const updatedUser = await User.findOneAndUpdate(
        {_id: req.body._id},
        {
            $set: {
            type: req.body.type,
            city: req.body.city,
            state: req.body.state,
            district: req.body.district,
            address: req.body.address,
            year: req.body.year,
            dimension: req.body.dimension,
            SqArea: req.body.SqArea,
            pic: req.body?.filename,
            owner: req.body.owner,
        },

        },
        {new: true}
    );
        res.send({
            type: "success", msg: "successfully updated the property details"
        });
    }
    catch(err) {
        console.log(err);
        res.send({type: "error", msg: "failed to update property details"});
    }
}

exports.getPic = async(req,res,next) => {
    try {
        const picName = req.params.userpic;
        const user = await User.findOne({ _id: req.user._id });
        if (user) {
          res.sendFile(user.pic, { root: "media/posts" });
        }
      } catch (error) {
        console.log(error);
        res.send({ type: "error", msg: "file not found" });
      }
    };