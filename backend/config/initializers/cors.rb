# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

# Be permissive in development so Swagger UI/localhost can reach the API.
# For other environments, override via CORS_ORIGINS (comma-separated).
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(*(
      if Rails.env.development?
        ["*"]
      else
        ENV.fetch("CORS_ORIGINS", "example.com").split(",")
      end
    ))

    resource "*",
             headers: :any,
             methods: %i[get post put patch delete options head]
  end
end
