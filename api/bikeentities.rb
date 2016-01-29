module Entities
  class Profile < Grape::Entity
     root 'profile'
     expose :id
     expose :firstName, documentation: {type: :string, desc: 'profiles first name'}
     expose :surName, documentation: {type: :string, desc: 'profiles surname'}
     expose :email, documentation: {type: :string, desc: 'profiles email address'}


  end

  class API < Grape::API
    format :json
    desc 'Expose an Entity'
    namespace :entities do
       #desc 'Expose a Profile', paramms: Acme::ENtities::Profile.documentation
       get '/profile/id' do
          present OpentStruct.new(id: params[:id], firstName: params[:firstName], surName: params[:surName], email: params[:email] )
	end
    end
	

  end

end
