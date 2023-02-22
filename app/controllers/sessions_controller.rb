class SessionsController < ApplicationController
  # skip_before_action :authorized, only: [:create]

  #/login
  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id]= user.id
      render json: user, status: :created
    else
      render json: {error: "Invalid username or password"}, status: :unauthorized
    end
  end

  #/logout
  def destroy
    session[:user_id]=nil
    head :no_content
  end

  private 

  def render_unprocessable_entity_response invalid
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end
  
  # def render_record_not_found_response errors
  #   byebug
  #   error_array = []
  #   error_array.push(errors.message)
  #   render json: {errors: error_array}, status: :unauthorized
  # end
end
