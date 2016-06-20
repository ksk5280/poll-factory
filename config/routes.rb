Rails.application.routes.draw do
  root to: 'sessions#new'

  get "/login", to: "sessions#new"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  resources :users, only: [:new, :index, :create]
  resources :polls, only: [:index]
end
