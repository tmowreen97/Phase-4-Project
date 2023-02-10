class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :user_id
      t.string :movie_id
      t.string :comment
      t.timestamps
    end
  end
end
