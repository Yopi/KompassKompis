class GeodataController < ActionController::Base
  def show
    @friend = User.find_by(name: params[:name])
  end

  def create
    @user = User.find_by(email: params[:email])
    @user.online = 1
    @user.longitude = params[:position][:longitude]
    @user.latitude = params[:position][:latitude]
    @user.save

    render nothing: true, status: 200
  end
end
