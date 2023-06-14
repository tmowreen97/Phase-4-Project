class User < ApplicationRecord

  require 'pry'
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :bio, presence: true
  
  # if a user is deleted, make sure its movies and reviews are also deleted
  has_many :reviews, dependent: :destroy
  has_many :movies, through: :reviews

  def self.most_reviews 
    users = User.all
    #for each user, count their reviews. return the user with the highest amount of reviews
    users_reviews = users.map{|user| [user, user.reviews.count]}.to_h
    most_reviews = users_reviews.sort_by{|k,v| v}.last
    #find User instance based on username returned in most_reviews
    # user = User.where('username=?',most_reviews[0])
    most_reviews[0]
  end


end
