import React from "react";
import { useEffect, useState } from "react";
import { LegiscanClient } from "@civicnews/legiscan-client";

interface Bill {
  bill_id: number;
  bill_number: string;
  title: string;
  status: string;
}

const BILL_CACHE_KEY = "cachedBills_CA";
const BILL_CACHE_TTL = 1000 * 60 * 10; // 10 minutes
const BILLS_PER_PAGE = 10;
const STATES = [
  { code: "CA", name: "California" },
  { code: "NY", name: "New York" },
  { code: "TX", name: "Texas" },
  // Add more states as needed
];

function App() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [state, setState] = useState("CA");
  const [sessions, setSessions] = useState<any[]>([]);
  const [session, setSession] = useState<string>("");
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [billDetails, setBillDetails] = useState<any>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const apiKey = import.meta.env.VITE_LEGISCAN_API_KEY;
  const client = new LegiscanClient(apiKey);

  // Fetch sessions when state changes
  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const sessionList = await client.getSessionList(state);
        console.log('Fetched sessionList:', sessionList);
        setSessions(sessionList);
        setSession(sessionList[0]?.session_id?.toString() || "");
      } catch (err) {
        setError("Failed to fetch sessions");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [state]);

  useEffect(() => {
    fetchBills();
    // eslint-disable-next-line
  }, [state, session]);

  const fetchBills = async (query = "") => {
    setLoading(true);
    setError("");
    try {
      // If searching by keyword, use getSearch
      if (query) {
        const results = await client.getSearch(query, { state });
        console.log('Fetched search results:', results);
        setBills(results);
        setPage(1);
        setLoading(false);
        return;
      }
      // Otherwise, use cache for master list
      const cacheKey = `cachedBills_${state}_${session}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < BILL_CACHE_TTL) {
          setBills(data);
          setLoading(false);
          return;
        }
      }
      // If not cached or cache expired, fetch from API
      const data = await client.getMasterList({ state, id: session });
      console.log('Fetched bills from getMasterList:', data);
      localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
      setBills(data);
    } catch (err) {
      setError("Failed to fetch bills");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBills(search);
  };

  const paginatedBills = bills.slice((page - 1) * BILLS_PER_PAGE, page * BILLS_PER_PAGE);
  const totalPages = Math.ceil(bills.length / BILLS_PER_PAGE);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Reset to first page on new search or bill list change
  useEffect(() => {
    setPage(1);
  }, [search, bills.length]);

  const handleBillClick = async (bill: Bill) => {
    setSelectedBill(bill);
    setDetailsLoading(true);
    setDetailsError("");
    try {
      const details = await client.getBill(bill.bill_id);
      setBillDetails(details);
    } catch (err) {
      setDetailsError("Failed to fetch bill details");
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedBill(null);
    setBillDetails(null);
    setDetailsError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Legislative Bills</h1>
        <form onSubmit={handleSearch} className="flex flex-col gap-2 mb-6">
          <div className="flex gap-2">
            <select
              className="border rounded px-3 py-2"
              value={state}
              onChange={e => setState(e.target.value)}
            >
              {STATES.map(s => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>
            <select
              className="border rounded px-3 py-2"
              value={session}
              onChange={e => setSession(e.target.value)}
            >
              {sessions.map(s => (
                <option key={s.session_id} value={s.session_id}>{s.name}</option>
              ))}
            </select>
            <input
              className="flex-1 border rounded px-3 py-2"
              type="text"
              placeholder="Search bills by keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
              Search
            </button>
          </div>
        </form>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        <ul className="space-y-4">
          {paginatedBills.map((bill) => (
            <li
              key={bill.bill_id}
              className="bg-white p-4 rounded shadow cursor-pointer hover:bg-blue-50"
              onClick={() => handleBillClick(bill)}
            >
              <div className="font-semibold">{bill.bill_number}: {bill.title}</div>
              <div className="text-sm text-gray-600">Status: {bill.status}</div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {/* Detail Modal */}
      {selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedBill.bill_number}: {selectedBill.title}</h2>
            {detailsLoading && <div>Loading details...</div>}
            {detailsError && <div className="text-red-600">{detailsError}</div>}
            {billDetails && (
              <div className="space-y-2">
                <div><span className="font-semibold">Status:</span> {billDetails.status}</div>
                <div><span className="font-semibold">Sponsors:</span> {billDetails.sponsors?.map((s: any) => s.name).join(", ") || "N/A"}</div>
                <div><span className="font-semibold">Last Action:</span> {billDetails.last_action || "N/A"}</div>
                <div><span className="font-semibold">Summary:</span> {billDetails.summary || "N/A"}</div>
                <div><span className="font-semibold">Full Text:</span> {billDetails.texts?.[0]?.text || "N/A"}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 