class ChangeMovieIdToIntInReviews < ActiveRecord::Migration[6.1]
  def change
    change_column :reviews, :movie_id, :integer, using: 'movie_id::integer'

  end
end
