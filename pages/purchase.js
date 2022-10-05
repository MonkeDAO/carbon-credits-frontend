import { useState } from "react";
import Layout from "../components/Layout";

function Purchase() {
  const [tons, setTons] = useState(2);
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
      <h2 className="text-[#184623] text-3xl font-medium pt-24">
        Purchase Carbon Credits
      </h2>
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
        className="py-12 shadow-[4px_4px_0_#4A8F5D] border-2 border-[#184623]"
      >
        <div className="max-w-xs mx-auto grid gap-4">
          <span className="font-bold text-2xl">Purchase Credits</span>
          <span>2143 tons available</span>
          <div className="grid grid-cols-[1fr_2fr_1fr] items-center mx-auto">
            <button
              className="bg-[#4A8F5D] h-full text-white py-4 font-extrabold"
              onClick={() => setTons(parseInt(tons) - 1)}
            >
              -
            </button>
            <input
              type="text"
              className="bg-white border-2 text-center border-[#184623] py-4"
              placeholder="20 tons"
              value={tons}
              onChange={(e) => setTons(e.target.value)}
            />
            <button
              className="bg-[#4A8F5D] h-full text-white py-4 font-extrabold"
              onClick={() => setTons(parseInt(tons) + 1)}
            >
              +
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span>Total Cost</span>
            <p className="font-extrabold text-2xl">$450</p>
          </div>
          <button className="text-white bg-[#184623] py-3 hover:opacity-50">
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
            {transactions.map((transaction, index) => {
              return (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {transaction.amount} Tons
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${transaction.cost}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {transaction.impact}
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
