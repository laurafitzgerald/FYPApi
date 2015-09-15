require 'rubygems'
require 'bundler/setup'

require 'rake'

require 'rspec/core'
require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec) do |spec|
  # do not run integration tests, doesn't work on TravisCI
  spec.pattern = FileList['spec/api/*_spec.rb']
end

task :environment do
  ENV['RACK_ENV'] ||= 'development'
  require File.expand_path('../config/environment', __FILE__)
end

task routes: :environment do
  Acme::API.routes.each do |route|
    method = route.route_method.ljust(10)
    path = route.route_path
    puts "     #{method} #{path}"
  end
end
