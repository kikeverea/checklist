class Task < ApplicationRecord
  has_many :user_tasks
  has_many :users, through: :user_tasks
  has_many :task_categories
  has_many :categories, through: :task_categories
end
