import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="carousel"
export default class extends Controller {
  static targets = ["slide", "container"];

  connect() {
    this.currentIndex = 0;
    this.totalSlides = this.slideTargets.length;
    this.autoPlay = true;
    this.autoPlayInterval = 4000; // 4 seconds

    if (this.totalSlides > 0) {
      this.startAutoPlay();
    }
  }

  disconnect() {
    this.stopAutoPlay();
  }

  goToNextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
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
  }

  startAutoPlay() {
    if (this.autoPlay && this.totalSlides > 1) {
      this.autoPlayTimer = setInterval(() => {
        this.goToNextSlide();
        console.log("auto play");
      }, this.autoPlayInterval);
    }
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
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
