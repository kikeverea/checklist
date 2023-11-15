class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.string :description, null: false
      t.boolean :completed, default: false
      t.integer :created_by, null: false
      t.integer :completed_by

      t.timestamps
    end
  end
end
