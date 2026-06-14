import React, { useState, useEffect } from 'react';
import { dbService, supabase } from '../lib/supabase';
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
  Tag,
  X,
  Star,
  MessageSquare,
  Trash2,
  Plus
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

  // View mode toggle: list view, Kanban pipeline board, or Reviews manager
  const [viewMode, setViewMode] = useState<'list' | 'pipeline' | 'reviews'>('pipeline');

  // Reviews management state
  const [reviews, setReviews] = useState<any[]>([]);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewService, setNewReviewService] = useState('Panel Upgrade');
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false);
  const [reviewSubmitError, setReviewSubmitError] = useState('');

  // Manual Lead creation states
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadService, setNewLeadService] = useState('Panel Upgrades');
  const [newLeadType, setNewLeadType] = useState<'booking' | 'quote' | 'contact'>('booking');
  const [newLeadDate, setNewLeadDate] = useState('');
  const [newLeadTime, setNewLeadTime] = useState('');
  const [newLeadDetails, setNewLeadDetails] = useState('');
  const [leadSubmitSuccess, setLeadSubmitSuccess] = useState(false);
  const [leadSubmitError, setLeadSubmitError] = useState('');

  const loadLeads = async () => {
    try {
      const data = await dbService.getLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadReviews = async () => {
    try {
      const data = await dbService.getReviews();
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Restore Supabase Auth session on mount
  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user && session.user.email === 'info@allenelectric.us') {
          setIsLoggedIn(true);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user && session.user.email === 'info@allenelectric.us') {
          setIsLoggedIn(true);
        } else if (!session) {
          setIsLoggedIn(false);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    loadLeads();
    loadReviews();

    // Add initial mock email logs
    setEmailLogs([
      `[${new Date().toLocaleTimeString()}] System: Email notification template listening active.`,
      `[${new Date(Date.now() - 3600000).toLocaleTimeString()}] Alert: Booking confirmation emailed to jane.doe@gmail.com.`,
      `[${new Date(Date.now() - 7200000).toLocaleTimeString()}] Alert: Dispatch lead email dispatched to info@allenelectric.us.`
    ]);

    // 1. Supabase Real-time postgres listener
    let channel: any = null;
    if (supabase) {
      channel = supabase
        .channel('db-leads-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, (payload: any) => {
          const newLead = payload.new;
          setEmailLogs((prev) => [
            `[${new Date().toLocaleTimeString()}] Real-time DB Update: Lead "${newLead?.name || 'Unknown'}" was ${payload.eventType.toLowerCase()}d.`,
            ...prev
          ]);
          loadLeads();
        })
        .subscribe();
    }

    // 2. LocalStorage storage listener (for multi-tab real-time sync)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'allen_electric_bookings') {
        setEmailLogs((prev) => [
          `[${new Date().toLocaleTimeString()}] Real-time Storage Sync: Detected update from another browser tab. Synchronizing...`,
          ...prev
        ]);
        loadLeads();
      } else if (e.key === 'allen_electric_reviews') {
        setEmailLogs((prev) => [
          `[${new Date().toLocaleTimeString()}] Real-time Storage Sync: Reviews updated from another browser tab. Syncing...`,
          ...prev
        ]);
        loadReviews();
      }
    };
    window.addEventListener('storage', handleStorage);

    // 3. Custom same-tab event listener (instantly fires on form submits)
    const handleCustomLead = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newLead = customEvent.detail;
      setEmailLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Real-time App Notification: New website lead "${newLead?.name || 'Customer'}" received!`,
        ...prev
      ]);
      loadLeads();
    };
    window.addEventListener('lead-added', handleCustomLead);

    return () => {
      if (channel && supabase) {
        supabase.removeChannel(channel);
      }
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('lead-added', handleCustomLead);
    };
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: username,
          password: password
        });

        if (error) {
          // Check for fallback credentials
          if (username === 'admin' && password === 'allenelectric') {
            setIsLoggedIn(true);
            return;
          }
          if (username === 'info@allenelectric.us' && password === 'AllenElectric2026!') {
            setIsLoggedIn(true);
            return;
          }
          setLoginError(error.message);
        } else if (data?.user) {
          if (data.user.email === 'info@allenelectric.us') {
            setIsLoggedIn(true);
          } else {
            await supabase.auth.signOut();
            setLoginError('Access Denied: Only the super admin (info@allenelectric.us) is authorized to view this portal.');
          }
        }
      } catch (err: any) {
        setLoginError(err.message || 'An unexpected error occurred during authentication.');
      }
    } else {
      if (
        (username === 'admin' && password === 'allenelectric') ||
        (username === 'info@allenelectric.us' && password === 'AllenElectric2026!')
      ) {
        setIsLoggedIn(true);
      } else {
        setLoginError('Invalid credentials. Check database connectivity or username/password.');
      }
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
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

  const handleDeleteReview = async (id: string) => {
    try {
      await dbService.deleteReview(id);
      await loadReviews();
      setEmailLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Status: Review ID #${id} deleted by Administrator.`,
        ...prev
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim() || !newReviewLocation.trim()) return;

    try {
      await dbService.addReview({
        name: newReviewName,
        location: newReviewLocation,
        rating: newReviewRating,
        text: newReviewText,
        service: newReviewService
      });

      setReviewSubmitSuccess(true);
      setReviewSubmitError('');
      
      // Reset form
      setNewReviewName('');
      setNewReviewLocation('');
      setNewReviewRating(5);
      setNewReviewText('');
      setNewReviewService('Panel Upgrade');

      await loadReviews();

      setTimeout(() => {
        setReviewSubmitSuccess(false);
        setShowAddReviewModal(false);
      }, 1500);

      setEmailLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Status: Admin added custom review.`,
        ...prev
      ]);
    } catch (err: any) {
      setReviewSubmitError(err.message || 'Error creating review.');
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadPhone.trim()) {
      setLeadSubmitError('Customer Name and Phone Number are required.');
      return;
    }

    try {
      await dbService.addLead({
        name: newLeadName,
        phone: newLeadPhone,
        email: newLeadEmail,
        service: newLeadService,
        type: newLeadType,
        date: newLeadDate || undefined,
        time: newLeadTime || undefined,
        details: newLeadDetails || 'Manually logged by dispatcher',
        photoUrl: null
      });

      setLeadSubmitSuccess(true);
      setLeadSubmitError('');

      // Reset form
      setNewLeadName('');
      setNewLeadPhone('');
      setNewLeadEmail('');
      setNewLeadService('Panel Upgrades');
      setNewLeadType('booking');
      setNewLeadDate('');
      setNewLeadTime('');
      setNewLeadDetails('');

      await loadLeads();

      setTimeout(() => {
        setLeadSubmitSuccess(false);
        setShowAddLeadModal(false);
      }, 1500);

      setEmailLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Status: Dispatcher logged a new manual lead: "${newLeadName}".`,
        ...prev
      ]);
    } catch (err: any) {
      setLeadSubmitError(err.message || 'Error creating lead.');
    }
  };

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('text/plain', leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) {
      await handleStatusUpdate(id, targetStatus);
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

        <section className="min-h-[70vh] flex items-center justify-center bg-slate-950 px-4">
          <div className="bg-slate-900 border border-slate-800/80 p-8 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="bg-slate-800 p-3 rounded-2xl text-brand-gold-400 mb-3 border border-slate-700/50">
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="font-extrabold text-2xl text-white font-display">
                Allen Electric Portal
              </h1>
              <p className="text-slate-400 text-xs mt-1">Admin Dashboard Login Access Panel</p>
            </div>

            {loginError && (
              <div className="bg-red-900/50 border border-red-700/50 rounded-2xl p-4 mb-6 text-red-200 text-xs font-semibold text-center">
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
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
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
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-950 font-black py-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-brand-gold-500/10"
              >
                Sign In to Dashboard
              </button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-center text-slate-500">
              <p>Demo Credentials: username: <span className="font-bold text-slate-400">admin</span> / password: <span className="font-bold text-slate-400">allenelectric</span></p>
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
      <section className="bg-slate-950 min-h-screen py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Top Admin Header */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 border border-slate-800/80 text-white p-6 rounded-3xl shadow-xl gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-brand-gold-500 text-brand-navy-950 p-2.5 rounded-2xl">
                <Settings className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <h1 className="font-extrabold text-xl md:text-2xl font-display">
                  Lead Management Panel
                </h1>
                <p className="text-slate-400 text-xs text-left">Logged in: admin &bull; Allen Electric Dispatcher</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* View Mode Toggle */}
              <div className="bg-slate-850 rounded-2xl p-1 flex items-center border border-slate-700 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setViewMode('pipeline')}
                  className={`flex-1 sm:flex-initial py-1.5 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    viewMode === 'pipeline'
                      ? 'bg-brand-gold-500 text-brand-navy-950 shadow-md shadow-brand-gold-500/10'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pipeline Board
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`flex-1 sm:flex-initial py-1.5 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    viewMode === 'list'
                      ? 'bg-brand-gold-500 text-brand-navy-950 shadow-md shadow-brand-gold-500/10'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  List Feed
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('reviews')}
                  className={`flex-1 sm:flex-initial py-1.5 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    viewMode === 'reviews'
                      ? 'bg-brand-gold-500 text-brand-navy-950 shadow-md shadow-brand-gold-500/10'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Reviews Control
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setLeadSubmitSuccess(false);
                  setLeadSubmitError('');
                  setShowAddLeadModal(true);
                }}
                className="flex items-center justify-center gap-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-950 py-2.5 px-5 rounded-xl text-xs font-bold transition-colors w-full sm:w-auto font-black shadow-md shadow-brand-gold-500/10"
              >
                <Plus className="w-4 h-4" />
                <span>Log New Lead</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 py-2.5 px-5 rounded-xl text-xs font-bold transition-colors w-full sm:w-auto text-slate-200"
              >
                <LogOut className="w-4 h-4 text-brand-gold-400" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            /* ─── List Feed View Mode ─── */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Main leads tracking panel */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Search & Filter bar */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row justify-between gap-4 items-center">
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, phone, service..."
                      className="w-full bg-slate-850 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-gold-500"
                    />
                  </div>

                  <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                    {(['all', 'booking', 'quote', 'contact'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`py-2 px-4 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                          filterType === type
                            ? 'bg-brand-gold-500 border-brand-gold-500 text-brand-navy-950'
                            : 'bg-slate-800 border-slate-700/80 text-slate-300 hover:bg-slate-750'
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
                          className={`bg-slate-900 rounded-3xl p-5 border transition-all cursor-pointer hover:border-slate-750 shadow-sm ${
                            isSelected ? 'border-brand-gold-500 ring-2 ring-brand-gold-500/15' : 'border-slate-805/80'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-white text-sm">{lead.name}</h4>
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                                  lead.type === 'booking' ? 'bg-indigo-950/60 text-indigo-300 border-indigo-900/40' :
                                  lead.type === 'quote' ? 'bg-amber-950/60 text-amber-300 border-amber-900/40' : 'bg-slate-800 text-slate-300 border-slate-700/50'
                                }`}>
                                  {lead.type}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1">Submitted: {new Date(lead.createdAt).toLocaleDateString()}</p>
                            </div>

                            <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${
                              lead.status === 'New' ? 'bg-red-950/60 text-red-300 border-red-900/40' :
                              lead.status === 'Contacted' ? 'bg-blue-950/60 text-blue-300 border-blue-900/40' :
                              lead.status === 'Scheduled' ? 'bg-emerald-950/60 text-emerald-300 border-emerald-900/40' :
                              lead.status === 'Completed' ? 'bg-slate-800 text-slate-300 border-slate-700/40' :
                              'bg-red-950 text-red-300 border-red-900/40'
                            }`}>
                              {lead.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-300 mb-3 bg-slate-850 p-3 rounded-xl border border-slate-800">
                            <div className="flex items-center gap-1.5">
                              <Tag className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-bold text-white">{lead.service}</span>
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

                          <p className="text-slate-400 text-xs line-clamp-2 italic">"{lead.details}"</p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-12 text-center text-slate-500">
                      <Users className="w-10 h-10 mx-auto mb-2 text-slate-600" />
                      <p className="text-sm">No customer leads found matching filters.</p>
                    </div>
                  )}
                </div>

              </div>

              {/* Right details sidebar */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Selected Lead details sheet */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-sm min-h-[350px]">
                  {selectedLead ? (
                    <div className="space-y-5">
                      <div className="border-b border-slate-800 pb-4">
                        <h3 className="font-extrabold text-lg font-display text-white">Lead Detail Card</h3>
                        <p className="text-xs text-slate-400 mt-1">Manage statuses and dispatcher notes</p>
                      </div>

                      <div className="space-y-3 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="font-bold text-white">{selectedLead.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-250">{selectedLead.phone}</span>
                        </div>
                        {selectedLead.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-250">{selectedLead.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-slate-400" />
                          <span className="font-bold text-brand-gold-450">{selectedLead.service}</span>
                        </div>
                      </div>

                      {/* Status updates selectors */}
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-405 mb-2">Change Status</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {['New', 'Contacted', 'Scheduled', 'Completed'].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => handleStatusUpdate(selectedLead.id, s)}
                              className={`py-1.5 px-2 rounded-xl text-[10px] font-bold text-center border transition-all ${
                                selectedLead.status === s
                                  ? 'bg-brand-gold-500 border-brand-gold-500 text-brand-navy-950 shadow-sm'
                                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Photo preview */}
                      {selectedLead.photoUrl && (
                        <div className="border border-slate-800 rounded-2xl overflow-hidden p-2 bg-slate-950">
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
                          <label className="block text-[10px] uppercase font-bold text-slate-405">Dispatcher Notes</label>
                          {updateSuccess && (
                            <span className="text-[9px] text-emerald-400 font-bold">Saved!</span>
                          )}
                        </div>
                        <textarea
                          value={editingNotes}
                          onChange={(e) => setEditingNotes(e.target.value)}
                          placeholder="Add scheduling notes or discount approvals..."
                          rows={3}
                          className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-gold-500 focus:outline-none"
                        ></textarea>
                        <button
                          onClick={() => handleSaveNotes(selectedLead.id)}
                          className="w-full bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold py-2 rounded-xl text-[10px] uppercase tracking-wide mt-2 transition-all"
                        >
                          Save Dispatch Notes
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center text-slate-500 py-12 h-full">
                      <FileText className="w-10 h-10 text-slate-600 mb-2 animate-pulse" />
                      <p className="text-xs">Select a customer lead from the list to display details and edit dispatcher notes.</p>
                    </div>
                  )}
                </div>

                {/* Mock Email Alert Logs Console */}
                <div className="bg-brand-navy-900 border border-white/5 rounded-3xl p-5 text-white shadow-xl text-left">
                  <h4 className="font-extrabold text-sm font-display mb-3 flex items-center gap-1.5 text-brand-gold-400">
                    <MailWarning className="w-4 h-4 text-left" />
                    Dispatcher Notifications
                  </h4>
                  <div className="bg-black/35 rounded-2xl p-4 font-mono text-[9px] text-emerald-400/90 h-[150px] overflow-y-auto space-y-2.5 text-left">
                    {emailLogs.map((log, idx) => (
                      <div key={idx} className="leading-relaxed">{log}</div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ) : viewMode === 'pipeline' ? (
            /* ─── Kanban Pipeline Board View Mode ─── */
            <div className="space-y-6">
              
              {/* Search & Filter bar */}
              <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row justify-between gap-4 items-center">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter pipeline by name, phone..."
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-gold-500"
                  />
                </div>

                <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                  {(['all', 'booking', 'quote', 'contact'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`py-2 px-4 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                        filterType === type
                          ? 'bg-brand-gold-500 border-brand-gold-500 text-brand-navy-950'
                          : 'bg-slate-800 border-slate-700/80 text-slate-300 hover:bg-slate-750'
                      }`}
                    >
                      {type === 'all' && 'All Types'}
                      {type === 'booking' && 'Bookings Only'}
                      {type === 'quote' && 'Quotes Only'}
                      {type === 'contact' && 'Contacts Only'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kanban columns grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(['New', 'Contacted', 'Scheduled', 'Completed'] as const).map((colStatus) => {
                  const colLeads = filteredLeads.filter((l) => l.status === colStatus);
                  return (
                    <div
                      key={colStatus}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, colStatus)}
                      className="bg-slate-900 border border-slate-800/80 rounded-3xl p-4 flex flex-col min-h-[500px] shadow-inner text-left"
                    >
                      {/* Column Header */}
                      <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
                        <h3 className="font-extrabold text-xs text-slate-100 uppercase tracking-widest flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            colStatus === 'New' ? 'bg-red-500' :
                            colStatus === 'Contacted' ? 'bg-blue-500 animate-pulse' :
                            colStatus === 'Scheduled' ? 'bg-emerald-500' : 'bg-slate-500'
                          }`} />
                          {colStatus === 'New' ? 'New Leads' : colStatus}
                        </h3>
                        <span className="text-[10px] bg-slate-800 text-slate-200 font-bold px-2.5 py-0.5 rounded-full border border-slate-700">
                          {colLeads.length}
                        </span>
                      </div>

                      {/* Cards Container */}
                      <div className="flex-1 space-y-3 overflow-y-auto max-h-[480px] pr-1">
                        {colLeads.length > 0 ? (
                          colLeads.map((lead) => (
                            <div
                              key={lead.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, lead.id)}
                              onClick={() => {
                                setSelectedLead(lead);
                                setEditingNotes(lead.notes || '');
                              }}
                              className="bg-slate-800 border border-slate-700/60 hover:border-brand-gold-500 hover:ring-2 hover:ring-brand-gold-500/15 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group relative space-y-2"
                            >
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="font-extrabold text-white text-xs line-clamp-1">{lead.name}</h4>
                                <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0 border ${
                                  lead.type === 'booking' ? 'bg-indigo-950/60 text-indigo-300 border-indigo-900/40' :
                                  lead.type === 'quote' ? 'bg-amber-950/60 text-amber-300 border-amber-900/40' : 'bg-slate-900/60 text-slate-300 border-slate-800/40'
                                }`}>
                                  {lead.type}
                                </span>
                              </div>

                              <p className="text-[9px] text-slate-405">
                                Date: {new Date(lead.createdAt).toLocaleDateString()}
                              </p>

                              <div className="text-[10px] text-slate-300 bg-slate-850 p-2.5 rounded-xl space-y-1 border border-slate-800">
                                <p className="font-bold text-white line-clamp-1">{lead.service}</p>
                                <p className="line-clamp-1 font-mono">{lead.phone}</p>
                              </div>

                              <p className="text-[10px] text-slate-400 italic line-clamp-2">
                                "{lead.details || 'No additional details.'}"
                              </p>

                              {/* Drag Hint & Quick Pipeline Transition Actions */}
                              <div className="pt-2 border-t border-slate-700 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[8px] text-slate-500">Drag card or click</span>
                                <div className="flex gap-0.5">
                                  {colStatus !== 'New' && (
                                    <button
                                      type="button"
                                      title="Move Left"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const prevStatus = colStatus === 'Contacted' ? 'New' : colStatus === 'Scheduled' ? 'Contacted' : 'Scheduled';
                                        handleStatusUpdate(lead.id, prevStatus);
                                      }}
                                      className="p-1 hover:bg-slate-700 rounded text-slate-300 font-extrabold text-xs transition-colors"
                                    >
                                      &larr;
                                    </button>
                                  )}
                                  {colStatus !== 'Completed' && (
                                    <button
                                      type="button"
                                      title="Move Right"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const nextStatus = colStatus === 'New' ? 'Contacted' : colStatus === 'Contacted' ? 'Scheduled' : 'Completed';
                                        handleStatusUpdate(lead.id, nextStatus);
                                      }}
                                      className="p-1 hover:bg-slate-700 rounded text-slate-300 font-extrabold text-xs transition-colors"
                                    >
                                      &rarr;
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="py-16 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl h-full flex flex-col justify-center">
                            No Leads in Status
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Real-time Logger and Actions side-by-side below Kanban columns */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
                <div className="md:col-span-6">
                  {/* Mock Email Alert Logs Console */}
                  <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-5 text-white shadow-xl text-left h-full">
                    <h4 className="font-extrabold text-sm font-display mb-3 flex items-center gap-1.5 text-brand-gold-400">
                      <MailWarning className="w-4 h-4" />
                      Live Dispatch Notifications
                    </h4>
                    <div className="bg-black/35 rounded-2xl p-4 font-mono text-[9px] text-emerald-400/90 h-[150px] overflow-y-auto space-y-2.5">
                      {emailLogs.map((log, idx) => (
                        <div key={idx} className="leading-relaxed">{log}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-6 flex flex-col justify-center bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-sm text-center">
                  <FileText className="w-8 h-8 text-brand-gold-500 mx-auto mb-2 animate-bounce" />
                  <h4 className="font-extrabold text-white text-sm">Real-time Pipeline sync active</h4>
                  <p className="text-slate-400 text-xs mt-1">
                    Forms completed anywhere on the site populate this board instantly. Try dropping cards to update dispatcher statuses.
                  </p>
                </div>
              </div>

            </div>
          ) : (
            /* ─── Reviews Control View Mode ─── */
            <div className="space-y-6">
              {/* Header and Actions */}
              <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-left w-full">
                  <h3 className="font-extrabold text-lg font-display text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-brand-gold-500" />
                    Customer Reviews Moderation
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Manage client reviews showing up on the website. Delete spam or add offline entries.
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    setReviewSubmitSuccess(false);
                    setReviewSubmitError('');
                    setShowAddReviewModal(true);
                  }}
                  className="bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-950 font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:shadow-lg shrink-0 w-full sm:w-auto justify-center"
                >
                  <Plus className="w-4 h-4 text-brand-navy-950" />
                  <span>Add Review</span>
                </button>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.length > 0 ? (
                  reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between text-left"
                    >
                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(rev.id)}
                        className="absolute top-4 right-4 text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/60 p-2 rounded-xl transition-colors"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="space-y-4">
                        {/* Header info */}
                        <div className="pr-8">
                          <h4 className="font-extrabold text-white text-sm font-display">{rev.name}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {rev.location} &bull; {rev.service}
                          </p>
                        </div>

                        {/* Rating stars */}
                        <div className="flex gap-0.5 text-brand-gold-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                          {[...Array(5 - rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 text-slate-700" />
                          ))}
                        </div>

                        {/* Review text */}
                        <p className="text-slate-300 text-xs leading-relaxed italic">
                          "{rev.text}"
                        </p>
                      </div>

                      {/* Footer date */}
                      <div className="pt-4 mt-4 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-405">
                        <span>Date: {rev.date}</span>
                        <span className="font-semibold text-brand-gold-450 bg-brand-gold-950/40 px-2 py-0.5 rounded-full border border-brand-gold-900/40">
                          Published
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full bg-slate-900 border border-slate-800/80 rounded-3xl p-12 text-center text-slate-500">
                    <MessageSquare className="w-10 h-10 mx-auto mb-2 text-slate-600" />
                    <p className="text-sm">No reviews found.</p>
                  </div>
                )}
              </div>

              {/* Add Review Modal */}
              {showAddReviewModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy-950/65 backdrop-blur-sm p-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-w-md w-full relative text-left">
                    <button
                      onClick={() => setShowAddReviewModal(false)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-white focus:outline-none bg-slate-800 hover:bg-slate-750 p-1.5 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <form onSubmit={handleAddReview} className="space-y-4">
                      <div className="border-b border-slate-800 pb-3">
                        <h3 className="font-extrabold text-lg font-display text-white">Add Customer Review</h3>
                        <p className="text-xs text-slate-405 mt-0.5">Publish a manual/offline review directly to the site</p>
                      </div>

                      {reviewSubmitSuccess && (
                        <div className="bg-emerald-950/50 border border-emerald-800/40 rounded-2xl p-4 text-emerald-300 text-xs font-semibold text-center">
                          Review added successfully!
                        </div>
                      )}

                      {reviewSubmitError && (
                        <div className="bg-red-950/50 border border-red-800/40 rounded-2xl p-4 text-red-305 text-xs font-semibold text-center">
                          {reviewSubmitError}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-405 mb-1">Customer Name</label>
                          <input
                            type="text"
                            required
                            value={newReviewName}
                            onChange={(e) => setNewReviewName(e.target.value)}
                            placeholder="John D."
                            className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-gold-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-405 mb-1">Location (City, State)</label>
                          <input
                            type="text"
                            required
                            value={newReviewLocation}
                            onChange={(e) => setNewReviewLocation(e.target.value)}
                            placeholder="Mobile, AL"
                            className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-gold-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-405 mb-1">Service Provided</label>
                          <select
                            value={newReviewService}
                            onChange={(e) => setNewReviewService(e.target.value)}
                            className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs focus:outline-none text-white bg-slate-900"
                          >
                            <option value="Panel Upgrade" className="bg-slate-900">Panel Upgrade</option>
                            <option value="Generator Installation" className="bg-slate-900">Generator Installation</option>
                            <option value="Electrical Repair" className="bg-slate-900">Electrical Repair</option>
                            <option value="Safety Inspection" className="bg-slate-900">Safety Inspection</option>
                            <option value="Lighting Installation" className="bg-slate-900">Lighting Installation</option>
                            <option value="Other" className="bg-slate-900">Other Service</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-405 mb-1">Rating</label>
                          <div className="flex gap-1 items-center mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewReviewRating(star)}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`w-5 h-5 ${
                                    newReviewRating >= star ? 'text-brand-gold-500 fill-current' : 'text-slate-700'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-405 mb-1">Review Text</label>
                        <textarea
                          required
                          value={newReviewText}
                          onChange={(e) => setNewReviewText(e.target.value)}
                          placeholder="Review comments..."
                          rows={4}
                          className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-gold-500 focus:outline-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
                      >
                        Publish Review
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Add Lead Modal */}
          {showAddLeadModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy-950/65 backdrop-blur-sm p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-w-md w-full relative text-left text-white">
                <button
                  onClick={() => setShowAddLeadModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white focus:outline-none bg-slate-800 hover:bg-slate-750 p-1.5 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <form onSubmit={handleAddLead} className="space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="font-extrabold text-lg font-display text-white">Log New Lead</h3>
                    <p className="text-slate-400 text-xs mt-0.5">Manually record an offline booking or quote</p>
                  </div>

                  {leadSubmitSuccess && (
                    <div className="bg-emerald-950/50 border border-emerald-800/40 rounded-2xl p-4 text-emerald-305 text-xs font-semibold text-center">
                      Lead logged successfully!
                    </div>
                  )}

                  {leadSubmitError && (
                    <div className="bg-red-950/50 border border-red-800/40 rounded-2xl p-4 text-red-305 text-xs font-semibold text-center">
                      {leadSubmitError}
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-405 mb-1">Customer Name *</label>
                    <input
                      type="text"
                      required
                      value={newLeadName}
                      onChange={(e) => setNewLeadName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-gold-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-405 mb-1">Phone Number *</label>
                      <input
                        type="text"
                        required
                        value={newLeadPhone}
                        onChange={(e) => setNewLeadPhone(e.target.value)}
                        placeholder="205-555-0199"
                        className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-gold-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-405 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={newLeadEmail}
                        onChange={(e) => setNewLeadEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-gold-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-405 mb-1">Lead Type</label>
                      <select
                        value={newLeadType}
                        onChange={(e) => setNewLeadType(e.target.value as 'booking' | 'quote' | 'contact')}
                        className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs focus:outline-none text-white bg-slate-900"
                      >
                        <option value="booking" className="bg-slate-900">Booking</option>
                        <option value="quote" className="bg-slate-900">Quote Request</option>
                        <option value="contact" className="bg-slate-900">General Contact</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-405 mb-1">Service Required</label>
                      <select
                        value={newLeadService}
                        onChange={(e) => setNewLeadService(e.target.value)}
                        className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs focus:outline-none text-white bg-slate-900"
                      >
                        <option value="Panel Upgrades" className="bg-slate-900">Panel Upgrades</option>
                        <option value="Electrical Repairs" className="bg-slate-900">Electrical Repairs</option>
                        <option value="Generator Installation" className="bg-slate-900">Generator Installation</option>
                        <option value="Emergency Services" className="bg-slate-900">Emergency Services</option>
                        <option value="Lighting Installation" className="bg-slate-900">Lighting Installation</option>
                        <option value="Commercial Services" className="bg-slate-900">Commercial Services</option>
                        <option value="Other" className="bg-slate-900">Other Service</option>
                      </select>
                    </div>
                  </div>

                  {newLeadType === 'booking' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-405 mb-1">Preferred Date</label>
                        <input
                          type="date"
                          value={newLeadDate}
                          onChange={(e) => setNewLeadDate(e.target.value)}
                          className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs focus:outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-405 mb-1">Preferred Time</label>
                        <input
                          type="text"
                          value={newLeadTime}
                          onChange={(e) => setNewLeadTime(e.target.value)}
                          placeholder="e.g. 09:00 AM"
                          className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs focus:outline-none text-white placeholder-slate-500"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-405 mb-1">Lead Details / Notes</label>
                    <textarea
                      value={newLeadDetails}
                      onChange={(e) => setNewLeadDetails(e.target.value)}
                      placeholder="Enter description of electrical issues, special instructions..."
                      rows={3}
                      className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-gold-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-navy-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    Log Lead
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Modal for Lead Details in Pipeline Mode */}
          {selectedLead && viewMode === 'pipeline' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy-950/65 backdrop-blur-sm p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-w-md w-full relative text-left text-white">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white focus:outline-none bg-slate-800 hover:bg-slate-750 p-1.5 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="space-y-5">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="font-extrabold text-lg font-display text-white">Lead Detail Card</h3>
                    <p className="text-xs text-slate-405 mt-0.5">Manage statuses and notes</p>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="font-bold text-white">{selectedLead.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="font-mono text-slate-250">{selectedLead.phone}</span>
                    </div>
                    {selectedLead.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-250">{selectedLead.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-slate-400" />
                      <span className="font-bold text-brand-gold-450">{selectedLead.service}</span>
                    </div>
                  </div>

                  {/* Status updates selectors */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-405 mb-2">Change Status</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {['New', 'Contacted', 'Scheduled', 'Completed'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleStatusUpdate(selectedLead.id, s)}
                          className={`py-1.5 px-2 rounded-xl text-[10px] font-bold text-center border transition-all ${
                            selectedLead.status === s
                              ? 'bg-brand-gold-500 border-brand-gold-500 text-brand-navy-950 shadow-sm'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo preview */}
                  {selectedLead.photoUrl && (
                    <div className="border border-slate-800 rounded-2xl overflow-hidden p-2 bg-slate-950">
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
                      <label className="block text-[10px] uppercase font-bold text-slate-405">Dispatcher Notes</label>
                      {updateSuccess && (
                        <span className="text-[9px] text-emerald-450 font-bold">Saved!</span>
                      )}
                    </div>
                    <textarea
                      value={editingNotes}
                      onChange={(e) => setEditingNotes(e.target.value)}
                      placeholder="Add scheduling notes or discount approvals..."
                      rows={3}
                      className="w-full bg-slate-850 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-gold-500 focus:outline-none"
                    ></textarea>
                    <button
                      onClick={() => handleSaveNotes(selectedLead.id)}
                      className="w-full bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-705 font-bold py-2 rounded-xl text-[10px] uppercase tracking-wide mt-2 transition-all"
                    >
                      Save Dispatch Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Calendar agenda list */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-sm">
            <h3 className="font-extrabold text-lg font-display text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-gold-500" />
              Calendar Agenda View
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.slice(0, 4).map((book) => (
                  <div key={book.id} className="bg-slate-800 border border-slate-705 p-4 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] bg-indigo-950/60 text-indigo-300 font-bold px-2 py-0.5 rounded-full border border-indigo-900/40">{book.time}</span>
                      <span className="text-[9px] text-slate-405 font-semibold">{book.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-100 text-xs line-clamp-1">{book.name}</h4>
                    <p className="text-[10px] text-brand-gold-450 font-semibold mt-1">{book.service}</p>
                    <p className="text-[9px] text-slate-405 mt-2 line-clamp-1">Notes: {book.notes || 'None'}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-6 text-center text-slate-500 text-xs">
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
