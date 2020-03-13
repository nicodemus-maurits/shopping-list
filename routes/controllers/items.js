const Items = require("../../models/Items");

// @desc    Get all items
// @route   GET /api/v1/items
// @access  public
exports.getItems = async (req, res, next) => {
  try {
    const items = await Items.find().sort({ date: -1 });
    return res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};

// @desc    Add an item
// @route   POST /api/v1/items
// @access  public
exports.addItem = async (req, res, next) => {
  try {
    const items = await Items.create(req.body);
    return res.status(201).json({
      success: true,
      data: items
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};

// @desc    Delete item
// @route   DELETE /api/v1/item/:id
// @access  public
exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Items.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        error: "No item found with that id"
      });
    }
    await item.remove();
    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};
