class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
  validates :username, uniqueness: true
  validates :bio, presence: true
  

  has_many :reviews
  has_many :movies, through: :reviews

end
