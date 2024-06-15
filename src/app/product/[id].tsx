import { Feather } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";

export default function Product() {
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const product = PRODUCTS.find((item) => item.id === id);

  if (!product) {
    return <Redirect href="/" />;
  }

  function handleAddToCart() {
    cartStore.add(product!);
    navigation.goBack();
  }

  return (
    <ScrollView className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-56"
        resizeMode="cover"
      />

      <View className="p-5 mt-8 flex-1">
        <Text className="text-white text-xl font-heading">{product.title}</Text>

        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient, index) => (
          <Text
            key={index}
            className="text-slate-400 font-body text-base leading-6"
          >
            {"\u2022"}
            {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Text>
            <Feather name="plus-circle" size={20} />
          </Button.Text>
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </ScrollView>
  );
}
