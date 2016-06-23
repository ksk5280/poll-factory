class Poll < ActiveRecord::Base
  belongs_to :user
  has_many :answers, dependent: :destroy
  validates_presence_of :question
end
