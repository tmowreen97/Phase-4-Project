class ReviewsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response

  def update
    review = Review.find_by(id: params[:id])
    review.update(review_params)
    render json: review, status: :ok
  end

  def destroy
    review = Review.find_by(id: params[:id])
    review.destroy
    head :no_content
  end

  def create
    review = Review.create!(review_params)
    render json: review, status: :created
  end

  def index
    reviews = Review.all
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
    render json: {error: "Not found"}, status: :unauthorized
  end
end
