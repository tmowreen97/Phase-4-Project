class Review < ApplicationRecord
  validates :movie_id,numericality: { only_integer: true }
  validates :user_id,numericality: { only_integer: true }
  validates :movie_id,presence: true
  validates :user_id,presence: true

  belongs_to :movie
  belongs_to :user
end
