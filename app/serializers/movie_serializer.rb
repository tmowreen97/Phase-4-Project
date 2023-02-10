class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :image_url, :genre, :description, :rating, :runtime
end
