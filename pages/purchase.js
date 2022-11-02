import { useState, useCallback, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useSnackbar } from "notistack";
import Layout from "../components/Layout";
import PurchaseModal from "../components/purchase-modal";
import { slowConnection } from "../solanacodes/config";
import {
  getSolPrice,
  getUserPurchaseHistory,
  loadCarbonProgram,
  mintCarbonCredit,
} from "../contract/utils";

function Purchase() {
  const [tons, setTons] = useState(2);
  const [showModal, setShowModal] = useState(false);

  const wallet = useAnchorWallet();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [solPrice, setSolPrice] = useState(1);

  const fetchPurchaseHistory = useCallback(async () => {
    if (wallet?.publicKey) {
      const program = await loadCarbonProgram(slowConnection, wallet);
      const purchaseHistoryLocal = await getUserPurchaseHistory(
        program,
        wallet
      );
      setPurchaseHistory(purchaseHistoryLocal);
    } else {
      setPurchaseHistory([]);
    }
  }, [wallet]);

  useEffect(() => {
    fetchPurchaseHistory();
  }, [fetchPurchaseHistory]);

  const fetchSolPrice = useCallback(async () => {
    const solPriceCurrent = await getSolPrice();
    setSolPrice(parseFloat(solPriceCurrent));
  }, []);

  useEffect(() => {
    fetchSolPrice();
  }, [fetchSolPrice]);

  const assertWalletConnected = useCallback(() => {
    if (!wallet) {
      enqueueSnackbar("Please connect your wallet!", { variant: "error" });
      return false;
    }
    return true;
  }, [enqueueSnackbar, wallet]);

  const onClickPurchase = useCallback(async () => {
    if (assertWalletConnected()) {
      let stakeSnackbar = undefined;
      try {
        stakeSnackbar = enqueueSnackbar("Purchasing...", {
          variant: "info",
          persist: true,
        });
        const program = await loadCarbonProgram(slowConnection, wallet);
        await mintCarbonCredit(program, wallet, tons);
        await fetchPurchaseHistory();
        enqueueSnackbar("Done", {
          variant: "success",
        });
        setShowModal(true);
      } catch (error) {
        console.log({ error });
        enqueueSnackbar(error?.message, {
          variant: "error",
        });
      } finally {
        if (stakeSnackbar) closeSnackbar(stakeSnackbar);
      }
    }
  }, [
    assertWalletConnected,
    enqueueSnackbar,
    wallet,
    tons,
    fetchPurchaseHistory,
    closeSnackbar,
  ]);

  const costOfOneCredit = parseFloat(
    process.env.NEXT_PUBLIC_COST_OF_ONE_CREDIT
  );

  const transactions = [
    {
      date: "12/02/22",
      amount: "13",
      cost: "2560",
      impact: "?",
    },
    {
      date: "12/02/22",
      amount: "14",
      cost: "2780",
      impact: "?",
    },
    {
      date: "12/02/22",
      amount: "2",
      cost: "671",
      impact: "?",
    },
  ];

  return (
    <Layout>
      <h2 className="text-[#184623] text-3xl font-medium pt-12 md:pt-24">
        Purchase Carbon Credits
      </h2>
      {showModal && <PurchaseModal setShowModal={setShowModal} />}
      <p className="text-left py-6">
        MonkeDAO, together with The Solana Foundation, is committed to keeping
        the network carbon neutral in 2022 and in the future and encourages all
        validators to take a look at their own local emissions data and
        mitigation strategies. In addition, the engineers at Solana Labs will
        continue to make Solana more performant — and therefore, more energy
        efficient.
      </p>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(243, 239, 205, 0) 0%, #F3EFCD 99.46%)",
        }}
        className="py-12 shadow-[4px_4px_0_#4A8F5D] border-2 border-[#184623] px-4"
      >
        <div className="max-w-xs mx-auto grid gap-4">
          <span className="font-bold text-2xl">Purchase Credits</span>
          <div className="grid grid-cols-3 sm:grid-cols-[1fr_2fr_1fr] items-center mx-auto">
            <button
              className="bg-[#4A8F5D] h-full text-white py-4 font-extrabold"
              onClick={() => {
                const intValue = parseInt(tons) - 1;
                setTons(intValue < 1 ? 1 : intValue);
              }}
            >
              -
            </button>
            <input
              type="text"
              className="bg-white border-2 text-center border-[#184623] py-4"
              placeholder="20 tons"
              value={tons}
              onChange={(e) => {
                const value = e.target.value;
                try {
                  const intValue = parseInt(value);
                  if (isNaN(intValue)) {
                    setTons(1);
                  } else {
                    setTons(Math.max(1, intValue));
                  }
                } catch (error) {
                  console.log({ error });
                  setTons(1);
                }
              }}
            />
            <button
              className="bg-[#4A8F5D] h-full text-white py-4 font-extrabold"
              onClick={() => setTons(parseInt(tons) + 1)}
            >
              +
            </button>
          </div>
          <div className="flex justify-between items-center flex-col">
            <span>Total Cost</span>
            <p className="font-extrabold text-2xl text-[#184623] my-2">
              ${(costOfOneCredit * tons).toFixed(2)} (
              {((costOfOneCredit * tons) / solPrice).toFixed(2)} SOL)
            </p>
          </div>
          <button
            className="text-white bg-[#184623] py-3 hover:opacity-50"
            onClick={onClickPurchase}
          >
            Purchase
          </button>
        </div>
      </div>
      <h3 className="font-bold text-2xl pt-8 pb-4">Purchase History</h3>
      <div className="overflow-x-auto text-left pb-12">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-[#F3EFCD] border-2 border-[#184623]">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left text-[#184623] font-semibold">
                Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left text-[#184623] font-semibold">
                Amount
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left text-[#184623] font-semibold">
                Cost
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left text-[#184623] font-semibold">
                Impact
              </th>
            </tr>
          </thead>

          <tbody>
            {purchaseHistory
              .sort((a, b) => b?.time - a?.time)
              .map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {new Date(transaction.time * 1000).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {transaction.amount} Tons
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      ${transaction.amount * costOfOneCredit}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {transaction.impact || "?"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Purchase;
