require "rails_helper"

RSpec.describe ParseMedicalRecord do
  it "defaults to en when no Spanish markers" do
    result = described_class.new("This is a test medical record.").call
    expect(result[:language]).to eq("en")
  end

  it "flags es when Spanish markers appear" do
    result = described_class.new("El paciente presenta dolor y fiebre.").call
    expect(result[:language]).to eq("es")
  end

  it "returns a raw_preview snippet" do
    text = "a" * 300
    result = described_class.new(text).call
    expect(result[:structured_data][:raw_preview]).to eq(text[0..200])
  end
end
