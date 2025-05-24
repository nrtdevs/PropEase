import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import OtpInput from "@/components/OtpInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { labels } from "@/constants/Labels";
import { useTheme } from "@/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { ms, ScaledSheet, vs } from "react-native-size-matters";

const LoginCodeScreen = () => {
  const { theme } = useTheme();
  const [otp, setOtp] = useState("123456");
  const params = useLocalSearchParams();

  const handleOtpFilled = (code: string) => {
    setOtp(code);
    console.log(code);
  };


  const onSubmit = async () => {
    router.push("/(drawer)/(tabs)");
  };

  return (
    <CustomHeader
      leftComponent={
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={ms(34)}
            color={Colors[theme].text}
            onPress={() => router.back()}
          />
          <ThemedText style={styles.headerLeft}>{labels?.loginCode}</ThemedText>
        </View>
      }
    >
      <ThemedView style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ marginVertical: vs(20) }}>
            <ThemedText style={{ textAlign: "center" }} type="title">
              {labels?.enterCode}
            </ThemedText>
            <ThemedText style={{ textAlign: "center", fontSize: ms(14) }}>
              {labels?.enterCodeMsg}
            </ThemedText>
          </View>
          <OtpInput
            codeLength={6}
            onCodeFilled={(code: any) => {
              handleOtpFilled(code);
            }}
            // error={verifyState?.error?.message ? true : false}
            error={false}
            setError={(value: any) => { }}
            errorMessage={labels?.errorMessage}
            defaultValue={otp}
          />
        </View>

        <CustomButton
          titleStyle={{ color: Colors?.white }}
          // isLoading={verifyState?.loading}
          title={labels?.confirm}
          isGradient
          onPress={onSubmit}
        />
      </ThemedView>
    </CustomHeader>
  );
};

const styles = ScaledSheet.create({
  headerLeft: {
    fontSize: "18@ms",
    fontWeight: 500,
    textAlign: "center",
  },
  container: {
    paddingHorizontal: "12@ms",
    paddingVertical: "20@ms",
    gap: "20@ms",
    flex: 1,
    justifyContent: "space-between",
  },
});

export default LoginCodeScreen;