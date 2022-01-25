import { React, useState } from "react";

function StoryPages(props) {
  const { pageLinks } = props;
  const [selectedPage, setSelectedPage] = useState(pageLinks[0]);


 let links = pageLinks.map((pageLink)=>{
    return (
        <div key={pageLink.id}>
               <a
                 href='#'
                 onClick={(e) => {
                   e.preventDefault();
                  setSelectedPage(pageLink);
                 }}>
                 {pageLink.title}
               </a>
               <br />
               <span>{pageLink.description}</span> <br />
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
