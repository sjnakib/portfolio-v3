"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import siteSettings from "@/data/siteSettings.json";
import { SocialLinks } from "@/components/social-links";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: data.message || "Your message has been sent successfully!",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Contact Information */}
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-6">
            Let's Connect
          </h3>
          <p className="text-muted-foreground mb-8 text-pretty">
            Whether you're looking for a full-stack developer, robotics
            engineer, or someone who can bridge both worlds, I'm here to help
            bring your ideas to life. Feel free to reach out for collaborations,
            questions, or just to say hello!
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Email</p>
              <a
                href={`mailto:${siteSettings.owner.email}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {siteSettings.owner.email}
              </a>
            </div>
          </div>

          {siteSettings.owner.phone && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <p className="text-muted-foreground">
                  {siteSettings.owner.phone}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Location</p>
              <p className="text-muted-foreground">
                {siteSettings.owner.location}
              </p>
            </div>
          </div>
        </div>

        <SocialLinks
          title="Connect with me"
          variant="rounded"
          linkClassName="transition-colors"
        />

        <div className="pt-6">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">
              Expected Response Time:
            </span>{" "}
            Within 24-48 hours
          </p>
          <p className="text-muted-foreground mt-2">
            <span className="font-medium text-foreground">Availability:</span>{" "}
            Open to freelance projects, full-time opportunities, and
            collaborations
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
          <CardDescription>
            Fill out the form below and I'll get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status.type && (
            <Alert
              className={`mb-6 ${
                status.type === "success"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <Input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Your information is kept private and will only be used to respond
              to your inquiry.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
