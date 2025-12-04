class MedicalRecordProcessor
  def initialize(record)
    @record = record
  end

  def call
    text = ExtractText.new(@record.document).call
    @record.raw_text = text

    parsed = ParseMedicalRecord.new(text).call

    @record.structured_data = parsed[:structured_data]
    @record.language        = parsed[:language]
    @record.status          = "processed"
    @record.save!
  rescue => e
    Rails.logger.error("[MedicalRecordProcessor] #{e.class}: #{e.message}")
    @record.update!(status: "failed")
  end
end
