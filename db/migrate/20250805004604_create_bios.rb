class CreateBios < ActiveRecord::Migration[8.0]
  def change
    create_table :bios do |t|
      t.string :title

      t.timestamps
    end
  end
end
