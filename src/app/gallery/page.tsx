"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Image as ImageIcon, Heart, Search, Upload, Star, Calendar, MapPin, MessageSquare, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import Modal from "@/components/Modal";


interface Photo {
  id: number;
  title: string;
  image_url: string;
  category: string;
  created_at: string;
  likes?: number;
}

const colors = ["#10b981", "#f59e0b", "#3b82f6", "#a855f7", "#ef4444", "#06b6d4"];

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    category: "পারিবারিক",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const supabase = createClient();

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    setLoading(true);
    const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    if (!error && data) setPhotos(data);
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase.from("gallery").insert([formData]);

    if (error) {
      alert("Error uploading photo: " + error.message);
    } else {
      setIsModalOpen(false);
      setFormData({
        title: "",
        image_url: "",
        category: "পারিবারিক",
      });
      fetchPhotos();
    }
    setIsSubmitting(false);
  };


  const filtered = photos.filter((p) => 
    p.title?.includes(search) || p.category?.includes(search)
  );

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 px-6 py-4"
          style={{ background: "rgba(10, 15, 26, 0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:ml-0 ml-12">
              <div className="p-2 rounded-xl" style={{ background: "rgba(245, 158, 11, 0.1)" }}>
                <ImageIcon size={20} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">গ্যালারি ও শ্রদ্ধাঞ্জলি</h1>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>ছবি • স্মৃতি • মেমোরি ওয়াল</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ছবি খুঁজুন..."
                  className="pl-9 pr-4 py-2 rounded-xl text-xs border-0 outline-none w-48"
                  style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", color: "var(--foreground)" }} />
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-primary text-xs py-2"
              >
                <Upload size={14} /> আপলোড
              </button>

            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Memory Wall Tribute */}
          <div className="glass-card p-6 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(16, 185, 129, 0.04))" }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: "var(--gold)", filter: "blur(60px)" }} />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center pulse-glow flex-shrink-0"
                style={{ background: "linear-gradient(135deg, var(--gold), #d97706)" }}>
                <Heart size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold mb-1">🕌 মেমোরি ওয়াল — মরহুম আব্দুল গফুর</h2>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  তাঁর স্মৃতি আমাদের পথ চলার প্রেরণা। এই ওয়ালে পরিবারের সবাই তাঁর প্রতি শ্রদ্ধা ও ভালোবাসা প্রকাশ করতে পারবেন।
                  আল্লাহ তাঁকে জান্নাতুল ফিরদাউস দান করুন। আমিন।
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <button className="btn-primary text-[10px] py-1.5 px-3"><MessageSquare size={10} /> শ্রদ্ধাঞ্জলি লিখুন</button>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="btn-secondary text-[10px] py-1.5 px-3"
                  >
                    <Upload size={10} /> ছবি যোগ করুন
                  </button>

                </div>
              </div>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-full py-20 text-center">
                <Loader2 size={40} className="animate-spin mx-auto text-primary opacity-20" />
                <p className="mt-4 text-xs text-muted-foreground">গ্যালারি লোড হচ্ছে...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <ImageIcon size={48} className="mx-auto mb-4 opacity-10" />
                <p className="text-sm text-muted-foreground">কোনো ছবি পাওয়া যায়নি</p>
              </div>
            ) : (
              filtered.map((photo, i) => (
                <div key={photo.id} className="glass-card overflow-hidden fade-in-up group cursor-pointer" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={photo.image_url} 
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px]"
                      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)" }}>
                      <Heart size={10} style={{ color: "var(--danger)" }} /> {photo.likes || 0}
                    </div>
                    <span className="absolute top-3 left-3 badge badge-info text-[9px]">{photo.category}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-xs mb-2 group-hover:text-primary transition-colors">{photo.title}</h3>
                    <div className="flex items-center gap-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                      <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(photo.created_at).toLocaleDateString('bn-BD')}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upload Photo Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="নতুন ছবি আপলোড"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">ছবির শিরোনাম</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                placeholder="যেমন: ঘরোয়া আড্ডা, গত ঈদের স্মৃতি"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">ছবির URL (Direct Image Link)</label>
              <input
                required
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-[10px] text-muted-foreground">দ্রষ্টব্য: সরাসরি ছবির লিঙ্ক ব্যবহার করুন (যেমন imgur বা ড্রাইভ লিঙ্ক)</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">ক্যাটাগরি</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50 appearance-none"
              >
                <option value="পারিবারিক" className="bg-slate-900">পারিবারিক</option>
                <option value="স্মৃতি" className="bg-slate-900">স্মৃতি</option>
                <option value="শ্রদ্ধাঞ্জলি" className="bg-slate-900">শ্রদ্ধাঞ্জলি</option>
                <option value="অন্যান্য" className="bg-slate-900">অন্যান্য</option>
              </select>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 btn-secondary py-2.5"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-[2] btn-primary py-2.5 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                আপলোড সম্পন্ন করুন
              </button>
            </div>
          </form>
        </Modal>
      </main>

    </div>
  );
}
