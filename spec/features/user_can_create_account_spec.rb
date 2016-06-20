require "rails_helper"

RSpec.feature "User can create an account" do
  scenario "sees dashboard to create and manage polls" do
    visit "/"

    click_on "Create Account"
    expect(current_path).to eq "/users/new"

    fill_in "Email", with: "example@gmail.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_on "Create Account"

    user = User.last

    expect(current_path).to eq "/polls"
    expect(page).to have_content "Your account has been successfully created #{user.email}!"
  end
end
