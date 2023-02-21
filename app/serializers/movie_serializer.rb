class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :image_url, :genre, :description, :rating, :runtime
  has_many :reviews, serializer: MovieReviewsSerializer
  has_many :users
  

end
 