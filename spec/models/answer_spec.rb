require 'rails_helper'

RSpec.describe Answer, type: :model do
  it { should belong_to :poll }
  it { should have_many(:votes).dependent(:destroy) }
  it { should validate_presence_of :description }
end
