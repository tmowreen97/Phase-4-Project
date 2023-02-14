class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :movie_id, :movie
  belongs_to :movie
  belongs_to :user, serializer: ReviewUserSerializer
end
