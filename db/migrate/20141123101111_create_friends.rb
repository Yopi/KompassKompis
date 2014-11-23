class CreateFriends < ActiveRecord::Migration
  def change
    create_table :friends, id: false do |t|
      t.integer :id
      t.integer :friend_id
      t.timestamps
    end
  end
end
