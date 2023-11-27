require 'jwt'

class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authorized

  def encode_token(payload)
    JWT.encode(payload, jwt_secret) 
  end

  def decoded_token
      header = request.headers['Authorization']
      if header
          token = header.split(" ")[1] # get token from 'Bearer <token>'
          begin
              JWT.decode(token, jwt_secret)
          rescue JWT::DecodeError
              nil
          end
      end
  end

  def current_user 
    if decoded_token
        user_id = decoded_token[0]['user_id']
        @user = User.find_by(id: user_id)
    end
  end

  def authorized
      unless !!current_user
        render json: { message: 'Please log in' }, status: :unauthorized
      end
  end

  private
  
  def jwt_secret
    File.read("./sekret")
  end
end
