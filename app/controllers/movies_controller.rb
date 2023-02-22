class MoviesController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid_response
rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
skip_before_action :authorized, only: [:index]



  def index
    movies = Movie.all
    render json: movies, status: :ok
  end

  def show
    movie = Movie.find_by(id: params[:id])
    if movie
      render json: movie, status: :ok
    else
      raise ActiveRecord::RecordNotFound
    end
  end

  def create
    movie = Movie.create!(movie_params)
    render json: movie, status: :created
  end

  private 

  def movie_params
    params.permit(:title, :year, :image_url, :genre, :description, :rating, :runtime)
  end

  def render_record_invalid_response(error_hash)
    render json: {error: error_hash.record.errors.full_messages}, status: :unprocessable_entity
  end

  def render_record_not_found_response
    render json: {error: "Not found"}, status: :not_found
  end


end
