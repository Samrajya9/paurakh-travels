import React, { useState } from "react";
import PackageTitle from "./package_title";
import { Icon } from "../page";
import StarRating from "./package_rating";
import PackageImage from "./package_image";

interface PackageHeroProps {
  title: string; 
  rating: number;
  reviewCount: number;
}

const MOCK_IMAGES = [
  { src: "https://plus.unsplash.com/premium_photo-1673240367277-e1d394465b56?q=80&w=1169&auto=format&fit=crop", alt: "Trekkers at Everest viewpoint" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop", alt: "Himalayan panorama" },
  { src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1176&auto=format&fit=crop", alt: "Luxury mountain lodge" },
  { src: "https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?q=80&w=1170&auto=format&fit=crop", alt: "Helicopter over Everest" },
  { src: "https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?q=80&w=1170&auto=format&fit=crop", alt: "Helicopter over Everest" },
  { src: "https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?q=80&w=1170&auto=format&fit=crop", alt: "Helicopter over Everest" },
  { src: "https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?q=80&w=1170&auto=format&fit=crop", alt: "Helicopter over Everest" },

];

const PackageHero: React.FC<PackageHeroProps> = ({title, rating, reviewCount }) => {
  const [shareToast, setShareToast] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch { }
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  return (
    <section className="space-y-4 w-full mb-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <PackageTitle title={title} />
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleShare}
            className="relative flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#E63946] border border-gray-200 hover:border-[#E63946] px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#E63946]"
          >
            <Icon.Share /> Share
            {shareToast && (
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap shadow-lg">
                Link copied!
              </span>
            )}
          </button>
          <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#E63946] border border-gray-200 hover:border-[#E63946] px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#E63946]">
            <Icon.Doc /> Get Brochure
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <StarRating rating={rating} />
        <span className="bg-[#E63946] text-white text-xs font-bold px-2 py-0.5 rounded-md">{rating.toFixed(1)}</span>
        <span className="text-sm text-gray-500">
          Based on <button className="text-[#E63946] hover:underline font-medium focus:outline-none">{reviewCount} reviews</button>
        </span>
      </div>


      <PackageImage data={MOCK_IMAGES} />
    </section>
  );
};

export default PackageHero;