import React from "react";
import { View, Text } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

type RatingProps = {
  stars: number;
};

export const Rating = ({ stars }: RatingProps) => {
  const fullStars = Math.floor(stars);
  const remainder = stars % 1;

  let halfStarVisible = false;

  if (remainder >= 0.5) {
    halfStarVisible = true;
  }
  const emptyStars = 5 - fullStars - (halfStarVisible ? 1 : 0);

  const renderFullStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesome key={i} name="star" size={18} color={colors.yellow[300]} />
      );
    }
    return stars;
  };

  const renderHalfStar = () => {
    if (halfStarVisible) {
      return (
        <FontAwesome
          name="star-half-full"
          size={18}
          color={colors.yellow[300]}
        />
      );
    }
    return null;
  };

  const renderEmptyStars = () => {
    const stars = [];
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name="star-o"
          size={18}
          color={colors.yellow[300]}
        />
      );
    }
    return stars;
  };

  return (
    <View className="items-center">
      <View className="gap-1 flex-row">
        {renderFullStars()}
        {renderHalfStar()}
        {renderEmptyStars()}
      </View>
      <Text className="text-white font-subtitle text-sm">{stars} / 5.0</Text>
    </View>
  );
};
