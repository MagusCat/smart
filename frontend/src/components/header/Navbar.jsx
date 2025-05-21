import { Children } from "react";

function Navbar({ children }) {
  return (
    <div className="flex">
      <ul className="flex flex-row flex-wrap gap-6 text-sm font-medium text-(--font-black)">
        {Children.map(children, (child) => (
          <li className="flex items-center">
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
