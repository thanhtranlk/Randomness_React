import "./RandomQuotes.css";
import axios, { AxiosResponse } from "axios";
import React, {
  useEffect,
  useState,
  Component,
  ChangeEvent,
  MouseEvent,
} from "react";
import { Quote, QuoteIO } from "@/datatypes";

export default function RandomQuotesComponent(): JSX.Element {
  const [quotes,setQuotesArr] = useState<Quote[]>([]);

  const [searchTerm, setSearch] = useState("imagine");
  function updateSearch(ev: ChangeEvent<HTMLInputElement>): void {
    setSearch(ev.target.value);
  }

  const [quotesLimit, setLimit] = useState(5);
  function updateLimit(ev: ChangeEvent<HTMLInputElement>): void {
    setLimit(Number(ev.target.value));
  }

  let currentPage = 0;
  let maxPage = 0;
  const [quotableGitHub] = useState("https://github.com/lukePeavey/quotable");
  const [quotableAPI] = useState("https://api.quotable.io");

  useEffect((): void => {
    
    [getFromPage];
  }, [quotesLimit, currentPage, searchTerm]);

  
  // function fetchNextPage(): void {
  //   currentPage += 1;
  //   getFromPage(currentPage);
  // }

  function getFromPage(ev: MouseEvent<HTMLButtonElement>): void {
    axios
      .request({
        method: "GET",
        url: `${quotableAPI}/search/quotes`,
        params: {
          limit: quotesLimit,
          page: 1,
          query: searchTerm,
          fields: "content",
        },
      })
      .then((r: AxiosResponse) => r.data)
      .then((r: QuoteIO) => {
        currentPage = r.page;
        maxPage = r.totalPages;

        // Remove old data from the array
       //setQuotesArr();
        // Save the JSON data from the Web API to quotes array
        // so the UI will get updated accordingly
        setQuotesArr(r.results);
      });
    console.log(quotes);
  }

  return (
    <>
      <h1>Random Quotes</h1>
      <p>
        Data source:
        <li>
          Documentation
          <a href={quotableGitHub}>Quotable API (on GitHub)</a>
        </li>
        <li>
          <a href="'${quotableAPI}/quotes'">API Endpoint</a>
        </li>
      </p>

      <label>Word to search in quotes</label>
      <input type="text" onChange={updateSearch} />
      <label>Quotes per page</label>

      <input type="number" onChange={updateLimit} />

      <button onClick={getFromPage}>Fetch</button>
      {/* {currentPage > maxPage ? (
        <p>No more page</p>
      ) : (
        // <button
        //   onClick={
        //     fetchNextPage
        //   }
        // >
        //   Next page
        // </button>
      )} */}

      {/* </p> */}

      {quotes.length < 0 ? (
        <p>No Quotes</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Quote</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((e: Quote, pos: number) => {
              return (
                <tr key={pos}>
                  <td>
                    <p>{e.content}</p>
                    {e.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </td>
                  <td>{e.author}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
