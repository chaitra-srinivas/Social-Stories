import { React, useState } from "react";

function StoryPages(props) {
  const pages = props.pages;
  const pageSelected = props.pageSelected;

  const [selectedPage, setSelectedPage] = useState(pages[0]);

  let links = pages.map((page) => {
    return (
      <a
        className='item'
        key={page.id}
        href='#'
        onClick={(e) => {
          e.preventDefault();
          setSelectedPage(page);
          pageSelected(page);
        }}>
        <i className='home icon'></i>
        {page.title}
        <br />
        <span>{page.description}</span> <br />
      </a>
    );
  });

  return (
    <div className='ui visible left vertical sidebar menu'>
         {links}
    </div>
  );
}
export default StoryPages;
