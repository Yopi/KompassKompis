class AddColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :online, :integer
    add_column :users, :longitude, :decimal
    add_column :users, :latitude, :decimal
  end
end
