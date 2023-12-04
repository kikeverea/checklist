class Task < ApplicationRecord
  has_many :user_tasks, dependent: :destroy
  has_many :users, through: :user_tasks
  has_many :task_categories, dependent: :destroy
  has_many :categories, through: :task_categories

  def as_json(_options={})
    { :id => self.id,
      :description => self.description,
      :completed => self.completed,
      :created_by => self.created_by,
      :users => self.user_tasks.map do |user_task|
        user_task.user_id
      end
    }
  end
end
