"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
} from "lucide-react";
import { CardCorners } from "@/components/ui/hoverable-card";

export interface ImageCarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ImageCarouselDialogProps {
  images: ImageCarouselImage[];
  initialIndex?: number;
  onClose?: () => void;
}

/**
 * ImageCarouselDialog - A reusable image carousel viewer with zoom/pan functionality
 *
 * Features:
 * - Full-screen image viewing with carousel navigation
 * - Zoom in/out with mouse wheel, buttons, and pinch gestures
 * - Pan/drag images when zoomed
 * - Double-tap/double-click to zoom
 * - Touch gestures for mobile (pinch, pan, swipe)
 * - Keyboard navigation (arrow keys, +/-, 0 to reset)
 * - Thumbnail dots for quick navigation
 * - Responsive design for mobile and desktop
 *
 * @param images - Array of images to display
 * @param initialIndex - Optional starting index (defaults to 0)
 */
export function ImageCarouselDialog({
  images,
  initialIndex = 0,
  onClose,
}: ImageCarouselDialogProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTap, setLastTap] = useState(0);
  const [initialPinchDistance, setInitialPinchDistance] = useState<
    number | null
  >(null);
  const [initialScale, setInitialScale] = useState(1);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  const ZOOM_STEP = 0.3;

  // Reset zoom when changing images
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

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

  // Zoom functions
  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + ZOOM_STEP, MAX_SCALE));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => {
      const newScale = Math.max(prev - ZOOM_STEP, MIN_SCALE);
      if (newScale === MIN_SCALE) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setScale(MIN_SCALE);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Navigation handlers that reset zoom before navigating
  const handlePrevious = useCallback(() => {
    if (scale > MIN_SCALE) {
      resetZoom();
      // Wait for zoom reset animation to complete before navigating
      setTimeout(() => {
        carouselApi?.scrollPrev();
      }, 200);
    } else {
      carouselApi?.scrollPrev();
    }
  }, [scale, carouselApi]);

  const handleNext = useCallback(() => {
    if (scale > MIN_SCALE) {
      resetZoom();
      // Wait for zoom reset animation to complete before navigating
      setTimeout(() => {
        carouselApi?.scrollNext();
      }, 200);
    } else {
      carouselApi?.scrollNext();
    }
  }, [scale, carouselApi]);

  // Calculate distance between two touch points
  const getTouchDistance = (touches: React.TouchList) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
  };

  // Touch event handlers for pinch-to-zoom
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch gesture
        const distance = getTouchDistance(e.touches);
        setInitialPinchDistance(distance);
        setInitialScale(scale);
      } else if (e.touches.length === 1) {
        // Single touch for dragging or double-tap
        const now = Date.now();
        const timeSinceLastTap = now - lastTap;

        if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
          // Double tap detected
          if (scale === MIN_SCALE) {
            setScale(2);
          } else {
            resetZoom();
          }
        }
        setLastTap(now);

        if (scale > MIN_SCALE) {
          setIsDragging(true);
          setDragStart({
            x: e.touches[0].clientX - position.x,
            y: e.touches[0].clientY - position.y,
          });
        }
      }
    },
    [scale, lastTap, position, resetZoom]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && initialPinchDistance !== null) {
        // Pinch zoom
        e.preventDefault();
        const currentDistance = getTouchDistance(e.touches);
        const scaleChange = currentDistance / initialPinchDistance;
        const newScale = Math.min(
          Math.max(initialScale * scaleChange, MIN_SCALE),
          MAX_SCALE
        );
        setScale(newScale);
      } else if (e.touches.length === 1 && isDragging && scale > MIN_SCALE) {
        // Pan while zoomed
        e.preventDefault();
        setPosition({
          x: e.touches[0].clientX - dragStart.x,
          y: e.touches[0].clientY - dragStart.y,
        });
      }
    },
    [isDragging, initialPinchDistance, initialScale, scale, dragStart]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setInitialPinchDistance(null);
  }, []);

  // Mouse event handlers for desktop
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale > MIN_SCALE) {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
      }
    },
    [scale, position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && scale > MIN_SCALE) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, scale, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Double-click to zoom
  const handleDoubleClick = useCallback(() => {
    if (scale === MIN_SCALE) {
      setScale(2);
    } else {
      resetZoom();
    }
  }, [scale, resetZoom]);

  // Mouse wheel zoom
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    },
    [zoomIn, zoomOut]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        zoomIn();
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        zoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        resetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrevious, handleNext]);

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
        <AspectRatio ratio={16 / 9} className="bg-muted/20">
          <div
            ref={imageContainerRef}
            className="relative w-full h-full overflow-hidden cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={handleDoubleClick}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: scale > MIN_SCALE ? "none" : "auto" }}
          >
            <div
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? "none" : "transform 0.2s ease-out",
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <Image
                src={images[0].src}
                alt={images[0].alt}
                width={1920}
                height={1080}
                className="object-contain pointer-events-none"
                style={{
                  maxWidth: scale === MIN_SCALE ? "100%" : "none",
                  maxHeight: scale === MIN_SCALE ? "100%" : "none",
                  width: "auto",
                  height: "auto",
                }}
                priority
                loading="eager"
                sizes="(max-width: 640px) 90vw, 100vw"
                draggable={false}
              />
            </div>
          </div>
        </AspectRatio>

        {/* Close button and Zoom controls for single image */}
        <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
          {onClose && (
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 shadow-xl rounded-full"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 shadow-xl rounded-full"
            onClick={zoomIn}
            disabled={scale >= MAX_SCALE}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 shadow-xl rounded-full"
            onClick={zoomOut}
            disabled={scale <= MIN_SCALE}
            aria-label="Zoom out"
          >
            <ZoomOut className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 shadow-xl rounded-full"
            onClick={resetZoom}
            disabled={scale === MIN_SCALE}
            aria-label="Reset zoom"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        {images[0].caption && scale === MIN_SCALE && (
          <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 text-sm text-center backdrop-blur-sm">
            <span className="text-foreground">{images[0].caption}</span>
          </div>
        )}

        {/* Zoom indicator */}
        {scale > MIN_SCALE && (
          <div className="absolute top-4 left-4 z-50 bg-primary/90 px-3 py-1 rounded-full backdrop-blur-sm shadow-lg">
            <span className="text-primary-foreground text-sm font-medium">
              {Math.round(scale * 100)}%
            </span>
          </div>
        )}
      </div>
    );
  }

  // Multiple images - show carousel with navigation
  return (
    <div
      className="relative w-full bg-background flex items-center justify-center"
      style={{ height: "min(80vh, 90vh)" }}
    >
      <Carousel
        setApi={setCarouselApi}
        opts={{
          loop: true,
          align: "center",
          startIndex: initialIndex,
          watchDrag: scale === MIN_SCALE, // Disable carousel drag when zoomed
        }}
        className="w-full h-full"
      >
        <CarouselContent className="h-full ml-0">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full pl-0">
              <div className="relative flex items-center justify-center h-full w-full px-4">
                <div
                  ref={imageContainerRef}
                  className="relative w-full h-full flex items-center justify-center overflow-hidden"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onDoubleClick={handleDoubleClick}
                  onWheel={handleWheel}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{
                    cursor:
                      scale > MIN_SCALE
                        ? isDragging
                          ? "grabbing"
                          : "grab"
                        : "default",
                    touchAction: scale > MIN_SCALE ? "none" : "auto",
                  }}
                >
                  <div
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                      transition: isDragging
                        ? "none"
                        : "transform 0.2s ease-out",
                    }}
                    className="relative flex items-center justify-center w-full h-full"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1920}
                      height={1080}
                      className="object-contain pointer-events-none select-none"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                      }}
                      priority={index === initialIndex}
                      loading={index === initialIndex ? "eager" : "lazy"}
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 85vw, 80vw"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Buttons - always visible */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 shadow-xl z-50 rounded-full"
        onClick={handlePrevious}
        aria-label="Previous image"
      >
        <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 shadow-xl z-50 rounded-full"
        onClick={handleNext}
        aria-label="Next image"
      >
        <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      {/* Close button and Zoom controls */}
      <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
        {onClose && (
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 md:h-10 md:w-10 shadow-xl rounded-full"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        )}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 md:h-10 md:w-10 shadow-xl rounded-full"
          onClick={zoomIn}
          disabled={scale >= MAX_SCALE}
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 md:h-10 md:w-10 shadow-xl rounded-full"
          onClick={zoomOut}
          disabled={scale <= MIN_SCALE}
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 md:h-10 md:w-10 shadow-xl rounded-full"
          onClick={resetZoom}
          disabled={scale === MIN_SCALE}
          aria-label="Reset zoom"
        >
          <RotateCcw className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>

      {/* Zoom indicator */}
      {scale > MIN_SCALE && (
        <div className="absolute top-4 left-4 z-50 bg-primary/90 px-3 py-1 rounded-full backdrop-blur-sm shadow-lg">
          <span className="text-primary-foreground text-sm font-medium">
            {Math.round(scale * 100)}%
          </span>
        </div>
      )}

      {/* Image counter - bottom centered, above thumbnail dots */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-50 bg-muted/80 px-3 py-1 rounded-full backdrop-blur-sm shadow-lg">
        <span className="text-foreground text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnail dots navigation - hide when zoomed */}
      {scale === MIN_SCALE && (
        <ThumbnailDots
          images={images}
          currentIndex={currentIndex}
          onThumbnailClick={(index) => {
            carouselApi?.scrollTo(index);
            setCurrentIndex(index);
          }}
        />
      )}
    </div>
  );
}

// Memoized thumbnail dots component to prevent unnecessary re-renders
const ThumbnailDots = memo(function ThumbnailDots({
  images,
  currentIndex,
  onThumbnailClick,
}: {
  images: ImageCarouselImage[];
  currentIndex: number;
  onThumbnailClick: (index: number) => void;
}) {
  return (
    <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-1.5 md:gap-2 bg-muted/80 px-3 md:px-4 py-1.5 md:py-2 rounded-full backdrop-blur-sm shadow-lg">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => onThumbnailClick(index)}
          className={`rounded-full transition-all duration-300 ${
            index === currentIndex
              ? "bg-primary w-4 md:w-6 h-1.5 md:h-2"
              : "bg-muted-foreground/50 hover:bg-muted-foreground/75 w-1.5 h-1.5 md:w-2 md:h-2"
          }`}
          aria-label={`Go to image ${index + 1}`}
        />
      ))}
    </div>
  );
});
