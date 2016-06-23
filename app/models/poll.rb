class Poll < ActiveRecord::Base
  belongs_to :user
  has_many :answers, dependent: :destroy
  validates_presence_of :question

  def vote_count
    Hash[answers.collect { |answer| [answer.description, answer.votes.count] }]
  end
end
