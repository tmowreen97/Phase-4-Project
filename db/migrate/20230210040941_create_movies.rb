class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.integer :year
      t.string :image_url
      t.string :genre
      t.string :description
      t.float :rating
      t.integer :runtime

      t.timestamps
    end
  end
end
