class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio
  has_many :reviews
  has_many :movies

end
