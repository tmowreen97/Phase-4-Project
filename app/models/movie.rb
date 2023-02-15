class Movie < ApplicationRecord
  has_many :reviews, dependent: :destroy
  has_many :users, through: :reviews

  validates :title, presence: true
  validates :year, presence: true, numericality: {only_integer: true, less_than_or_equal_to: Date.today.year}
  validates :image_url, presence: true
  validates :description, presence: true
  validates :runtime, presence: true, numericality: {only_integer: true}
  validates :genre, presence: true, inclusion: { in: ['Action', 'Comedy', 'Documentary','Drama','Horror', 'Musical', 'Romance','Thriller'] }
  validates :rating, presence: true, numericality: {greater_than_or_equal_to: 0.0, less_than_or_equal_to: 10.0}



end
