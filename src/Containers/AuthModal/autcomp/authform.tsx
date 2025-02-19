"use client"
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ChevronRight,
  ChevronLeft,
  Mail,
  Lock,
  User,
  Phone,
} from "lucide-react";
import { sendOTP, verifyOtp } from "@/app/actions/otp/actions";
import { signIn } from "next-auth/react";
import { findUser } from "@/app/actions/user/actions";
import { Turnstile } from "@marsidev/react-turnstile"; // Adjust the import path as necessary
import toast from "react-hot-toast";
type SignInData = {
  number: number;
  password?: string;
  otp?: string;
};

type SignUpData = {
  number: number;
  name: string;
  phoneNumber: string;
  otp: string;
  password: string;
  mode: string;
  type: string;
};

const fadeInOut = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 },
};

interface ModernAuthFormProps {
  onAuthSuccess: () => void;
  type: string;
}

export function ModernAuthForm({ onAuthSuccess, type }: ModernAuthFormProps) {
  const [formType, setFormType] = useState<"signup" | "signin">("signin");
  const [signInMethod, setSignInMethod] = useState<"password" | "otp">(
    "password"
  );
  const [signUpStep, setSignUpStep] = useState(1);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [token, setToken] = useState("");
  const { register, watch } = useForm();
  const [isotpverfied, setOtpverified] = useState(false);
  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    watch: signINwatch,
  } = useForm<SignInData>();
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    watch: signupWatch,
  } = useForm<SignUpData>();
  const phoneNumber = signupWatch("phoneNumber");
  const otp = signupWatch("otp");
  const onSignIn = async (data: SignInData) => {
    const Signuptoast = toast.loading("signing...")
    const response = await signIn("credentials", {
      mode: "signin",
      number: data.number,
      type: type,
      password: data.password,
      step: signInMethod,
      otp: data.otp,
      redirect: false,
    });
    
    if (response) toast.success("signin-successfully",{id:Signuptoast});

    onAuthSuccess();
  };

  //Sign-up function
  const onSignUp = async (data: SignUpData) => {
   const Signuptoast = toast.loading("sign-up")
    const response = await signIn("credentials", {
      number: data.phoneNumber,
      name: data.name,
      password: data.password,
      mode: "signup",
      type: type,
      isAdmin: type === "ADMIN" ? true : false,
      redirect: false,
    });
    if (!response)   toast.error("signup successfully",{id : Signuptoast});
       toast.success("signup successfully",{id : Signuptoast});
    toast.error("signup failed");
    onAuthSuccess();
  };

  const sendOtp = async (e: any) => {
    // Implement OTP sending logic here
    try {
      
      await sendOTP(phoneNumber, token);
      toast.success("OTP SENT");
      e.preventDefault();
    } catch (error) {
      console.log("not sent", error);
    }

    setIsOtpSent(true);
  };
  useEffect(() => {
    const verify = async () => {
      if (otp) {
      const verify = await verifyOtp(phoneNumber, otp);

      if (verify) {
        setOtpverified(true);
        toast.success("OTP VERIFIED");
      } else {
        toast.error("PLEASE ENTER VALID OTP");
        setOtpverified(false);
      }
      }
    };
    verify();
  }, [otp]);
  return (
    <div className="w-full max-w-md mx-auto overflow-hidden bg-primary-content rounded-b-lg">
      <div className="p-6">
        <AnimatePresence mode="wait">
          {formType === "signup" ? ( // Sign Up Form
            <motion.div key="signup" {...fadeInOut}>
              <h1 className="text-md font-bold ">SIGNUP-FORM</h1>
              <form onSubmit={handleSubmitSignUp(onSignUp)}>
                {signUpStep === 1 && (
                  <>
                    <div className="space-y-4">
                      <div className="relative">
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium text-white"
                        >
                          Name
                        </Label>
                        <Input
                          id="name"
                          className="pl-10"
                          {...registerSignUp("name", { required: true })}
                        />
                        <User className="absolute left-3 top-8 h-5 w-5 text-white" />
                      </div>
                      <div className="relative">
                        <Label
                          htmlFor="phoneNumber"
                          className="text-sm font-medium text-white"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          className="pl-10"
                          {...registerSignUp("phoneNumber", {
                            required: true,
                            pattern: {
                              value: /^\d{10}$/, // Validate 10-digit phone number
                              message:
                                "Please enter a valid 10-digit phone number.",
                            },
                          })}
                        />
                        <Phone className="absolute left-3 top-8 h-5 w-5 text-white-400" />
                      </div>
                    </div>
                    <Button
                      type="button"
                      className="w-full mt-6 bg-primary-content text-white"
                      onClick={() => setSignUpStep(2)}
                    >
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                )}
                {signUpStep === 2 && (
                  <>
                    <div className="space-y-4">
                      <div className="relative">
                        <Label
                          htmlFor="signUpOtp"
                          className="text-sm font-medium text-white"
                        >
                          OTP
                        </Label>
                        <Input
                          id="signUpOtp"
                          type="text"
                          className="pl-10"
                          {...registerSignUp("otp", { required: true })}
                        />
                        <Mail className="absolute left-3 top-8 h-5 w-5 text-white-400" />
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-2 w-full"
                          onClick={sendOtp}
                        >
                          {isOtpSent ? "Resend OTP" : "Send OTP"}
                        </Button>
                      </div>
                      <div className="relative">
                        <Label
                          htmlFor="signUpPassword"
                          className="text-sm font-medium text-white"
                        >
                          Password
                        </Label>
                        <Input
                          id="signUpPassword"
                          type="password"
                          className="pl-10"
                          {...registerSignUp("password", { required: true })}
                        />
                        <Lock className="absolute left-3 top-8 h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSignUpStep(1)}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-primary-content text-white"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </motion.div>
          ) : (
            //sign in form
            <motion.div key="signin" {...fadeInOut}>
              <h1 className="text-md font-bold ">SIGNIN-FORM</h1>
              <form onSubmit={handleSubmitSignIn(onSignIn)}>
                <div className="space-y-4">
                  <div className="relative">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-white"
                    >
                      PhoneNumber
                    </Label>
                    <Input
                      id="tel"
                      type="tel"
                      className="pl-10"
                      {...registerSignIn("number", { required: true })}
                    />
                    <Mail className="absolute left-3 top-8 h-5 w-5 text-white" />
                  </div>
                  <RadioGroup
                    defaultValue="password"
                    className="flex space-x-4"
                    onValueChange={(value) =>
                      setSignInMethod(value as "password" | "otp")
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="password" id="password" />
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="otp" id="otp" />
                      <Label htmlFor="otp">OTP</Label>
                    </div>
                  </RadioGroup>
                  {signInMethod === "password" ? (
                    <div className="relative">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-white"
                      >
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        className="pl-10"
                        {...registerSignIn("password", { required: true })}
                      />
                      <Lock className="absolute left-3 top-8 h-5 w-5 text-white" />
                    </div>
                  ) : (
                    <div className="relative">
                      <Label
                        htmlFor="otp"
                        className="text-sm font-medium text-white"
                      >
                        OTP
                      </Label>
                      <Input
                        id="otp"
                        type="text"
                        className="pl-10"
                        {...registerSignIn("otp", { required: true })}
                      />
                      <Mail className="absolute left-3 top-8 h-5 w-5 text-white" />
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2 w-full"
                        onClick={sendOtp}
                      >
                        Send OTP
                      </Button>
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full mt-6 bg-primary-content text-white border-2 border-primary-content"
                >
                  Sign In
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="bg-primary-content-content p-6">
        <p className="text-sm text-white text-center w-full">
          {formType === "signup" ? (
            <>
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold  hover:text-primary  border border-primary-content"
                onClick={() => setFormType("signin")}
              >
                Sign in
              </Button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold text-white hover:text-primary border border-primary-content "
                onClick={() => setFormType("signup")}
              >
                Sign up
              </Button>
            </>
          )}
        </p>
      </div>
      <Turnstile
        className="my-4 mx-1"
        onSuccess={(token) => {
          setToken(token);
        }}
        siteKey="0x4AAAAAAAwsPtO1RkLb-vFz"
      />
    </div>
  );
}
