require "rails_helper"

RSpec.describe MedicalRecordProcessor do
  let(:record) do
    MedicalRecord.create!(
      external_id: "proc-1",
      status: "pending"
    )
  end

  before do
    # attach a simple text file to isolate ExtractText behavior
    file_path = Rails.root.join("spec/fixtures/files/sample.txt")
    record.document.attach(
      io: File.open(file_path),
      filename: "sample.txt",
      content_type: "text/plain"
    )
  end

  it "fills raw_text, structured_data, language and marks as processed" do
    processor = described_class.new(record)
    processor.call

    record.reload

    expect(record.status).to eq("processed")
    expect(record.raw_text).to include("This is a test medical record text.")
    expect(record.structured_data).to be_a(Hash)
    expect(record.language).to eq("en")
  end

  it "marks record as failed on error" do
    # force ParseMedicalRecord to raise
    allow(ParseMedicalRecord).to receive(:new).and_raise(StandardError.new("boom"))

    processor = described_class.new(record)
    processor.call

    record.reload
    expect(record.status).to eq("failed")
  end
end
