Rails.application.routes.draw do
  root to: 'sessions#new'

  get "/login", to: "sessions#new"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  resources :users, only: [:new, :index, :create]
  resources :polls, only: [:index]

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :polls, only: [:index, :create, :show, :update]
    end
  end
end
