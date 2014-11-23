class UsersController < ActionController::Base
  def index
    @user = User.find_by(email: params[:email])
    puts params.inspect
    if @user.nil?
      render nothing: true, status: 404
    else
      render nothing: true, status: 200
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render nothing: true, status: 200
    else
      render nothing: true, status: 400
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :facebook_id, :name)
  end
end
