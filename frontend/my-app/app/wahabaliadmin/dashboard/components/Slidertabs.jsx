export default function Slidertabs({ sliders, newSlider, setNewSlider, setImageFile, onAddSlider, onDeleteSlider }) {
  return (
    <div className="space-y-6 text-xs">
      
      {/* Form to Add Banner */}
      <form onSubmit={onAddSlider} className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-2xl space-y-4 shadow-lg">
        <h3 className="text-sm font-bold text-slate-100">Add New Carousel Announcement Banner (From Laptop)</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Banner Title *</label>
            <input 
              type="text" 
              placeholder="e.g. Premium Talc Node" 
              required 
              value={newSlider.title} 
              onChange={e => setNewSlider({...newSlider, title: e.target.value})} 
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-teal-500" 
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Tag Label</label>
            <input 
              type="text" 
              placeholder="Announcement" 
              value={newSlider.tag} 
              onChange={e => setNewSlider({...newSlider, tag: e.target.value})} 
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-teal-500" 
            />
          </div>
        </div>

        {/* File Upload Input */}
        <div>
          <label className="block text-slate-400 mb-1 font-semibold">Upload Banner Image File *</label>
          <input 
            type="file" 
            accept="image/*"
            required
            onChange={e => setImageFile(e.target.files[0])} 
            className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-teal-700 file:text-white hover:file:bg-teal-600 cursor-pointer" 
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1 font-semibold">Banner Description *</label>
          <textarea 
            placeholder="Operational details..." 
            rows="2" 
            required 
            value={newSlider.description} 
            onChange={e => setNewSlider({...newSlider, description: e.target.value})} 
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-teal-500"
          ></textarea>
        </div>

        <button type="submit" className="w-full sm:w-auto bg-teal-700 text-white py-2.5 px-6 rounded-xl font-bold hover:bg-teal-600 cursor-pointer transition">
          Save Banner
        </button>
      </form>

      {/* List of Existing Banners */}
      <div className="space-y-3">
        {sliders.map((s) => (
          <div key={s._id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex gap-4 items-center shadow-md">
            <img src={s.url || s.imageurl} alt={s.title} className="w-20 h-12 object-cover rounded-xl bg-slate-800 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="bg-amber-500/20 text-amber-400 border border-amber-800/50 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                {s.tag || "Announcement"}
              </span>
              <h4 className="font-bold text-slate-100 text-xs mt-1 truncate">{s.title}</h4>
              <p className="text-slate-400 text-[10px] line-clamp-1">{s.description}</p>
            </div>
            <button 
              onClick={() => onDeleteSlider(s._id)} 
              className="bg-rose-950 border border-rose-800 text-rose-300 px-3 py-2 rounded-xl text-[10px] hover:bg-rose-900 cursor-pointer transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}