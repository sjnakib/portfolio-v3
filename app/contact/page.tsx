import { ContactForm } from "@/components/contact/contact-form"

export const metadata = {
  title: "Contact | Shafaat Jamil Nakib",
  description: "Get in touch with Shafaat Jamil Nakib for project inquiries, collaborations, or opportunities.",
}

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Contact Me</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a project in mind or want to discuss opportunities? I'd love to hear from you.
        </p>
      </div>
      <ContactForm />
    </main>
  )
}
