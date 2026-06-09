import React, { useState } from 'react';
import { servicesData } from '../data/services';
import { dbService } from '../lib/supabase';
import { Calendar, Clock, Upload, ArrowRight, ArrowLeft, CheckCircle2, User, Phone, Mail, FileText, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookingWidget: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    details: '',
    photo: null as string | null, // base64 representation
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate date slots (next 7 days starting tomorrow, excluding Sundays)
  const getDateSlots = () => {
    const slots = [];
    const today = new Date();
    for (let i = 1; i <= 8; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      if (futureDate.getDay() !== 0) { // Exclude Sunday
        const dayName = futureDate.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNum = futureDate.getDate();
        const monthName = futureDate.toLocaleDateString('en-US', { month: 'short' });
        const yyyyMmDd = futureDate.toISOString().split('T')[0];
        slots.push({ label: `${dayName}, ${monthName} ${dayNum}`, value: yyyyMmDd });
      }
    }
    return slots;
  };

  const timeSlots = [
    '08:00 AM',
    '10:00 AM',
    '12:00 PM',
    '02:00 PM',
    '04:00 PM',
  ];

  const handleServiceSelect = (val: string) => {
    setFormData({ ...formData, service: val });
    setErrors({ ...errors, service: '' });
    setStep(2);
  };

  const handleDateSelect = (val: string) => {
    setFormData({ ...formData, date: val });
    setErrors({ ...errors, date: '' });
  };

  const handleTimeSelect = (val: string) => {
    setFormData({ ...formData, time: val });
    setErrors({ ...errors, time: '' });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 2) {
      if (!formData.date) newErrors.date = 'Please select a preferred date.';
      if (!formData.time) newErrors.time = 'Please select a preferred time slot.';
    }
    if (step === 3) {
      if (!formData.details || formData.details.length < 10) {
        newErrors.details = 'Please describe your electrical job in at least 10 characters.';
      }
    }
    if (step === 4) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required.';
      if (!formData.phone.trim() || !/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number.';
      }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      await dbService.addLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        details: formData.details,
        photoUrl: formData.photo,
        type: 'booking'
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Fire confetti celebration
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl text-center flex flex-col items-center justify-center max-w-lg mx-auto min-h-[450px]">
        <div className="bg-emerald-500/10 text-emerald-600 p-4 rounded-full mb-6 relative">
          <CheckCircle2 className="w-16 h-16" />
          <Sparkles className="w-6 h-6 absolute -top-1 -right-1 text-brand-gold-500 animate-bounce" />
        </div>
        <h3 className="text-2.5xl font-black font-display text-brand-navy-900 tracking-tight mb-2">
          Booking Request Received!
        </h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          Thank you, <span className="font-bold text-slate-800">{formData.name}</span>. Our Alabama dispatcher has received your details for <span className="font-bold text-brand-navy-900">{formData.service}</span>. We will call you at <span className="font-bold text-slate-800">{formData.phone}</span> within 15 minutes to finalize your schedule.
        </p>

        {/* Receipt Details Card */}
        <div className="bg-slate-50 rounded-2xl p-5 w-full text-left text-xs text-slate-600 mb-8 border border-slate-100">
          <div className="flex justify-between py-1.5 border-b border-slate-200/50">
            <span>Requested Service:</span>
            <span className="font-bold text-brand-navy-900">{formData.service}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-200/50">
            <span>Preferred Date:</span>
            <span className="font-bold text-slate-800">{formData.date}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-200/50">
            <span>Preferred Time:</span>
            <span className="font-bold text-slate-800">{formData.time}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span>Status:</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Awaiting Dispatch Call
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setIsSuccess(false);
            setStep(1);
            setFormData({
              service: '',
              date: '',
              time: '',
              name: '',
              phone: '',
              email: '',
              details: '',
              photo: null,
            });
          }}
          className="bg-brand-navy-900 hover:bg-brand-navy-950 text-white font-bold px-6 py-3.5 rounded-xl w-full transition-all text-sm"
        >
          Book Another Service
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-2xl max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex-1 flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= s
                  ? 'bg-brand-gold-500 text-brand-navy-950 font-black scale-105'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {s}
            </div>
            {s < 4 && (
              <div
                className={`h-1 flex-1 mx-2 transition-all ${
                  step > s ? 'bg-brand-gold-500' : 'bg-slate-100'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Service */}
      {step === 1 && (
        <div>
          <h3 className="text-xl md:text-2xl font-black font-display text-brand-navy-900 mb-2">
            Select Your Needed Service
          </h3>
          <p className="text-slate-500 text-xs md:text-sm mb-6">
            Choose the service category that matches your electrical work.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
            {servicesData.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => handleServiceSelect(srv.title)}
                className={`flex flex-col text-left p-4 rounded-2xl border transition-all ${
                  formData.service === srv.title
                    ? 'border-brand-gold-500 bg-brand-gold-50/50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold text-brand-navy-900 text-sm">{srv.title}</span>
                <span className="text-[11px] text-slate-400 mt-1 line-clamp-1">{srv.shortDesc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Date & Time Picker */}
      {step === 2 && (
        <div>
          <h3 className="text-xl md:text-2xl font-black font-display text-brand-navy-900 mb-2">
            Select Date & Time Slot
          </h3>
          <p className="text-slate-500 text-xs md:text-sm mb-6">
            Select your preferred time. We will verify crew scheduling during our quick call.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-400 mb-3 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Preferred Date</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {getDateSlots().map((slot) => (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => handleDateSelect(slot.value)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      formData.date === slot.value
                        ? 'bg-brand-navy-900 border-brand-navy-900 text-white font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-xs uppercase font-bold tracking-tight">
                      {slot.label.split(',')[0]}
                    </span>
                    <span className="block text-sm font-extrabold mt-0.5">
                      {slot.label.split(',')[1]}
                    </span>
                  </button>
                ))}
              </div>
              {errors.date && <p className="text-red-500 text-xs mt-2">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-400 mb-3 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Preferred Time Slot</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSelect(time)}
                    className={`py-2 px-1 rounded-xl border text-center text-xs transition-all font-bold ${
                      formData.time === time
                        ? 'bg-brand-navy-900 border-brand-navy-900 text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {errors.time && <p className="text-red-500 text-xs mt-2">{errors.time}</p>}
            </div>
          </div>

          <div className="flex justify-between mt-8 border-t border-slate-100 pt-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 bg-brand-navy-900 hover:bg-brand-navy-950 text-white font-bold py-3 px-6 rounded-xl text-sm"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Photos & Job Details */}
      {step === 3 && (
        <div>
          <h3 className="text-xl md:text-2xl font-black font-display text-brand-navy-900 mb-2">
            Job Details & Photos
          </h3>
          <p className="text-slate-500 text-xs md:text-sm mb-6">
            Please tell us about your job. Uploading pictures of your panel, outlets, or broken fixtures helps us dispatch the right crew and parts!
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-400 mb-2 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Job Description</span>
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="E.g., Outlet sparked when plugging in a space heater, circuit was reset but now outlets on the same wall are completely dead..."
                rows={4}
                className={`w-full rounded-xl border p-4 text-sm focus:ring-2 focus:ring-brand-gold-500 focus:outline-none ${
                  errors.details ? 'border-red-500' : 'border-slate-200'
                }`}
              ></textarea>
              {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-400 mb-2 flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Job Photo (Optional)</span>
              </label>

              <div className="flex gap-4 items-center">
                <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-brand-gold-500 hover:bg-slate-50/50 rounded-2xl p-6 cursor-pointer transition-all">
                  <Upload className="w-6 h-6 text-slate-400 mb-2" />
                  <span className="text-xs font-bold text-slate-700">Click to upload photo</span>
                  <span className="text-[10px] text-slate-400 mt-1">JPG or PNG, max 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                {formData.photo && (
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 shadow-md shrink-0">
                    <img
                      src={formData.photo}
                      alt="Upload Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, photo: null })}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8 border-t border-slate-100 pt-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 bg-brand-navy-900 hover:bg-brand-navy-950 text-white font-bold py-3 px-6 rounded-xl text-sm"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Contact Details & Submission */}
      {step === 4 && (
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl md:text-2xl font-black font-display text-brand-navy-900 mb-2">
            Confirm Contact Information
          </h3>
          <p className="text-slate-500 text-xs md:text-sm mb-6">
            Enter your contact details so our local dispatcher can call you with our ETA.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-400 mb-2 flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className={`w-full rounded-xl border p-3.5 text-sm focus:ring-2 focus:ring-brand-gold-500 focus:outline-none ${
                  errors.name ? 'border-red-500' : 'border-slate-200'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-400 mb-2 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (205) 555-0100"
                  className={`w-full rounded-xl border p-3.5 text-sm focus:ring-2 focus:ring-brand-gold-500 focus:outline-none ${
                    errors.phone ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-400 mb-2 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.doe@gmail.com"
                  className={`w-full rounded-xl border p-3.5 text-sm focus:ring-2 focus:ring-brand-gold-500 focus:outline-none ${
                    errors.email ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-brand-navy-950 hover:brightness-110 font-bold py-3.5 px-8 rounded-xl text-sm disabled:opacity-50 transition-all shadow-lg active:scale-95"
            >
              {isSubmitting ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <span>Request Booking Slot</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
