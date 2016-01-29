class Profiles < Grape::API
  
  version 'v1', :using => :path
  format :json
  
  resource 'profiles' do
    get "/" do
      Profile.all
    end
    
    get "/:id" do 
      Profile.find(params['id'])
    end
    
    post "/create" do
      Profile.create(params['profile'])
    end
  end
  
end