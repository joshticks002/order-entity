const branch = require("mongoose");

const branchSchema = branch.Schema({
  place_id: {
    type: String,
    required: [true],
    unique: true,
  },
});

module.exports = branch.model("branch", branchSchema);
