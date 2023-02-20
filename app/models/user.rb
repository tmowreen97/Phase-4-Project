class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :bio, presence: true
  
  # if a user is deleted, make sure its movies and reviews are also deleted
  has_many :reviews, dependent: :destroy
  has_many :movies, through: :reviews

end
