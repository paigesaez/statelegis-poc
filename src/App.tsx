import React from "react";
import { useEffect, useState } from "react";
import { LegiscanClient } from "@civicnews/legiscan-client";

interface Bill {
  bill_id: number;
  bill_number: string;
  title: string;
  status: string;
}

function App() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_LEGISCAN_API_KEY;
  const client = new LegiscanClient(apiKey);

  useEffect(() => {
    fetchBills();
    // eslint-disable-next-line
  }, []);

  const fetchBills = async (query = "") => {
    setLoading(true);
    setError("");
    try {
      const data = await client.getMasterList({ state: "CA" });
      setBills(
        query
          ? data.filter((b: any) => b.title.toLowerCase().includes(query.toLowerCase()))
          : data
      );
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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">California Legislative Bills</h1>
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            className="flex-1 border rounded px-3 py-2"
            type="text"
            placeholder="Search bills by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
            Search
          </button>
        </form>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        <ul className="space-y-4">
          {bills.map((bill) => (
            <li key={bill.bill_id} className="bg-white p-4 rounded shadow">
              <div className="font-semibold">{bill.bill_number}: {bill.title}</div>
              <div className="text-sm text-gray-600">Status: {bill.status}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App; 