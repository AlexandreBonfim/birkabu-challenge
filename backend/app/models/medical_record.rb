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

class MedicalRecord < ApplicationRecord
  has_one_attached :document

  STATUSES = %w[pending processed failed].freeze

  validates :external_id, presence: true, uniqueness: true
  validates :status, inclusion: { in: STATUSES }
end
