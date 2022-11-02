import Image from "next/image";
import Layout from "../components/Layout";
import NFT from "../assets/images/nft.png";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-[#184623] font-bold text-5xl pt-12 md:pt-24">
        Take action on carbon emissions today
      </h1>
      <p className="text-left py-12">
        MonkeDAO, together with The Solana Foundation, is committed to keeping
        the network carbon neutral in 2022 and in the future and encourages all
        validators to take a look at their own local emissions data and
        mitigation strategies. In addition, the engineers at Solana Labs will
        continue to make Solana more performant — and therefore, more energy
        efficient.
      </p>
      <h2 className="text-[#184623] text-3xl font-medium pb-8">
        The Carbon NFT
      </h2>
      <div className="grid sm:grid-cols-[1fr_2fr] text-left">
        <Image src={NFT} alt="Carbon NFT" width={500} height={500} />
        <div className="py-12 sm:py-0 sm:pl-6">
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
      </div>
    </Layout>
  );
}
