require "rails_helper"

Rails.application.routes.draw do
  get "/health", to: proc { [200, {}, ['{"status":"ok"}']] }
  
  namespace :api do
    namespace :v1 do
      resources :medical_records, only: [:create, :show]
    end
  end
end