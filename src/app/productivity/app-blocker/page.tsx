export default function AppBlockerPage() {
    return (
      <div className="flex flex-col h-full gap-4">
        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* Left: Routine Block Schedule */}
          <div className="rounded-xl bg-white shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Routine Block</h2>
            {/* Add scheduler UI here */}
          </div>
  
          {/* Right: Blocked Apps List */}
          <div className="rounded-xl bg-white shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Blocked Apps</h2>
            {/* Add blocked apps list UI here */}
          </div>
        </div>
  
        {/* Bottom: Start Blocking Button or Timer */}
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
            Start Blocking
          </button>
        </div>
      </div>
    );
  }
  