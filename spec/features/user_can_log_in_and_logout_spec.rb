require "rails_helper"

RSpec.feature "Registered user can log in" do
  scenario "they see dashboard of polls" do
    user = User.create(email: "example@gmail.com", password: "password", password_confirmation: "password")

    visit "/"

    fill_in "Email", with: "example@gmail.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    within ".login" do
      click_on "Login"
    end

    expect(page).to have_content "Welcome #{user.email}!"
    expect(page).to_not have_content "Login"
    expect(current_path).to eq "/polls"

    click_on "Logout"
    expect(page).to have_content "You have logged out"
    expect(page).to_not have_content "Logout"
  end
end
