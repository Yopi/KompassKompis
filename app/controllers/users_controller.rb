class UsersController < ActionController::Base
  def index
    @user = User.find_by(email: params[:email])
    puts params.inspect
    if @user.nil?
      render status: 404
    else
      render status: 200
    end
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      render :json, true.to_json
    else
      render :json, false.to_json
    end
  end
end
