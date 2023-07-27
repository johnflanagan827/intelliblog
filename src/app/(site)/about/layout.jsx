import DefaultNavbar from "../../components/DefaultNavbar";

export default function AboutLayout({ children}) {     
    return (
      <section>
        <DefaultNavbar />
        {children}
        </section>
    )
  }