import React, { useState, useEffect } from "react";
import Cards from "./Components/Cards";
import Pagination from "./Components/Pagination";
import "./index.css";
export default function App() {
  const [actualData , setActualData] = useState([])
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);
  const api_url =
    "https://api.github.com/users/reerajput930/followers?per_page=ALL";

  useEffect(() => {
    async function getApi(url) {
      setLoading(true);
      const response = await fetch(url);
      let data = await response.json();
      console.log("hello");
      setPosts(data);
      setActualData(data)
      setLoading(false);
    }
    getApi(api_url);
  }, []);

  
  // calculating new current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // current page
  function paginate(page) {
    setCurrentPage(page);
  }

  // length of pages
  const pagesLength = Math.ceil(posts.length / postsPerPage);

  function prev() {
    let newCurrentPage = currentPage - 1;

    if (newCurrentPage < 1) {
      setCurrentPage(pagesLength);
    } else {
      setCurrentPage(newCurrentPage);
    }
  }
  function next() {
    let newCurrentPage = currentPage + 1;
    console.log(newCurrentPage);

    if (newCurrentPage > pagesLength) {
      setCurrentPage(1);
    } else {
      setCurrentPage(newCurrentPage);
    }
  }

  // filteration is here
  // setting the new filter out posts
  function searching() {

    console.log("serching")
    const search_value = document.querySelector("input").value;

    // so that previous data can be cature
    setCurrentPage(1)

    if (search_value) {
      console.log(search_value);

      const newPostsFilter = actualData.filter((object) => {
        return object.login.toUpperCase().indexOf( search_value.toUpperCase()) != -1;
      });
      setPosts(newPostsFilter);
      console.log(newPostsFilter)
    }
    else if(search_value == ""){
        setPosts(actualData);

    }
  }

  return (
    <>
    
      <h1 className="heading">Pagination + Filteration</h1>
       <h3><a href="https://github.com/reerajput930?tab=followers">Ree's Github Followers</a></h3>
      <div className="search-box">
        <input  onChange={searching}  type="text" placeholder="write a name here..." />
      </div>
      <div className="pagination--part">
        <button className="prev" onClick={prev}>
          {"<"}
        </button>
        <Pagination
          totalposts={posts}
          postsperpage={postsPerPage}
          paginate={paginate}
        />
        <button className="next" onClick={next}>
          {">"}
        </button>
      </div>
      <Cards posts={currentPosts} loading={loading} />
    </>
  );
}
