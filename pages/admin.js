import { useState } from "react";
import Layout from "../components/Layout";

function Admin() {
  const [option, setOption] = useState(0);
  const transactions = [
    {
      date: "12/02/22",
      amount: "13",
      cost: "2560",
      wallet: "Af2f...wafR",
    },
    {
      date: "12/02/22",
      amount: "14",
      cost: "2780",
      wallet: "Af2f...wafR",
    },
    {
      date: "12/02/22",
      amount: "2",
      cost: "671",
      wallet: "Af2f...wafR",
    },
  ];

  return (
    <Layout>
      <h2 className="text-[#184623] text-3xl font-medium pt-24 pb-8">
        Carbon Pool Admin
      </h2>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(243, 239, 205, 0) 0%, #F3EFCD 99.46%)",
        }}
        className="grid gap-4 py-12 shadow-[4px_4px_0_#4A8F5D] border-2 border-[#184623]"
      >
        <h3>Pool credit balance</h3>
        <span className="font-bold text-3xl">2143 tons</span>
        <div className="max-w-max mx-auto p-1 border-2 border-[#184623]">
          <button
            className={`${
              option === 0
                ? "bg-[#184623] text-white"
                : "bg-transparent text-[#184623]"
            } py-2 px-16 hover:opacity-50`}
            onClick={() => setOption(0)}
          >
            Deposit
          </button>
          <button
            className={`${
              option === 1
                ? "bg-[#184623] text-white"
                : "bg-transparent text-[#184623]"
            } py-2 px-16 hover:opacity-50`}
            onClick={() => setOption(1)}
          >
            Withdraw
          </button>
        </div>
        <span className="font-bold text-2xl">Deposit Credits</span>
        <span>Balance: 343 tons</span>
        <input
          type="text"
          className="bg-white border-2 border-[#184623] w-1/3 mx-auto px-4 py-2"
          placeholder="20 tons"
        />
        <button className="text-white bg-[#184623] w-1/3 mx-auto py-3 hover:opacity-50">
          Purchase
        </button>
      </div>
      <h3 className="font-bold text-2xl pt-8 pb-4">Transactions</h3>
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
                Wallet
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
                    {transaction.wallet}
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

export default Admin;
