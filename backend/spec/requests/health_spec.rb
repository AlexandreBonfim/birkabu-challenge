require "rails_helper"

RSpec.describe "Health endpoint", type: :request do
  it "returns ok" do
    get "/health"

    expect(response).to have_http_status(:ok)
    json = JSON.parse(response.body)
    expect(json["status"]).to eq("ok")
  end
end
