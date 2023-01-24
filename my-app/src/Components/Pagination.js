import React from "react";

export default function Pagination({ totalposts, postsperpage, paginate }) {
  const pagesIndex = [];
  // calculating total number of pages will form
  for (let i = 1; i <= Math.ceil(totalposts.length / postsperpage); i++) {
    pagesIndex.push(i);
  }

  return (
    <div className="btn">
      {pagesIndex.map((page) => {
        return <a  onClick={() => paginate(page)}>{page}</a>;
      })}
    </div>
  );
}
