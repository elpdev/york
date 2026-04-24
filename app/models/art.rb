class Art < ApplicationRecord
  has_one_attached :image
  extend FriendlyId

  friendly_id :name, use: :slugged

  acts_as_list

  scope :ordered, -> { order(:position) }

  has_many_attached :child_images
end
