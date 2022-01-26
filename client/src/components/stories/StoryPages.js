import { React, useState } from "react";

function StoryPages(props) {
  const  pages  = props.pages;
  const  pageSelected  = props.pageSelected;
  
  const [selectedPage, setSelectedPage] = useState(pages[0]);

 let links = pages.map((page)=>{
    return (
        <div key={page.id}>
               <a
                 href='#'
                 onClick={(e) => {
                   e.preventDefault();
                  setSelectedPage(page);
                  pageSelected(page);
                 }}>
                 {page.title}
               </a>
               <br />
               <span>{page.description}</span> <br />
             </div>
         );
  })

  return(
      <div>
        <ul>
          <li>{links}</li>
        </ul>
      </div>
  )

  
}
export default StoryPages;
