class MovieReviewSerializer < ActiveModel::Serializer
  attributes :id, :user, :comment, :movie_id, :user_id
end
