json.extract! user_task, :id, :task_id, :user_id, :created_at, :updated_at
json.url user_task_url(user_task, format: :json)
