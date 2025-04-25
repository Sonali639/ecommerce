"use client";

import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";
import React, { useEffect, useState } from "react";

export interface LikeButtonProps {
  className?: string;
  liked?: boolean;
  id?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  className = "",
  liked = false,
  id,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [wishlistinfo, setWishlistinfo] = useState<any>(null);

  const handleLike = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    if (newLikedState) {
      // Only call API when liked is true (adding to wishlist)
      try {
        const res = await httpRequest({
          url: API.ADD_TO_WISHLIST,
          method: "POST",
          params: {
            product_id: id,
          },
        });
        console.log("wishlist res", res);
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    } else {
      // (Optional) You can also add remove-from-wishlist API here
      console.log("Unliked - call remove from wishlist API here if needed");
      try {
        const res = await httpRequest({
          url: `${API.ADD_TO_WISHLIST}/${id}`,
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }

    }
  };

  const wishlist = async () => {
    try {
      const response = await httpRequest({
        url: API.ADD_TO_WISHLIST,
        method: "GET",
      });
      console.log("wishlist res", response);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  useEffect(() => {
  
  wishlist();
  }, []);

  return (
    <button
      className={`w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 nc-shadow-lg ${className}`}
      onClick={handleLike}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
          stroke={isLiked ? "#ef4444" : "currentColor"}
          fill={isLiked ? "#ef4444" : "none"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default LikeButton;
