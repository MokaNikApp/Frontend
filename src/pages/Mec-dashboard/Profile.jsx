





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/axios';
// import Sidebar from "../../components/Mec-Dashboard/Sidebar";
// import Topbar from "../../components/Mec-Dashboard/Topbar";
// import { 
//   User, 
//   MapPin, 
//   Phone, 
//   Mail, 
//   Clock, 
//   Star, 
//   Briefcase, 
//   Award, 
//   Shield, 
//   Edit3, 
//   Save, 
//   X, 
//   ChevronRight,
//   Camera,
//   Wrench,
//   Building2,
//   Globe,
//   FileText,
//   CheckCircle2,
//   AlertCircle,
//   BadgeCheck,
//   Timer,
//   Truck,
//   DollarSign,
//   Landmark
// } from 'lucide-react';

// const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// const DAY_LABELS = {
//   monday: 'Monday',
//   tuesday: 'Tuesday', 
//   wednesday: 'Wednesday',
//   thursday: 'Thursday',
//   friday: 'Friday',
//   saturday: 'Saturday',
//   sunday: 'Sunday'
// };

// export default function ProviderProfile() {
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [editingSection, setEditingSection] = useState(null);
//   const [editData, setEditData] = useState({});
//   const [activeTab, setActiveTab] = useState('overview');
//   const [notification, setNotification] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/provider/profile');
//       setProfile(response.data);
//     } catch (error) {
//       showNotification('error', 'Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showNotification = (type, message) => {
//     setNotification({ type, message });
//     setTimeout(() => setNotification(null), 4000);
//   };

//   const handleEdit = (section, data) => {
//     setEditingSection(section);
//     setEditData(data);
//   };

//   const handleCancel = () => {
//     setEditingSection(null);
//     setEditData({});
//   };

//   const handleSave = async (section) => {
//     try {
//       setSaving(true);
//       let payload = {};

//       switch(section) {
//         case 'personal':
//           payload = {
//             firstName: editData.firstName,
//             lastName: editData.lastName,
//             phoneNumber: editData.phoneNumber,
//             address: editData.address,
//             city: editData.city,
//             state: editData.state
//           };
//           break;
//         case 'business':
//           payload = {
//             workshopName: editData.workshopName,
//             yearsOfExperience: parseInt(editData.yearsOfExperience),
//             yearsInBusiness: parseInt(editData.yearsInBusiness),
//             primarySpecialization: editData.primarySpecialization,
//             secondarySpecializations: editData.secondarySpecializations,
//             serviceRadius: parseInt(editData.serviceRadius),
//             description: editData.description,
//             website: editData.website,
//             businessPhoneNumber: editData.businessPhoneNumber
//           };
//           break;
//         case 'hours':
//           payload = { businessHours: editData.businessHours };
//           break;
//         case 'areas':
//           payload = { serviceAreas: editData.serviceAreas };
//           break;
//         default:
//           break;
//       }

//       await api.patch('/provider/profile', payload);
//       showNotification('success', 'Profile updated successfully');
//       setEditingSection(null);
//       fetchProfile();
//     } catch (error) {
//       showNotification('error', error.response?.data?.message || 'Update failed');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('profileImage', file);

//     try {
//       setSaving(true);
//       await api.patch('/provider/profile/image', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       showNotification('success', 'Profile image updated');
//       fetchProfile();
//     } catch (error) {
//       showNotification('error', 'Failed to upload image');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ── Loading ──────────────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
//         <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
//         <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//           <Topbar toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
//           <main className="flex-1 flex items-center justify-center">
//             <div className="flex flex-col items-center gap-3">
//               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
//               <p className="text-[13px] text-gray-400 font-medium">Loading profile…</p>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
//         <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
//         <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//           <Topbar toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
//           <main className="flex-1 flex items-center justify-center">
//             <div className="text-center">
//               <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//               <h2 className="text-xl font-bold text-gray-800 mb-2">Failed to Load Profile</h2>
//               <button 
//                 onClick={fetchProfile}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Retry
//               </button>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   const user = profile.user;
//   const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();

//   const tabs = [
//     { id: 'overview', label: 'Overview', icon: User },
//     { id: 'business', label: 'Business Info', icon: Building2 },
//     { id: 'services', label: 'Services & Areas', icon: Wrench },
//     { id: 'hours', label: 'Business Hours', icon: Clock },
//     { id: 'banking', label: 'Banking', icon: Landmark },
//   ];

//   return (
//     <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
//       <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />

//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <Topbar toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />

//         {/* ── Scrollable page ────────────────────────────────────────── */}
//         <main className="flex-1 overflow-y-auto">
//           <div className="px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-10 max-w-7xl mx-auto w-full">

//             {/* ── Header ─────────────────────────────────────────────── */}
//             <div className="mb-5 sm:mb-8">
//               <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
//                 {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
//               </p>
//               <h1 className="text-[22px] sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
//                 My Profile
//               </h1>
//               <p className="text-gray-400 mt-1 text-[13px] sm:text-sm">
//                 Manage your personal and business information.
//               </p>
//             </div>

//             {/* Notification */}
//             {notification && (
//               <div className={`mb-5 flex items-center gap-3 px-4 py-3 rounded-xl shadow-sm border ${
//                 notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
//               }`}>
//                 {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
//                 <span className="text-[13px] font-medium">{notification.message}</span>
//               </div>
//             )}

//             {/* ── Hero Profile Card ────────────────────────────────────── */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-5 sm:mb-8">
//               <div className="relative">
//                 {/* Cover gradient */}
//                 <div className="h-32 sm:h-40 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900" />

//                 <div className="px-4 sm:px-6 pb-5 sm:pb-6">
//                   <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-14 gap-4 sm:gap-6">
//                     {/* Avatar */}
//                     <div className="relative group flex-shrink-0">
//                       <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-blue-900 overflow-hidden">
//                         {user.profileImage ? (
//                           <img src={user.profileImage} alt="" className="w-full h-full object-cover" />
//                         ) : (
//                           initials
//                         )}
//                       </div>
//                       <label className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center cursor-pointer shadow-md hover:scale-110 transition-transform">
//                         <Camera className="w-4 h-4" />
//                         <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
//                       </label>
//                     </div>

//                     {/* Info */}
//                     <div className="flex-1 text-center sm:text-left pb-1">
//                       <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
//                         <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
//                         <div className="flex items-center gap-1.5 justify-center sm:justify-start">
//                           {profile.verificationStatus === 'verified' && (
//                             <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-50 text-green-700 rounded-full text-[10px] font-bold border border-green-200 uppercase tracking-wide">
//                               <BadgeCheck className="w-3 h-3" /> Verified
//                             </span>
//                           )}
//                           {profile.isApproved && (
//                             <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold border border-blue-200 uppercase tracking-wide">
//                               <Shield className="w-3 h-3" /> Approved
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                       <p className="text-gray-500 text-[13px] sm:text-sm font-medium">{profile.workshopName}</p>
//                       <p className="text-gray-400 text-[12px] sm:text-[13px] flex items-center gap-1 justify-center sm:justify-start mt-0.5">
//                         <MapPin className="w-3.5 h-3.5" /> {user.city}, {user.state}
//                       </p>
//                     </div>

//                     {/* Quick Actions */}
//                     <div className="flex gap-2 flex-shrink-0">
//                       <button 
//                         onClick={() => navigate('/provider/dashboard')}
//                         className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-gray-200 transition-colors flex items-center gap-1.5"
//                       >
//                         <Briefcase className="w-3.5 h-3.5" /> Dashboard
//                       </button>
//                       <button 
//                         onClick={() => handleEdit('personal', { ...user })}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm"
//                       >
//                         <Edit3 className="w-3.5 h-3.5" /> Edit
//                       </button>
//                     </div>
//                   </div>

//                   {/* Stats Row */}
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-gray-50">
//                     <StatItem icon={Star} label="Rating" value={profile.rating} color="text-yellow-500" bg="bg-yellow-50" />
//                     <StatItem icon={Briefcase} label="Jobs Done" value={profile.totalJobs} color="text-green-500" bg="bg-green-50" />
//                     <StatItem icon={Award} label="Experience" value={`${profile.yearsOfExperience}y`} color="text-orange-500" bg="bg-orange-50" />
//                     <StatItem icon={Timer} label="In Business" value={`${profile.yearsInBusiness}y`} color="text-purple-500" bg="bg-purple-50" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ── Tabs Navigation ──────────────────────────────────────── */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 mb-5 sm:mb-8 overflow-x-auto">
//               <div className="flex gap-1 min-w-max">
//                 {tabs.map(tab => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] sm:text-[13px] font-semibold whitespace-nowrap transition-all ${
//                       activeTab === tab.id 
//                         ? 'bg-blue-600 text-white shadow-sm' 
//                         : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//                     }`}
//                   >
//                     <tab.icon className="w-4 h-4" />
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* ── Tab Content ──────────────────────────────────────────── */}

//             {/* OVERVIEW TAB */}
//             {activeTab === 'overview' && (
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
//                 {/* Personal Info Card */}
//                 <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                   <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
//                     <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 flex items-center gap-2">
//                       <User className="w-4 h-4 text-blue-600" /> Personal Information
//                     </h3>
//                     {editingSection !== 'personal' && (
//                       <button onClick={() => handleEdit('personal', { ...user })} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
//                         <Edit3 className="w-3.5 h-3.5" />
//                       </button>
//                     )}
//                   </div>

//                   <div className="p-5">
//                     {editingSection === 'personal' ? (
//                       <div className="space-y-4">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">First Name</label>
//                             <input 
//                               type="text" 
//                               value={editData.firstName || ''} 
//                               onChange={e => setEditData({...editData, firstName: e.target.value})}
//                               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Last Name</label>
//                             <input 
//                               type="text" 
//                               value={editData.lastName || ''} 
//                               onChange={e => setEditData({...editData, lastName: e.target.value})}
//                               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Phone Number</label>
//                           <input 
//                             type="tel" 
//                             value={editData.phoneNumber || ''} 
//                             onChange={e => setEditData({...editData, phoneNumber: e.target.value})}
//                             className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Address</label>
//                           <input 
//                             type="text" 
//                             value={editData.address || ''} 
//                             onChange={e => setEditData({...editData, address: e.target.value})}
//                             className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                           />
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">City</label>
//                             <input 
//                               type="text" 
//                               value={editData.city || ''} 
//                               onChange={e => setEditData({...editData, city: e.target.value})}
//                               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">State</label>
//                             <input 
//                               type="text" 
//                               value={editData.state || ''} 
//                               onChange={e => setEditData({...editData, state: e.target.value})}
//                               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                             />
//                           </div>
//                         </div>
//                         <div className="flex gap-3 pt-2">
//                           <button 
//                             onClick={() => handleSave('personal')} 
//                             disabled={saving}
//                             className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
//                           >
//                             <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save Changes'}
//                           </button>
//                           <button 
//                             onClick={handleCancel}
//                             className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-gray-200 transition-colors"
//                           >
//                             <X className="w-3.5 h-3.5" /> Cancel
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           <InfoItem icon={User} label="Full Name" value={`${user.firstName} ${user.lastName}`} />
//                           <InfoItem icon={Mail} label="Email" value={user.email} />
//                         </div>
//                         <InfoItem icon={Phone} label="Phone" value={user.phoneNumber} />
//                         <InfoItem icon={MapPin} label="Address" value={`${user.address}, ${user.city}, ${user.state}`} />
//                         <div className="pt-1">
//                           <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
//                             user.status === 'active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-600 border border-gray-200'
//                           }`}>
//                             <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
//                             {user.status}
//                           </span>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Sidebar */}
//                 <div className="space-y-5">
//                   {/* Account Status */}
//                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//                     <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Account Status</h3>
//                     <div className="space-y-2.5">
//                       <StatusRow label="Email Verified" status={user.isEmailVerified} />
//                       <StatusRow label="Phone Verified" status={user.isVerified} />
//                       <StatusRow label="Provider Approved" status={profile.isApproved} />
//                       <StatusRow label="Identity Verified" status={profile.verificationStatus === 'verified'} />
//                     </div>
//                   </div>

//                   {/* Member Since */}
//                   <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
//                     <h3 className="text-[11px] font-semibold text-blue-200 uppercase tracking-widest mb-1">Member Since</h3>
//                     <p className="text-xl font-bold">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
//                     <p className="text-blue-200 text-[12px] mt-1">{Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))} days active</p>
//                   </div>

//                   {/* Quick Links */}
//                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//                     <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Links</h3>
//                     <div className="space-y-1">
//                       <QuickLink icon={Building2} label="Business Info" onClick={() => setActiveTab('business')} />
//                       <QuickLink icon={Wrench} label="Services & Areas" onClick={() => setActiveTab('services')} />
//                       <QuickLink icon={Clock} label="Business Hours" onClick={() => setActiveTab('hours')} />
//                       <QuickLink icon={Landmark} label="Banking" onClick={() => setActiveTab('banking')} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* BUSINESS INFO TAB */}
//             {activeTab === 'business' && (
//               <div className="max-w-3xl mx-auto">
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                   <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
//                     <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 flex items-center gap-2">
//                       <Building2 className="w-4 h-4 text-blue-600" /> Business Information
//                     </h3>
//                     {editingSection !== 'business' && (
//                       <button onClick={() => handleEdit('business', { ...profile })} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
//                         <Edit3 className="w-3.5 h-3.5" />
//                       </button>
//                     )}
//                   </div>

//                   <div className="p-5 space-y-5">
//                     {editingSection === 'business' ? (
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Workshop Name</label>
//                           <input 
//                             type="text" 
//                             value={editData.workshopName || ''} 
//                             onChange={e => setEditData({...editData, workshopName: e.target.value})}
//                             className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                           />
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Years of Experience</label>
//                             <input 
//                               type="number" 
//                               value={editData.yearsOfExperience || ''} 
//                               onChange={e => setEditData({...editData, yearsOfExperience: e.target.value})}
//                               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Years in Business</label>
//                             <input 
//                               type="number" 
//                               value={editData.yearsInBusiness || ''} 
//                               onChange={e => setEditData({...editData, yearsInBusiness: e.target.value})}
//                               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Primary Specialization</label>
//                           <input 
//                             type="text" 
//                             value={editData.primarySpecialization || ''} 
//                             onChange={e => setEditData({...editData, primarySpecialization: e.target.value})}
//                             className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Secondary Specializations (comma-separated)</label>
//                           <input 
//                             type="text" 
//                             value={(editData.secondarySpecializations || []).join(', ')} 
//                             onChange={e => setEditData({...editData, secondarySpecializations: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
//                             className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                           />
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Service Radius (km)</label>
//                             <input 
//                               type="number" 
//                               value={editData.serviceRadius || ''} 
//                               onChange={e => setEditData({...editData, serviceRadius: e.target.value})}
//                               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Business Phone</label>
//                             <input 
//                               type="tel" 
//                               value={editData.businessPhoneNumber || ''} 
//                               onChange={e => setEditData({...editData, businessPhoneNumber: e.target.value})}
//                               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Website</label>
//                           <input 
//                             type="url" 
//                             value={editData.website || ''} 
//                             onChange={e => setEditData({...editData, website: e.target.value})}
//                             className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description</label>
//                           <textarea 
//                             value={editData.description || ''} 
//                             onChange={e => setEditData({...editData, description: e.target.value})}
//                             rows={4}
//                             className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
//                           />
//                         </div>
//                         <div className="flex gap-3">
//                           <button 
//                             onClick={() => handleSave('business')} 
//                             disabled={saving}
//                             className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
//                           >
//                             <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save Changes'}
//                           </button>
//                           <button 
//                             onClick={handleCancel}
//                             className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-gray-200 transition-colors"
//                           >
//                             <X className="w-3.5 h-3.5" /> Cancel
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="space-y-5">
//                         <InfoItem icon={Building2} label="Workshop Name" value={profile.workshopName} />
//                         <InfoItem icon={Award} label="Primary Specialization" value={profile.primarySpecialization} />
//                         <div>
//                           <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Secondary Specializations</p>
//                           <div className="flex flex-wrap gap-2">
//                             {(profile.secondarySpecializations || []).map((spec, i) => (
//                               <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-[12px] font-semibold border border-blue-100">
//                                 {spec}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           <InfoItem icon={Briefcase} label="Years of Experience" value={`${profile.yearsOfExperience} years`} />
//                           <InfoItem icon={Timer} label="Years in Business" value={`${profile.yearsInBusiness} years`} />
//                         </div>
//                         <InfoItem icon={Truck} label="Service Radius" value={`${profile.serviceRadius} km`} />
//                         <InfoItem icon={Phone} label="Business Phone" value={profile.businessPhoneNumber} />
//                         {profile.website && <InfoItem icon={Globe} label="Website" value={profile.website} />}
//                         {profile.description && (
//                           <div>
//                             <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
//                               <FileText className="w-3.5 h-3.5" /> Description
//                             </p>
//                             <p className="text-gray-800 bg-gray-50 rounded-xl p-4 text-[13px] leading-relaxed">{profile.description}</p>
//                           </div>
//                         )}
//                         {profile.taxId && <InfoItem icon={FileText} label="Tax ID" value={profile.taxId} />}
//                         {profile.businessType && <InfoItem icon={Building2} label="Business Type" value={profile.businessType} />}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* SERVICES & AREAS TAB */}
//             {activeTab === 'services' && (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
//                 {/* Service Areas */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                   <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
//                     <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 flex items-center gap-2">
//                       <MapPin className="w-4 h-4 text-blue-600" /> Service Areas
//                     </h3>
//                     {editingSection !== 'areas' && (
//                       <button onClick={() => handleEdit('areas', { serviceAreas: [...(profile.serviceAreas || [])] })} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
//                         <Edit3 className="w-3.5 h-3.5" />
//                       </button>
//                     )}
//                   </div>
//                   <div className="p-5">
//                     {editingSection === 'areas' ? (
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Service Areas (comma-separated)</label>
//                           <textarea 
//                             value={(editData.serviceAreas || []).join(', ')} 
//                             onChange={e => setEditData({...editData, serviceAreas: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
//                             rows={4}
//                             className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
//                           />
//                         </div>
//                         <div className="flex gap-3">
//                           <button 
//                             onClick={() => handleSave('areas')} 
//                             disabled={saving}
//                             className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
//                           >
//                             <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save'}
//                           </button>
//                           <button 
//                             onClick={handleCancel}
//                             className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-gray-200 transition-colors"
//                           >
//                             <X className="w-3.5 h-3.5" /> Cancel
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex flex-wrap gap-2">
//                         {(profile.serviceAreas || []).map((area, i) => (
//                           <span key={i} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 text-blue-700 rounded-xl text-[12px] font-semibold border border-blue-100">
//                             <MapPin className="w-3 h-3" /> {area}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Specializations */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                   <div className="px-5 py-4 border-b border-gray-50">
//                     <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 flex items-center gap-2">
//                       <Wrench className="w-4 h-4 text-blue-600" /> Specializations
//                     </h3>
//                   </div>
//                   <div className="p-5 space-y-4">
//                     <div>
//                       <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Primary</p>
//                       <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-800 rounded-xl text-[12px] font-bold border border-amber-100">
//                         <Award className="w-3.5 h-3.5" /> {profile.primarySpecialization}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Secondary</p>
//                       <div className="flex flex-wrap gap-2">
//                         {(profile.secondarySpecializations || []).map((spec, i) => (
//                           <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-[12px] font-semibold border border-gray-100">
//                             {spec}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* BUSINESS HOURS TAB */}
//             {activeTab === 'hours' && (
//               <div className="max-w-2xl mx-auto">
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                   <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
//                     <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 flex items-center gap-2">
//                       <Clock className="w-4 h-4 text-blue-600" /> Business Hours
//                     </h3>
//                     {editingSection !== 'hours' && (
//                       <button onClick={() => handleEdit('hours', { businessHours: { ...profile.businessHours } })} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
//                         <Edit3 className="w-3.5 h-3.5" />
//                       </button>
//                     )}
//                   </div>
//                   <div className="p-5">
//                     {editingSection === 'hours' ? (
//                       <div className="space-y-3">
//                         {DAYS.map(day => (
//                           <div key={day} className="flex items-center gap-4">
//                             <span className="w-20 text-[12px] font-semibold text-gray-600 capitalize">{day}</span>
//                             <input 
//                               type="text" 
//                               placeholder="09:00-18:00 or Closed"
//                               value={editData.businessHours?.[day] || ''} 
//                               onChange={e => setEditData({
//                                 ...editData, 
//                                 businessHours: { ...editData.businessHours, [day]: e.target.value }
//                               })}
//                               className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                             />
//                           </div>
//                         ))}
//                         <div className="flex gap-3 pt-2">
//                           <button 
//                             onClick={() => handleSave('hours')} 
//                             disabled={saving}
//                             className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
//                           >
//                             <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save'}
//                           </button>
//                           <button 
//                             onClick={handleCancel}
//                             className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-gray-200 transition-colors"
//                           >
//                             <X className="w-3.5 h-3.5" /> Cancel
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="space-y-2">
//                         {DAYS.map(day => {
//                           const hours = profile.businessHours?.[day];
//                           const isOpen = hours && hours.toLowerCase() !== 'closed';
//                           return (
//                             <div key={day} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
//                               <span className="font-semibold text-gray-700 text-[13px] w-24">{DAY_LABELS[day]}</span>
//                               <span className={`px-3 py-1 rounded-lg text-[12px] font-semibold ${
//                                 isOpen ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-50 text-gray-500 border border-gray-100'
//                               }`}>
//                                 {isOpen ? hours : 'Closed'}
//                               </span>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* BANKING TAB */}
//             {activeTab === 'banking' && (
//               <div className="max-w-2xl mx-auto">
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                   <div className="px-5 py-4 border-b border-gray-50">
//                     <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 flex items-center gap-2">
//                       <Landmark className="w-4 h-4 text-blue-600" /> Bank Account Details
//                     </h3>
//                   </div>
//                   <div className="p-5 space-y-5">
//                     <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
//                       <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-[12px] font-semibold text-amber-800">Bank Account Information</p>
//                         <p className="text-[12px] text-amber-700 mt-0.5">This information is used for payouts. Contact support to update banking details.</p>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <InfoItem icon={Landmark} label="Bank Code" value={profile.bankCode} />
//                       <InfoItem icon={FileText} label="Account Number" value={profile.bankAccountNumber} />
//                     </div>
//                     <InfoItem icon={User} label="Account Name" value={profile.bankAccountName} />

//                     <div className="pt-4 border-t border-gray-50">
//                       <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Paystack Integration</h4>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <InfoItem icon={DollarSign} label="Subaccount Code" value={profile.paystackSubaccountCode} />
//                         <InfoItem icon={FileText} label="Subaccount ID" value={profile.paystackSubaccountId} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// /* ─── Helper Components ──────────────────────────────────────────────────────── */

// function StatItem({ icon: Icon, label, value, color, bg }) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
//         <Icon className={`w-4 h-4 ${color}`} />
//       </div>
//       <div>
//         <p className="text-[18px] font-bold text-gray-900 leading-none">{value}</p>
//         <p className="text-[11px] text-gray-400 font-medium mt-0.5">{label}</p>
//       </div>
//     </div>
//   );
// }

// function InfoItem({ icon: Icon, label, value }) {
//   if (!value) return null;
//   return (
//     <div className="flex items-start gap-3">
//       <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
//         <Icon className="w-3.5 h-3.5 text-gray-400" />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
//         <p className="text-[13px] text-gray-900 font-medium truncate">{value}</p>
//       </div>
//     </div>
//   );
// }

// function StatusRow({ label, status }) {
//   return (
//     <div className="flex items-center justify-between py-1.5">
//       <span className="text-[13px] text-gray-600">{label}</span>
//       {status ? (
//         <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-[10px] font-bold border border-green-200">
//           <CheckCircle2 className="w-3 h-3" /> Yes
//         </span>
//       ) : (
//         <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold border border-gray-200">
//           <X className="w-3 h-3" /> No
//         </span>
//       )}
//     </div>
//   );
// }

// function QuickLink({ icon: Icon, label, onClick }) {
//   return (
//     <button 
//       onClick={onClick}
//       className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
//     >
//       <div className="flex items-center gap-2.5">
//         <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
//           <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 transition-colors" />
//         </div>
//         <span className="text-[13px] font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
//       </div>
//       <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
//     </button>
//   );
// }









import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  Briefcase, 
  Award, 
  Shield, 
  Edit3, 
  Save, 
  X, 
  ChevronRight,
  Camera,
  Wrench,
  Building2,
  Globe,
  FileText,
  CheckCircle2,
  AlertCircle,
  BadgeCheck,
  Timer,
  Truck,
  DollarSign,
  Landmark
} from 'lucide-react';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const DAY_LABELS = {
  monday: 'Monday',
  tuesday: 'Tuesday', 
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday'
};

export default function ProviderProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/provider/profile');
      setProfile(response.data);
    } catch (error) {
      showNotification('error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleEdit = (section, data) => {
    setEditingSection(section);
    setEditData(data);
  };

  const handleCancel = () => {
    setEditingSection(null);
    setEditData({});
  };

  const handleSave = async (section) => {
    try {
      setSaving(true);
      let payload = {};

      switch(section) {
        case 'personal':
          payload = {
            firstName: editData.firstName,
            lastName: editData.lastName,
            phoneNumber: editData.phoneNumber,
            address: editData.address,
            city: editData.city,
            state: editData.state
          };
          break;
        case 'business':
          payload = {
            workshopName: editData.workshopName,
            yearsOfExperience: parseInt(editData.yearsOfExperience),
            yearsInBusiness: parseInt(editData.yearsInBusiness),
            primarySpecialization: editData.primarySpecialization,
            secondarySpecializations: editData.secondarySpecializations,
            serviceRadius: parseInt(editData.serviceRadius),
            description: editData.description,
            website: editData.website,
            businessPhoneNumber: editData.businessPhoneNumber
          };
          break;
        case 'hours':
          payload = { businessHours: editData.businessHours };
          break;
        case 'areas':
          payload = { serviceAreas: editData.serviceAreas };
          break;
        default:
          break;
      }

      await api.patch('/provider/profile', payload);
      showNotification('success', 'Profile updated successfully');
      setEditingSection(null);
      fetchProfile();
    } catch (error) {
      showNotification('error', error.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      setSaving(true);
      await api.patch('/provider/profile/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      showNotification('success', 'Profile image updated');
      fetchProfile();
    } catch (error) {
      showNotification('error', 'Failed to upload image');
    } finally {
      setSaving(false);
    }
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
        <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
          <main className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
              <p className="text-[13px] text-gray-400 font-medium">Loading profile…</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
        <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">Failed to Load Profile</h2>
              <button 
                onClick={fetchProfile}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const user = profile.user;
  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'business', label: 'Business Info', icon: Building2 },
    { id: 'services', label: 'Services & Areas', icon: Wrench },
    { id: 'hours', label: 'Business Hours', icon: Clock },
    { id: 'banking', label: 'Banking', icon: Landmark },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar toggleSidebar={() => setIsOpen(o => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />

        {/* ── Scrollable page ────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-10 max-w-7xl mx-auto w-full">

            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="mb-5 sm:mb-8">
              <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <h1 className="text-[22px] sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                My Profile
              </h1>
              <p className="text-gray-400 mt-1 text-[13px] sm:text-sm">
                Manage your personal and business information.
              </p>
            </div>

            {/* Notification */}
            {notification && (
              <div className={`mb-5 flex items-center gap-3 px-4 py-3 rounded-xl shadow-sm border ${
                notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                <span className="text-[13px] font-medium">{notification.message}</span>
              </div>
            )}

            {/* ── Hero Profile Card ────────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-5 sm:mb-8">
              <div className="relative">
                {/* Cover gradient */}
                <div className="h-32 sm:h-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900" />

                <div className="px-4 sm:px-6 pb-5 sm:pb-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-16 gap-4 sm:gap-6">
                    {/* Avatar */}
                    <div className="relative group flex-shrink-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-blue-900 overflow-hidden">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                          initials
                        )}
                      </div>
                      <label className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center cursor-pointer shadow-md hover:scale-110 transition-transform">
                        <Camera className="w-4 h-4" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left pb-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">{user.firstName} {user.lastName}</h2>
                        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                          {profile.verificationStatus === 'verified' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-50 text-green-700 rounded-full text-[10px] font-bold border border-green-200 uppercase tracking-wide">
                              <BadgeCheck className="w-3 h-3" /> Verified
                            </span>
                          )}
                          {profile.isApproved && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold border border-blue-200 uppercase tracking-wide">
                              <Shield className="w-3 h-3" /> Approved
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-500 text-[13px] sm:text-sm font-medium">{profile.workshopName}</p>
                      <p className="text-gray-400 text-[12px] sm:text-[13px] flex items-center gap-1 justify-center sm:justify-start mt-0.5">
                        <MapPin className="w-3.5 h-3.5" /> {user.city}, {user.state}
                      </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <button 
                        onClick={() => navigate('/provider/dashboard')}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-gray-200 transition-colors flex items-center gap-1.5"
                      >
                        <Briefcase className="w-3.5 h-3.5" /> Dashboard
                      </button>
                      <button 
                        onClick={() => handleEdit('personal', { ...user })}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-gray-50">
                    <StatItem icon={Star} label="Rating" value={profile.rating} color="text-yellow-500" bg="bg-yellow-50" />
                    <StatItem icon={Briefcase} label="Jobs Done" value={profile.totalJobs} color="text-green-500" bg="bg-green-50" />
                    <StatItem icon={Award} label="Experience" value={`${profile.yearsOfExperience}y`} color="text-orange-500" bg="bg-orange-50" />
                    <StatItem icon={Timer} label="In Business" value={`${profile.yearsInBusiness}y`} color="text-purple-500" bg="bg-purple-50" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Tabs Navigation ──────────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 mb-5 sm:mb-8 overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] sm:text-[13px] font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab.id 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Tab Content ──────────────────────────────────────────── */}

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
                {/* Personal Info Card */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" /> Personal Information
                    </h3>
                    {editingSection !== 'personal' && (
                      <button onClick={() => handleEdit('personal', { ...user })} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="p-5">
                    {editingSection === 'personal' ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">First Name</label>
                            <input 
                              type="text" 
                              value={editData.firstName || ''} 
                              onChange={e => setEditData({...editData, firstName: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Last Name</label>
                            <input 
                              type="text" 
                              value={editData.lastName || ''} 
                              onChange={e => setEditData({...editData, lastName: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Phone Number</label>
                          <input 
                            type="tel" 
                            value={editData.phoneNumber || ''} 
                            onChange={e => setEditData({...editData, phoneNumber: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Address</label>
                          <input 
                            type="text" 
                            value={editData.address || ''} 
                            onChange={e => setEditData({...editData, address: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">City</label>
                            <input 
                              type="text" 
                              value={editData.city || ''} 
                              onChange={e => setEditData({...editData, city: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">State</label>
                            <input 
                              type="text" 
                              value={editData.state || ''} 
                              onChange={e => setEditData({...editData, state: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button 
                            onClick={() => handleSave('personal')} 
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                          >
                            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save Changes'}
                          </button>
                          <button 
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-gray-200 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InfoItem icon={User} label="Full Name" value={`${user.firstName} ${user.lastName}`} />
                          <InfoItem icon={Mail} label="Email" value={user.email} />
                        </div>
                        <InfoItem icon={Phone} label="Phone" value={user.phoneNumber} />
                        <InfoItem icon={MapPin} label="Address" value={`${user.address}, ${user.city}, ${user.state}`} />
                        <div className="pt-1">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                            user.status === 'active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-600 border border-gray-200'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                            {user.status}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                  {/* Account Status */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Account Status</h3>
                    <div className="space-y-2.5">
                      <StatusRow label="Email Verified" status={user.isEmailVerified} />
                      <StatusRow label="Phone Verified" status={user.isVerified} />
                      <StatusRow label="Provider Approved" status={profile.isApproved} />
                      <StatusRow label="Identity Verified" status={profile.verificationStatus === 'verified'} />
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                    <h3 className="text-[11px] font-semibold text-blue-200 uppercase tracking-widest mb-1">Member Since</h3>
                    <p className="text-xl font-bold">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    <p className="text-blue-200 text-[12px] mt-1">{Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))} days active</p>
                  </div>

                  {/* Quick Links */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Links</h3>
                    <div className="space-y-1">
                      <QuickLink icon={Building2} label="Business Info" onClick={() => setActiveTab('business')} />
                      <QuickLink icon={Wrench} label="Services & Areas" onClick={() => setActiveTab('services')} />
                      <QuickLink icon={Clock} label="Business Hours" onClick={() => setActiveTab('hours')} />
                      <QuickLink icon={Landmark} label="Banking" onClick={() => setActiveTab('banking')} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BUSINESS INFO TAB */}
            {activeTab === 'business' && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" /> Business Information
                    </h3>
                    {editingSection !== 'business' && (
                      <button onClick={() => handleEdit('business', { ...profile })} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="p-5 space-y-5">
                    {editingSection === 'business' ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Workshop Name</label>
                          <input 
                            type="text" 
                            value={editData.workshopName || ''} 
                            onChange={e => setEditData({...editData, workshopName: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Years of Experience</label>
                            <input 
                              type="number" 
                              value={editData.yearsOfExperience || ''} 
                              onChange={e => setEditData({...editData, yearsOfExperience: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Years in Business</label>
                            <input 
                              type="number" 
                              value={editData.yearsInBusiness || ''} 
                              onChange={e => setEditData({...editData, yearsInBusiness: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Primary Specialization</label>
                          <input 
                            type="text" 
                            value={editData.primarySpecialization || ''} 
                            onChange={e => setEditData({...editData, primarySpecialization: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Secondary Specializations (comma-separated)</label>
                          <input 
                            type="text" 
                            value={(editData.secondarySpecializations || []).join(', ')} 
                            onChange={e => setEditData({...editData, secondarySpecializations: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Service Radius (km)</label>
                            <input 
                              type="number" 
                              value={editData.serviceRadius || ''} 
                              onChange={e => setEditData({...editData, serviceRadius: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Business Phone</label>
                            <input 
                              type="tel" 
                              value={editData.businessPhoneNumber || ''} 
                              onChange={e => setEditData({...editData, businessPhoneNumber: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Website</label>
                          <input 
                            type="url" 
                            value={editData.website || ''} 
                            onChange={e => setEditData({...editData, website: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description</label>
                          <textarea 
                            value={editData.description || ''} 
                            onChange={e => setEditData({...editData, description: e.target.value})}
                            rows={4}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button 
                            onClick={() => handleSave('business')} 
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                          >
                            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save Changes'}
                          </button>
                          <button 
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-gray-200 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        <InfoItem icon={Building2} label="Workshop Name" value={profile.workshopName} />
                        <InfoItem icon={Award} label="Primary Specialization" value={profile.primarySpecialization} />
                        <div>
                          <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Secondary Specializations</p>
                          <div className="flex flex-wrap gap-2">
                            {(profile.secondarySpecializations || []).map((spec, i) => (
                              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-[12px] font-semibold border border-blue-100">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InfoItem icon={Briefcase} label="Years of Experience" value={`${profile.yearsOfExperience} years`} />
                          <InfoItem icon={Timer} label="Years in Business" value={`${profile.yearsInBusiness} years`} />
                        </div>
                        <InfoItem icon={Truck} label="Service Radius" value={`${profile.serviceRadius} km`} />
                        <InfoItem icon={Phone} label="Business Phone" value={profile.businessPhoneNumber} />
                        {profile.website && <InfoItem icon={Globe} label="Website" value={profile.website} />}
                        {profile.description && (
                          <div>
                            <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                              <FileText className="w-3.5 h-3.5" /> Description
                            </p>
                            <p className="text-gray-800 bg-gray-50 rounded-xl p-4 text-[13px] leading-relaxed">{profile.description}</p>
                          </div>
                        )}
                        {profile.taxId && <InfoItem icon={FileText} label="Tax ID" value={profile.taxId} />}
                        {profile.businessType && <InfoItem icon={Building2} label="Business Type" value={profile.businessType} />}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES & AREAS TAB */}
            {activeTab === 'services' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
                {/* Service Areas */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" /> Service Areas
                    </h3>
                    {editingSection !== 'areas' && (
                      <button onClick={() => handleEdit('areas', { serviceAreas: [...(profile.serviceAreas || [])] })} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="p-5">
                    {editingSection === 'areas' ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Service Areas (comma-separated)</label>
                          <textarea 
                            value={(editData.serviceAreas || []).join(', ')} 
                            onChange={e => setEditData({...editData, serviceAreas: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                            rows={4}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button 
                            onClick={() => handleSave('areas')} 
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                          >
                            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save'}
                          </button>
                          <button 
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-gray-200 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(profile.serviceAreas || []).map((area, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 text-blue-700 rounded-xl text-[12px] font-semibold border border-blue-100">
                            <MapPin className="w-3 h-3" /> {area}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Specializations */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-50">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-blue-600" /> Specializations
                    </h3>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Primary</p>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-800 rounded-xl text-[12px] font-bold border border-amber-100">
                        <Award className="w-3.5 h-3.5" /> {profile.primarySpecialization}
                      </span>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Secondary</p>
                      <div className="flex flex-wrap gap-2">
                        {(profile.secondarySpecializations || []).map((spec, i) => (
                          <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-[12px] font-semibold border border-gray-100">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BUSINESS HOURS TAB */}
            {activeTab === 'hours' && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" /> Business Hours
                    </h3>
                    {editingSection !== 'hours' && (
                      <button onClick={() => handleEdit('hours', { businessHours: { ...profile.businessHours } })} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="p-5">
                    {editingSection === 'hours' ? (
                      <div className="space-y-3">
                        {DAYS.map(day => (
                          <div key={day} className="flex items-center gap-4">
                            <span className="w-20 text-[12px] font-semibold text-gray-600 capitalize">{day}</span>
                            <input 
                              type="text" 
                              placeholder="09:00-18:00 or Closed"
                              value={editData.businessHours?.[day] || ''} 
                              onChange={e => setEditData({
                                ...editData, 
                                businessHours: { ...editData.businessHours, [day]: e.target.value }
                              })}
                              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                        ))}
                        <div className="flex gap-3 pt-2">
                          <button 
                            onClick={() => handleSave('hours')} 
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                          >
                            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save'}
                          </button>
                          <button 
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-[12px] sm:text-[13px] font-semibold hover:bg-gray-200 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {DAYS.map(day => {
                          const hours = profile.businessHours?.[day];
                          const isOpen = hours && hours.toLowerCase() !== 'closed';
                          return (
                            <div key={day} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                              <span className="font-semibold text-gray-700 text-[13px] w-24">{DAY_LABELS[day]}</span>
                              <span className={`px-3 py-1 rounded-lg text-[12px] font-semibold ${
                                isOpen ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-50 text-gray-500 border border-gray-100'
                              }`}>
                                {isOpen ? hours : 'Closed'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* BANKING TAB */}
            {activeTab === 'banking' && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-50">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-blue-600" /> Bank Account Details
                    </h3>
                  </div>
                  <div className="p-5 space-y-5">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[12px] font-semibold text-amber-800">Bank Account Information</p>
                        <p className="text-[12px] text-amber-700 mt-0.5">This information is used for payouts. Contact support to update banking details.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InfoItem icon={Landmark} label="Bank Code" value={profile.bankCode} />
                      <InfoItem icon={FileText} label="Account Number" value={profile.bankAccountNumber} />
                    </div>
                    <InfoItem icon={User} label="Account Name" value={profile.bankAccountName} />

                    <div className="pt-4 border-t border-gray-50">
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Paystack Integration</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoItem icon={DollarSign} label="Subaccount Code" value={profile.paystackSubaccountCode} />
                        <InfoItem icon={FileText} label="Subaccount ID" value={profile.paystackSubaccountId} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

/* ─── Helper Components ──────────────────────────────────────────────────────── */

function StatItem({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div>
        <p className="text-[18px] font-bold text-gray-900 leading-none">{value}</p>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-gray-400" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-[13px] text-gray-900 font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

function StatusRow({ label, status }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[13px] text-gray-600">{label}</span>
      {status ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-[10px] font-bold border border-green-200">
          <CheckCircle2 className="w-3 h-3" /> Yes
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold border border-gray-200">
          <X className="w-3 h-3" /> No
        </span>
      )}
    </div>
  );
}

function QuickLink({ icon: Icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
          <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
        <span className="text-[13px] font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
    </button>
  );
}