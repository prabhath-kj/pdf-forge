import Link from "next/link";
import { Title } from "./Nav";

const NavLink = ({ path,title}:Title) => {
  return <Link className="block py-2 pl-3 pr-4 text-black font-semibold" href={path}>{title}</Link>;
};

export default NavLink;
