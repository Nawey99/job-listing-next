import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface JobProps {
    id: number;
    title: string;
    company: string;
    description: string;
    location: string;
    image: string;
    categories: string[];
    mode?: string;
}

// Predefined styles for specific categories
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

// Color palette for dynamic category styles
const colorPalette = [
    "#3B82F6", // blue
    "#10B981", // green
    "#EF4444", // red
    "#F59E0B", // amber
    "#6366F1", // indigo
    "#EC4899", // pink
    "#14B8A6", // teal
    "#8B5CF6", // violet
    "#F43F5E", // rose
    "#22D3EE", // cyan
];

// Cache to store consistent random colors per category
const dynamicStyleCache = new Map<string, { border: string; text: string }>();

function getCategoryStyle(category: string) {
  const key = category.toLowerCase();

  // Use predefined styles for fixed categories
  if (fixedCategoryStyles[key]) {
    return fixedCategoryStyles[key];
  }

  // If the style was already cached, return it
  if (dynamicStyleCache.has(key)) {
    return dynamicStyleCache.get(key)!;
  }

  // Pick a truly random color from the palette
  const randomIndex = Math.floor(Math.random() * colorPalette.length);
  const color = colorPalette[randomIndex];

  // Cache and return the new random style
  const style = {
    border: `border-[${color}]`,
    text: `text-[${color}]`,
  };
  dynamicStyleCache.set(key, style);
  return style;
}


const JobCard = ({
    id,
    title,
    company,
    description,
    location,
    image,
    categories,
    mode = "In Person",
}: JobProps) => {
    return (
        <Link
            href={`/jobs/${id}`}
            className="flex w-full h-full gap-5  rounded-2xl p-4 transition"
        >
            {/* Responsive, circular image */}
            <div className="w-16 h-16 relative shrink-0">
                <Image
                    src={image}
                    alt="company logo"
                    fill
                    className="object-cover rounded-full"
                />
            </div>

            <div className="flex flex-col">
                <h2 className="text-lg font-bold text-black">{title}</h2>
                <p className="text-sm text-gray-400">{company} &bull; {location}</p>
                <p className="text-sm text-black mt-1">{description}</p>

                {/* Tags */}
                <div className="flex gap-2 mt-2 flex-wrap">
                    {mode === "In Person" && (
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
                                className="text-xs px-3 py-1 rounded-full border"
                                style={{
                                    color: style.text.replace("text-[", "").replace("]", ""),
                                    borderColor: style.border.replace("border-[", "").replace("]", ""),
                                }}
                            >
                                {cat}
                            </span>

                        );
                    })}
                </div>
            </div>
        </Link>
    );
};

export default JobCard;
