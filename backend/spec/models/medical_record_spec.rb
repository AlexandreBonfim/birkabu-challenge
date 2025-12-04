# == Schema Information
#
# Table name: medical_records
#
#  id              :bigint           not null, primary key
#  external_id     :string
#  status          :string
#  raw_text        :text
#  structured_data :jsonb
#  language        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

require "rails_helper"

RSpec.describe MedicalRecord, type: :model do
  it "is valid with minimal attributes" do
    record = described_class.new(
      external_id: "abc-123",
      status: "pending"
    )

    expect(record).to be_valid
  end

  it "requires external_id" do
    record = described_class.new(status: "pending")
    expect(record).not_to be_valid
    expect(record.errors[:external_id]).to include("can't be blank")
  end

  it "requires status to be one of allowed values" do
    record = described_class.new(external_id: "abc", status: "unknown")
    expect(record).not_to be_valid
    expect(record.errors[:status]).to be_present
  end

  it "has default structured_data as empty hash" do
    record = described_class.new(external_id: "abc", status: "pending")
    expect(record.structured_data).to eq({})
  end
end

