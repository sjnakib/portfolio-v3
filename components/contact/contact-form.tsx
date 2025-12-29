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
import { Mail, MapPin, Send, Check } from "lucide-react";
import siteSettings from "@/data/siteSettings.json";
import { SocialLinks } from "@/components/social-links";

const MAX_MESSAGE_LENGTH = 5000;

export function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject should be at least 3 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message should not exceed ${MAX_MESSAGE_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
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
    const { name, value } = e.target;

    // Clear error for this field as user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
            If you have a project, a question, or just want to talk, feel free
            to reach out.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Email me:</p>
              <a
                href={`mailto:${siteSettings.owner.email}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {siteSettings.owner.email}
              </a>
            </div>
          </div>

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
          title="Connect with me on"
          variant="rounded"
          linkClassName="transition-colors"
        />

        <p className="text-muted-foreground text-pretty text-sm">
          I am actually active there! 😂
        </p>

        <div className="pt-6 border-t border-border">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">
              Expected Response Time:
            </span>{" "}
            Within 2-6 hours (anyday)
          </p>
          <p className="text-muted-foreground mt-2">
            <span className="font-medium text-foreground">Availability:</span>{" "}
            Open to freelance projects, full-time opportunities (on-site,
            hybrid, remote).
          </p>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border transform -translate-x-1/2" />

      {/* Contact Form */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            Create Email Thread
          </h3>
          <p className="text-muted-foreground text-sm">
            Start the conversation here.
          </p>
        </div>

        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="p-0">
            {status.type && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${
                  status.type === "success"
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-destructive/10 border border-destructive/20"
                }`}
              >
                {status.type === "success" && (
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                )}
                <AlertDescription
                  className={
                    status.type === "success"
                      ? "text-primary font-medium"
                      : "text-destructive"
                  }
                >
                  {status.message}
                </AlertDescription>
              </div>
            )}

            {/* Gmail-style compose box */}
            <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
              <form onSubmit={handleSubmit} className="flex flex-col">
                {/* To: Email Field */}
                <div className="border-b border-border px-4 py-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-muted-foreground min-w-fit">
                      From:
                    </span>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className={`border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:outline-none text-sm ${
                        errors.email ? "text-destructive" : ""
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-destructive flex items-center gap-1 mt-1 ml-14">
                      <span>⚠</span> {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div className="border-b border-border px-4 py-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-muted-foreground min-w-fit">
                      Subject:
                    </span>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      autoComplete="off"
                      className={`border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:outline-none font-medium text-sm ${
                        errors.subject ? "text-destructive" : ""
                      }`}
                    />
                  </div>
                  {errors.subject && (
                    <p className="text-xs text-destructive flex items-center gap-1 mt-1 ml-20">
                      <span>⚠</span> {errors.subject}
                    </p>
                  )}
                </div>
                {/* Message Compose Area */}
                <div className="px-4 py-3 flex-1 relative">
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Compose your message..."
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={MAX_MESSAGE_LENGTH}
                    className={`border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:outline-none resize-none min-h-[120px] text-sm ${
                      errors.message ? "text-destructive" : ""
                    }`}
                  />
                  {errors.message ? (
                    <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                      <span>⚠</span> {errors.message}
                    </p>
                  ) : null}
                </div>

                {/* Footer with char count and buttons */}
                <div className="border-t border-border px-4 py-2 bg-muted/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {formData.message.length}/{MAX_MESSAGE_LENGTH}
                    </span>
                    {formData.message.length > 0 && (
                      <div className="h-1 w-16 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{
                            width: `${
                              (formData.message.length / MAX_MESSAGE_LENGTH) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="sm"
                    className="gap-2 text-xs"
                  >
                    <Send className="h-3 w-3" />
                    {isSubmitting ? "Creating..." : "Create Thread"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Privacy notice */}
            <p className="text-xs text-muted-foreground mt-4">
              ✓ Your email will be used only to respond to your inquiry and
              maintain our conversation thread.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
