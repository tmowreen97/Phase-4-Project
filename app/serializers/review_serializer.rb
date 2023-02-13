class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :movie_id, :movie, :user
  belongs_to :movie
  belongs_to :user
end
