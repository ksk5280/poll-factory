require 'rails_helper'

RSpec.describe Poll, type: :model do
  it { should belong_to :user }
  it { should have_many :answers }
end
