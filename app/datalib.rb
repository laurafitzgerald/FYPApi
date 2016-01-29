require "nats/client"
require 'json'

def write(table, message)
  result = ''
  NATS.start(:servers => ['nats://nats.default:4222']) do
    NATS.request("data.write.#{table}", message) { |response|
       result = response 
       NATS.stop
    }
  end
  return result
end

def read(table, query)
  result = ''
  NATS.start(:servers => ['nats://nats.default:4222']) do
    NATS.request("data.write.#{table}", query) { |response|
       result = response 
       NATS.stop
    }
  end
  return result
end
