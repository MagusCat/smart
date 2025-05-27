import NavItem from "./NavItem.jsx";

function NavOptions({
  className,
  classItem,
  classNav,
  icons,
  navOptions = [],
}) {
  const options = navOptions.map((opt) => (
    <li className={classItem || ""} key={opt.name}>
      <NavItem
        className={classNav || ""}
        icon={icons && opt.icon}
        to={opt.to}
      >
        {opt.name}
      </NavItem>
    </li>
  ));

  return <ul className={className || ""}> {options} </ul>;
}

export default NavOptions;