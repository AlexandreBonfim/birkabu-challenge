class CreateMedicalRecords < ActiveRecord::Migration[8.0]
  def change
    create_table :medical_records do |t|
      t.string :external_id, null: false
      t.string :status, null: false, default: "pending"
      t.text :raw_text
      t.jsonb :structured_data, null: false, default: {}
      t.string :language

      t.timestamps
    end

    add_index :medical_records, :external_id, unique: true
    add_index :medical_records, :status
  end
end