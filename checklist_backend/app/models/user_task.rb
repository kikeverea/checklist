class UserTask < ApplicationRecord
  belongs_to :task, dependent: :destroy
  belongs_to :user, dependent: :destroy
end
