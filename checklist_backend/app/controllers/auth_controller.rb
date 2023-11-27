class AuthController < ApplicationController
  skip_before_action :authorized, only: [:login]
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  def login 
      @user = User.find_by('email = :login OR username = :login', {login: login_params[:username]})
      
      if @user.authenticate(login_params[:password])
          @token = encode_token(user_id: @user.id)
          render json: {
              user: @user.as_json,
              token: @token
          }, status: :accepted
      else
          render json: {message: 'Wrong credentials'}, status: :unauthorized
      end
  end

  private 

  def login_params 
      params.permit(:username, :password)
  end

  def handle_record_not_found(e)
      render json: { message: "User doesn't exist" }, status: :unauthorized
  end
end
