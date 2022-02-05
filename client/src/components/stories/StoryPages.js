import { React, useState } from "react";
import { Icons } from "semantic-ui-react";
import "../../App.css";

function StoryPages(props) {
  const pages = props.pages;
  const pageSelected = props.pageSelected;

  const [selectedPage, setSelectedPage] = useState(pages[0]);

  let links = pages.map((page) => {
    return (
      // TODO: Change to button
      <a
        className='item'
        key={page.id}
        href='#'
        onClick={(e) => {
          e.preventDefault();
          setSelectedPage(page);
          pageSelected(page);
        }}>
        <i className='pencil alternate icon'></i>
        {page.title}
        <br />
        <span>{page.description}</span>
      </a>
    );
  });

  return <div className='ui visible left vertical sidebar menu'>{links}</div>;
}
export default StoryPages;
