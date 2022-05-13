const Coupon = require("../models/coupon");

// create, remove, list

exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    // return;
    const { name, expiry, discount } = req.body.coupon;
    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.remove = async (req, res) => {
  try {
    res.json(
      await Coupon.findByIdAndUpdate(
        req.params.couponId,
        { status: "Inactive" },
        { new: true }
      ).exec()
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Coupon.find({ status: "Active" }).sort({ createdAt: -1 }).exec());
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
