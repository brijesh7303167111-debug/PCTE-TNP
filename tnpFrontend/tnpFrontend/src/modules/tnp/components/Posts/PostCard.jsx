import React, { useState } from 'react';

const PostCard = ({ post }) => {
  const {
    companyName,
    dateOfDrive,
    role,
    time,
    venue,
    description,
    jdLink,
    applyLink,
  } = post;

  const date = new Date(dateOfDrive);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const formattedDate = `${day}--${month}--${year}`;

  // console.log({post})
console.log({jdLink})
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 100;

  return (
    <div className="flex flex-col justify-between border border-gray-300 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-4 min-w-[280px] max-w-md mx-auto">
      {/* Title */}
      <h2 className="text-xl font-semibold text-[#9B1C1C] line-clamp-1">{companyName}</h2>

      {/* Info */}
      <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p><span className="font-semibold text-black">📅 Roles:</span> {role}</p>
        <p><span className="font-semibold text-black">📅 Date:</span> {formattedDate}</p>
        <p><span className="font-semibold text-black">⏰ Time:</span> {time}</p>
        <p><span className="font-semibold text-black">📍 Venue:</span> {venue}</p>
      </div>

      {/* Description */}
      <div className="mt-3 text-sm text-gray-600">
        <p>
          {isExpanded ? description : `${description.slice(0, MAX_LENGTH)}${description.length > MAX_LENGTH ? '...' : ''}`}
        </p>
        {description.length > MAX_LENGTH && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#9B1C1C] font-medium text-xs mt-1"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
        
          <a
            href={jdLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm bg-[#9B1C1C] text-white rounded-xl hover:opacity-90 transition"
          
           >
             {jdLink ? (
  <button onClick={() => window.open(post.jdLink, "_blank")}>Open PDF</button>
) : (
  <span>No PDF available</span>
)}
           
          </a>
        
       

          <a
            href={applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm bg-[#9B1C1C] text-white rounded-xl hover:opacity-90 transition"
          >
            🚀 Apply
          </a>
       
      </div>
    </div>
  );
};

export default PostCard;
