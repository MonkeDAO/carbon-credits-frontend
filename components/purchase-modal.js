import Image from "next/image";
import NFT from "../assets/images/nft.png";

function PurchaseModal({ setShowModal }) {
  return (
    <div className="w-full h-full fixed left-0 top-0 bg-[rgba(0,0,0,.5)] z-30 overflow-hidden grid items-center">
      <div className="grid justify-center gap-8 items-center max-w-4xl bg-white py-12 px-24 mx-auto">
        <span className="font-bold text-3xl">Purchase complete!</span>
        <div>
          <Image src={NFT} alt="Carbon NFT" height={250} width={250} />
        </div>
        <div className="pl-6 text-left">
          <p className="pb-6">
            Solana is a carbon neutral network, and the Foundation is working
            towards making it carbon negative.
          </p>
          <p>
            One approach is by recognizing validators that have purchased carbon
            offsets to neutralize their emissions. We’re interested in a project
            that verifies validators’ purchase of carbon offsets.{" "}
          </p>
        </div>
        <button
          className="text-white bg-[#5B8D61] py-3 hover:opacity-50 max-w-max px-6 mx-auto"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PurchaseModal;
