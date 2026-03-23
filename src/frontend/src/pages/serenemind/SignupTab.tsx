import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, LogOut, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "sereneMind_user";
const ACCOUNTS_KEY = "sereneMind_accounts";

interface UserProfile {
  name: string;
  email: string;
  password: string;
}

function loadUser(): UserProfile | null {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function loadAccounts(): UserProfile[] {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function SignupTab() {
  const [view, setView] = useState<"signup" | "login">("signup");
  const [loggedInUser, setLoggedInUser] = useState<UserProfile | null>(
    loadUser,
  );

  // Sign up form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSignup = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email))
      newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const accounts = loadAccounts();
    if (accounts.find((a) => a.email.toLowerCase() === email.toLowerCase())) {
      setErrors({ email: "An account with this email already exists" });
      return;
    }

    const user: UserProfile = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };
    accounts.push(user);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setLoggedInUser(user);
    toast.success(`Welcome to SereneMind, ${user.name}! 🌿`);
  };

  const handleLogin = () => {
    const newErrors: Record<string, string> = {};
    if (!loginEmail.trim()) newErrors.loginEmail = "Email is required";
    if (!loginPassword) newErrors.loginPassword = "Password is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const accounts = loadAccounts();
    const found = accounts.find(
      (a) =>
        a.email.toLowerCase() === loginEmail.trim().toLowerCase() &&
        a.password === loginPassword,
    );
    if (!found) {
      setErrors({ loginPassword: "Invalid email or password" });
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    setLoggedInUser(found);
    toast.success(`Welcome back, ${found.name}! 🌿`);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setLoggedInUser(null);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLoginEmail("");
    setLoginPassword("");
    setErrors({});
    toast.success("Signed out successfully");
  };

  if (loggedInUser) {
    return (
      <div className="min-h-screen">
        <div
          className="px-6 pt-12 pb-8"
          style={{
            background:
              "linear-gradient(135deg, oklch(93% 0.06 300), oklch(94% 0.05 160))",
          }}
        >
          <h1
            className="font-display text-2xl font-bold"
            style={{ color: "oklch(28% 0.08 300)" }}
          >
            My Account
          </h1>
        </div>
        <div className="px-5 py-8 flex flex-col items-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold mb-4"
            style={{
              background: "oklch(72% 0.14 300)",
              color: "white",
              boxShadow: "0 8px 32px oklch(72% 0.14 300 / 0.35)",
            }}
          >
            {loggedInUser.name[0].toUpperCase()}
          </div>
          <h2
            className="font-display text-2xl font-bold"
            style={{ color: "oklch(28% 0.08 300)" }}
          >
            {loggedInUser.name}
          </h2>
          <p className="text-sm mt-1" style={{ color: "oklch(50% 0.08 300)" }}>
            {loggedInUser.email}
          </p>

          <div
            className="w-full mt-8 rounded-3xl p-5 space-y-3"
            style={{
              background:
                "linear-gradient(135deg, oklch(96% 0.04 300 / 0.6), oklch(97% 0.03 160 / 0.5))",
              border: "1px solid oklch(85% 0.06 300 / 0.4)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "oklch(72% 0.14 300 / 0.2)" }}
              >
                <User size={18} style={{ color: "oklch(45% 0.14 300)" }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "oklch(55% 0.08 300)" }}
                >
                  Name
                </p>
                <p
                  className="font-medium"
                  style={{ color: "oklch(28% 0.08 300)" }}
                >
                  {loggedInUser.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "oklch(72% 0.14 300 / 0.2)" }}
              >
                <Brain size={18} style={{ color: "oklch(45% 0.14 300)" }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "oklch(55% 0.08 300)" }}
                >
                  Email
                </p>
                <p
                  className="font-medium"
                  style={{ color: "oklch(28% 0.08 300)" }}
                >
                  {loggedInUser.email}
                </p>
              </div>
            </div>
          </div>

          <div
            className="w-full mt-4 rounded-3xl p-4 text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(95% 0.05 160 / 0.5), oklch(96% 0.04 200 / 0.4))",
            }}
          >
            <p className="text-sm" style={{ color: "oklch(40% 0.08 160)" }}>
              Welcome back, {loggedInUser.name}! 🌿 Your mood, journal, and
              progress data are safely stored on this device.
            </p>
          </div>

          <Button
            data-ocid="signup.logout.button"
            onClick={handleLogout}
            variant="outline"
            className="mt-6 w-full rounded-full font-semibold flex items-center gap-2 py-5"
            style={{
              borderColor: "oklch(80% 0.06 300)",
              color: "oklch(40% 0.08 300)",
            }}
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="px-6 pt-12 pb-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(93% 0.06 300), oklch(94% 0.05 160))",
        }}
      >
        <h1
          className="font-display text-2xl font-bold"
          style={{ color: "oklch(28% 0.08 300)" }}
        >
          {view === "signup" ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-sm mt-1" style={{ color: "oklch(48% 0.08 300)" }}>
          {view === "signup"
            ? "Start your wellness journey"
            : "Sign in to continue"}
        </p>
      </div>

      <div className="px-5 py-6">
        {/* Toggle */}
        <div
          className="flex rounded-2xl p-1 mb-6"
          style={{ background: "oklch(92% 0.04 300 / 0.5)" }}
        >
          <button
            type="button"
            data-ocid="signup.signup.tab"
            onClick={() => {
              setView("signup");
              setErrors({});
            }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: view === "signup" ? "white" : "transparent",
              color:
                view === "signup"
                  ? "oklch(35% 0.12 300)"
                  : "oklch(55% 0.06 300)",
              boxShadow:
                view === "signup"
                  ? "0 2px 8px oklch(72% 0.14 300 / 0.15)"
                  : "none",
            }}
          >
            Sign Up
          </button>
          <button
            type="button"
            data-ocid="signup.login.tab"
            onClick={() => {
              setView("login");
              setErrors({});
            }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: view === "login" ? "white" : "transparent",
              color:
                view === "login"
                  ? "oklch(35% 0.12 300)"
                  : "oklch(55% 0.06 300)",
              boxShadow:
                view === "login"
                  ? "0 2px 8px oklch(72% 0.14 300 / 0.15)"
                  : "none",
            }}
          >
            Log In
          </button>
        </div>

        {/* Sign Up Form */}
        {view === "signup" && (
          <div
            className="rounded-3xl p-5 space-y-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(96% 0.04 300 / 0.6), oklch(97% 0.03 160 / 0.5))",
              border: "1px solid oklch(85% 0.06 300 / 0.4)",
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="su-name" style={{ color: "oklch(38% 0.08 300)" }}>
                Full Name
              </Label>
              <Input
                id="su-name"
                data-ocid="signup.name.input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr Muskan Khosla"
                className="rounded-xl border-0"
                style={{ background: "white" }}
              />
              {errors.name && (
                <p
                  data-ocid="signup.name.error_state"
                  className="text-xs"
                  style={{ color: "oklch(50% 0.18 25)" }}
                >
                  {errors.name}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="su-email"
                style={{ color: "oklch(38% 0.08 300)" }}
              >
                Email
              </Label>
              <Input
                id="su-email"
                data-ocid="signup.email.input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-xl border-0"
                style={{ background: "white" }}
              />
              {errors.email && (
                <p
                  data-ocid="signup.email.error_state"
                  className="text-xs"
                  style={{ color: "oklch(50% 0.18 25)" }}
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="su-password"
                style={{ color: "oklch(38% 0.08 300)" }}
              >
                Password
              </Label>
              <Input
                id="su-password"
                data-ocid="signup.password.input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="rounded-xl border-0"
                style={{ background: "white" }}
              />
              {errors.password && (
                <p
                  data-ocid="signup.password.error_state"
                  className="text-xs"
                  style={{ color: "oklch(50% 0.18 25)" }}
                >
                  {errors.password}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="su-confirm"
                style={{ color: "oklch(38% 0.08 300)" }}
              >
                Confirm Password
              </Label>
              <Input
                id="su-confirm"
                data-ocid="signup.confirm_password.input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="rounded-xl border-0"
                style={{ background: "white" }}
              />
              {errors.confirmPassword && (
                <p
                  data-ocid="signup.confirm_password.error_state"
                  className="text-xs"
                  style={{ color: "oklch(50% 0.18 25)" }}
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <Button
              data-ocid="signup.submit.primary_button"
              onClick={handleSignup}
              className="w-full rounded-full py-5 font-bold text-white"
              style={{
                background: "oklch(72% 0.14 300)",
                boxShadow: "0 4px 16px oklch(72% 0.14 300 / 0.35)",
              }}
            >
              Create My Account
            </Button>
          </div>
        )}

        {/* Login Form */}
        {view === "login" && (
          <div
            className="rounded-3xl p-5 space-y-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(96% 0.04 300 / 0.6), oklch(97% 0.03 160 / 0.5))",
              border: "1px solid oklch(85% 0.06 300 / 0.4)",
            }}
          >
            <div className="space-y-1.5">
              <Label
                htmlFor="li-email"
                style={{ color: "oklch(38% 0.08 300)" }}
              >
                Email
              </Label>
              <Input
                id="li-email"
                data-ocid="login.email.input"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-xl border-0"
                style={{ background: "white" }}
              />
              {errors.loginEmail && (
                <p
                  data-ocid="login.email.error_state"
                  className="text-xs"
                  style={{ color: "oklch(50% 0.18 25)" }}
                >
                  {errors.loginEmail}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="li-password"
                style={{ color: "oklch(38% 0.08 300)" }}
              >
                Password
              </Label>
              <Input
                id="li-password"
                data-ocid="login.password.input"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Your password"
                className="rounded-xl border-0"
                style={{ background: "white" }}
              />
              {errors.loginPassword && (
                <p
                  data-ocid="login.password.error_state"
                  className="text-xs"
                  style={{ color: "oklch(50% 0.18 25)" }}
                >
                  {errors.loginPassword}
                </p>
              )}
            </div>
            <Button
              data-ocid="login.submit.primary_button"
              onClick={handleLogin}
              className="w-full rounded-full py-5 font-bold text-white"
              style={{
                background: "oklch(72% 0.14 300)",
                boxShadow: "0 4px 16px oklch(72% 0.14 300 / 0.35)",
              }}
            >
              Sign In
            </Button>
          </div>
        )}

        <p
          className="text-center text-xs mt-5"
          style={{ color: "oklch(55% 0.06 300)" }}
        >
          🔒 Your data is stored locally on this device only.
        </p>
      </div>
    </div>
  );
}
