import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { Product } from "@/components/product";

import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";

export default function Cart() {
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const [address, setAddress] = useState("");

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ),
  );

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert(
      "Remover produto",
      `Deseja remover ${product.title} do carrinho?`,
      [
        {
          text: "Cancelar",
        },
        {
          text: "Remover",
          onPress: () => cartStore.remove(product.id),
        },
      ],
    );
  }

  function handleSendOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido inválido", "Informe os dados da entrega.");
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join("");

    const message = `
    🍔 NOVO PEDIDO

    \n Entregar em: ${address}

    ${products}

    \n Valor Total: ${total}`;

    // Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`);

    cartStore.clear();
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-8 px-2">
      <Header title="Seu Carinho" />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        {cartStore.products.length > 0 ? (
          <ScrollView className="border-b border-slate-700">
            {cartStore.products.map((product) => (
              <Product
                key={product.id}
                data={product}
                onPress={() => handleProductRemove(product)}
              />
            ))}
          </ScrollView>
        ) : (
          <Text className="font-body text-slate-400 text-center my-8">
            Seu carrinho está vazio.
          </Text>
        )}
      </KeyboardAwareScrollView>

      <View className="bottom-0">
        <View className="flex-row gap-2 items-center my-2">
          <Text className="text-white text-lg font-subtitle">Total: </Text>
          <Text className="text-lime-400 text-xl font-heading">{total}</Text>
        </View>

        <Input
          placeholder="Informe o endereço de entrega com rua, bairro, número, CEP e complemento..."
          onChangeText={setAddress}
          blurOnSubmit={true}
          onSubmitEditing={handleSendOrder}
          returnKeyType="next"
        />

        <View className="p-5 gap-5">
          <Button onPress={handleSendOrder}>
            <Button.Text>Enviar pedido</Button.Text>
            <Button.Icon>
              <Feather name="arrow-right-circle" size={20} />
            </Button.Icon>
          </Button>

          <LinkButton title="Voltar ao cardápio" href="/" />
        </View>
      </View>
    </View>
  );
}
