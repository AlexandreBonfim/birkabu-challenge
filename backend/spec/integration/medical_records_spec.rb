require "swagger_helper"

RSpec.describe "api/v1/medical_records", type: :request do
  path "/api/v1/medical_records" do
    post "Creates a medical record" do
      tags "MedicalRecords"
      consumes "multipart/form-data"
      produces "application/json"

      parameter name: :document,
                in: :formData,
                required: true,
                schema: { type: :string, format: :binary },
                description: "Document to attach to the medical record"

      response "201", "medical record created" do
        let(:document) { fixture_file_upload("sample.txt", "text/plain") }

        run_test! do |response|
          data = JSON.parse(response.body)

          expect(data["id"]).to be_present
          expect(data["status"]).to eq("processed")
        end
      end
    end
  end

  path "/api/v1/medical_records/{id}" do
    get "Retrieves a medical record" do
      tags "MedicalRecords"
      produces "application/json"

      parameter name: :id, in: :path, type: :string, description: "Medical record ID"

      response "200", "medical record found" do
        let!(:record) do
          MedicalRecord.create!(
            external_id: "swagger-show-1",
            status: "processed",
            raw_text: "sample text",
            structured_data: { "raw_preview" => "sample text" }
          )
        end
        let(:id) { record.id }

        run_test! do |response|
          data = JSON.parse(response.body)

          expect(data["id"]).to eq(record.id)
          expect(data["external_id"]).to eq("swagger-show-1")
        end
      end
    end
  end
end
