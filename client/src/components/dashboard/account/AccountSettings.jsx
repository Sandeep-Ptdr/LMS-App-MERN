import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import API from "../../../utils/api";

const AccountSettings = () => {
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [account, setAccount] = useState(null);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const loadAccount = async () => {
      try {
        setLoading(true);
        const response = await API.get("/account");
        const user = response?.data?.user;
        setAccount(user);
        setProfileForm({
          name: user?.name || "",
          email: user?.email || "",
        });
      } catch (error) {
        toast.error(
          error?.response?.data?.message || error?.message || "Failed to load account"
        );
      } finally {
        setLoading(false);
      }
    };

    loadAccount();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      setSavingProfile(true);
      const response = await API.put("/account", profileForm);
      setAccount(response?.data?.user || null);
      setProfileForm({
        name: response?.data?.user?.name || "",
        email: response?.data?.user?.email || "",
      });
      toast.success(response?.data?.message || "Account updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to update account"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      setSavingPassword(true);
      const response = await API.put("/account/password", passwordForm);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success(response?.data?.message || "Password changed successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to change password"
      );
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto p-4">
        <div className="m-auto max-w-[95%]">
          <div className="mb-6 rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#0f172a,#1d4ed8)] px-6 py-6 text-white shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">
              Account
            </p>
            <h1 className="mt-2 text-3xl font-extrabold">
              Manage your account settings
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-blue-100">
              Update your personal details and keep your password secure from one place.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-slate-200 bg-gray-50 p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2196F3] text-2xl font-bold text-white">
                  {(account?.name || "U").charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {account?.name || "User"}
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    {account?.role || "member"}
                  </p>
                </div>
              </div>

              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </p>
                  <p className="mt-2 break-all text-sm font-semibold text-slate-800">
                    {account?.email || "-"}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Role
                  </p>
                  <p className="mt-2 text-sm font-semibold capitalize text-slate-800">
                    {account?.role || "-"}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Joined
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {account?.createdAt
                      ? new Date(account.createdAt).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleProfileSubmit}>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#2196F3]"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#2196F3]"
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="rounded-xl bg-[#2196F3] px-5 py-3 text-sm font-bold text-white hover:bg-[#1976D2] disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {savingProfile ? "Saving..." : "Save Profile"}
                </button>
              </form>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-gray-50 p-6 shadow-lg">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Security
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">
                  Change password
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Choose a new password between 6 and 12 characters.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-600">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#2196F3]"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-600">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#2196F3]"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-600">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#2196F3]"
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-600">
                  Keep your account secure by using a password you do not reuse elsewhere.
                </div>
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="rounded-xl bg-slate-800 px-5 py-3 text-sm font-bold text-white hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {savingPassword ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
