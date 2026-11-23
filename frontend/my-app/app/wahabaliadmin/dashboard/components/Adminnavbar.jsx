export default function Adminnavbar({ onRefresh, onLogout }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-4">
      <div>
        <h1 className="text-lg sm:text-2xl font-black text-slate-100 tracking-wider">FRONTIER STONE ADMIN</h1>
        <p className="text-xs text-slate-400">Live Management Console & CRUD Operations</p>
      </div>
      <div className="flex gap-2 w-full sm:w-auto justify-end">
        <button 
          onClick={onRefresh} 
          className="bg-slate-800 text-teal-300 border border-slate-700 py-1.5 px-3 rounded-xl text-xs hover:bg-slate-700 cursor-pointer transition"
        >
          🔄 Refresh
        </button>
        <button 
          onClick={onLogout} 
          className="bg-rose-950/80 text-rose-300 border border-rose-800 py-1.5 px-3 rounded-xl text-xs hover:bg-rose-900 cursor-pointer transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}