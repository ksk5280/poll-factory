require "rails_helper"

RSpec.feature "Logged in user can create a poll" do
  scenario "they successfully create poll" do
    user = User.create(email: "example@gmail.com", password: "password", password_confirmation: "password")
    login(user)

    # expect page to have a form to create a new poll
    # expect to see a list of polls that have been created
    # In the form:
      # Have an option for entering a question
      # Have 4 options for answers
      # Have a button that can allow you to add additional answers
      # 

  end
end
