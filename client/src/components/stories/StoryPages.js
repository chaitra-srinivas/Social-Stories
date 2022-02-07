import { React, useState } from "react";
import { Button, Icons, List, Image } from "semantic-ui-react";
import "../../App.css";

function StoryPages(props) {
  const pages = props.pages;
  const pageSelected = props.pageSelected;

  const [selectedPage, setSelectedPage] = useState(pages[0]);

  let links = pages.map((page) => {
    return (
      <div
        ui
        celled
        list
        key={page.id}
        className='item'
        onClick={(e) => {
          e.preventDefault();
          setSelectedPage(page);
          pageSelected(page);
        }}>
        <i className='pencil alternate icon'></i>
        <List className='content'>
          <div className='ui header'>{page.title}</div>
          {page.description}
        </List>
      </div>
    );
  });

  return <div className='ui visible left vertical sidebar menu'>{links}</div>;
}
export default StoryPages;
