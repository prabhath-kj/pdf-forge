import NavLink from "./NavLink";
import { Title } from "./Nav";

interface MobileOverLayProps {
    pages: Title[];
  }
  
const MobileOverLay: React.FC<MobileOverLayProps> = ({ pages }) => {  
    return (
         <ul className="flex flex-col items-center py-4">
            {pages.map((title, index) => {
              return <li key={index}>{NavLink(title)}</li>;
            })}
          </ul>
  )
}

export default MobileOverLay