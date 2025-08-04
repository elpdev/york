# Custom sitemap tasks for Jessica York Art Portfolio

namespace :sitemap do
  desc "Refresh sitemap and ping search engines"
  task refresh: :environment do
    puts "Generating sitemap..."
    Rake::Task["sitemap:create"].invoke

    puts "Sitemap generated successfully!"
    puts "Files created in public/sitemaps/"

    # Optional: Add automatic pinging here if desired
    # SitemapGenerator::Sitemap.ping_search_engines

    puts "Remember to update your domain in config/sitemap.rb and public/robots.txt"
    puts "Current domain: #{SitemapGenerator::Sitemap.default_host}"
  end

  desc "Show sitemap statistics"
  task stats: :environment do
    sitemap_path = Rails.root.join("public", "sitemaps", "sitemap.xml.gz")

    if File.exist?(sitemap_path)
      puts "Sitemap file: #{sitemap_path}"
      puts "File size: #{File.size(sitemap_path)} bytes"
      puts "Last modified: #{File.mtime(sitemap_path)}"

      # Count URLs in sitemap
      content = `zcat #{sitemap_path}`
      url_count = content.scan("<url>").count
      puts "URLs in sitemap: #{url_count}"
    else
      puts "No sitemap found. Run 'rails sitemap:create' first."
    end
  end
end

