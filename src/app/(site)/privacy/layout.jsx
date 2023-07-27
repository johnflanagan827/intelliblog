import DefaultNavbar from "../../components/DefaultNavbar";

export default function PrivacyLayout({ children}) {     
    return (
      <section>
        <DefaultNavbar />
        {children}
        </section>
    )
  }