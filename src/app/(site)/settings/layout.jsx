import Navbar from "../../components/Navbar";

export default function SettingsLayout({ children }) {
  const submenuNav = [
    { title: "Edit Profile", path: "/settings/profile" },
    { title: "Notifications", path: "/settings/notifications" },
    { title: "Update Password", path: "/settings/update"},
    { title: "Delete Account", path: "/settings/delete" },
  ];

  return (
    <section>
      <Navbar submenuNav={submenuNav} />
      {children}
    </section>
  );
}
