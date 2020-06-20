import Article from "../../models/article";
import nodeFetch from "node-fetch";
import cheerio from "cheerio";
import moment from "moment";
import "../../helper/mongoose";

export default (req, res) => {
  return new Promise((resolve) => {
    nodeFetch(
      "http://export.arxiv.org/api/query?search_query=all:cs&start=0&max_results=100&sortBy=submittedDate&sortOrder=descending"
    )
      .then((res) => res.text())
      .then(async (text) => {
        const $ = cheerio.load(text);
        const articles = $("entry");

        const ids = await Article.find().then((docs) => {
          if (docs.map((doc) => doc.toObject().arxivId)) {
            return docs.map((doc) => doc.toObject().arxivId);
          } else {
            return "";
          }
        });

        articles.each(async (index, entry) => {
          if ($("id", entry).text() && !ids.includes($("id", entry).text())) {
            const newArticle = new Article({
              title: $("title", entry).text(),
              description: $("summary", entry).text(),
              arxivId: $("id", entry).text(),
              publishedAt: moment($("published", entry).text()).toDate(),
              category: "CS",
              votes: 0,
              pdfLink: $("link [title=pdf]", entry).attr("href"),
            });

            await newArticle.save();
          }
        });
        return;
      })
      .then(() =>
        nodeFetch(
          "http://export.arxiv.org/api/query?search_query=all:physics&start=0&max_results=100&sortBy=submittedDate&sortOrder=descending"
        )
      )
      .then((res) => res.text())
      .then(async (text) => {
        const $ = cheerio.load(text);
        const articles = $("entry");

        const ids = await Article.find().then((docs) => {
          console.log("here tooooo");
          if (docs.map((doc) => doc.toObject().arxivId)) {
            return docs.map((doc) => doc.toObject().arxivId);
          } else {
            return "";
          }
        });

        articles.each(async (index, entry) => {
          if ($("id", entry).text() && !ids.includes($("id", entry).text())) {
            const newArticle = new Article({
              title: $("title", entry).text(),
              description: $("summary", entry).text(),
              arxivId: $("id", entry).text(),
              publishedAt: moment($("published", entry).text()).toDate(),
              category: "PHY",
              votes: 0,
              pdfLink: $("link [title=pdf]", entry).attr("href"),
            });

            console.log("got here too");

            await newArticle.save();
          }
        });
        return;
      })
      .then(() =>
        nodeFetch(
          "http://export.arxiv.org/api/query?search_query=all:econ&start=0&max_results=100&sortBy=submittedDate&sortOrder=descending"
        )
      )
      .then((res) => res.text())
      .then(async (text) => {
        const $ = cheerio.load(text);
        const articles = $("entry");

        const ids = await Article.find().then((docs) => {
          console.log("here tooooo");
          if (docs.map((doc) => doc.toObject().arxivId)) {
            return docs.map((doc) => doc.toObject().arxivId);
          } else {
            return "";
          }
        });

        articles.each(async (index, entry) => {
          if ($("id", entry).text() && !ids.includes($("id", entry).text())) {
            const newArticle = new Article({
              title: $("title", entry).text(),
              description: $("summary", entry).text(),
              arxivId: $("id", entry).text(),
              publishedAt: moment($("published", entry).text()).toDate(),
              category: "ECON",
              votes: 0,
              pdfLink: $("link [title=pdf]", entry).attr("href"),
            });

            await newArticle.save();
          }
        });
        return;
      })
      .then(() => {
        res.status(200).end();
        resolve();
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
        resolve();
      });
  });
};
