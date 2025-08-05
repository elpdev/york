// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "flowbite";
import "controllers";

import "trix";
import "@rails/actiontext";

// In your application.js or wherever you configure Trix
import { DirectUpload } from "@rails/activestorage";

// This enables direct uploads for all rich text areas
window.addEventListener("trix-attachment-add", (event) => {
  const { attachment, target } = event;
  if (attachment.file) {
    const upload = new DirectUpload(
      attachment.file,
      target.dataset.directUploadUrl,
    );
    // ... handle the upload
  }
});

import "trix"
import "@rails/actiontext"
