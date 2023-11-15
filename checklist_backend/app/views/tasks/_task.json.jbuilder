json.extract! task, :id, :description, :completed, :created_by, :completed_by, :created_at, :updated_at
json.url task_url(task, format: :json)
