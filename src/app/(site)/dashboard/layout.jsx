import Navbar from "../../components/Navbar";

export default function DashboardLayout({ children}) {
      const submenuNav = [
        { title: "Browse Posts", path: "/dashboard/browse" },
        { title: "Media Generation", path: "/dashboard/media" },
        { title: "Prompt Generation", path: "/dashboard/prompt" },
      ]

    return (
      <section>
        <Navbar submenuNav={submenuNav}/>
        {children}
        </section>
    )
  }