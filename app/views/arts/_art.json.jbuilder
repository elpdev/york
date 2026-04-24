json.extract! art, :id, :name, :image, :created_at, :updated_at
json.url art_url(art, format: :json)
json.image url_for(art.image)
