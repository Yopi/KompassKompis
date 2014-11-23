class FriendsController < ActionController::Base
  def create
    puts params.inspect
    @user = User.find_by(name: params[:name])
    @friend = User.find_by(name: params[:friend_name])

    if !@user.nil? && !@friend.nil?
      friend1 = Friend.new(id: @user.id, friend_id: @friend.id)
      friend2 = Friend.new(id: @friend.id, friend_id: @user.id)

      if friend1.save && friend2.save
        render nothing: true, status: 200
      else
        render nothing: true, status: 400
      end
    else
      render nothing: true, status: 200
    end
  end
end
