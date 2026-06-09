import React, { useState, useEffect } from 'react';
import { dbService } from '../lib/supabase';
import { 
  Lock, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Search, 
  MailWarning, 
  FileText,
  User,
  Phone,
  Mail,
  Zap,
  Tag
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [leads, setLeads] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'booking' | 'quote' | 'contact'>('all');
  
  // Selected Lead state for detail viewing / editing notes
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Email notifications mock logs
  const [emailLogs, setEmailLogs] = useState<string[]>([]);

  const loadLeads = async () => {
    try {
      const data = await dbService.getLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadLeads();
      // Add initial mock email logs
      setEmailLogs([
        `[${new Date().toLocaleTimeString()}] System: Email notification template listening active.`,
        `[${new Date(Date.now() - 3600000).toLocaleTimeString()}] Alert: Booking confirmation emailed to jane.doe@gmail.com.`,
        `[${new Date(Date.now() - 7200000).toLocaleTimeString()}] Alert: Dispatch lead email dispatched to dispatch@allenelectric.co.`
      ]);
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'allenelectric') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid admin username or password credentials.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await dbService.updateLeadStatus(id, newStatus);
      await loadLeads();
      
      // Update selected lead details card
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead((prev: any) => ({ ...prev, status: newStatus }));
      }

      // Append log
      setEmailLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Status: Lead ID #${id} transitioned to status "${newStatus}".`,
        ...prev
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      await dbService.updateLeadNotes(id, editingNotes);
      await loadLeads();
      setUpdateSuccess(true);
      
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead((prev: any) => ({ ...prev, notes: editingNotes }));
      }

      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);

      setEmailLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Log: Notes updated for Customer "${selectedLead.name}".`,
        ...prev
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter & Search Logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' ? true : lead.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Chronological agenda bookings list
  const upcomingBookings = leads
    .filter((l) => l.type === 'booking' && l.date)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (!isLoggedIn) {
    return (
      <>
        <Helmet>
          <title>Admin Login | Allen Electric Dashboard Portal</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <section className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="bg-brand-navy-900 p-3 rounded-2xl text-brand-gold-400 mb-3">
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="font-extrabold text-2xl text-brand-navy-900 font-display">
                Allen Electric Portal
              </h1>
              <p className="text-slate-400 text-xs mt-1">Admin Dashboard Login Access Panel</p>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200/50 rounded-2xl p-4 mb-6 text-red-800 text-xs font-semibold text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-navy-900 hover:bg-brand-navy-950 text-white font-black py-4 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Sign In to Dashboard
              </button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] text-center text-slate-400">
              <p>Demo Credentials: username: <span className="font-bold">admin</span> / password: <span className="font-bold">allenelectric</span></p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Lead & Booking Manager | Allen Electric Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Main Admin UI */}
      <section className="bg-slate-50 min-h-screen py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Top Admin Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-brand-navy-900 text-white p-6 rounded-3xl shadow-xl gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-brand-gold-500 text-brand-navy-950 p-2.5 rounded-2xl">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-extrabold text-xl md:text-2xl font-display">
                  Lead Management Panel
                </h1>
                <p className="text-slate-400 text-xs">Logged in: admin &bull; Allen Electric Dispatcher</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/5 py-2.5 px-5 rounded-xl text-xs font-bold transition-colors"
            >
              <LogOut className="w-4 h-4 text-brand-gold-400" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Main leads tracking panel (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Search & Filter bar */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row justify-between gap-4 items-center">
                
                {/* Search */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, phone, service..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                  {(['all', 'booking', 'quote', 'contact'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`py-2 px-4 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                        filterType === type
                          ? 'bg-brand-navy-900 border-brand-navy-900 text-white'
                          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {type === 'all' && 'All Leads'}
                      {type === 'booking' && 'Bookings'}
                      {type === 'quote' && 'Quote Requests'}
                      {type === 'contact' && 'Contacts'}
                    </button>
                  ))}
                </div>

              </div>

              {/* Leads Feed List */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => {
                    const isSelected = selectedLead?.id === lead.id;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          setEditingNotes(lead.notes || '');
                        }}
                        className={`bg-white rounded-3xl p-5 border transition-all cursor-pointer hover:border-slate-300 shadow-sm ${
                          isSelected ? 'border-brand-gold-500 ring-2 ring-brand-gold-500/10' : 'border-slate-200'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-brand-navy-900 text-sm">{lead.name}</h4>
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                lead.type === 'booking' ? 'bg-indigo-50 text-indigo-600' :
                                lead.type === 'quote' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-600'
                              }`}>
                                {lead.type}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">Submitted: {new Date(lead.createdAt).toLocaleDateString()}</p>
                          </div>

                          {/* Lead status badge */}
                          <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                            lead.status === 'New' ? 'bg-red-50 text-red-600' :
                            lead.status === 'Contacted' ? 'bg-blue-50 text-blue-600' :
                            lead.status === 'Scheduled' ? 'bg-emerald-50 text-emerald-600' :
                            lead.status === 'Completed' ? 'bg-slate-100 text-slate-600' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {lead.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-600 mb-3 bg-slate-50 p-3 rounded-xl">
                          <div className="flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-bold text-slate-800">{lead.service}</span>
                          </div>
                          {lead.date && (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{lead.date} &bull; {lead.time}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{lead.phone}</span>
                          </div>
                        </div>

                        <p className="text-slate-500 text-xs line-clamp-2 italic">"{lead.details}"</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400">
                    <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    <p className="text-sm">No customer leads found matching filters.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Right details sidebar (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Selected Lead details sheet */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm min-h-[350px]">
                {selectedLead ? (
                  <div className="space-y-5">
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="font-extrabold text-lg font-display text-brand-navy-900">Lead Detail Card</h3>
                      <p className="text-xs text-slate-400 mt-1">Manage statuses and dispatcher notes</p>
                    </div>

                    <div className="space-y-3 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="font-bold text-slate-800">{selectedLead.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>{selectedLead.phone}</span>
                      </div>
                      {selectedLead.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span>{selectedLead.email}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-slate-400" />
                        <span className="font-bold text-brand-navy-900">{selectedLead.service}</span>
                      </div>
                    </div>

                    {/* Status updates selectors */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2">Change Status</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['New', 'Contacted', 'Scheduled', 'Completed'].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleStatusUpdate(selectedLead.id, s)}
                            className={`py-1.5 px-2 rounded-xl text-[10px] font-bold text-center border transition-all ${
                              selectedLead.status === s
                                ? 'bg-brand-navy-900 border-brand-navy-900 text-white'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Photo preview (if upload exists) */}
                    {selectedLead.photoUrl && (
                      <div className="border border-slate-200 rounded-2xl overflow-hidden p-2 bg-slate-50">
                        <p className="text-[9px] uppercase font-bold text-slate-400 mb-1.5">Job Image Attached:</p>
                        <img 
                          src={selectedLead.photoUrl} 
                          alt="Job attachment" 
                          className="w-full h-32 object-cover rounded-xl shadow-inner cursor-zoom-in"
                          onClick={() => window.open(selectedLead.photoUrl)}
                        />
                      </div>
                    )}

                    {/* Dispatch Notes Logger */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-400">Dispatcher Notes</label>
                        {updateSuccess && (
                          <span className="text-[9px] text-emerald-600 font-bold">Saved!</span>
                        )}
                      </div>
                      <textarea
                        value={editingNotes}
                        onChange={(e) => setEditingNotes(e.target.value)}
                        placeholder="Add scheduling notes or discount approvals..."
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:ring-1 focus:ring-brand-gold-500 focus:outline-none"
                      ></textarea>
                      <button
                        onClick={() => handleSaveNotes(selectedLead.id)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-[10px] uppercase tracking-wide mt-2 transition-all"
                      >
                        Save Dispatch Notes
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center text-slate-400 py-12 h-full">
                    <FileText className="w-10 h-10 text-slate-300 mb-2 animate-pulse" />
                    <p className="text-xs">Select a customer lead from the list to display details and edit dispatcher notes.</p>
                  </div>
                )}
              </div>

              {/* Mock Email Alert Logs Console */}
              <div className="bg-brand-navy-900 border border-white/5 rounded-3xl p-5 text-white shadow-xl">
                <h4 className="font-extrabold text-sm font-display mb-3 flex items-center gap-1.5 text-brand-gold-400">
                  <MailWarning className="w-4 h-4" />
                  Dispatcher Notifications
                </h4>
                <div className="bg-black/35 rounded-2xl p-4 font-mono text-[9px] text-emerald-400/90 h-[150px] overflow-y-auto space-y-2.5">
                  {emailLogs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">{log}</div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Calendar agenda list */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="font-extrabold text-lg font-display text-brand-navy-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-gold-500" />
              Calendar Agenda View
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.slice(0, 4).map((book) => (
                  <div key={book.id} className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded-full">{book.time}</span>
                      <span className="text-[9px] text-slate-400 font-semibold">{book.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-xs line-clamp-1">{book.name}</h4>
                    <p className="text-[10px] text-brand-navy-900 font-semibold mt-1">{book.service}</p>
                    <p className="text-[9px] text-slate-400 mt-2 line-clamp-1">Notes: {book.notes || 'None'}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-6 text-center text-slate-400 text-xs">
                  No upcoming bookings scheduled on the calendar.
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
