import mongoose from "mongoose";

const connection = mongoose.connect(
  "mongodb+srv://admin:pxl9U9RfBeJgp4K3@cluster0-8cvdt.mongodb.net/Cluster0?retryWrites=true&w=majority"
);

mongoose.connection.on("open", () => {
  console.log("MongoDB connection initiated");
});

mongoose.connection.on("error", () => {
  console.error("MongoDB connection Error!");
});

mongoose.set("useFindAndModify", false);
