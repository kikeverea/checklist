class UsersUserController < ApplicationController

  def get_user
    user = User.find_by('id = :login OR email = :login OR username = :login', { login: extract_identifier(query_params) })
    if user
      render json: user.show_all, status: :ok
    else
      render json: { "error": "El usuario no existe" }, status: :not_found
    end
    
  end

  private
    # Only allow a list of trusted parameters through.
    def query_params
      params.require(:user).permit(:id, :username, :email)
    end

    def extract_identifier(params)
      params.key?('id') ? 
      params[:id] :
      params.key?('username') ?
      params[:username] :
      params[:email]
    end
end
