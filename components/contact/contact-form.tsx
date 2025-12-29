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
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-6">
            Create Email Thread
          </h3>
          <p className="text-muted-foreground mb-8 text-pretty">
            Share your inquiry, and I'll add you to an email thread for direct
            conversation.
          </p>
        </div>

        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="p-0">
            {status.type && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${
                  status.type === "success"
                    ? "bg-success/10 border border-success/20"
                    : "bg-destructive/10 border border-destructive/20"
                }`}
              >
                {status.type === "success" && (
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                )}
                <AlertDescription
                  className={
                    status.type === "success"
                      ? "text-success"
                      : "text-destructive"
                  }
                >
                  {status.message}
                </AlertDescription>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email Address <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={`${
                    errors.email
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <span>⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-foreground"
                >
                  Subject <span className="text-destructive">*</span>
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="e.g., Collaboration Opportunity, Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`${
                    errors.subject
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <span>⚠</span> {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message <span className="text-destructive">*</span>
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {formData.message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, opportunity, or inquiry. Be as detailed as you'd like..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={MAX_MESSAGE_LENGTH}
                  className={`resize-none ${
                    errors.message
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                />
                {errors.message ? (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <span>⚠</span> {errors.message}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {formData.message.length === 0
                      ? "Add some context to help me understand your inquiry better"
                      : `${(
                          ((MAX_MESSAGE_LENGTH - formData.message.length) /
                            MAX_MESSAGE_LENGTH) *
                          100
                        ).toFixed(0)}% space remaining`}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Creating..." : "Create Thread"}
                </Button>

                <p className="text-xs text-muted-foreground mt-4">
                  ✓ Your email will be used only to respond to your inquiry and
                  maintain our conversation thread.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
