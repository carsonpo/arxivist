import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: String,
    description: String,
    arxivId: String,
    votes: Number,
    pdfLink: String,
    category: String,
    publishedAt: Date,
  },
  { timestamps: true, _id: true }
);

let ArticleModel;

function modelAreadyDeclared() {
  try {
    ArticleModel = mongoose.model("Article"); // it throws an error if the model is still not defined
    return true;
  } catch (e) {
    return false;
  }
}

if (!modelAreadyDeclared()) {
  ArticleModel = mongoose.model("Article", ArticleSchema);
}

export default ArticleModel;
