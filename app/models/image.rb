class Image < ApplicationRecord
  has_one_attached :image

  acts_as_list

  scope :ordered, -> { order(position: :asc) }
end
