class AddSlugToArts < ActiveRecord::Migration[8.0]
  def change
    add_column :arts, :slug, :string
    add_index :arts, :slug, unique: true
  end
end
