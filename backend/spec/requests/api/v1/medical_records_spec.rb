require "rails_helper"

RSpec.describe "MedicalRecords API", type: :request do
  let(:json) { JSON.parse(response.body) }

  describe "POST /api/v1/medical_records" do
    let(:file) { fixture_file_upload("sample.txt", "text/plain") }

    it "creates and processes a medical record" do
      post "/api/v1/medical_records",
           params: { document: file }

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)

      record = MedicalRecord.find(json["id"])
      expect(record.status).to eq("processed")
      expect(record.raw_text).to include("This is a test medical record text.")
      expect(record.structured_data["raw_preview"]).to be_present
    end
  end

  describe "GET /api/v1/medical_records/:id" do
    let!(:record) do
      MedicalRecord.create!(
        external_id: "test-123",
        status: "processed",
        raw_text: "dummy",
        structured_data: { "pet" => { "name" => "Marley" } }
      )
    end

    it "returns the record as JSON" do
      get "/api/v1/medical_records/#{record.id}"

      expect(response).to have_http_status(:ok)
      expect(json["external_id"]).to eq("test-123")
      expect(json["structured_data"]["pet"]["name"]).to eq("Marley")
    end
  end
end
