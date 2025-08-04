# Sitemap configuration for Jessica York Art Portfolio
SitemapGenerator::Sitemap.default_host = "https://jessicayorkart.com"
SitemapGenerator::Sitemap.public_path = "tmp/"
SitemapGenerator::Sitemap.sitemaps_path = "sitemaps/"
SitemapGenerator::Sitemap.compress = true

# Configure sitemap naming and limits
SitemapGenerator::Sitemap.sitemaps_host = SitemapGenerator::Sitemap.default_host
SitemapGenerator::Sitemap.create_index = :auto

SitemapGenerator::Sitemap.create do
  # Homepage - highest priority, changes daily due to carousel
  add root_path,
    priority: 1.0,
    changefreq: "daily",
    lastmod: [Art.maximum(:updated_at), HomePage.maximum(:updated_at)].compact.max || Time.current

  # Art gallery index - high priority, changes when new art is added
  art_lastmod = Art.maximum(:updated_at) || Time.current
  add arts_path,
    priority: 0.9,
    changefreq: "weekly",
    lastmod: art_lastmod

  # Individual art pieces - dynamic content from database
  Art.includes(:image_attachment).find_each do |art|
    add art_path(art),
      priority: 0.8,
      changefreq: "monthly",
      lastmod: art.updated_at

    # Optional: Add image sitemap for SEO (uncomment if desired)
    # if art.image.attached?
    #   add art_path(art),
    #       priority: 0.8,
    #       images: [{
    #         loc: url_for(art.image),
    #         title: art.name,
    #         caption: "Artwork by Jessica York: #{art.name}"
    #       }]
    # end
  end

  # Contact page - lower priority, static content
  add contact_path,
    priority: 0.6,
    changefreq: "monthly"

  # Add robots.txt reference
  add "/robots.txt",
    priority: 0.1,
    changefreq: "yearly"

  # Note: Admin routes are intentionally excluded from sitemap
  # as they should not be indexed by search engines
end

# Optional: Ping search engines after sitemap generation
# Uncomment to automatically notify search engines of sitemap updates
# SitemapGenerator::Sitemap.ping_search_engines

