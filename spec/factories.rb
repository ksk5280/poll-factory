FactoryGirl.define do
  factory :vote do
    
  end
  factory :answer do
    answer "MyString"
  end
  factory :poll do
    question "MyText"
    exp_date "2016-06-20 16:57:14"
    references ""
  end
  factory :user do
    email "MyString"
    password "MyString"
  end
end