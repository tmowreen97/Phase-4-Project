class UserReviewsSerializer < ActiveModel::Serializer
  attributes :id, :movie_id, :user_id, :comment, :movie
  belongs_to :movie
end
