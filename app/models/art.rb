class Art < ApplicationRecord
  has_one_attached :image

  acts_as_list

  scope :ordered, -> { order(:position) }

  has_many_attached :child_images
end
