class UsersController < ApplicationController
skip_before_action :authorized, only: [:create]
rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid_response
rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response

  #/signup
  def create
    user = User.create!(user_params)
    if user.valid?
      session[:user_id]||= user.id
      render json: user, status: :created
    else 
      raise ActiveRecord::RecordInvalid
    end
  end

  #/me
  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, status: :ok
    else
      raise ActiveRecord::RecordNotFound
    end
  end


  private 

  def user_params
    params.permit(:username, :password, :password_confirmation, :bio)
  end

  def render_record_invalid_response(error_hash)
    render json: {error: error_hash.record.errors.full_messages}, status: :unprocessable_entity
  end

  def render_record_not_found_response
    render json: {error: "Not found"}, status: :unauthorized
  end

end
