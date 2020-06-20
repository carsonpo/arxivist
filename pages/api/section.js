import Article from "../../models/article";
import moment from "moment";
import "../../helper/mongoose";

export default (req, res) => {
  const body = JSON.parse(req.body);

  if (!body || !body.category) {
    return res.status(400);
  }
  return new Promise((resolve) => {
    if (body.category === "ALL") {
      Article.find({
        createdAt: { $gt: moment().startOf("day").toDate() },
      })
        .exec()
        .then((docs) => {
          res.status(200).json(docs.map((doc) => doc.toObject()));
          resolve();
          return;
        })
        .catch((err) => {
          res.status(404).json(err);
          resolve();
          return;
        });
    } else {
      Article.find({
        category: body.category,
        createdAt: { $gt: moment().startOf("day").toDate() },
      })
        .exec()
        .then((docs) => {
          res.status(200).json(docs.map((doc) => doc.toObject()));
          resolve();
          return;
        })
        .catch((err) => {
          res.status(404).json(err);
          resolve();
          return;
        });
    }
  });
};
