class Movie < ApplicationRecord
  # validates all attributes are present. year has to be an integer and has to be current year or less. runtime has to be integer, rating has to be between 0 and 10. genre has to be one of the genres in array. 
  validates :title, presence: true
  validates :year, presence: true, numericality: {only_integer: true, less_than_or_equal_to: Date.today.year}
  validates :image_url, presence: true
  validates :description, presence: true
  validates :runtime, presence: true, numericality: {only_integer: true}
  validates :genre, presence: true, inclusion: { in: ['Action', 'Comedy', 'Documentary','Drama','Horror', 'Musical', 'Romance','Thriller'] }
  validates :rating, presence: true, numericality: {greater_than_or_equal_to: 0.0, less_than_or_equal_to: 10.0}

  # defines relationship with reviews and users
  # makes sure if a movie is destroyed, its reviews are destroyed. 
  has_many :reviews, dependent: :destroy
  has_many :users, through: :reviews

end
