class Api::V1::MedicalRecordsController < ApplicationController
  before_action :set_record, only: :show

  def create
    record = MedicalRecord.new(
      external_id: SecureRandom.uuid,
      status: "pending"
    )

    document = params.require(:document)
    record.document.attach(document)

    if record.save
      render json: MedicalRecordSerializer.new(record).as_json,
             status: :created
    else
      render json: { errors: record.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def show
    render json: MedicalRecordSerializer.new(@record).as_json
  end

  private

  def set_record
    @record = MedicalRecord.find(params[:id])
  end
end
