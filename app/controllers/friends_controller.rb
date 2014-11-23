class FriendsController < ActionController::Base
  def create
    @friend = Friend.new(params[:user])

    if @friend.save
      render :json, true.to_json
    else
      render :json, false.to_json
    end
  end
end
