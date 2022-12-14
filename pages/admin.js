import { useMemo, useState, useCallback, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useSnackbar } from "notistack";
import Layout from "../components/Layout";
import { slowConnection } from "../solanacodes/config";
import {
  expireCarbonCredit,
  getAllPurchaseHistory,
  loadCarbonProgram,
  markFulfillCarbonCredit,
  markFulfillCarbonCreditMultiple,
} from "../contract/utils";

const EXPIRY_SECONDS = parseInt(process.env.NEXT_PUBLIC_EXPIRY_SECONDS);
const costOfOneCredit = parseFloat(process.env.NEXT_PUBLIC_COST_OF_ONE_CREDIT);

function Admin() {
  const [showOrders, setShowOrders] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(2022);

  const wallet = useAnchorWallet();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const fetchPurchaseHistory = useCallback(async () => {
    const program = await loadCarbonProgram(slowConnection, wallet);
    const purchaseHistoryLocal = await getAllPurchaseHistory(program, wallet);
    setPurchaseHistory(purchaseHistoryLocal);
  }, [wallet]);

  useEffect(() => {
    fetchPurchaseHistory();
  }, [fetchPurchaseHistory]);

  const transactions = useMemo(() => {
    return purchaseHistory.map((x) => {
      return {
        ...x,
        date: new Date(x.time * 1000),
        amount: x.amount,
        cost: (x.amount * costOfOneCredit).toFixed(2),
        link: `https://solscan.io/token/${x.mint}?cluster=${process.env.NEXT_PUBLIC_SOLANA_NETWORK}#txs`,
        fulfillment: x.isFulfilled,
        expiryDate: new Date((x.time + EXPIRY_SECONDS) * 1000),
      };
    });
  }, [purchaseHistory]);

  const yearChoices = [2022, 2023, 2024];

  const filteredTransactions = useMemo(() => {
    const transactionList = transactions
      .filter((transaction) => {
        return (
          transaction.date.getFullYear() === parseInt(selectedYear) &&
          transaction.date.getMonth() === parseInt(selectedMonth) - 1
        );
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    return transactionList;
  }, [selectedMonth, selectedYear, transactions]);

  const assertWalletConnected = useCallback(() => {
    if (!wallet) {
      enqueueSnackbar("Please connect your wallet!", { variant: "error" });
      return false;
    }
    return true;
  }, [enqueueSnackbar, wallet]);

  const onClickExpire = useCallback(
    async (carbonReceipt) => {
      if (assertWalletConnected()) {
        let stakeSnackbar = undefined;
        try {
          stakeSnackbar = enqueueSnackbar("Expiring...", {
            variant: "info",
            persist: true,
          });
          const program = await loadCarbonProgram(slowConnection, wallet);
          await expireCarbonCredit(
            program,
            wallet,
            carbonReceipt.mint,
            carbonReceipt.publicKey,
            carbonReceipt.buyer
          );
          await fetchPurchaseHistory();
          enqueueSnackbar("Done", {
            variant: "success",
          });
        } catch (error) {
          console.log({ error });
          enqueueSnackbar(error?.message, {
            variant: "error",
          });
        } finally {
          if (stakeSnackbar) closeSnackbar(stakeSnackbar);
        }
      }
    },
    [
      assertWalletConnected,
      enqueueSnackbar,
      wallet,
      fetchPurchaseHistory,
      closeSnackbar,
    ]
  );

  const onClickMarkFulfilled = useCallback(
    async (carbonReceipt) => {
      if (assertWalletConnected()) {
        let stakeSnackbar = undefined;
        try {
          stakeSnackbar = enqueueSnackbar("Fulfilling...", {
            variant: "info",
            persist: true,
          });
          const program = await loadCarbonProgram(slowConnection, wallet);
          await markFulfillCarbonCredit(
            program,
            wallet,
            carbonReceipt.publicKey
          );
          await fetchPurchaseHistory();
          enqueueSnackbar("Done", {
            variant: "success",
          });
        } catch (error) {
          console.log({ error });
          enqueueSnackbar(error?.message, {
            variant: "error",
          });
        } finally {
          if (stakeSnackbar) closeSnackbar(stakeSnackbar);
        }
      }
    },
    [
      assertWalletConnected,
      enqueueSnackbar,
      wallet,
      fetchPurchaseHistory,
      closeSnackbar,
    ]
  );

  const onClickMarkFulfilledAll = useCallback(async () => {
    if (assertWalletConnected()) {
      let stakeSnackbar = undefined;
      try {
        stakeSnackbar = enqueueSnackbar("Fulfilling...", {
          variant: "info",
          persist: true,
        });
        const program = await loadCarbonProgram(slowConnection, wallet);
        await markFulfillCarbonCreditMultiple(
          program,
          wallet,
          filteredTransactions
            .filter((carbonReceipt) => !carbonReceipt.isFulfilled)
            .map((carbonReceipt) => carbonReceipt.publicKey)
        );
        await fetchPurchaseHistory();
        enqueueSnackbar("Done", {
          variant: "success",
        });
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
    filteredTransactions,
    fetchPurchaseHistory,
    closeSnackbar,
  ]);

  const DateSelection = () => {
    return (
      <div className="flex gap-2">
        <div className="text-white border-2 border-[#184623] px-2 py-1">
          <select
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent text-black"
            defaultValue={selectedMonth}
          >
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
        </div>
        <div className="text-white border-2 border-[#184623] px-2 py-1">
          <select
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-transparent text-black"
            defaultValue={selectedYear}
          >
            {yearChoices.map((year, index) => {
              return (
                <option key={index} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  };

  const [
    numCreditsOrdered,
    numOrders,
    numCreditsOutstanding,
    numOrderOutstanding,
  ] = useMemo(() => {
    let numCreditsOrdered = 0;
    let numOrders = 0;
    let numCreditsOutstanding = 0;
    let numOrderOutstanding = 0;
    for (const transaction of filteredTransactions) {
      numCreditsOrdered += transaction.amount;
      numOrders += 1;
      if (!transaction.fulfillment) {
        numCreditsOutstanding += transaction.amount;
        numOrderOutstanding += 1;
      }
    }
    return [
      numCreditsOrdered,
      numOrders,
      numCreditsOutstanding,
      numOrderOutstanding,
    ];
  }, [filteredTransactions]);

  return (
    <Layout>
      <div className="bg-[#5B8D61] mx-auto flex items-center justify-center gap-4 absolute left-0 w-full">
        <p
          className={`py-4 px-6 hover:cursor-pointer font-bold ${
            showOrders
              ? "border-b-4 border-[#87C499] text-white"
              : "border-transparent opacity-50 hover:opacity-100"
          }`}
          onClick={() => setShowOrders(true)}
        >
          Orders
        </p>
        <p
          className={`py-4 px-6 hover:cursor-pointer font-bold ${
            !showOrders
              ? "border-b-4 border-[#87C499] text-white"
              : "border-transparent opacity-50 hover:opacity-100"
          }`}
          onClick={() => setShowOrders(false)}
        >
          Expires
        </p>
      </div>
      {showOrders ? (
        <div className="pt-24">
          <div className="flex items-center justify-between pb-8 flex-col sm:flex-row gap-4">
            <h2 className="text-[#184623] text-3xl font-medium">
              Carbon Pool Admin
            </h2>
            <DateSelection></DateSelection>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border-2 border-[#184623] p-4 grid gap-2">
              <p className="font-bold">Total credits ordered</p>
              <p className="text-3xl font-black">{numCreditsOrdered} tons</p>
              <p>{numOrders} Orders</p>
            </div>
            <div className="border-2 border-[#B99860] p-4 grid gap-2">
              <p className="font-bold">Total credits outstanding</p>
              <p className="text-3xl font-black text-[#B99860]">
                {numCreditsOutstanding} tons
              </p>
              <p>{numOrderOutstanding} Orders</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-8 pb-4 flex-col sm:flex-row">
            <h3 className="font-bold text-2xl">Orders</h3>
            <p
              className="underline font-bold text-[#184623] hover:cursor-pointer"
              onClick={onClickMarkFulfilledAll}
            >
              Purchase all outstanding credit orders
            </p>
          </div>
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
                    Transaction
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left text-[#184623] font-semibold">
                    fulfillment
                  </th>
                </tr>
              </thead>

              <tbody className="relative">
                {filteredTransactions.map((transaction, index) => {
                  return (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {transaction.date.toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {transaction.amount} Tons
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        ${transaction.cost}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <a
                          href={transaction.link}
                          target="_blank"
                          className="hover:cursor-pointer font-bold underline flex items-center"
                          rel="noreferrer"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="hover:cursor-pointer"
                          >
                            <path
                              d="M15.6396 7.02527H12.0181V5.02527H19.0181V12.0253H17.0181V8.47528L12.1042 13.3892L10.6899 11.975L15.6396 7.02527Z"
                              fill="currentColor"
                            />
                            <path
                              d="M10.9819 6.97473H4.98193V18.9747H16.9819V12.9747H14.9819V16.9747H6.98193V8.97473H10.9819V6.97473Z"
                              fill="currentColor"
                            />
                          </svg>
                          <p>Link</p>
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {!transaction.fulfillment ? (
                          <p
                            className="font-black underline hover:cursor-pointer"
                            onClick={() => {
                              onClickMarkFulfilled(transaction);
                            }}
                          >
                            Purchase Credits
                          </p>
                        ) : (
                          <div className="flex items-center gap-2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
                                fill="currentColor"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                                fill="currentColor"
                              />
                            </svg>
                            <p>Credits Purchased</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredTransactions.length === 0 && (
              <div className="w-full text-center font-bold uppercase text-2xl">
                No Transactions
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="pt-24">
          <div className="flex items-center justify-between pb-8 flex-col sm:flex-row gap-4">
            <h2 className="text-[#184623] text-3xl font-medium">
              Carbon Credit Expiries
            </h2>
            <DateSelection></DateSelection>
          </div>
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
                    Price
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left text-[#184623] font-semibold">
                    Transaction
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left text-[#184623] font-semibold">
                    Expiry Date
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left text-[#184623] font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((transaction, index) => {
                  return (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {transaction.date.toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {transaction.amount} Tons
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        ${transaction.cost}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 underline flex items-center">
                        <a
                          href={transaction.link}
                          target="_blank"
                          className="hover:cursor-pointer font-bold underline flex items-center"
                          rel="noreferrer"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="hover:cursor-pointer"
                          >
                            <path
                              d="M15.6396 7.02527H12.0181V5.02527H19.0181V12.0253H17.0181V8.47528L12.1042 13.3892L10.6899 11.975L15.6396 7.02527Z"
                              fill="currentColor"
                            />
                            <path
                              d="M10.9819 6.97473H4.98193V18.9747H16.9819V12.9747H14.9819V16.9747H6.98193V8.97473H10.9819V6.97473Z"
                              fill="currentColor"
                            />
                          </svg>
                          <p>Link</p>
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {transaction.expiryDate.toLocaleDateString()}
                      </td>
                      {transaction.isExpired ? (
                        <td className="whitespace-nowrap px-4 py-2 text-grey-700 underline font-bold">
                          Expired
                        </td>
                      ) : (
                        <td
                          className="whitespace-nowrap px-4 py-2 text-red-700 underline font-bold hover:cursor-pointer"
                          onClick={() => {
                            onClickExpire(transaction);
                          }}
                        >
                          Expire NFT
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredTransactions.length === 0 && (
              <div className="w-full text-center font-bold uppercase text-2xl">
                No Transactions
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Admin;
