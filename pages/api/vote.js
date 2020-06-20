import Article from "../../models/article";

export default (req, res) => {
  const body = JSON.parse(req.body);
  const { arxivId } = body;

  return new Promise((resolve) => {
    Article.findOneAndUpdate({ arxivId }, { $inc: { votes: 1 } })
      .exec()
      .then(() => {
        res.status(200).end();
        resolve();
        return;
      })
      .catch((err) => {
        res.status(500).end();
        resolve();
        return;
      });
  });
};
