require 'rails_helper'

RSpec.describe Poll, type: :model do
  it { should belong_to :user }
  it { should have_many(:answers).dependent(:destroy) }
  it { should validate_presence_of :question }
end
