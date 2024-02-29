import { Image, Text, View } from "react-native";

import { useLocalSearchParams, useNavigation } from "expo-router";

import { Feather } from "@expo/vector-icons";

import { Redirect } from "expo-router";

import { useCartStore } from "@/stores/cart-store";

import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { Rating } from "@/components/rating";

export default function Product() {
  const navigation = useNavigation();
  const cartStore = useCartStore();

  const { id } = useLocalSearchParams();

  const product = PRODUCTS.find((item) => item.id === id);

  function handleAddToCart() {
    if (product) {
      cartStore.add(product);

      navigation.goBack();
    }
  }

  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className="p-5 mt-2 flex-1">
        <View className="flex-row justify-between">
          <Text className="text-white text-xl font-heading">
            {product.title}
          </Text>
          <Rating stars={product.rating} />
        </View>

        <Text className="text-lime-400 text-2xl font-heading">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text
            key={ingredient}
            className="text-slate-400 font-body text-base leading-6"
          >
            {"\u2022"} {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-5 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
