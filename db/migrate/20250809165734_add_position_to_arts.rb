class AddPositionToArts < ActiveRecord::Migration[8.0]
  def change
    add_column :arts, :position, :integer
  end
end
