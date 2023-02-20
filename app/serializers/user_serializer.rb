class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio
  #reviews to reflect movie
  has_many :reviews, serializer: UserReviewsSerializer
  has_many :movies

end
