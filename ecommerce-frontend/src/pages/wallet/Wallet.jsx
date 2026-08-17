import { useEffect, useState } from "react";

import {
  Wallet as WalletIcon,
  ArrowDownCircle,
  ArrowUpCircle,
  Plus,
  X,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  getWallet,
  getTransactions,
  depositMoney,
  withdrawMoney,
} from "@/services/walletService";

function Wallet() {

  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);

  const fetchWalletData = async () => {

    try {

      const walletData = await getWallet();
      const transactionData = await getTransactions();

      setWallet(walletData);
      setTransactions(transactionData);

    } catch (error) {

      console.error("Failed to fetch wallet:", error);

      toast.error("Failed to load wallet");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchWalletData();

  }, []);

  const handleDeposit = async (e) => {

    e.preventDefault();

    const depositAmount = Number(amount);

    if (!depositAmount || depositAmount <= 0) {

      toast.error("Enter a valid amount");

      return;
    }

    try {

      setProcessing(true);

      await depositMoney(depositAmount);

      toast.success("Money added successfully");

      setAmount("");
      setShowDeposit(false);

      await fetchWalletData();

    } catch (error) {

      console.error("Deposit failed:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to add money"
      );

    } finally {

      setProcessing(false);

    }

  };

  const handleWithdraw = async (e) => {

    e.preventDefault();

    const withdrawAmount = Number(amount);

    if (!withdrawAmount || withdrawAmount <= 0) {

      toast.error("Enter a valid amount");

      return;

    }

    if (withdrawAmount > wallet.balance) {

      toast.error("Insufficient wallet balance");

      return;

    }

    try {

      setProcessing(true);

      await withdrawMoney(withdrawAmount);

      toast.success("Money withdrawn successfully");

      setAmount("");
      setShowWithdraw(false);

      await fetchWalletData();

    } catch (error) {

      console.error("Withdraw failed:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to withdraw money"
      );

    } finally {

      setProcessing(false);

    }

  };

  const closeModal = () => {

    if (processing) {
      return;
    }

    setAmount("");
    setShowDeposit(false);
    setShowWithdraw(false);

  };

  const formatDate = (date) => {

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  };

  const getTransactionIcon = (type) => {

    if (type === "DEPOSIT") {

      return (
        <ArrowDownCircle
          size={24}
          className="text-green-600"
        />
      );

    }

    return (
      <ArrowUpCircle
        size={24}
        className="text-red-600"
      />
    );

  };

  const getTransactionColor = (type) => {

    if (type === "DEPOSIT") {
      return "text-green-600";
    }

    return "text-red-600";

  };

  const getTransactionPrefix = (type) => {

    if (type === "DEPOSIT") {
      return "+";
    }

    return "-";

  };

  if (loading) {

    return (
      <div className="text-center py-16 sm:py-20 text-lg sm:text-xl">
        Loading Wallet...
      </div>
    );

  }

  if (!wallet) {

    return (
      <div className="text-center py-16 sm:py-20 text-lg sm:text-xl text-red-500">
        Wallet not found
      </div>
    );

  }

  return (

    <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8 sm:py-10">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 sm:mb-8">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold">
            My Wallet
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Manage your wallet and transactions
          </p>

        </div>

        <WalletIcon
          size={32}
          className="text-blue-600 sm:w-10 sm:h-10"
        />

      </div>


      {/* Balance Card */}

      <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-5 sm:p-8">

        <p className="text-blue-100 text-base sm:text-lg">
          Available Balance
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold mt-3 break-words">
          ₹{wallet.balance.toLocaleString("en-IN")}
        </h2>


        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">

          {/* Add Money */}

          <button
            onClick={() => {
              setAmount("");
              setShowDeposit(true);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >

            <Plus size={18} />

            Add Money

          </button>


          {/* Withdraw */}

          <button
            onClick={() => {
              setAmount("");
              setShowWithdraw(true);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >

            <ArrowUpCircle size={18} />

            Withdraw

          </button>

        </div>

      </div>


      {/* Transaction History */}

      <div className="mt-8 sm:mt-10">

        <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
          Transaction History
        </h2>

        {transactions.length === 0 ? (

          <div className="bg-white rounded-xl shadow-md p-8 sm:p-10 text-center">

            <p className="text-gray-500">
              No transactions yet.
            </p>

          </div>

        ) : (

          <div className="bg-white rounded-xl shadow-md divide-y">

            {transactions.map((transaction, index) => (

              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-6"
              >

                <div className="flex items-start gap-4 min-w-0">

                  {getTransactionIcon(transaction.type)}

                  <div className="min-w-0">

                    <h3 className="font-semibold break-words">
                      {transaction.description}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {formatDate(transaction.createdAt)}
                    </p>

                  </div>

                </div>


                <p
                  className={`text-base sm:text-lg font-bold sm:text-right ${getTransactionColor(
                    transaction.type
                  )}`}
                >

                  {getTransactionPrefix(transaction.type)}

                  ₹{transaction.amount.toLocaleString("en-IN")}

                </p>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* Add Money Modal */}

      {showDeposit && (

        <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 sm:p-6 my-4 sm:my-0">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl sm:text-2xl font-bold">
                Add Money
              </h2>

              <button
                onClick={closeModal}
                disabled={processing}
                className="text-gray-500 hover:text-black"
              >
                <X size={24} />
              </button>

            </div>

            <form onSubmit={handleDeposit}>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>

              <div className="relative">

                <span className="absolute left-4 top-3 text-gray-500">
                  ₹
                </span>

                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full border rounded-lg px-10 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />

              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
              >
                {processing
                  ? "Adding Money..."
                  : "Add Money"}
              </button>

            </form>

          </div>

        </div>

      )}


      {/* Withdraw Modal */}

      {showWithdraw && (

        <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 sm:p-6 my-4 sm:my-0">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl sm:text-2xl font-bold">
                Withdraw Money
              </h2>

              <button
                onClick={closeModal}
                disabled={processing}
                className="text-gray-500 hover:text-black"
              >
                <X size={24} />
              </button>

            </div>

            <form onSubmit={handleWithdraw}>

              <p className="text-sm text-gray-500 mb-4">
                Available balance: ₹
                {wallet.balance.toLocaleString("en-IN")}
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>

              <div className="relative">

                <span className="absolute left-4 top-3 text-gray-500">
                  ₹
                </span>

                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full border rounded-lg px-10 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />

              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full mt-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
              >
                {processing
                  ? "Processing..."
                  : "Withdraw Money"}
              </button>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}

export default Wallet;