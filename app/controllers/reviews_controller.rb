class ReviewsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response

  
  def update
    review = Review.find_by(id: params[:id])
    if review
      review.update!(review_params)
      render json: review, status: :ok
    else 
      raise ActiveRecord::RecordNotFound
    end
    
  end

  def destroy
    review = Review.find_by(id: params[:id])
    if review
      review.destroy
      head :no_content
    else
      raise ActiveRecord::RecordNotFound
    end
  end

  def create
    review = Review.create!(review_params)
    render json: review, status: :created
  end

  
  def index
    if params[:movie_id]
      # responsible for nested route, /movies/:movie_id/reviews
      movie = Movie.find_by(id: params[:movie_id])
      reviews = movie.reviews
    else
      reviews = Review.all
    end
    render json: reviews, status: :ok
  end

  private

  def review_params
    params.permit(:comment, :movie_id, :user_id)
  end

  def render_record_invalid_response(error_hash)
    render json: {error: error_hash.record.errors.full_messages}, status: :unprocessable_entity
  end

  def render_record_not_found_response
    render json: {error: "Not found"}, status: :not_found
  end
end
