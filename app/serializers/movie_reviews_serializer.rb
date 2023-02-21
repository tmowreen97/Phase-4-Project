class MovieReviewsSerializer < ActiveModel::Serializer
  attributes :id, :comment, :movie_id, :username

  def username
    object.user.username
  end
end
