import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "hamburger", "body"]

  connect() {
    this.isOpen = false
    this.handleEscape = this.handleEscape.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  toggle() {
    this.isOpen = !this.isOpen
    this.updateMenu()
  }

  open() {
    this.isOpen = true
    this.updateMenu()
  }

  close() {
    this.isOpen = false
    this.updateMenu()
  }

  updateMenu() {
    if (this.isOpen) {
      this.menuTarget.classList.add("active")
      this.hamburgerTarget.classList.add("active")
      document.body.classList.add("menu-open")
      document.addEventListener("keydown", this.handleEscape)
      setTimeout(() => {
        document.addEventListener("click", this.handleClickOutside)
      }, 100)
    } else {
      this.menuTarget.classList.remove("active")
      this.hamburgerTarget.classList.remove("active")
      document.body.classList.remove("menu-open")
      document.removeEventListener("keydown", this.handleEscape)
      document.removeEventListener("click", this.handleClickOutside)
    }
  }

  handleEscape(event) {
    if (event.key === "Escape") {
      this.close()
    }
  }

  handleClickOutside(event) {
    if (!this.element.contains(event.target)) {
      this.close()
    }
  }

  disconnect() {
    document.removeEventListener("keydown", this.handleEscape)
    document.removeEventListener("click", this.handleClickOutside)
  }
}