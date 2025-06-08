class Art < ApplicationRecord
  has_one_attached :image

  has_many_attached :child_images
end
