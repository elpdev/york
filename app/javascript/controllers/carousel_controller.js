import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="carousel"
export default class extends Controller {
  static targets = [
    "slide",
    "indicator",
    "container",
    "prevButton",
    "nextButton",
  ];

  connect() {
    this.currentIndex = 0;
    this.totalSlides = this.slideTargets.length;
    this.autoPlay = true;
    this.autoPlayInterval = 5000; // 5 seconds

    if (this.totalSlides > 0) {
      this.startAutoPlay();
      this.setupKeyboardNavigation();
    }
  }

  disconnect() {
    this.stopAutoPlay();
    this.removeKeyboardNavigation();
  }

  next() {
    this.stopAutoPlay();
    this.goToNextSlide();
    this.startAutoPlay();
  }

  previous() {
    this.stopAutoPlay();
    this.goToPreviousSlide();
    this.startAutoPlay();
  }

  goToSlide(event) {
    this.stopAutoPlay();
    const slideIndex = parseInt(event.currentTarget.dataset.slideIndex);
    this.showSlide(slideIndex);
    this.startAutoPlay();
  }

  goToNextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.showSlide(this.currentIndex);
  }

  goToPreviousSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(this.currentIndex);
  }

  showSlide(index) {
    this.currentIndex = index;

    // Update slides
    this.slideTargets.forEach((slide, i) => {
      slide.classList.remove(
        "translate-x-0",
        "translate-x-full",
        "translate-x-[-100%]"
      );

      if (i === index) {
        slide.classList.add("translate-x-0");
      } else if (i < index) {
        slide.classList.add("translate-x-[-100%]");
      } else {
        slide.classList.add("translate-x-full");
      }
    });

    // Update indicators
    this.indicatorTargets.forEach((indicator, i) => {
      indicator.classList.remove("bg-white", "bg-white/50");
      if (i === index) {
        indicator.classList.add("bg-white");
        indicator.setAttribute("aria-current", "true");
      } else {
        indicator.classList.add("bg-white/50");
        indicator.setAttribute("aria-current", "false");
      }
    });
  }

  startAutoPlay() {
    if (this.autoPlay && this.totalSlides > 1) {
      this.autoPlayTimer = setInterval(() => {
        this.goToNextSlide();
      }, this.autoPlayInterval);
    }
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  setupKeyboardNavigation() {
    this.keyboardHandler = this.handleKeyboard.bind(this);
    document.addEventListener("keydown", this.keyboardHandler);
  }

  removeKeyboardNavigation() {
    if (this.keyboardHandler) {
      document.removeEventListener("keydown", this.keyboardHandler);
    }
  }

  handleKeyboard(event) {
    // Only handle keyboard events when the carousel is focused or contains the focused element
    if (
      !this.element.contains(document.activeElement) &&
      document.activeElement !== this.element
    ) {
      return;
    }

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        this.previous();
        break;
      case "ArrowRight":
        event.preventDefault();
        this.next();
        break;
      case "Home":
        event.preventDefault();
        this.stopAutoPlay();
        this.showSlide(0);
        this.startAutoPlay();
        break;
      case "End":
        event.preventDefault();
        this.stopAutoPlay();
        this.showSlide(this.totalSlides - 1);
        this.startAutoPlay();
        break;
    }
  }

  // Pause auto-play on hover
  pauseAutoPlay() {
    this.stopAutoPlay();
  }

  // Resume auto-play when not hovering
  resumeAutoPlay() {
    this.startAutoPlay();
  }
}
