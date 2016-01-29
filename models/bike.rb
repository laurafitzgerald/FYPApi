class Bike < ActiveRecord::Base
  include HasUUID
  
  attr_accessible: :id, :photo_link, :make, :model, :type, :frame_size, :year, :colour, :serial_number,
  :purchased_from, :date_purchased, :status, :profile_id

  validates :profile_id, presence: true
  validates :email, uniqueness: true
  

end
  
