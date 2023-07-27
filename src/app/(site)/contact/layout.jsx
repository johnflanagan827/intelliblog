import DefaultNavbar from "../../components/DefaultNavbar";

export default function ContactLayout({ children}) {     
    return (
      <section>
        <DefaultNavbar />
        {children}
        </section>
    )
  }