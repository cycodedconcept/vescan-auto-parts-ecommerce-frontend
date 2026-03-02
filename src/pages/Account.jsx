import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Pencil } from "lucide-react";
import {
  getProfile,
  updateProfile,
  getAddresses,
  updateBillingAddress,
  updateShippingAddress,
  getOrders,
  getWishlist,
  removeFromWishlist,
  
} from "../services/accountService";
import { useCart } from "../context/CartContext";

const TABS = [
  { id: "account", label: "Account" },
  { id: "address", label: "Address" },
  { id: "orders", label: "Orders" },
  { id: "wishlist", label: "Wishlist" },
];

// ── Reusable form field ───────────────────────────────────────────────────────
const Field = ({ label, required, type = "text", value, onChange, placeholder, helper }) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-sans text-xs uppercase tracking-wide font-bold text-[#7C797A]">
      {label}{required && " *"}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-[#CBCBCB] rounded-lg px-4 py-3 font-sans text-sm text-heading placeholder:text-[#7C797A] placeholder:font-sans focus:outline-none focus:border-heading transition-colors"
    />
    {helper && (
      <p className="font-sans text-xs text-body italic">{helper}</p>
    )}
  </div>
);

// ── Account Details Tab ───────────────────────────────────────────────────────
const AccountTab = ({ profile, onSave }) => {
  const [form, setForm] = useState({
    firstName: profile?.firstName ?? "",
    lastName: profile?.lastName ?? "",
    displayName: profile?.displayName ?? "",
    email: profile?.email ?? "",
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    await onSave(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-heading text-2xl text-heading">Account Details</h2>

      <Field
        label="First Name"
        required
        value={form.firstName}
        onChange={set("firstName")}
        placeholder="First name"
      />
      <Field
        label="Last Name"
        required
        value={form.lastName}
        onChange={set("lastName")}
        placeholder="Last name"
      />
      <Field
        label="Display Name"
        required
        value={form.displayName}
        onChange={set("displayName")}
        placeholder="Display name"
        helper="This will be how your name will be displayed in the account section and in reviews"
      />
      <Field
        label="Email"
        required
        type="email"
        value={form.email}
        onChange={set("email")}
        placeholder="Email"
      />

      <div className="pt-2">
        <h3 className="font-heading text-xl text-heading mb-5">Password</h3>
        <div className="flex flex-col gap-5">
          <Field
            label="Old Password"
            type="password"
            value={form.oldPassword}
            onChange={set("oldPassword")}
            placeholder="Old password"
          />
          <Field
            label="New Password"
            type="password"
            value={form.newPassword}
            onChange={set("newPassword")}
            placeholder="New password"
          />
          <Field
            label="Repeat New Password"
            type="password"
            value={form.repeatNewPassword}
            onChange={set("repeatNewPassword")}
            placeholder="Repeat new password"
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#001F3F] text-white font-sans font-bold text-sm px-8 py-3.5 rounded-md hover:bg-black/90 transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

// ── Single address card (Billing or Shipping) ─────────────────────────────────
const AddressCard = ({ title, address, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(address || {});
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    await onSave(form);
    setSaving(false);
    setEditing(false);
  };

  const summaryName = address ? `${address.firstName} ${address.lastName}` : "";
  const summaryAddress = address
    ? `${address.streetAddress}, ${address.city}, ${address.state}`
    : "";

  return (
    <div className="border-1 border-[#6C7275] rounded-xl p-5 flex flex-col gap-4">
      {/* Card header */}
      <div className="flex items-center justify-between">
        <span className="font-sans text-sm font-bold text-heading">{title}</span>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1 font-sans font-bold text-sm text-[#6C7275] hover:text-heading transition-colors"
          >
            <Pencil size={12} /> Edit
          </button>
        )}
      </div>

      {editing ? (
        /* ── Edit form ── */
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="First Name" value={form.firstName ?? ""} onChange={set("firstName")} placeholder="First name" />
            <Field label="Last Name" value={form.lastName ?? ""} onChange={set("lastName")} placeholder="Last name" />
            <Field label="Phone" type="tel" value={form.phone ?? ""} onChange={set("phone")} placeholder="Phone number" />
            <Field label="Email" type="email" value={form.email ?? ""} onChange={set("email")} placeholder="Email address" />
          </div>
          <Field label="Street Address" value={form.streetAddress ?? ""} onChange={set("streetAddress")} placeholder="Street address" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Country" value={form.country ?? ""} onChange={set("country")} placeholder="Country" />
            <Field label="City" value={form.city ?? ""} onChange={set("city")} placeholder="City" />
            <Field label="State" value={form.state ?? ""} onChange={set("state")} placeholder="State" />
            <Field label="Zip Code" value={form.zipCode ?? ""} onChange={set("zipCode")} placeholder="Zip code" />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#001F3F] text-white font-sans font-bold text-sm px-6 py-3 rounded-md hover:bg-black/90 transition-colors disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              onClick={() => { setEditing(false); setForm(address); }}
              className="font-sans text-sm text-body hover:text-heading transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* ── Summary view ── */
        <div className="flex flex-col gap-0.5">
          <p className="font-sans text-sm text-heading">{summaryName}</p>
          <p className="font-sans text-sm text-body">{address?.phone}</p>
          <p className="font-sans text-sm text-body">{summaryAddress}</p>
        </div>
      )}
    </div>
  );
};

// ── Address Tab ───────────────────────────────────────────────────────────────
const AddressTab = ({ addresses, onSaveBilling, onSaveShipping }) => (
  <div className="flex flex-col gap-5">
    <h2 className="font-heading text-2xl text-heading">Address</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AddressCard title="Billing Address" address={addresses?.billing} onSave={onSaveBilling} />
      <AddressCard title="Shipping Address" address={addresses?.shipping} onSave={onSaveShipping} />
    </div>
  </div>
);

// ── Orders Tab ────────────────────────────────────────────────────────────────
const OrdersTab = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl text-heading">Orders History</h2>
        <p className="font-sans text-sm text-body">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-heading text-2xl text-heading">Orders History</h2>

      {/* ── Desktop table ── */}
      <table className="hidden md:table w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            {["Number ID", "Dates", "Status", "Price"].map((col) => (
              <th
                key={col}
                className="text-left font-sans text-sm text-body font-normal pb-3 pr-6 last:pr-0"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderCode} className="border-b border-gray-100">
              <td className="py-4 pr-6 font-sans text-sm text-[#030206]">{order.orderCode}</td>
              <td className="py-4 pr-6 font-sans text-sm text-[#030206]">{order.date}</td>
              <td className="py-4 pr-6 font-sans text-sm text-[#030206]">{order.status}</td>
              <td className="py-4 font-sans text-sm text-[#030206]">${order.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Mobile label-value list ── */}
      <div className="md:hidden flex flex-col divide-y divide-gray-100">
        {orders.map((order) => (
          <div key={order.orderCode} className="py-4 grid grid-cols-2 gap-y-2">
            <span className="font-sans text-xs text-body">Number ID</span>
            <span className="font-sans text-xs text-heading">{order.orderCode}</span>
            <span className="font-sans text-xs text-body">Dates</span>
            <span className="font-sans text-xs text-heading">{order.date}</span>
            <span className="font-sans text-xs text-body">Status</span>
            <span className="font-sans text-xs text-heading">{order.status}</span>
            <span className="font-sans text-xs text-body">Price</span>
            <span className="font-sans text-xs text-heading">${order.total.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Wishlist Tab ──────────────────────────────────────────────────────────────
const WishlistTab = ({ wishlist, onRemove }) => {
  const { addToCart } = useCart();

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl text-heading">Your Wishlist</h2>
        <p className="font-sans text-sm text-body">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-heading text-2xl text-heading">Your Wishlist</h2>

      {/* ── Desktop table ── */}
      <table className="hidden md:table w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="w-8 pb-3" />
            {["Product", "Price", "Action"].map((col) => (
              <th
                key={col}
                className="text-left font-sans text-sm text-body font-normal pb-3 pr-8 last:pr-0"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {wishlist.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              {/* Remove */}
              <td className="py-4 pr-2">
                <button
                  onClick={() => onRemove(item.id)}
                  className="font-sans text-lg text-body hover:text-heading transition-colors leading-none"
                >
                  ×
                </button>
              </td>
              {/* Product */}
              <td className="py-4 pr-8">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#F3F5F7] rounded-lg flex-shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply p-1.5"
                    />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-heading">{item.name}</p>
                    <p className="font-sans text-xs text-body">Quality: {item.quality}</p>
                  </div>
                </div>
              </td>
              {/* Price */}
              <td className="py-4 pr-8 font-sans font-bold text-sm text-heading">${item.price.toFixed(2)}</td>
              {/* Action */}
              <td className="py-4">
                <button
                  onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                  className="bg-[#001F3F] text-white font-sans text-sm font-bold px-6 py-2.5 rounded-md hover:bg-black/90 transition-colors whitespace-nowrap"
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Mobile list ── */}
      <div className="md:hidden">
        <p className="font-sans text-sm text-body mb-3">Product</p>
        <div className="flex flex-col divide-y divide-gray-100">
          {wishlist.map((item) => (
            <div key={item.id} className="py-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onRemove(item.id)}
                  className="font-sans text-lg text-body hover:text-heading transition-colors leading-none flex-shrink-0"
                >
                  ×
                </button>
                <div className="w-14 h-14 bg-[#F3F5F7] rounded-lg flex-shrink-0 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain mix-blend-multiply p-1.5"
                  />
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold text-heading">{item.name}</p>
                  <p className="font-sans text-xs text-body">Quality: {item.quality}</p>
                  <p className="font-sans text-sm text-heading mt-1">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                className="w-full bg-[#001F3F] text-white font-sans text-sm font-bold py-3 rounded-md hover:bg-black/90 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main Account Page ─────────────────────────────────────────────────────────
const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [orders, setOrders] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [prof, addr, ord, wish] = await Promise.all([
          getProfile(),
          getAddresses(),
          getOrders(),
          getWishlist(),
        ]);
        setProfile(prof);
        setAddresses(addr);
        setOrders(ord);
        setWishlist(wish);
      } catch (err) {
        console.error("Failed to load account data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleSaveProfile = async (form) => {
    const updated = await updateProfile(form);
    setProfile(updated);
  };

  const handleSaveBillingAddress = async (form) => {
    const updated = await updateBillingAddress(form);
    setAddresses((prev) => ({ ...prev, billing: updated }));
  };

  const handleSaveShippingAddress = async (form) => {
    const updated = await updateShippingAddress(form);
    setAddresses((prev) => ({ ...prev, shipping: updated }));
  };

  const handleRemoveWishlist = async (productId) => {
    await removeFromWishlist(productId);
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleLogout = () => {
    // When backend is ready: clear auth token here before navigating
    navigate("/login");
  };

  // Avatar initials fallback
  const initials = profile
    ? `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  const displayName = profile ? `${profile.firstName} ${profile.lastName}` : "Loading…";

  if (loading) {
    return (
      <div className="container mx-auto px-6 md:px-12 lg:px-28 py-16 flex items-center justify-center">
        <p className="font-sans text-sm text-body">Loading account…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-28 py-8 md:py-12">

      {/* ── Page heading ── */}
      <h1 className="font-heading text-4xl md:text-5xl text-heading text-center mb-8 md:mb-12">
        My Account
      </h1>

      {/* ── Mobile: avatar + name + select dropdown ────────────────────────── */}
      <div className="flex flex-col items-center gap-4 md:hidden mb-8">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-[#001F3F] flex items-center justify-center text-white font-heading text-2xl overflow-hidden">
            {profile?.avatar ? (
              <img src={profile.avatar} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#00C2FF] flex items-center justify-center border-2 border-white">
            <Camera size={12} className="text-white" />
          </button>
        </div>

        {/* Name */}
        <p className="font-heading text-lg text-heading">{displayName}</p>

        {/* Tab select */}
        <div className="relative w-full">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 font-sans text-sm text-heading focus:outline-none focus:border-heading appearance-none bg-white"
          >
            {TABS.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
            <option value="logout">Log Out</option>
          </select>
          {/* Chevron icon */}
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-body">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>

        {activeTab === "logout" && (
          <button
            onClick={handleLogout}
            className="w-full border border-red-200 text-red-500 font-sans text-sm font-semibold py-3 rounded-md hover:bg-red-50 transition-colors"
          >
            Confirm Log Out
          </button>
        )}
      </div>

      {/* ── Desktop: two-column layout ────────────────────────────────────── */}
      <div className="hidden md:flex gap-10 lg:gap-16 items-start">

        {/* Sidebar */}
        <aside className="w-48 flex-shrink-0 flex flex-col items-center bg-[#F3F5F7] rounded-2xl pt-8 pb-6 sticky top-24">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#001F3F] flex items-center justify-center text-white font-heading text-3xl overflow-hidden">
              {profile?.avatar ? (
                <img src={profile.avatar} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#00C2FF] flex items-center justify-center border-2 border-white">
              <Camera size={13} className="text-white" />
            </button>
          </div>

          {/* Name */}
          <p className="font-heading text-lg text-heading text-center leading-tight mt-4 mb-6 px-4">{displayName}</p>

          {/* Nav */}
          <nav className="w-full flex flex-col px-5">
            {TABS.map((tab) => (
              <div key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left font-sans text-sm py-2.5 transition-colors ${
                    activeTab === tab.id
                      ? "font-semibold text-heading"
                      : "text-body hover:text-heading"
                  }`}
                >
                  {tab.label}
                </button>
                {activeTab === tab.id && (
                  <hr className="border-0 border-t border-[#141718]" />
                )}
              </div>
            ))}

            {/* Divider */}
            <div className="my-3 border-t border-gray-300" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full text-left font-sans text-sm text-body hover:text-heading transition-colors py-2.5"
            >
              Log Out
            </button>
          </nav>
        </aside>

        {/* Content panel */}
        <div className="flex-1 min-w-0">
          {activeTab === "account" && (
            <AccountTab profile={profile} onSave={handleSaveProfile} />
          )}
          {activeTab === "address" && (
            <AddressTab addresses={addresses} onSaveBilling={handleSaveBillingAddress} onSaveShipping={handleSaveShippingAddress} />
          )}
          {activeTab === "orders" && <OrdersTab orders={orders} />}
          {activeTab === "wishlist" && (
            <WishlistTab wishlist={wishlist} onRemove={handleRemoveWishlist} />
          )}
        </div>
      </div>

      {/* ── Mobile content panel ───────────────────────────────────────────── */}
      <div className="md:hidden">
        {activeTab === "account" && (
          <AccountTab profile={profile} onSave={handleSaveProfile} />
        )}
        {activeTab === "address" && (
          <AddressTab addresses={addresses} onSaveBilling={handleSaveBillingAddress} onSaveShipping={handleSaveShippingAddress} />
        )}
        {activeTab === "orders" && <OrdersTab orders={orders} />}
        {activeTab === "wishlist" && (
          <WishlistTab wishlist={wishlist} onRemove={handleRemoveWishlist} />
        )}
      </div>
    </div>
  );
};

export default Account;
