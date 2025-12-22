"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CardCorners } from "@/components/ui/hoverable-card";

export interface ImageCarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ImageCarouselDialogProps {
  images: ImageCarouselImage[];
  initialIndex?: number;
}

/**
 * ImageCarouselDialog - A reusable image carousel viewer for project screenshots
 *
 * Features:
 * - Full-screen image viewing with carousel navigation
 * - Keyboard navigation support (arrow keys)
 * - Thumbnail dots for quick navigation
 * - Image captions and metadata display
 * - Responsive design for mobile and desktop
 * - Optimized image loading with Next.js Image component
 *
 * @param images - Array of images to display
 * @param initialIndex - Optional starting index (defaults to 0)
 */
export function ImageCarouselDialog({
  images,
  initialIndex = 0,
}: ImageCarouselDialogProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Update current index when carousel scrolls
  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", handleSelect);
    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        carouselApi?.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        carouselApi?.scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [carouselApi]);

  // Scroll to initial index when component mounts
  useEffect(() => {
    if (carouselApi && initialIndex > 0) {
      carouselApi.scrollTo(initialIndex, true);
    }
  }, [carouselApi, initialIndex]);

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-muted-foreground">
        No images available
      </div>
    );
  }

  // If only one image, show it without carousel controls
  if (images.length === 1) {
    return (
      <div className="relative h-full w-full">
        <CardCorners className="w-4 h-4 z-10" />
        <AspectRatio ratio={16 / 9} className="bg-black">
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="w-full h-full object-contain"
          />
        </AspectRatio>
        {images[0].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 text-sm text-center backdrop-blur-sm">
            {images[0].caption}
          </div>
        )}
      </div>
    );
  }

  // Multiple images - show carousel with navigation
  return (
    <div className="relative w-full h-[90vh] bg-black">
      <Carousel
        setApi={setCarouselApi}
        opts={{
          loop: true,
          align: "center",
          startIndex: initialIndex,
        }}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="flex flex-col items-center justify-center h-full p-4 md:p-8">
                <div className="relative w-full h-[calc(100%-100px)] flex items-center justify-center">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="max-w-full max-h-full object-contain"
                    loading={index === initialIndex ? "eager" : "lazy"}
                  />
                </div>
                <div className="text-center space-y-2 mt-4">
                  <p className="text-white font-medium">{image.alt}</p>
                  {image.caption && (
                    <p className="text-gray-400 text-sm">{image.caption}</p>
                  )}
                  <p className="text-gray-500 text-xs">
                    Image {index + 1} of {images.length}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/90 hover:bg-white border-2 border-white/50 text-black shadow-xl z-50 rounded-full"
        onClick={() => carouselApi?.scrollPrev()}
        aria-label="Previous image"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/90 hover:bg-white border-2 border-white/50 text-black shadow-xl z-50 rounded-full"
        onClick={() => carouselApi?.scrollNext()}
        aria-label="Next image"
      >
        <ArrowRight className="h-6 w-6" />
      </Button>

      {/* Thumbnail dots navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              carouselApi?.scrollTo(index);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
