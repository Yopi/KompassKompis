class GeodatasController < ActionController::Base
  def show
    @friend = User.find_by(name: params[:name])
  end

  def update
    @user = User.find_by(email: params[:email])
    @user.online = 1
    @user.longitude = params[:position][:longitude]
    @user.latitude = params[:position][:latitude]
    @user.save
  end
end
