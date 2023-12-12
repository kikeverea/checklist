Rails.application.routes.draw do
  resources :user_tasks
  resources :task_categories
  resources :categories
  resources :comments
  resources :tasks
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  
  resources :tasks, except: [:new, :edit] 
  resources :categories, except: [:new, :edit]
  resources :users, only: [:create, :update, :delete]
  resources :user_tasks, only: [:create, :delete]
  post '/tasks/:id/share', to: 'tasks#share'
  post '/users/user', to: 'users_user#get_user'
  post '/auth', to: 'auth#login'
end
