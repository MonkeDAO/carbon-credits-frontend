import Logo from "../assets/images/logo.png";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function Navbar() {
  return (
    <nav className={`bg-[#184623] flex justify-between py-4 px-36`}>
      <div className="relative w-32">
        <Image src={Logo} alt="Logo" layout="responsive" objectFit="contain" />
      </div>
      <WalletMultiButton className="bg-[#4A8F5D] px-6" />
    </nav>
  );
}

export default Navbar;
