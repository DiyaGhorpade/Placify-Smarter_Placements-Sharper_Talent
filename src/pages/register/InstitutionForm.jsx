import { School, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "../../components/FormInput";
import RegistrationHeader from "../../components/RegistrationHeader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import apiClient from "../../api/apiClient";
import { CheckCircle, XCircle } from "lucide-react";

// =================== PERFORMANCE MONITORING ===================
const componentStartTime = performance.now();
console.group("⚡ InstitutionForm Component Performance Monitoring");
console.log("🚀 Component file loaded at:", new Date().toISOString());
console.log("📊 Performance start time:", componentStartTime);
console.groupEnd();
export default function InstitutionForm() {
  const navigate = useNavigate();

  // =================== COMPONENT INITIALIZATION DEBUGGING ===================
  console.group("🏛️ InstitutionForm Component Initialization");
  console.log("📅 Component mounted at:", new Date().toISOString());
  console.log("🧭 Navigation object:", navigate);

  const [formData, setFormData] = useState({
    institutionName: "",
    website: "",
    contactPerson: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "institution",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Track password validation
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  console.log("📋 Initial form state:", formData);
  console.log("🔐 Initial password rules:", passwordRules);
  console.log("⚡ Initial loading state:", loading);
  console.log("❌ Initial error state:", error);
  console.groupEnd();

  // =================== COMPONENT LIFECYCLE DEBUGGING ===================
  useEffect(() => {
    console.group("🔄 InstitutionForm useEffect - Component Mount");
    console.log("🎯 Component fully mounted and ready");
    console.log(
      "📊 Component render time:",
      performance.now() - componentStartTime,
      "ms"
    );
    console.log("🌐 Current URL:", window.location.href);
    console.log("📱 User agent:", navigator.userAgent);
    console.log("🖥️ Screen resolution:", `${screen.width}x${screen.height}`);
    console.log(
      "🎨 Color scheme preference:",
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
    console.groupEnd();

    // Cleanup function for debugging unmount
    return () => {
      console.group("🧹 InstitutionForm Cleanup - Component Unmount");
      console.log("👋 Component unmounting at:", new Date().toISOString());
      console.log(
        "⏱️ Component lifetime:",
        performance.now() - componentStartTime,
        "ms"
      );
      console.groupEnd();
    };
  }, []);

  // =================== ERROR STATE DEBUGGING ===================
  useEffect(() => {
    if (error) {
      console.group("❌ Error State Change Detected");
      console.log("🚨 New error:", error);
      console.log("⏰ Error timestamp:", new Date().toISOString());
      console.log("📋 Current form data when error occurred:", formData);
      console.log("⚡ Loading state:", loading);
      console.groupEnd();
    } else {
      console.log("✅ Error state cleared");
    }
  }, [error]);

  // =================== LOADING STATE DEBUGGING ===================
  useEffect(() => {
    console.group("⏳ Loading State Change");
    console.log("🔄 Loading state:", loading ? "STARTED" : "STOPPED");
    console.log("⏰ Timestamp:", new Date().toISOString());
    if (loading) {
      console.log("🚀 Form submission in progress...");
      console.time("⏱️ Total Loading Duration");
    } else {
      console.log("✅ Form submission completed");
      console.timeEnd("⏱️ Total Loading Duration");
    }
    console.groupEnd();
  }, [loading]);

  // =================== FORM DATA CHANGE HANDLER WITH DEBUGGING ===================
  const handleFormDataChange = (field, value) => {
    console.group(`📝 Form Field Update: ${field}`);
    console.log("🔄 Previous value:", formData[field]);
    console.log("🆕 New value:", value);
    console.log("📊 Field type:", typeof value);
    console.log("📏 Value length:", value?.length || 0);

    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    console.log("✅ Updated form data:", newFormData);

    // Special handling for password field
    if (field === "password") {
      console.log("🔐 Triggering password validation...");
      validatePassword(value);
    }

    console.groupEnd();
  };

  const validatePassword = (password) => {
    // =================== PASSWORD VALIDATION DEBUGGING ===================
    console.group("🔐 Password Validation Analysis");
    console.log(
      "📝 Password being validated:",
      password ? `${password.length} characters` : "empty"
    );

    const rules = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    console.log("📊 Password strength analysis:");
    console.table(
      Object.entries(rules).map(([rule, passed]) => ({
        rule: rule,
        requirement:
          rule === "length"
            ? "At least 8 characters"
            : rule === "upper"
            ? "One uppercase letter (A-Z)"
            : rule === "lower"
            ? "One lowercase letter (a-z)"
            : rule === "number"
            ? "One number (0-9)"
            : 'One special character (!@#$%^&*(),.?":{}|<>)',
        status: passed ? "✅ PASSED" : "❌ FAILED",
        passed: passed,
      }))
    );

    const totalRulesPassed = Object.values(rules).filter(Boolean).length;
    const passwordStrength = (totalRulesPassed / 5) * 100;

    console.log(
      `💪 Password strength: ${passwordStrength}% (${totalRulesPassed}/5 rules passed)`
    );

    if (passwordStrength === 100) {
      console.log("🎉 Excellent! Password meets all security requirements");
    } else if (passwordStrength >= 80) {
      console.warn("⚠️ Good password, but missing some requirements");
    } else if (passwordStrength >= 60) {
      console.warn("⚠️ Weak password, please strengthen");
    } else {
      console.error("❌ Very weak password, major improvements needed");
    }

    setPasswordRules(rules);
    console.groupEnd();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // =================== DEBUGGING GROUP: FORM SUBMISSION ===================
    console.group("🏛️ Institution Registration Form Submission");
    console.log("📋 Form submission started at:", new Date().toISOString());
    console.log("📝 Current form data:", formData);
    console.table(formData); // Table format for better readability

    // =================== CLIENT-SIDE VALIDATION ===================
    console.group("✅ Client-side Validation");

    // Check required fields
    const requiredFields = {
      institutionName: formData.institutionName,
      website: formData.website,
      contactPerson: formData.contactPerson,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    console.log("🔍 Checking required fields:", requiredFields);

    if (
      !formData.institutionName ||
      !formData.website ||
      !formData.contactPerson ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      console.error("❌ Validation failed: Missing required fields");
      console.table(
        Object.entries(requiredFields).map(([key, value]) => ({
          field: key,
          value: value || "MISSING",
          status: value ? "✅ Valid" : "❌ Missing",
        }))
      );
      setError("All fields are required");
      setLoading(false);
      console.groupEnd();
      console.groupEnd();
      return;
    }
    console.log("✅ All required fields present");

    // Validate website URL
    console.log("🌐 Validating website URL:", formData.website);
    try {
      const urlObj = new URL(formData.website);
      console.log("✅ Website URL is valid:", {
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        pathname: urlObj.pathname,
      });
    } catch (urlError) {
      console.error("❌ Website URL validation failed:", urlError.message);
      setError("Please enter a valid website URL");
      setLoading(false);
      console.groupEnd();
      console.groupEnd();
      return;
    }

    // Password validation
    console.log("🔐 Validating password requirements:");
    console.log("Password length:", formData.password.length);
    console.log("Password rules status:", passwordRules);

    if (formData.password.length < 6) {
      console.error(
        "❌ Password too short:",
        formData.password.length,
        "characters"
      );
      setError("Password must be at least 6 characters long");
      setLoading(false);
      console.groupEnd();
      console.groupEnd();
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      console.error("❌ Password confirmation mismatch");
      console.log("Password:", formData.password?.length, "characters");
      console.log(
        "Confirm Password:",
        formData.confirmPassword?.length,
        "characters"
      );
      setError("Passwords do not match");
      setLoading(false);
      console.groupEnd();
      console.groupEnd();
      return;
    }

    console.log("✅ All client-side validations passed");
    console.groupEnd(); // End validation group

    // =================== API REQUEST PREPARATION ===================
    console.group("🚀 API Request Preparation");

    // Prepare payload (excluding confirmPassword as backend doesn't need it)
    const requestPayload = {
      institutionName: formData.institutionName,
      website: formData.website,
      contactPerson: formData.contactPerson,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    console.log("📦 Request payload prepared:", requestPayload);
    console.log("🎯 API endpoint: /auth/register/institution");
    console.log(
      "📊 Request size:",
      JSON.stringify(requestPayload).length,
      "bytes"
    );
    console.groupEnd();

    try {
      // =================== API CALL EXECUTION ===================
      console.group("🌐 API Call Execution");
      console.time("⏱️ Registration API Call Duration");

      console.log("📡 Sending POST request to backend...");
      const response = await apiClient.post(
        "/auth/register/institution",
        requestPayload
      );

      console.timeEnd("⏱️ Registration API Call Duration");

      // =================== SUCCESS RESPONSE ANALYSIS ===================
      console.group("✅ SUCCESS - Backend Response Analysis");
      console.log("🎉 Registration successful!");
      console.log("📈 Response status:", response.status);
      console.log("📋 Response headers:", response.headers);
      console.log("💾 Response data:", response.data);

      /*
       * BACKEND RESPONSE STRUCTURE (from authController.js registerInstitution):
       * SUCCESS (Status 201):
       * {
       *   message: "Institution registered successfully"
       * }
       *
       * The backend also creates a new Institution document with:
       * - name: institutionName (from request)
       * - website: website (from request)
       * - contactPerson: contactPerson (from request)
       * - email: email (from request)
       * - password: hashedPassword (bcrypt hashed)
       * - role: "institution" (hardcoded)
       * - _id: MongoDB ObjectId (auto-generated)
       * - createdAt, updatedAt: timestamps (auto-generated)
       */

      console.log("📝 Expected backend actions completed:");
      console.log("  ✅ Email uniqueness check passed");
      console.log("  ✅ Password hashed using bcrypt");
      console.log("  ✅ Institution document created in MongoDB");
      console.log("  ✅ Success response sent");

      console.groupEnd(); // End success analysis group
      console.groupEnd(); // End API execution group

      // =================== UI FEEDBACK ===================
      console.group("🎨 UI Feedback & Navigation");
      console.log("🍞 Showing success toast notification");
      toast.success("Institution registration successful! Please login.");

      console.log("⏰ Setting 2-second delay before navigation");
      console.log("🧭 Will navigate to: /auth");
      setTimeout(() => {
        console.log("🚀 Navigating to login page...");
        navigate("/auth");
      }, 2000);
      console.groupEnd();
    } catch (err) {
      // =================== ERROR HANDLING & ANALYSIS ===================
      console.group("❌ ERROR - Registration Failed");
      console.error("💥 Registration error occurred:", err);

      if (err.response) {
        // =================== SERVER ERROR RESPONSE ===================
        console.group("🖥️ Server Error Response Analysis");
        console.error("📡 Server responded with error");
        console.error("📈 Error status:", err.response.status);
        console.error("📋 Error headers:", err.response.headers);
        console.error("💾 Error data:", err.response.data);

        /*
         * POSSIBLE BACKEND ERROR RESPONSES (from authController.js):
         *
         * 1. EMAIL ALREADY EXISTS (Status 400):
         * {
         *   message: "Email already exists"
         * }
         *
         * 2. SERVER ERROR (Status 500):
         * {
         *   message: "Server error"
         * }
         *
         * Additional context: Backend logs "Institution Register Error:" with full error details
         */

        const errorMessage =
          err.response?.data?.message || `Server error: ${err.response.status}`;
        console.log("🔍 Parsed error message:", errorMessage);

        // Analyze specific error types
        if (
          err.response.status === 400 &&
          err.response.data?.message === "Email already exists"
        ) {
          console.warn("⚠️ CONFLICT: Email already registered");
          console.log(
            "💡 Suggestion: User should try login or use different email"
          );
        } else if (err.response.status === 500) {
          console.error("🔥 CRITICAL: Server internal error");
          console.log(
            "💡 Suggestion: Check server logs, database connection, or try again later"
          );
        }

        setError(errorMessage);
        toast.error(errorMessage);
        console.groupEnd(); // End server error analysis group
      } else if (err.request) {
        // =================== NETWORK ERROR ===================
        console.group("🌐 Network Error Analysis");
        console.error("📡 No response received from server");
        console.error("🔌 Request object:", err.request);
        console.error("💡 Possible causes:");
        console.error("  - Server is down");
        console.error("  - Network connectivity issues");
        console.error("  - CORS problems");
        console.error("  - Firewall blocking request");
        console.error("  - Wrong API endpoint URL");

        const networkError =
          "No response from server. Please check your connection.";
        setError(networkError);
        toast.error(networkError);
        console.groupEnd(); // End network error analysis group
      } else {
        // =================== CLIENT-SIDE ERROR ===================
        console.group("🖥️ Client-side Error Analysis");
        console.error("💻 Client-side error during request setup");
        console.error("📝 Error message:", err.message);
        console.error("🔍 Error type:", err.name);
        console.error("📚 Error stack:", err.stack);

        const clientError = `Error: ${err.message}`;
        setError(clientError);
        toast.error(clientError);
        console.groupEnd(); // End client error analysis group
      }

      console.groupEnd(); // End main error group
    } finally {
      // =================== CLEANUP ===================
      console.group("🧹 Cleanup & State Reset");
      console.log("⏳ Setting loading state to false");
      setLoading(false);
      console.log("✅ Form submission process completed");
      console.groupEnd();

      console.groupEnd(); // End main form submission group
      console.log(
        "🏁 Institution registration form submission ended at:",
        new Date().toISOString()
      );
    }
  };

  // =================== RENDER DEBUGGING ===================
  console.group("🎨 InstitutionForm Render Cycle");
  console.log("🖼️ Component re-rendering at:", new Date().toISOString());
  console.log("📊 Current state snapshot:", {
    formData: formData,
    error: error,
    loading: loading,
    passwordRules: passwordRules,
  });
  console.log(
    "🔄 Render count since mount:",
    Math.floor((performance.now() - componentStartTime) / 16.67)
  ); // Approximate based on 60fps
  console.groupEnd();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
        toastClassName="dark:bg-gray-800 dark:text-white"
      />

      <div className="pt-16">
        <RegistrationHeader
          title="Institution Registration"
          subtitle="Transform your campus placements with our AI-powered recruitment platform."
          tagline="Complete setup in under 5 minutes"
          icon={<School className="w-10 h-10 text-white" />}
          color="blue"
          userType="institution"
        />
      </div>
      <div className="py-12 px-4">
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 transition-colors duration-200">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Institution Name"
              value={formData.institutionName}
              onChange={(e) =>
                handleFormDataChange("institutionName", e.target.value)
              }
              required
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />

            <FormInput
              label="Website"
              type="url"
              value={formData.website}
              onChange={(e) => handleFormDataChange("website", e.target.value)}
              required
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />

            <FormInput
              label="Contact Person"
              value={formData.contactPerson}
              onChange={(e) =>
                handleFormDataChange("contactPerson", e.target.value)
              }
              required
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />

            <FormInput
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => handleFormDataChange("email", e.target.value)}
              required
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />

            <FormInput
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) => handleFormDataChange("password", e.target.value)}
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              required
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
            <div className="mt-2 space-y-1 text-sm">
              {[
                { label: "At least 8 characters", key: "length" },
                { label: "One uppercase letter", key: "upper" },
                { label: "One lowercase letter", key: "lower" },
                { label: "One number", key: "number" },
                { label: "One special character", key: "special" },
              ].map((rule) => (
                <div key={rule.key} className="flex items-center gap-2">
                  {passwordRules[rule.key] ? (
                    <CheckCircle className="text-green-500 w-4 h-4" />
                  ) : (
                    <XCircle className="text-red-500 w-4 h-4" />
                  )}
                  <span
                    className={
                      passwordRules[rule.key]
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>
            <FormInput
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleFormDataChange("confirmPassword", e.target.value)
              }
              onPaste={(e) => e.preventDefault()}
              required
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-md shadow-lg hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-70"
            >
              {loading && <Loader2 className="animate-spin w-5 h-5" />}
              {loading ? "Registering..." : "Register Institution"}
            </motion.button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
