class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio
  #should be able to pull user's movies and reviews in one request
  has_many :reviews, serializer: UserReviewsSerializer
  has_many :movies

end
