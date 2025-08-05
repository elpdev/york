# Below are the routes for madmin
namespace :madmin, path: "admin" do
  resources :bios
  resources :home_pages
  resources :contacts
  namespace :active_storage do
    resources :attachments
  end
  namespace :active_storage do
    resources :blobs
  end
  namespace :active_storage do
    resources :variant_records
  end
  resources :arts
  resources :sessions
  resources :users
  root to: "dashboard#show"
end
