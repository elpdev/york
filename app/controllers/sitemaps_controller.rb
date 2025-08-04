class SitemapsController < ApplicationController
  # Allow unauthenticated access for search engines
  allow_unauthenticated_access

  def show
    filename = params[:filename]

    # Debug logging
    Rails.logger.info "Sitemap request: filename=#{filename}"

    # Security: only allow expected sitemap filenames
    unless filename.match?(/\Asitemap\d*\.xml(\.gz)?\z/)
      Rails.logger.info "Filename rejected by regex: #{filename}"
      head :not_found
      return
    end

    # Use the filename as provided (should include full extension now)
    file_path = Rails.root.join("tmp", "sitemaps", filename)
    Rails.logger.info "Looking for file at: #{file_path}"
    Rails.logger.info "File exists: #{file_path && File.exist?(file_path)}"

    if File.exist?(file_path)
      Rails.logger.info "Serving file: #{file_path}"
      send_file file_path,
        type: "application/xml",
        disposition: "inline",
        filename: filename
    else
      Rails.logger.info "File not found: #{file_path}"
      head :not_found
    end
  end
end
