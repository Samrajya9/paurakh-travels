import React, { useState } from "react";
import { Icon } from "../page";
import { Button } from "@/components/ui/button";

interface BookingSidebarProps {
  className?: string;
}

const BookingSidebar: React.FC<BookingSidebarProps> = ({ className }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (<>
    {/* Desktop sticky sidebar container */}
          <aside className={`hidden lg:block w-80 xl:w-[340px] flex-shrink-0 ${className}`}>
            <div className="sticky top-6 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400 line-through">US $2799</span>
                  <span className="text-xs font-bold bg-[#E63946]/10 text-[#E63946] px-2 py-0.5 rounded-full border border-[#E63946]/20">
                    500 OFF
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-[#E63946]">US $2299</span>
                  <span className="text-sm text-gray-500">per person</span>
                </div>
              </div>
    
              <ul className="px-6 py-4 space-y-2.5 border-b border-gray-100">
                {["Book Instantly Directly with Provider", "Best Price guarantee", "Fully Customizable Trip", "Extend Trip Without Any Charges"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-[#E63946] flex-shrink-0 mt-0.5">
                      <Icon.Check />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
    
              <div className="px-6 py-5 space-y-3">
                {/* <button className="w-full bg-primary hover:bg-[#c8303c] active:scale-[0.98] text-white font-semibold py-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:ring-offset-2 text-sm">
                  Check Availability
                </button> */}
                <Button className='w-full py-3'>Check Availability </Button>
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="w-full border border-gray-300 hover:border-[#E63946] hover:text-[#E63946] text-gray-800 font-semibold py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#E63946] text-sm"
                >
                  Make An Enquiry
                </button>
              </div>
    
              <div className="px-6 pb-6">
                <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
                  <p className="text-sm font-semibold text-gray-900">
                    Need Help? <em className="font-normal text-gray-500 not-italic">Ask the trip expert</em>
                  </p>
                  <a href="tel:+9779851005129" className="flex items-center gap-2 text-[#E63946] text-sm font-medium hover:underline">
                    <Icon.Phone /> +977 9851005129
                    <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">WA</span>
                  </a>
                  <a href="mailto:info@luxuryholidaynepal.com" className="flex items-center gap-2 text-[#E63946] text-sm font-medium hover:underline">
                    <Icon.Mail /> info@luxuryholidaynepal.com
                  </a>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    *Travel pros with <strong className="text-gray-700">13+ years of experience</strong> — let&apos;s plan your trip!
                  </p>
                </div>
              </div>
            </div>
          </aside>
    
          {/* Mobile sticky bottom bar */}
          <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3 shadow-2xl">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 line-through leading-none mb-0.5">US $2799</p>
              <p className="text-lg font-extrabold text-[#E63946] leading-none">
                US $2299 <span className="text-xs font-normal text-gray-500">/ person</span>
              </p>
            </div>
            <button className="bg-[#E63946] hover:bg-[#c8303c] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#E63946] whitespace-nowrap">
              Check Availability
            </button>
            <button
              onClick={() => setEnquiryOpen(true)}
              className="border border-gray-300 text-gray-700 font-semibold px-4 py-2.5 rounded-xl text-sm hover:border-[#E63946] hover:text-[#E63946] transition-colors whitespace-nowrap"
            >
              Enquire
            </button>
          </div>
    
          {/* Enquiry modal */}
          {enquiryOpen && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Make an enquiry"
              className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4"
              onClick={() => setEnquiryOpen(false)}
            >
              <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Make an Enquiry</h3>
                  <button onClick={() => setEnquiryOpen(false)} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                    <Icon.Close />
                  </button>
                </div>
                <div className="space-y-3">
                  {["Full Name", "Email Address", "Phone Number"].map((field) => (
                    <div key={field}>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">{field}</label>
                      <input type="text" placeholder={field} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent" />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Message</label>
                    <textarea rows={3} placeholder="Tell us about your travel plans..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] resize-none" />
                  </div>
                </div>
                <button className="w-full bg-[#E63946] hover:bg-[#c8303c] text-white font-semibold py-3 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#E63946]">
                  Send Enquiry
                </button>
              </div>
            </div>
          )}
  </>

  )
}

export default BookingSidebar