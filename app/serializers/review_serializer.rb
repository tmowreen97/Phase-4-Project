class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :movie_id
  belongs_to :movie
  belongs_to :user
end

#removed custom serializer, and :movie from attributes