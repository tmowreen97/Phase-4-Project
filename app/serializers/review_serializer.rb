class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment 
  belongs_to :movie
end
