class SitemapsController < ApplicationController
  # Allow unauthenticated access for search engines
  allow_unauthenticated_access

  def show
    filename = params[:filename].to_s

    # Debug logging
    Rails.logger.info "Sitemap request: filename=#{filename}"

    unless filename.match?(/\Asitemap\d*\.xml(\.gz)?\z/)
      Rails.logger.info "Filename rejected by regex: #{filename}"
      head :not_found
      return
    end

    sitemaps_dir = Rails.root.join("tmp", "sitemaps")
    file_path = sitemaps_dir.children.find { |path| path.file? && path.basename.to_s == filename }
    Rails.logger.info "Looking for file at: #{file_path}"
    Rails.logger.info "File exists: #{file_path && File.exist?(file_path)}"

    if File.exist?(file_path)
      Rails.logger.info "Serving file: #{file_path}"
      send_file file_path,
        type: "application/xml",
        disposition: "inline",
        filename: file_path.basename.to_s
    else
      Rails.logger.info "File not found: #{file_path}"
      head :not_found
    end
  end
end
