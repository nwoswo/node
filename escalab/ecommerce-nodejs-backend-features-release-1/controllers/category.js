const Category = require("../models/category");
const Product = require("../models/product");
const Sub = require("../models/sub");
const slugify = require("slugify");
//const { GET_ASYNC, SET_ASYNC } = require("../redis/index");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({ name, slug: slugify(name) }).save();
    // res.json(category);
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create category failed");
  }
};

exports.list = async (req, res) =>
  res.json(
    await Category.find({ status: "Active" }).sort({ createdAt: -1 }).exec()
  );

// example redis n°2
/*exports.list = async (req, res) => {
  try {
    const reply = await GET_ASYNC("categoriesList");
    if (reply) {
      console.log("using cached data");
      return res.send(JSON.parse(reply));
    }
    const categories = await Category.find({ status: "Active" })
      .sort({ createdAt: -1 })
      .exec();
    if (!categories) {
      res.status(404).send({ msg: "We have not found categories." });
    }
    res.json(categories);
    const saveResult = await SET_ASYNC(
      "categoriesList",
      JSON.stringify(categories),
      "EX",
      15
    );
    console.log("saveResult", saveResult);
  } catch (err) {
    //console.log(err);
    //res.send(err.message);
    res.status(500).send({ err: "Server Error. Please try later" });
  }
};*/

exports.read = async (req, res) => {
  let category = await Category.findOne({
    slug: req.params.slug,
    status: "Active",
  }).exec();
  // res.json(category);
  const products = await Product.find({ category, status: "Active" })
    .populate("category")
    .populate("subs")
    .exec();

  res.json({
    category,
    products,
  });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Category update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { status: "Inactive" },
      { new: true }
    );
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Category delete failed");
  }
};

exports.getSubs = (req, res) => {
  Sub.find({ parent: req.params._id, status: "Active" }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
