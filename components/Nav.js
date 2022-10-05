import Logo from "../assets/images/logo.png";
import Image from "next/image";

function Navbar() {
  return (
    <nav className={`bg-[#184623] flex justify-between py-4 px-36`}>
      <div className="relative w-32">
        <Image src={Logo} alt="Logo" layout="responsive" objectFit="contain" />
      </div>
      <button className="bg-[#4A8F5D] px-6">Connect wallet</button>
    </nav>
  );
}

export default Navbar;
