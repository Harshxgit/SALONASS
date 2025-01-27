"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRight, ChevronLeft, Mail, Lock, User, Phone } from "lucide-react"

type SignInData = {
  email: string
  password?: string
  otp?: string
}

type SignUpData = {
  name: string
  phoneNumber: string
  otp: string
  password: string
}

const fadeInOut = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 },
}

interface ModernAuthFormProps {
  onAuthSuccess: () => void
}

export function ModernAuthForm({ onAuthSuccess }: ModernAuthFormProps) {
  const [formType, setFormType] = useState<"signup" | "signin">("signup")
  const [signInMethod, setSignInMethod] = useState<"password" | "otp">("password")
  const [signUpStep, setSignUpStep] = useState(1)
  const [isOtpSent, setIsOtpSent] = useState(false)

  const { register: registerSignIn, handleSubmit: handleSubmitSignIn } = useForm<SignInData>()
  const { register: registerSignUp, handleSubmit: handleSubmitSignUp } = useForm<SignUpData>()

  const onSignIn = (data: SignInData) => {
    console.log("Sign In Data:", data)
    // Implement sign-in logic here
    onAuthSuccess()
  }

  const onSignUp = (data: SignUpData) => {
    console.log("Sign Up Data:", data)
    // Implement sign-up logic here
    onAuthSuccess()
  }

  const sendOtp = () => {
    // Implement OTP sending logic here
    setIsOtpSent(true)
  }

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden bg-primary-content rounded-b-lg">
      <div className="p-6">
        <AnimatePresence mode="wait">
          {formType === "signup" ? (
            <motion.div key="signup" {...fadeInOut}>
              <form onSubmit={handleSubmitSignUp(onSignUp)}>
                {signUpStep === 1 && (
                  <>
                    <div className="space-y-4">
                      <div className="relative">
                        <Label htmlFor="name" className="text-sm font-medium ">
                          Name
                        </Label>
                        <Input id="name" className="pl-10" {...registerSignUp("name", { required: true })} />
                        <User className="absolute left-3 top-8 h-5 w-5 " />
                      </div>
                      <div className="relative">
                        <Label htmlFor="phoneNumber" className="text-sm font-medium ">
                          Phone Number
                        </Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          className="pl-10"
                          {...registerSignUp("phoneNumber", { required: true })}
                        />
                        <Phone className="absolute left-3 top-8 h-5 w-5 " />
                      </div>
                    </div>
                    <Button
                      type="button"
                      className="w-full mt-6 "
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
                        <Label htmlFor="signUpOtp" className="text-sm font-medium ">
                          OTP
                        </Label>
                        <Input
                          id="signUpOtp"
                          type="text"
                          className="pl-10"
                          {...registerSignUp("otp", { required: true })}
                        />
                        <Mail className="absolute left-3 top-8 h-5 w-5 " />
                        <Button type="button" variant="outline" className="mt-2 w-full" onClick={sendOtp}>
                          {isOtpSent ? "Resend OTP" : "Send OTP"}
                        </Button>
                      </div>
                      <div className="relative">
                        <Label htmlFor="signUpPassword" className="text-sm font-medium ">
                          Password
                        </Label>
                        <Input
                          id="signUpPassword"
                          type="password"
                          className="pl-10"
                          {...registerSignUp("password", { required: true })}
                        />
                        <Lock className="absolute left-3 top-8 h-5 w-5 " />
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button type="button" variant="outline" onClick={() => setSignUpStep(1)}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button type="submit" className="bg-primary-content">
                        Sign Up
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </motion.div>
          ) : (
            <motion.div key="signin" {...fadeInOut}>
              <form onSubmit={handleSubmitSignIn(onSignIn)}>
                <div className="space-y-4">
                  <div className="relative">
                    <Label htmlFor="email" className="text-sm font-medium t">
                      Email
                    </Label>
                    <Input id="email" type="email" className="pl-10" {...registerSignIn("email", { required: true })} />
                    <Mail className="absolute left-3 top-8 h-5 w-5 " />
                  </div>
                  <RadioGroup
                    defaultValue="password"
                    className="flex space-x-4"
                    onValueChange={(value) => setSignInMethod(value as "password" | "otp")}
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
                      <Label htmlFor="password" className="text-sm font-medium ">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        className="pl-10"
                        {...registerSignIn("password", { required: true })}
                      />
                      <Lock className="absolute left-3 top-8 h-5 w-5 " />
                    </div>
                  ) : (
                    <div className="relative">
                      <Label htmlFor="otp" className="text-sm font-medium ">
                        OTP
                      </Label>
                      <Input id="otp" type="text" className="pl-10" {...registerSignIn("otp", { required: true })} />
                      <Mail className="absolute left-3 top-8 h-5 w-5 " />
                      <Button type="button" variant="outline" className="mt-2 w-full" onClick={sendOtp}>
                        Send OTP
                      </Button>
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full mt-6 bg-primary-content text-white">
                  Sign In
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="bg-primary-content p-6">
        <p className="text-sm 600 text-center w-full">
          {formType === "signup" ? (
            <>
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold"
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
                className="p-0 h-auto font-semibold"
                onClick={() => setFormType("signup")}
              >
                Sign up
              </Button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

