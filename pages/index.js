import Image from "next/image";
import Layout from "../components/Layout";
import NFT from "../assets/images/nft.png";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-[#184623] font-bold text-5xl pt-12 md:pt-24">
        Take action on carbon emissions today
      </h1>
      <p className="text-left pt-12">
        Join MonkeDAO in its commitment to keep the network carbon neutral–-and
        maybe even carbon negative.
      </p>
      <p className="text-left py-6">
        With the help of a Solana Foundation grant, MonkeDAO is introducing
        Solana’s first Offset NFT–a way for you to prove that your project or
        validator has offset its carbon footprint in 2022.
      </p>
      <div className="text-left grid gap-6">
        <p>Here’s how it works:</p>
        <ol className="list-decimal ml-8">
          <li>
            <span className="font-bold">Connect your wallet</span>
          </li>
          <li>
            <span className="font-bold">Buy an offset:</span> We’ve suggested
            $100 for one high-quality ton of carbon offsets to start.
          </li>
          <li>
            <span className="font-bold">Get your Offset NFT:</span> It’s your
            badge to show off to the world and demonstrate that your project’s
            offset its carbon footprint for the year.
          </li>
        </ol>
        <p>
          Offset NFTs expire after a year, so start your collection now and
          commit to sinking your project’s carbon footprint from every year here
          forward.
        </p>
      </div>
      <h2 className="text-[#184623] text-3xl font-medium py-8">
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
      <div className="py-12">
        <h2 className="text-[#184623] text-3xl font-medium py-8">
          Frequently Asked Questions
        </h2>
        <div class="space-y-4">
          <details
            class="group border-l-4 border-[#184623] bg-[#F2EFD0] p-6 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary class="flex items-center justify-between cursor-pointer">
              <h2 class="text-lg font-medium text-gray-900">
                How did you calculate the offset price?
              </h2>

              <span class="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <p class="mt-4 leading-relaxed text-gray-700">
              We took the recommendation from Stripe’s Frontier Fund, who
              suggests $100 as a reasonable social cost of carbon as a starting
              point.
            </p>
          </details>

          <details class="group border-l-4 border-[#184623] bg-[#F2EFD0] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex items-center justify-between cursor-pointer">
              <h2 class="text-lg font-medium text-gray-900">
                Don’t different projects have different carbon footprints?
              </h2>

              <span class="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <p class="mt-4 leading-relaxed text-gray-700">
              Absolutely. Over time, we’ll make it easier for you to calculate
              your project’s exact footprint and purchase the corollary amount
              of offsets.
            </p>
          </details>

          <details class="group border-l-4 border-[#184623] bg-[#F2EFD0] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex items-center justify-between cursor-pointer">
              <h2 class="text-lg font-medium text-gray-900">
                Why aren’t we buying carbon on-chain?
              </h2>

              <span class="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <p class="mt-4 leading-relaxed text-gray-700">
              Our thoughts exactly! In the future, our plan is to make it easy
              to buy on-chain carbon and get a linked NFT reward. This is the
              first release, but once there are more options to buy tokenized
              carbon on Solana, enabling on-chain purchases is on the roadmap.
            </p>
          </details>

          <details class="group border-l-4 border-[#184623] bg-[#F2EFD0] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex items-center justify-between cursor-pointer">
              <h2 class="text-lg font-medium text-gray-900">
                This is cool! How can I get involved?
              </h2>

              <span class="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <p class="mt-4 leading-relaxed text-gray-700">
              Glad you think so. Contact us here (add link).
            </p>
          </details>
        </div>
      </div>
    </Layout>
  );
}
