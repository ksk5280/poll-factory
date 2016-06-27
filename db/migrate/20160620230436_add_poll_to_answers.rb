class AddPollToAnswers < ActiveRecord::Migration
  def change
    add_reference :answers, :poll, index: true, foreign_key: true
  end
end
