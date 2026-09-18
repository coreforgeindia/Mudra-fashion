'use client';

import React, { useState } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Mail, Phone, MapPin, Send, CheckCircle2, Headphones } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    requirementType: 'Retail Enquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-[#FBF8F1] min-h-screen pb-20 pt-8">
      {/* Header */}
      <div className="bg-[#FFF9EF] text-[#212529] py-16 px-4 mb-12 border-b border-[#E8E0D0]">
        <div className="max-w-7xl mx-auto text-center">
          <ScrollReveal direction="down">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-[#C4A35A]">
              Get in Touch
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-[#212529]">
              Contact Mudra Fashions
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-xl mx-auto mt-2 font-light">
              Have questions regarding retail orders, B2B wholesale, uniform customization, or fabric swatches? Contact our team.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Contact Info Cards */}
          <div className="space-y-6">
            <div className="p-6 bg-[#FFF9EF] border border-[#E8E0D0] space-y-3 rounded-sm">
              <MapPin className="w-6 h-6 text-[#C4A35A]" />
              <h3 className="font-serif font-bold text-base text-[#212529]">Head Office &amp; Showroom</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Mudra Textile Hub, #42 Indiranagar 100ft Road, Commercial Complex, Bengaluru, KA 560038
              </p>
            </div>

            <div className="p-6 bg-[#FFF9EF] border border-[#E8E0D0] space-y-3 rounded-sm">
              <Phone className="w-6 h-6 text-[#7BA48E]" />
              <h3 className="font-serif font-bold text-base text-[#212529]">Phone Support</h3>
              <p className="text-xs text-[#6B7280]">Retail Desk: +91 (080) 4567-8900</p>
              <p className="text-xs text-[#6B7280]">Wholesale B2B Hotline: +91 98765-43210</p>
            </div>

            <div className="p-6 bg-[#FFF9EF] border border-[#E8E0D0] space-y-3 rounded-sm">
              <Mail className="w-6 h-6 text-[#8BB8D0]" />
              <h3 className="font-serif font-bold text-base text-[#212529]">Email Desks</h3>
              <p className="text-xs text-[#6B7280]">General: contact@mudrafashions.com</p>
              <p className="text-xs text-[#6B7280]">Bulk &amp; B2B: bulk@mudrafashions.com</p>
            </div>

            <div className="p-6 bg-[#FFF9EF] border border-[#E8E0D0] space-y-3 rounded-sm">
              <Headphones className="w-6 h-6 text-[#C4A35A]" />
              <h3 className="font-serif font-bold text-base text-[#212529]">Live Chat Support</h3>
              <p className="text-xs text-[#6B7280]">Mon–Sat: 9AM – 8PM IST</p>
              <p className="text-xs text-[#6B7280]">Response time: Under 30 minutes</p>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="p-8 bg-[#7BA48E]/10 border border-[#7BA48E]/30 text-center space-y-4 my-8 rounded-sm">
                <CheckCircle2 className="w-12 h-12 text-[#7BA48E] mx-auto" />
                <h3 className="font-serif font-bold text-2xl text-[#212529]">Message Sent Successfully!</h3>
                <p className="text-xs text-[#6B7280]">
                  Thank you for reaching out. Our team will get back to you within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#FFF9EF] border border-[#E8E0D0] p-8 shadow-lg space-y-6 rounded-sm">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#212529]">Send Us a Message</h3>
                  <p className="text-xs text-[#6B7280]">Fill in the requirement details below.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 border border-[#E8E0D0] bg-[#FBF8F1] focus:outline-none focus:border-[#C4A35A] rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 border border-[#E8E0D0] bg-[#FBF8F1] focus:outline-none focus:border-[#C4A35A] rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 border border-[#E8E0D0] bg-[#FBF8F1] focus:outline-none focus:border-[#C4A35A] rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#212529] mb-1">Requirement Type *</label>
                    <select
                      value={formData.requirementType}
                      onChange={(e) => setFormData({ ...formData, requirementType: e.target.value })}
                      className="w-full p-3 border border-[#E8E0D0] bg-[#FBF8F1] focus:outline-none focus:border-[#C4A35A] rounded-sm"
                    >
                      <option>Retail Order Enquiry</option>
                      <option>Wholesale B2B Account</option>
                      <option>Corporate Uniform Requirement</option>
                      <option>Fabric &amp; Textile Meterage</option>
                      <option>Bulk Custom Clothing</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-[#212529] mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="Brief title of your enquiry..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3 border border-[#E8E0D0] bg-[#FBF8F1] focus:outline-none focus:border-[#C4A35A] rounded-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-[#212529] mb-1">Message *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Details regarding your order or enquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 border border-[#E8E0D0] bg-[#FBF8F1] focus:outline-none focus:border-[#C4A35A] rounded-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C4A35A] text-white text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-2 hover:bg-[#A8893D] transition-colors rounded-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
