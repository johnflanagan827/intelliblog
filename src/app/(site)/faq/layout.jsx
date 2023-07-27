import DefaultNavbar from "../../components/DefaultNavbar";

export default function FaqLayout({ children}) {     
    return (
      <section>
        <DefaultNavbar />
        {children}
        </section>
    )
  }