import { useState, useRef, useEffect } from "react";
import {
  FiPhone, FiVideo, FiInfo, FiSmile, FiPaperclip, FiSend,
  FiImage, FiFile, FiCamera, FiX, FiMoreHorizontal
} from "react-icons/fi";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";

const EMOJIS = [
  "😀","😂","😊","😍","🥰","😎","😭","😅","🤔","😏",
  "👍","👎","🙏","👏","🔥","❤️","💯","✅","🚗","🔧",
  "⚙️","🛠️","💪","🎉","😤","🤝","💬","📷","📎","🕐",
];

const contacts = [
  { id: 1, name: "John Doe", avatar: "/images/av1.png", lastMsg: "The brake pads are ready...", time: "10:45 AM", unread: 0, status: "ACTIVE NOW", car: "Tesla Model 3", tier: "Premium Customer" },
  { id: 2, name: "Sarah Smith", avatar: "/images/av2.png", lastMsg: "When can I pick up my car?", time: "9:12 AM", unread: 1, status: "ACTIVE NOW", car: "Honda CR-V", tier: "Regular Customer" },
  { id: 3, name: "Robert Wilson", avatar: "/images/av3.png", lastMsg: "Thanks for the update!", time: "Yesterday", unread: 0, status: "OFFLINE", car: "BMW 3 Series", tier: "Premium Customer" },
  { id: 4, name: "Emily Davis", avatar: "/images/av4.png", lastMsg: "I'll be there around 4 PM.", time: "Jul 12", unread: 0, status: "OFFLINE", car: "Ford Mustang", tier: "Regular Customer" },
];

const initialMessages = {
  1: [
    { id: 1, from: "customer", text: "Hi Mike, how is the progress on the brake replacement for my Tesla?", time: "10:30 AM", type: "text" },
    { id: 2, from: "me", text: "Hi John! We've just finished inspecting them. Both front pads were quite worn down. We're about to start the installation now.", time: "10:35 AM", type: "text", read: true },
    { id: 3, from: "me", fileName: "brake_pads_worn.jpg", fileSize: "1.2 MB", text: "Here is a photo of the old pads for your records. The brake pads are ready to be installed.", time: "10:45 AM", type: "file", read: true },
    { id: 4, from: "customer", text: "Wow, they definitely needed replacing! Let me know when it's done.", time: "10:48 AM", type: "text" },
  ],
  2: [
    { id: 1, from: "customer", text: "When can I pick up my car?", time: "9:12 AM", type: "text" },
  ],
  3: [
    { id: 1, from: "customer", text: "Thanks for the update!", time: "Yesterday", type: "text" },
  ],
  4: [
    { id: 1, from: "customer", text: "I'll be there around 4 PM.", time: "Jul 12", type: "text" },
  ],
};

const recentJobs = {
  1: [
    { title: "Brake Pad Replacement", status: "inprogress", jobId: "#JB-9821", color: "bg-blue-600" },
    { title: "Annual Inspection", status: "done", jobId: "Completed • May 14, 2023", color: "bg-green-500" },
  ],
  2: [
    { title: "Oil Filter Change", status: "done", jobId: "Completed • Jun 1, 2023", color: "bg-green-500" },
  ],
  3: [
    { title: "Engine Diagnostic", status: "done", jobId: "Completed • Apr 22, 2023", color: "bg-green-500" },
  ],
  4: [
    { title: "Tire Rotation", status: "done", jobId: "Completed • Mar 10, 2023", color: "bg-green-500" },
  ],
};

const vehicleDetails = {
  1: { model: "2022 Tesla Model 3", vin: "5YJ3E7EA6NF2XXXXX", color: "Midnight Silver" },
  2: { model: "2021 Honda CR-V", vin: "7FBH3E2A4MH1XXXXX", color: "Sonic Gray" },
  3: { model: "2020 BMW 3 Series", vin: "WBA5R1C07LFH7XXXXX", color: "Alpine White" },
  4: { model: "2019 Ford Mustang", vin: "1FA6P8CF5K5XXXXXX", color: "Race Red" },
};

export default function Messages() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiRef = useRef(null);
  const attachRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeContact]);

  useEffect(() => {
    const handler = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) setShowEmoji(false);
      if (attachRef.current && !attachRef.current.contains(e.target)) setShowAttach(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const newMsg = { id: Date.now(), from: "me", text: input.trim(), time, type: "text", read: false };
    setMessages((prev) => ({ ...prev, [activeContact.id]: [...(prev[activeContact.id] || []), newMsg] }));
    setInput("");
    setShowEmoji(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const newMsg = {
      id: Date.now(), from: "me", type: "file",
      fileName: file.name, fileSize: (file.size / 1024).toFixed(0) + " KB",
      text: "", time, read: false,
    };
    setMessages((prev) => ({ ...prev, [activeContact.id]: [...(prev[activeContact.id] || []), newMsg] }));
    setShowAttach(false);
  };

  const msgs = messages[activeContact.id] || [];
  const jobs = recentJobs[activeContact.id] || [];
  const vehicle = vehicleDetails[activeContact.id];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isOnline={isOnline} setIsOnline={setIsOnline} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isOnline={isOnline} />

        <div className="flex flex-1 overflow-hidden relative">

          {/* ── CONTACTS LIST ── */}
          {/* Mobile: absolute overlay. Desktop: always visible */}
          <div className={`
            absolute inset-y-0 left-0 z-20 w-64 shrink-0 bg-white border-r border-gray-100 flex flex-col overflow-hidden
            transform transition-transform duration-300
            ${showContacts ? "translate-x-0" : "-translate-x-full"}
            md:relative md:translate-x-0 md:z-auto
          `}>
            <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-black text-gray-800 text-base">Recent Chats</h2>
              <button className="md:hidden text-gray-400" onClick={() => setShowContacts(false)}>
                <FiX size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.map((c) => (
                <div key={c.id} onClick={() => { setActiveContact(c); setShowContacts(false); }}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 hover:bg-gray-50 transition-colors ${activeContact.id === c.id ? "border-l-2 border-l-blue-600 bg-blue-50/40" : ""}`}>
                  <div className="relative shrink-0">
                    <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                    {c.status === "ACTIVE NOW" && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-gray-800 truncate">{c.name}</p>
                      <span className={`text-xs shrink-0 ml-1 ${c.unread > 0 ? "text-blue-600 font-bold" : "text-gray-400"}`}>{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-xs text-gray-400 truncate">{c.lastMsg}</p>
                      {c.unread > 0 && (
                        <span className="ml-1 shrink-0 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">{c.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CHAT AREA ── */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 min-w-0">

            {/* CHAT HEADER */}
            <div className="bg-white border-b border-gray-100 px-4 sm:px-5 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                {/* Mobile contacts toggle */}
                <button className="md:hidden text-blue-600 font-bold text-xs mr-1" onClick={() => setShowContacts(true)}>
                  ☰
                </button>
                <div className="relative">
                  <img src={activeContact.avatar} alt={activeContact.name} className="w-9 h-9 rounded-full object-cover bg-gray-200" />
                  {activeContact.status === "ACTIVE NOW" && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{activeContact.name}</p>
                  <p className="text-xs text-gray-400">
                    <span className={`font-semibold ${activeContact.status === "ACTIVE NOW" ? "text-green-500" : "text-gray-400"}`}>
                      {activeContact.status}
                    </span>
                    {" • "}{activeContact.car}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <button className="hover:text-blue-600 transition-colors"><FiPhone size={16} /></button>
                <button className="hover:text-blue-600 transition-colors hidden sm:block"><FiVideo size={16} /></button>
                <button className="hover:text-blue-600 transition-colors hidden sm:block"><FiInfo size={16} /></button>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 flex flex-col gap-3">
              <div className="flex items-center justify-center">
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">TODAY</span>
              </div>

              {msgs.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  {msg.from === "customer" && (
                    <img src={activeContact.avatar} alt="" className="w-7 h-7 rounded-full object-cover bg-gray-200 shrink-0 mb-1" />
                  )}
                  <div className={`max-w-[75%] sm:max-w-xs lg:max-w-sm ${msg.from === "me" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    {msg.type === "file" ? (
                      <div className={`rounded-2xl overflow-hidden ${msg.from === "me" ? "bg-blue-600 text-white" : "bg-white text-gray-800"} shadow-sm`}>
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/20">
                          <FiImage size={14} className={msg.from === "me" ? "text-white/80" : "text-gray-400"} />
                          <div>
                            <p className="text-xs font-semibold">{msg.fileName}</p>
                            <p className={`text-xs ${msg.from === "me" ? "text-white/70" : "text-gray-400"}`}>{msg.fileSize}</p>
                          </div>
                          <FiFile size={13} className="ml-auto opacity-70" />
                        </div>
                        {msg.text && <p className="text-xs px-3 py-2">{msg.text}</p>}
                      </div>
                    ) : (
                      <div className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${msg.from === "me" ? "bg-blue-600 text-white rounded-br-sm" : "bg-white text-gray-800 rounded-bl-sm"}`}>
                        {msg.text}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400">{msg.time}</span>
                      {msg.from === "me" && (
                        <span className="text-xs text-blue-400">{msg.read ? "✓✓" : "✓"}</span>
                      )}
                    </div>
                  </div>
                  {msg.from === "me" && (
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mb-1">M</div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT BAR */}
            <div className="bg-white border-t border-gray-100 px-4 py-3 shrink-0">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">

                {/* EMOJI */}
                <div className="relative" ref={emojiRef}>
                  <button onClick={() => { setShowEmoji(!showEmoji); setShowAttach(false); }}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1">
                    <FiSmile size={18} />
                  </button>
                  {showEmoji && (
                    <div className="absolute bottom-10 left-0 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 w-64 z-50">
                      <p className="text-xs font-semibold text-gray-400 mb-2">Emojis</p>
                      <div className="grid grid-cols-10 gap-1">
                        {EMOJIS.map((e) => (
                          <button key={e} onClick={() => addEmoji(e)}
                            className="text-lg hover:bg-gray-100 rounded-md p-0.5 transition-colors">
                            {e}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ATTACH */}
                <div className="relative" ref={attachRef}>
                  <button onClick={() => { setShowAttach(!showAttach); setShowEmoji(false); }}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1">
                    <FiPaperclip size={18} />
                  </button>
                  {showAttach && (
                    <div className="absolute bottom-10 left-0 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 w-44 z-50">
                      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                      <button onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <FiImage size={14} className="text-blue-500" /> Photo / Video
                      </button>
                      <button onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <FiFile size={14} className="text-orange-500" /> Document
                      </button>
                      <button onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <FiCamera size={14} className="text-green-500" /> Camera
                      </button>
                    </div>
                  )}
                </div>

                {/* TEXT INPUT */}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
                />

                {/* SEND */}
                <button onClick={sendMessage}
                  disabled={!input.trim()}
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0">
                  <FiSend size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="w-56 shrink-0 bg-white border-l border-gray-100 overflow-y-auto hidden lg:flex flex-col">

            {/* PROFILE */}
            <div className="flex flex-col items-center px-4 py-5 border-b border-gray-100">
              <img src={activeContact.avatar} alt={activeContact.name} className="w-16 h-16 rounded-full object-cover bg-gray-200 mb-2" />
              <p className="text-sm font-black text-gray-800">{activeContact.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{activeContact.tier}</p>
              <div className="flex items-center gap-2 mt-3">
                <button className="flex-1 text-xs font-semibold bg-blue-600 text-white py-1.5 px-3 rounded-lg hover:bg-blue-700 transition-colors">
                  View Profile
                </button>
                <button className="w-7 h-7 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                  <FiMoreHorizontal size={13} />
                </button>
              </div>
            </div>

            {/* VEHICLE DETAILS */}
            <div className="px-4 py-4 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Vehicle Details</p>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-bold text-gray-800">{vehicle?.model}</p>
                <p className="text-xs text-gray-400 mt-1">VIN: {vehicle?.vin}</p>
                <p className="text-xs text-gray-400">Color: {vehicle?.color}</p>
              </div>
            </div>

            {/* RECENT JOBS */}
            <div className="px-4 py-4 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Recent Jobs</p>
              <div className="flex flex-col gap-2">
                {jobs.map((job, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${job.color}`} />
                    <div>
                      <p className="text-xs font-bold text-gray-800">{job.title}</p>
                      <p className="text-xs text-gray-400">{job.jobId}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SHARED FILES */}
            <div className="px-4 py-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Shared Files</p>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="w-12 h-12 rounded-xl bg-gray-200 overflow-hidden">
                  <img src="/images/jr1.png" alt="file" className="w-full h-full object-cover" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-200 overflow-hidden">
                  <img src="/images/jr2.png" alt="file" className="w-full h-full object-cover" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <p className="text-xs font-bold text-gray-400">+12</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}