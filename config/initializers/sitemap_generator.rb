# Sitemap Generator Configuration
# This ensures the sitemap generator works properly with Rails

# Create sitemaps directory if it doesn't exist
FileUtils.mkdir_p(Rails.root.join('public', 'sitemaps'))

# Optional: Configure search engine pinging
# Uncomment the lines below to ping search engines when sitemap is generated
# SitemapGenerator::Sitemap.search_engines = {
#   google: "http://www.google.com/webmasters/tools/ping?sitemap=%s",
#   bing: "http://www.bing.com/ping?sitemap=%s"
# }