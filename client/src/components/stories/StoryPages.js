import { React, useState } from "react";
import { List } from "semantic-ui-react";
import "../../App.css";

function StoryPages(props) {
  const pages = props.pages;
  const pageSelected = props.pageSelected;

  const [selectedPage, setSelectedPage] = useState(pages[0]);

  let links = pages.map((page) => {
    return (
      <List.Item
        key={page.id}
        className='item'
        activeClassName='active'
        onClick={(e) => {
          e.preventDefault();
          setSelectedPage(page);
          pageSelected(page);
        }}>
        <i className='pencil alternate icon'></i>
        <List.Content>
          <div className='ui header'>{page.title} </div>
          {page.description}
        </List.Content>
      </List.Item>
    );
  });

  return (
    <List
      fluid
      vertical
      selection
      animated
      list
      verticalAlign='middle'
      className='ui bottom attached'>
      {links}
    </List>
  );
}
export default StoryPages;
