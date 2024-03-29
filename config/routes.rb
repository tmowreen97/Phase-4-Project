Rails.application.routes.draw do

  resources :reviews
  resources :movies, only: [:index, :create, :show] do
    # nested routes, this is for /movies/:movie_id/reviews
    resources :reviews, only: [:index]
  end
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  get "/most_reviews", to: "users#most_reviews"



  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
 