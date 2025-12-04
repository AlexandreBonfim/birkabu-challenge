require "rails_helper"

RSpec.describe ExtractText do
  let(:record) do
    MedicalRecord.create!(
      external_id: "sample",
      status: "pending"
    )
  end

  def attach_fixture(filename, content_type)
    file_path = Rails.root.join("spec/fixtures/files", filename)
    record.document.attach(
      io: File.open(file_path),
      filename: filename,
      content_type: content_type
    )
  end

  it "extracts text from a PDF veterinary record (KIVET)" do
    attach_fixture("barkibu_kivet_marley.pdf", "application/pdf")

    text = described_class.new(record.document).call

    expect(text).to be_a(String)
    expect(text.length).to be > 100
    # look for something typical in the PDF
    expect(text).to match(/Datos de la Mascota/i)
    expect(text).to match(/MARLEY/i)
  end

  it "returns raw content for plain text files" do
    attach_fixture("sample.txt", "text/plain")

    text = described_class.new(record.document).call

    expect(text).to include("This is a test medical record text.")
  end
end
