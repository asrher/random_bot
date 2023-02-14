const mongoose = require('mongoose');
const BlockSchema = new mongoose.Schema({
id: { type: String,required: true },
reason: { type: String, default: "بدون سبب" },
date: { type:  String, default: Date.now},
group: { type: String, default: "في الخاص" },
warnedby: { type: String, default: "false" }
})
const warndb =mongoose.model("warndb", BlockSchema)
module.exports = { warndb }