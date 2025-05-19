import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type StarsProps = {
  rating: number; // مثال: 4.5
  totalStars?: number; // عدد النجوم الكلي (default = 5)
  size?: number; // حجم النجوم (default = 20)
  color?: string; // اللون (default = #facc15 أصفر)
};

const Stars: React.FC<StarsProps> = ({
  rating,
  totalStars = 5,
  size = 20,
  color = "#facc15",
}) => {
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} size={size} color={color} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} size={size} color={color} />);
    } else {
      stars.push(<FaRegStar key={i} size={size} color={color} />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default Stars;
