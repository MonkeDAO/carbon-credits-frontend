import Logo from "../assets/images/logo.png";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function Navbar() {
  return (
    <nav
      className={`bg-[#184623] flex justify-between items-center py-4 px-4 sm:px-8 md:px-24 lg:px-36`}
    >
      <div className="relative w-24 sm:w-32">
        <Image src={Logo} alt="Logo" layout="responsive" objectFit="contain" />
      </div>
      <WalletMultiButton className="!bg-[#4A8F5D] hover:opacity-70 sm:py-0 px-3 sm:px-6" />
    </nav>
  );
}

export default Navbar;
