require "rails_helper"

RSpec.feature "Registered user can log in" do
  scenario "they see dashboard of polls" do
    visit "/"

    click_on "Login"

    fill_in "Email", with: "example@gmail.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_on "Create Account"

    expect(current_path).to eq "/polls"
  end
end
