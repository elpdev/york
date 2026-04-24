# Sitemap Generator Configuration
# This ensures the sitemap generator works properly with Rails

# Create sitemaps directory if it doesn't exist with proper permissions
sitemaps_dir = Rails.root.join("tmp", "sitemaps")
FileUtils.mkdir_p(sitemaps_dir, mode: 0o755) unless File.directory?(sitemaps_dir)

# Optional: Configure search engine pinging
# Uncomment the lines below to ping search engines when sitemap is generated
# SitemapGenerator::Sitemap.search_engines = {
#   google: "http://www.google.com/webmasters/tools/ping?sitemap=%s",
#   bing: "http://www.bing.com/ping?sitemap=%s"
# }
