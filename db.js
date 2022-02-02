const mongoose = require("mongoose");
const makeCon = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://gk:1234@cluster0.8ro8q.mongodb.net/ScrapDB?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("Connextdto DB!");
  } catch (err) {
    console.log(err);
  }
};
module.exports = makeCon;
