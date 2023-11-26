json.extract! task_category, :id, :task_id, :category_id, :created_at, :updated_at
json.url task_category_url(task_category, format: :json)
