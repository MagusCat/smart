import { FaRegCopyright } from "react-icons/fa";

function Footer() {
  return (
    <footer className="flex w-full text-xs h-12 bg-(--bg-fourth) mt-10">
      <p className="flex w-full gap-2 items-center justify-center">
        <FaRegCopyright size='0.8rem' />
        CheeseCake Team 2025
      </p>
    </footer>
  );
}

export default Footer;
