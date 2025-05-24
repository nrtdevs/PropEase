import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomValidation from "@/components/CustomValidation";
import OtpInput from "@/components/OtpInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { labels } from "@/constants/Labels";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import Modal from "react-native-modal";
import { ms, ScaledSheet, vs } from "react-native-size-matters";

// Define form data types
interface SignUpFormData {
  name: string;
  organization: string;
  email: string;
  password: string;
}

export default function signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState("123456");

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({ mode: "onBlur" });

  const onSubmit = async (data: SignUpFormData) => {
  };

  const optSubmit = () => {
    const params = {
      email: watch("email"),
      emailOTP: Number(otp),
      name: watch("name"),
      organizationName: watch("organization"),
      password: watch("password"),
    }
    console.log("9999", typeof params.emailOTP);
    console.log('098', params);
  }

  const handleOtpFilled = (code: string) => {
    setOtp(code);
    console.log(code);
  };

  return (
    <CustomHeader>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: Colors[theme].background },
        ]}
      >
        <View style={styles.content}>
          {/* signup text  */}
          <View>
            <ThemedText type="title" style={styles.title}>
              Welcome to PropEase
            </ThemedText>
            <ThemedText type="title" style={styles.subtitle}>
              Create a new PropEase account
            </ThemedText>
          </View>

          {/* signup form */}
          <View style={styles.form}>

            <CustomValidation
              type="input"
              control={control}
              name="name"
              label={labels.name}
              placeholder={"Name"}
              rules={{
                required: "Name is required",
              }}
            />

            <CustomValidation
              type="input"
              control={control}
              name="organization"
              label={labels.organization}
              placeholder={"Organization"}
              rules={{
                required: "Organization is required",
              }}
            />

            <CustomValidation
              type="input"
              control={control}
              name="email"
              label={`${labels.email}/${labels.username}`}
              placeholder={`${labels.enterEmail}/${labels.username}`}
              rules={{
                required: labels.emailIsRequired,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: labels.enterAValidEmail,
                },
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setIsFocused("email")}
              containerStyle={[
                {
                  borderRadius: ms(20),
                },
                isFocused == "email"
                  ? { borderColor: Colors[theme].text, borderWidth: 1 }
                  : {},
              ]}
            />

            <CustomValidation
              type="input"
              control={control}
              name="password"
              onFocus={() => setIsFocused("password")}
              label={labels.password}
              placeholder={labels.enterPassword}
              secureTextEntry={!passwordVisible}
              containerStyle={[
                {
                  borderRadius: ms(20),
                },
                isFocused == "password"
                  ? { borderColor: Colors[theme].text, borderWidth: 1 }
                  : {},
              ]}
              rightIcon={
                <Pressable
                  style={styles.eyeButton}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Ionicons
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={ms(25)}
                    color="#666"
                  />
                </Pressable>
              }
              rules={{
                required: labels.passwordIsRequired,
                minLength: {
                  value: 8,
                  message: labels?.passwordLength,
                },
              }}
            />

            <View style={{ height: vs(20) }} />
            <CustomButton
              title={labels?.signUp}
              onPress={handleSubmit(onSubmit)}
              isGradient
            />
          </View>

          {/* footer  */}
          <View style={styles.footer}>
            <ThemedText type="defaultSemiBold" style={styles.footerText}>
              {labels.alreadyHaveAccount}
              <Pressable onPress={() => router.dismissTo("/login")}>
                <Text
                  style={[
                    styles.linkText,
                    { fontSize: ms(14), color: "#155B8E" },
                  ]}
                >
                  {labels.signIn}
                </Text>
              </Pressable>
            </ThemedText>
          </View>
        </View>
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setOtp("");
          setModalVisible(false);
        }}
      >
        <ThemedView style={[styles.modalContainer, { backgroundColor: Colors[theme].cart }]}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ marginVertical: vs(20) }}>
              <ThemedText style={{ textAlign: "center" }} type="title">
                {labels?.enterCode}
              </ThemedText>
              <ThemedText style={{ textAlign: "center", fontSize: ms(14) }}>
                Enter 6 digit code
              </ThemedText>
            </View>
            <OtpInput
              codeLength={6}
              onCodeFilled={(code: any) => {
                handleOtpFilled(code);
              }}
              // error={error?.message ? true : false}
              error={false}
              setError={(value: any) => { }}
              errorMessage={labels?.errorMessage}
              defaultValue={otp}
            />
          </View>

          <CustomButton
            titleStyle={{ color: Colors?.white }}
            // isLoading={loading}
            title={labels?.confirm}
            isGradient
            onPress={optSubmit}
          />
        </ThemedView>
      </Modal>


    </CustomHeader>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1A1A1A",
    padding: "12@ms",
    paddingBottom: "10@vs",
  },
  modalContainer: {
    paddingHorizontal: "12@ms",
    paddingVertical: "20@ms",
    gap: "20@ms",
    height: "300@vs",
    width: "100%",
    // flex: 1,
    borderRadius: "10@ms",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: "32@ms",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: "19@ms",
    marginBottom: "32@ms",
  },
  form: {
    gap: 8,
  },
  eyeButton: {
    //  padding: "5@ms",
  },
  footer: {
    alignItems: "center",
    width: "100%",
    marginTop: "10@vs",
  },
  footerText: {
    fontSize: "14@ms",
    fontWeight: "600",
  },
  linkText: {
    color: "#155B8E",
    textDecorationLine: "underline",
    fontWeight: "600",
    top: "2@vs",
    left: "2@ms",
    fontFamily: "bold",
  },
});
