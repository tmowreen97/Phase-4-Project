class Review < ApplicationRecord
  # ensures movie_id/user_id is an int, makes sure movie_id, user_id, comment is all present
  # defines relationship between movie and user
  validates :movie_id,numericality: { only_integer: true }, presence: true
  validates :user_id,numericality: { only_integer: true }, presence: true
  validates :comment, presence:true

  belongs_to :movie
  belongs_to :user
end
