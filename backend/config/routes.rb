require "rails_helper"

Rails.application.routes.draw do
  get "/health", to: proc { [200, {}, ['{"status":"ok"}']] }
end
