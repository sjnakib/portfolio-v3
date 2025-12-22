"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  ExternalLink,
  Github,
  Calendar,
  User,
  Tag,
  CheckCircle,
  XCircle,
  TrendingUp,
  Maximize2,
} from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [lightboxApi, setLightboxApi] = useState<CarouselApi>();

  const openLightbox = (index: number) => {
    console.log("=== OPENING LIGHTBOX ===");
    console.log("Index:", index);
    console.log("Total images:", project.images.length);
    console.log("Images:", project.images);
    console.log("Setting lightboxOpen to true");
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Scroll to correct index when lightbox opens and API is ready
  useEffect(() => {
    if (lightboxOpen && lightboxApi) {
      console.log("Scrolling to index:", lightboxIndex);
      lightboxApi.scrollTo(lightboxIndex, true);
    }
  }, [lightboxOpen, lightboxApi, lightboxIndex]);

  // Update lightboxIndex when carousel scrolls
  const handleLightboxSelect = () => {
    if (!lightboxApi) return;
    setLightboxIndex(lightboxApi.selectedScrollSnap());
  };

  // Listen for carousel selection changes
  useEffect(() => {
    if (!lightboxApi) return;

    lightboxApi.on("select", handleLightboxSelect);

    return () => {
      lightboxApi.off("select", handleLightboxSelect);
    };
  }, [lightboxApi]);

  // Add keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen || !lightboxApi) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        lightboxApi.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        lightboxApi.scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, lightboxApi]);

  console.log(
    "ProjectDetail render - lightboxOpen:",
    lightboxOpen,
    "lightboxIndex:",
    lightboxIndex
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden mb-16 bg-muted h-[40vh] md:h-[50vh]">
        <img
          src={project.images[0]?.src || "/placeholder.svg"}
          alt={`${project.title} project screenshot`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end">
          <div className="p-8 text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance mb-4">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-3xl text-pretty mb-6">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  className="bg-white/20 text-white hover:bg-white/30 text-base"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Carousel - Show only if multiple images */}
      {project.images.length > 1 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {project.images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative group">
                    <button
                      type="button"
                      className="relative aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer border-2 border-border hover:border-primary/50 transition-all duration-300 w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openLightbox(index);
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                        <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </button>
                    {image.caption && (
                      <p className="text-sm text-muted-foreground mt-2 text-center px-2">
                        {image.caption}
                      </p>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12" />
            <CarouselNext className="-right-4 md:-right-12" />
          </Carousel>
        </div>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] h-[90vh] p-0 overflow-hidden bg-black border-0"
          showCloseButton={true}
        >
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <Carousel
              setApi={setLightboxApi}
              opts={{
                startIndex: lightboxIndex,
                loop: true,
              }}
              className="w-full h-full"
            >
              <CarouselContent className="h-full">
                {project.images.map((image, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="w-full h-full flex flex-col items-center justify-center p-8">
                      {/* Image container with explicit dimensions */}
                      <div
                        className="relative w-full max-w-5xl"
                        style={{ height: "70vh" }}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-contain"
                          sizes="90vw"
                          quality={95}
                          unoptimized
                        />
                      </div>
                      {/* Caption below image */}
                      <div className="text-center space-y-1 mt-4">
                        <p className="text-white font-medium text-sm md:text-base">
                          {image.alt}
                        </p>
                        {image.caption && (
                          <p className="text-gray-400 text-xs md:text-sm">
                            {image.caption}
                          </p>
                        )}
                        <p className="text-gray-500 text-xs">
                          Image {index + 1} of {project.images.length}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Manual navigation buttons for better control */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/90 hover:bg-white border-2 border-white/50 text-black shadow-xl z-50 rounded-full"
              onClick={() => lightboxApi?.scrollPrev()}
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/90 hover:bg-white border-2 border-white/50 text-black shadow-xl z-50 rounded-full"
              onClick={() => lightboxApi?.scrollNext()}
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>

            {/* Thumbnail navigation at bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    lightboxApi?.scrollTo(index);
                    setLightboxIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === lightboxIndex
                      ? "bg-white w-6"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Project Content */}
      <div className="grid lg:grid-cols-3 gap-16">
        {/* Left Column - Description */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none text-pretty">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.fullDescription}
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <ul className="space-y-4">
              {project.features.map((feature, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-6">Challenges & Solutions</h2>
            <ul className="space-y-6">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                    <h3 className="font-medium">Challenge {index + 1}</h3>
                  </div>
                  <p className="text-muted-foreground ml-7">{challenge}</p>
                </li>
              ))}
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-6">Outcomes & Results</h2>
            <ul className="space-y-4">
              {project.outcomes.map((outcome, index) => (
                <li key={index} className="flex gap-3">
                  <TrendingUp className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{outcome}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column - Project Info */}
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-bold">Project Details</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-muted-foreground">
                      {new Date(project.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Role</p>
                    <p className="text-muted-foreground">
                      {project.roles.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Type</p>
                    <p className="text-muted-foreground">
                      {project.type === "client-website" && "Client Website"}
                      {project.type === "personal-project" &&
                        "Personal Project"}
                      {project.type === "ui-mockup" && "UI/UX Design"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                {project.liveUrl && (
                  <Button className="w-full" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Project
                    </a>
                  </Button>
                )}

                {project.sourceUrl && (
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Source Code
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Me</h3>
            <p className="text-muted-foreground">
              Interested in a similar project? Let's discuss how I can help
              bring your ideas to life.
            </p>
            <Button className="w-full" asChild>
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Related Projects - Would be implemented with actual related project logic */}
    </div>
  );
}
