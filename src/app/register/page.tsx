"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const indianStates = [
  "Andaman and Nicobar Islands",
  "Arunachal Pradesh",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const restrictedStates = ["Telangana", "Andhra Pradesh", "Assam", "Odisha"];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
    state: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreeAge: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const validateStep1 = (): boolean => {
    if (!formData.fullName.trim()) {
      setError("Please enter your full name");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.mobile.trim()) {
      setError("Please enter your mobile number");
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit Indian mobile number");
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    if (!formData.dateOfBirth) {
      setError("Please enter your date of birth");
      return false;
    }
    const age = calculateAge(formData.dateOfBirth);
    if (age < 18) {
      setError("You must be at least 18 years old to register");
      return false;
    }
    if (!formData.state) {
      setError("Please select your state");
      return false;
    }
    if (restrictedStates.includes(formData.state)) {
      setError(
        `Sorry, DineDivine is not available in ${formData.state} due to state regulations.`
      );
      return false;
    }
    return true;
  };

  const validateStep3 = (): boolean => {
    if (!formData.password) {
      setError("Please enter a password");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.agreeTerms) {
      setError("Please agree to the Terms and Conditions");
      return false;
    }
    if (!formData.agreeAge) {
      setError("Please confirm that you are 18 years or older");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsLoading(true);
    setError("");

    try {
      // API call will be implemented when backend is connected
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          dateOfBirth: formData.dateOfBirth,
          state: formData.state,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to dashboard on successful registration (user is auto-logged in)
        router.push("/dashboard");
        router.refresh();
      } else {
        throw new Error(data.error || "Registration failed");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during registration"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/auth-bg.webp"
          alt="Background"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/50 to-[#0a0f1a]"></div>
      </div>
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <span className="text-3xl font-bold text-[#22c55e]">DineDivine</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#22c55e] hover:text-[#4ade80]"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s
                    ? "bg-[#22c55e] text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step > s ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  s
                )}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 ${
                    step > s ? "bg-[#22c55e]" : "bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#1a2332] py-8 px-4 shadow-lg sm:rounded-xl sm:px-10">
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Basic Information
                </h3>

                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e]"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e]"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-400 text-sm">
                      +91
                    </span>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-600 rounded-r-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e]"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:shadow-lg hover:shadow-[#22c55e]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Verification */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Age & Location Verification
                </h3>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    max={
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() - 18)
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                    className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e]"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    You must be 18 years or older to register
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-300"
                  >
                    State of Residence <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] bg-white"
                  >
                    <option value="">Select your state</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <svg
                      className="h-5 w-5 text-yellow-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Note:</strong> DineDivine is not available in
                        Telangana, Andhra Pradesh, Assam, and Odisha due to
                        state regulations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-white hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:shadow-lg hover:shadow-[#22c55e]/30"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Password & Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Set Your Password
                </h3>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] pr-12"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    At least 8 characters with uppercase, lowercase, and number
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] pr-12"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      id="agreeAge"
                      name="agreeAge"
                      type="checkbox"
                      checked={formData.agreeAge}
                      onChange={handleChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                    />
                    <label
                      htmlFor="agreeAge"
                      className="ml-2 block text-sm text-gray-300"
                    >
                      I confirm that I am <strong>18 years of age or older</strong>{" "}
                      and I am not accessing this platform from a restricted
                      state.
                    </label>
                  </div>

                  <div className="flex items-start">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                    />
                    <label
                      htmlFor="agreeTerms"
                      className="ml-2 block text-sm text-gray-300"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-green-600 hover:underline"
                        target="_blank"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-green-600 hover:underline"
                        target="_blank"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-white hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:shadow-lg hover:shadow-[#22c55e]/30"
                    }`}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-xl p-4 mx-4 sm:mx-0">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-[#22c55e]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-[#22c55e]">
                Your data is secure. DineDivine is a{" "}
                <strong>free-to-play</strong> platform with no real money
                involvement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
