/* eslint-disable @next/next/no-img-element */
import React from "react";

// ------------------- FIX 4: Add isLoading to the interface -------------------
interface JobProps {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  image: string;
  categories: string[];
  mode?: string;
  isBookmarked: boolean;
  isAuthenticated: boolean;
  onBookmarkToggle: () => void;
  isLoading: boolean; // This prop is new
}
// -----------------------------------------------------------------------------

const JobCard = ({
  title,
  company,
  description,
  location,
  image,
  categories,
  mode = "In Person",
  isBookmarked,
  isAuthenticated,
  onBookmarkToggle,
  // --- FIX 5: Get isLoading from props ---
  isLoading,
}: // -----------------------------------------
JobProps) => {
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isLoading) return; // Prevent clicks if already loading
    onBookmarkToggle();
  };

  return (
    <div className="flex w-full h-full gap-5 rounded-2xl p-4 transition relative">
      {isAuthenticated && (
        // ------------------- FIX 6: Use the isLoading state on the button -------------------
        <button
          onClick={handleBookmarkClick}
          disabled={isLoading} // Disable button when loading
          className={`absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors z-10 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "" // Add visual feedback
          }`}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {/* ... SVG remains the same ... */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill={isBookmarked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            color={isBookmarked ? "#4640DE" : "#A8ADB7"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
        // ------------------------------------------------------------------------------------
      )}

      {/* ... The rest of the JobCard JSX remains the same ... */}
      {image && (
        <div className="w-16 h-16 relative shrink-0">
          <img
            src={image}
            alt="company logo"
            className="object-cover rounded-full"
          />
        </div>
      )}

      <div className="flex flex-col">
        <h2 className="text-lg font-bold text-black">{title}</h2>
        <p className="text-sm text-gray-400">
          {company} &bull; {location}
        </p>
        <p className="text-sm text-black mt-1">{description}</p>

        <div className="flex gap-2 mt-2 flex-wrap">
          {mode && (
            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-[#56cdad]">
              {mode}
            </span>
          )}
          <p className="text-gray-300">|</p>
          {categories.map((cat, index) => {
            const style = getCategoryStyle(cat);
            return (
              <span
                key={index}
                className={`text-xs px-3 py-1 rounded-full border ${style.text} ${style.border}`}
              >
                {cat}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ... getCategoryStyle function remains the same ...
const fixedCategoryStyles: Record<string, { border: string; text: string }> = {
  education: {
    border: "border-[#FFB836]",
    text: "text-[#FFB836]",
  },
  it: {
    border: "border-[#4640DE]",
    text: "text-[#4640DE]",
  },
};
const colorPalette = [
  "text-[#3B82F6] border-[#3B82F6]",
  "text-[#10B981] border-[#10B981]",
  "text-[#EF4444] border-[#EF4444]",
  "text-[#F59E0B] border-[#F59E0B]",
  "text-[#6366F1] border-[#6366F1]",
  "text-[#EC4899] border-[#EC4899]",
];
const dynamicStyleCache = new Map<string, string>();
function getCategoryStyle(category: string) {
  const key = category.toLowerCase();
  if (fixedCategoryStyles[key]) {
    return fixedCategoryStyles[key];
  }
  if (dynamicStyleCache.has(key)) {
    const [text, border] = dynamicStyleCache.get(key)!.split(" ");
    return { text, border };
  }
  const randomIndex = Math.floor(Math.random() * colorPalette.length);
  const styleString = colorPalette[randomIndex];
  dynamicStyleCache.set(key, styleString);
  const [text, border] = styleString.split(" ");
  return { text, border };
}
// ...
export default JobCard;
