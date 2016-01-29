require "nats/client"

def get(username)
  profile = ''
  NATS.start(:servers => ['nats://nats.default:4222']) do
    NATS.request('profile.read', username { |response|
      profile = response
      NATS.stop
    }
  end
  return profile
end
 
def create(profile)
  id = ''
  NATS.start(:servers => ['nats://nats.default:4222']) do
    NATS.request('profile.create', profile) { |response|
        id = response
        NATS.stop
     }
  end
  return id
end
