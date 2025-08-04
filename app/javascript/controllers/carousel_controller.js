import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="carousel"
export default class extends Controller {
  static targets = ["slide", "container", "indicators"];

  connect() {
    this.currentIndex = 0;
    this.totalSlides = this.slideTargets.length;
    this.autoPlay = true;
    this.autoPlayInterval = 4000; // 4 seconds

    console.log("Carousel connected");
    console.log("Total slides:", this.totalSlides);

    if (this.totalSlides > 0) {
      this.startAutoPlay();
      this.updateIndicators();
    }
  }

  disconnect() {
    this.stopAutoPlay();
  }

  goToNextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.showSlide(this.currentIndex);
  }

  goToPrevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(this.currentIndex);
  }

  goToSlide(event) {
    const index = parseInt(event.currentTarget.dataset.slideIndex);
    this.showSlide(index);
  }

  showSlide(index) {
    console.log("Showing slide:", index);
    this.currentIndex = index;

    // Update slides
    this.slideTargets.forEach((slide, i) => {
      slide.classList.remove("active", "prev");
      
      if (i === index) {
        slide.classList.add("active");
      } else if (i < index) {
        slide.classList.add("prev");
      }
    });

    this.updateIndicators();
  }

  updateIndicators() {
    if (!this.hasIndicatorsTarget) return;
    
    const indicators = this.indicatorsTarget.querySelectorAll(".carousel-indicator");
    indicators.forEach((indicator, i) => {
      if (i === this.currentIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
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

  // Pause auto-play on hover
  pauseAutoPlay() {
    this.stopAutoPlay();
  }

  // Resume auto-play when not hovering
  resumeAutoPlay() {
    this.startAutoPlay();
  }
}