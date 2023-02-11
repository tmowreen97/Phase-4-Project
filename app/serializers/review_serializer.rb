class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user
  belongs_to :movie
  belongs_to :user
end
