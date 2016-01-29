class Profile < AcitiveRecord::Base
  include HasUUID
  has_many :bikes

  attr_accessible: :profile_id :firstName, :surName, :email

  validates :email, uniqueness: true



  def add_profile(attributes)
    profiles.create!(attributes) do |r|
      r.id = id

    end
  end

end 
