import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomValidation from "@/components/CustomValidation";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";

// Define form data types
interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const { theme } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "admin@newrise.in",
      password: "Password@123",
    },
  });
  const onSubmit = async (data: any) => {
    router.push('/otp')
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
          {/* login Text for silicon bricks */}
          <View>
            <ThemedText type="title" style={styles.title}>
              Login Account
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.subtitle}>
              Log in to your account to continue
            </ThemedText>
          </View>

          <View style={styles.form}>
            <CustomValidation
              type="input"
              control={control}
              labelStyle={styles.label}
              name="email"
              inputStyle={[{ lineHeight: ms(20) }]}
              label="Email/Username"
              placeholder="Enter your email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              }}
              keyboardType="email-address"
              autoCapitalize="none"
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
              label={"Password"}
              placeholder={"Enter your password"}
              labelStyle={styles.label}
              secureTextEntry={!passwordVisible}
              containerStyle={[
                {
                  borderRadius: ms(20),
                },
                isFocused == "password"
                  ? { borderColor: Colors[theme].text, borderWidth: 1 }
                  : {},
              ]}
              onFocus={() => setIsFocused("password")}
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
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
            />

            {/* Forgot Password */}
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <TouchableOpacity onPress={() => router.push("/forgotpassword2")}>
                <ThemedText
                  style={[styles.forgotPassword, { color: Colors.grayText }]}
                >
                  Forgot Password
                </ThemedText>
              </TouchableOpacity>
            </View>
            <View />

            {/* Login Button */}
            <CustomButton
              title="Login"
              // isLoading={createRequestState?.loading}
              onPress={handleSubmit(onSubmit)}
              isGradient
            />

            {/* Footer */}
            <View style={styles.footerText}>
              <ThemedText type="defaultSemiBold" style={styles.footerText}>
                Don't have an account?
              </ThemedText>
              <Pressable onPress={() => router.push("/signup2")}>
                <ThemedText
                  style={[
                    styles.linkText,
                    { fontSize: ms(14), color: "#155B8E" },
                  ]}
                >
                  Sign Up
                </ThemedText>
              </Pressable>
            </View>


          </View>
        </View>
      </ScrollView>
    </CustomHeader>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    padding: "12@ms",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: "10@vs",
    gap: "8@ms",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: "32@ms",
  },
  subtitle: {
    fontSize: "18@ms",
    marginBottom: "32@ms",
  },
  form: {
    gap: "10@vs",
  },
  label: {
    color: Colors.grayText,
    fontSize: "14@ms",
    marginBottom: "12@ms",
    fontWeight: 400,
  },
  input: {
    borderRadius: "18@ms",
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    width: "100%",
    padding: "16@ms",
    fontSize: "16@ms",
    fontWeight: 500,
  },
  eyeButton: {
    position: "absolute",
    right: "16@ms",
  },
  forgotPassword: {
    color: Colors.grayText,
    textAlign: "right",
    fontSize: "14@ms",
    fontFamily: "medium",
  },
  socialLogin: {
    marginTop: "10@ms",
    width: "100%",
  },
  footerText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: "5@vs",
    textDecorationLine: "underline",
    fontWeight: 600,
    textAlign: "center",
    fontFamily: "bold",
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "55%",
    height: "28%",
    borderRadius: 20,
    position: "relative",
    marginHorizontal: 'auto',
  },
});
