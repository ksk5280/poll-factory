Rails.application.routes.draw do
  root to: 'sessions#new'

  resources :users, only: [:new, :index, :create]
  resources :polls, only: [:index]
end
