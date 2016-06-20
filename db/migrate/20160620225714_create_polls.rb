class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.text :question
      t.datetime :exp_date
      t.boolean :active, default: true

      t.timestamps null: false
    end
  end
end
