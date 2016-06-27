class Answer < ActiveRecord::Base
  belongs_to :poll
  has_many :votes, dependent: :destroy
  validates_presence_of :description
end
