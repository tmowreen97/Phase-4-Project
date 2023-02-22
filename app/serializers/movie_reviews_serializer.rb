class MovieReviewsSerializer < ActiveModel::Serializer
  attributes :id, :comment, :movie_id, :user_id, :username, :title

  def username
    object.user.username
  end

  def title
    object.movie.title
  end
end
