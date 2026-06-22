"use client"
import React, { useState } from "react"
import { Icon } from "../page"
import { Button } from "@/components/ui/button"

interface BookingSidebarProps {
  className?: string
}

const BookingSidebar: React.FC<BookingSidebarProps> = ({ className }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  return (
    <>
      {/* Desktop sticky sidebar container */}
      <aside
        className={`hidden w-80 flex-shrink-0 lg:block xl:w-[340px] ${className}`}
      >
        <div className="sticky top-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          <div className="border-b border-gray-100 px-6 pt-6 pb-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-gray-400 line-through">
                US $2799
              </span>
              <span className="rounded-full border border-[#E63946]/20 bg-[#E63946]/10 px-2 py-0.5 text-xs font-bold text-[#E63946]">
                500 OFF
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-[#E63946]">
                US $2299
              </span>
              <span className="text-sm text-gray-500">per person</span>
            </div>
          </div>

          <ul className="space-y-2.5 border-b border-gray-100 px-6 py-4">
            {[
              "Book Instantly Directly with Provider",
              "Best Price guarantee",
              "Fully Customizable Trip",
              "Extend Trip Without Any Charges",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="mt-0.5 flex-shrink-0 text-[#E63946]">
                  <Icon.Check />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="space-y-3 px-6 py-5">
            {/* <button className="w-full bg-primary hover:bg-[#c8303c] active:scale-[0.98] text-white font-semibold py-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:ring-offset-2 text-sm">
                  Check Availability
                </button> */}
            <Button className="w-full py-3">Check Availability </Button>
            <button
              onClick={() => setEnquiryOpen(true)}
              className="w-full rounded-xl border border-gray-300 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-[#E63946] hover:text-[#E63946] focus:ring-2 focus:ring-[#E63946] focus:outline-none"
            >
              Make An Enquiry
            </button>
          </div>

          <div className="px-6 pb-6">
            <div className="space-y-2.5 rounded-xl bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-900">
                Need Help?{" "}
                <em className="font-normal text-gray-500 not-italic">
                  Ask the trip expert
                </em>
              </p>
              <a
                href="tel:+9779851005129"
                className="flex items-center gap-2 text-sm font-medium text-[#E63946] hover:underline"
              >
                <Icon.Phone /> +977 9851005129
                <span className="rounded bg-green-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  WA
                </span>
              </a>
              <a
                href="mailto:info@luxuryholidaynepal.com"
                className="flex items-center gap-2 text-sm font-medium text-[#E63946] hover:underline"
              >
                <Icon.Mail /> info@luxuryholidaynepal.com
              </a>
              <p className="text-xs leading-relaxed text-gray-500">
                *Travel pros with{" "}
                <strong className="text-gray-700">
                  13+ years of experience
                </strong>{" "}
                — let&apos;s plan your trip!
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-gray-200 bg-white px-4 py-3 shadow-2xl lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-xs leading-none text-gray-400 line-through">
            US $2799
          </p>
          <p className="text-lg leading-none font-extrabold text-[#E63946]">
            US $2299{" "}
            <span className="text-xs font-normal text-gray-500">/ person</span>
          </p>
        </div>
        <button className="rounded-xl bg-[#E63946] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#c8303c] focus:ring-2 focus:ring-[#E63946] focus:outline-none">
          Check Availability
        </button>
        <button
          onClick={() => setEnquiryOpen(true)}
          className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-gray-700 transition-colors hover:border-[#E63946] hover:text-[#E63946]"
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
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
          onClick={() => setEnquiryOpen(false)}
        >
          <div
            className="w-full space-y-4 rounded-t-2xl bg-white p-6 sm:max-w-md sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                Make an Enquiry
              </h3>
              <button
                onClick={() => setEnquiryOpen(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <Icon.Close />
              </button>
            </div>
            <div className="space-y-3">
              {["Full Name", "Email Address", "Phone Number"].map((field) => (
                <div key={field}>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    {field}
                  </label>
                  <input
                    type="text"
                    placeholder={field}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-[#E63946] focus:outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your travel plans..."
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#E63946] focus:outline-none"
                />
              </div>
            </div>
            <button className="w-full rounded-xl bg-[#E63946] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c8303c] focus:ring-2 focus:ring-[#E63946] focus:outline-none">
              Send Enquiry
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default BookingSidebar
