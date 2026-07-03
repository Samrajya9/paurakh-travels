import React from "react";
import { Icon } from "../page";

interface StarRatingProps {
  rating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating = 0 }) => {
  return (
    <div className="flex items-center gap-[1px]">
      {[1, 2, 3, 4, 5].map((s) => (
        <Icon.Star key={s} filled={s <= Math.round(rating)} />
      ))}
    </div>
  );
};

export default StarRating;