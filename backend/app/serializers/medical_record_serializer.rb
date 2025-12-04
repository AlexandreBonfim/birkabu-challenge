class MedicalRecordSerializer
  include Rails.application.routes.url_helpers

  def initialize(record)
    @record = record
  end

  def as_json(*)
    {
      id: @record.id,
      external_id: @record.external_id,
      status: @record.status,
      raw_text: @record.raw_text,
      structured_data: @record.structured_data,
      language: @record.language,
      created_at: @record.created_at,
      updated_at: @record.updated_at,
      document_url: document_url
    }.compact
  end

  private

  def document_url
    return unless @record.document.attached?

    rails_blob_path(@record.document, only_path: true)
  end
end
