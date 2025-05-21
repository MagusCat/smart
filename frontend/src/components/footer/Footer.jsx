import { FaRegCopyright } from "react-icons/fa";

function Footer() {
  return (
    <footer className="flex w-auto h-12 bg-(--bg-fourth)">
      <p className="flex w-full gap-5 items-center justify-center">
        <FaRegCopyright />
        CheeseCake Team 2025
      </p>
    </footer>
  );
}

export default Footer;
