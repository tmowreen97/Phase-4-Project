class ReviewsController < ApplicationController

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

  private

  def review_params
    params.permit(:comment)
  end
end
