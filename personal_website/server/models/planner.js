var mongoose = require('mongoose');

var	plannerSchema = new mongoose.Schema({

	plan: 	[{
				type: String
			}]

}, { timestamps: true });

mongoose.model("Planner", plannerSchema);
