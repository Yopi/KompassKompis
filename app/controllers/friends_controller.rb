class FriendsController < ActionController::Base
  def create
    @user = User.find_by(name: params[:name])
    @friend = User.find_by(name: params[:friend_name])

    friend1 = Friend.new(id: @user.id, friend_id: @friend.id)
    friend2 = Friend.new(id: @friend.id, friend_id: @user.id)

    if friend1.save && friend2.save
      render nothing: true, status: 200
    else
      render nothing: true, status: 400
    end
  end
end
