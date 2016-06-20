require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_secure_password }
  it { should validate_presence_of :email }
  it { should validate_presence_of :password }
  it { should validate_presence_of :password_confirmation }
  it { should validate_uniqueness_of(:email).case_insensitive }
  it { should validate_confirmation_of :password }
end
