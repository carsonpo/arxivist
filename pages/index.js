import Head from "next/head";
import * as Styled from "../styles/index";
import { useEffect, useState } from "react";
import Table from "../components/Table";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("ALL");

  function getData() {
    fetch("/api/section", {
      method: "POST",
      body: JSON.stringify({ category }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("nope");
          return;
        }

        return res.json();
      })
      .then((json) => {
        setArticles(json);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getData();
  }, [category]);

  function formatColumns(data) {}

  function handleUpvote(arxivId) {
    fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({ arxivId }),
    }).then(() => {
      getData();
    });
  }

  return (
    <>
      <Styled.Nav>
        <Styled.NavList>
          <Styled.NavItem>
            <Styled.NavAnchor onClick={() => setCategory("ALL")}>
              Arxivist (all)
            </Styled.NavAnchor>
          </Styled.NavItem>
          <Styled.NavItem>
            <Styled.NavAnchor onClick={() => setCategory("PHY")}>
              Physics
            </Styled.NavAnchor>
          </Styled.NavItem>
          <Styled.NavItem>
            <Styled.NavAnchor onClick={() => setCategory("CS")}>
              Computer Science
            </Styled.NavAnchor>
          </Styled.NavItem>
          <Styled.NavItem>
            <Styled.NavAnchor onClick={() => setCategory("ECON")}>
              Economics
            </Styled.NavAnchor>
          </Styled.NavItem>
        </Styled.NavList>
      </Styled.Nav>
      <Styled.Container>
        <Head>
          <title>Arxivist</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <Table
          rows={articles}
          columns={["title", "description", "arxivId", "publishedAt", "votes"]}
          sortBy={"votes"}
          timefields={["publishedAt"]}
          refresh={getData}
          increment={handleUpvote}
        />
      </Styled.Container>
    </>
  );
}
