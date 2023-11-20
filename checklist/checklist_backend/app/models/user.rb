class User < ApplicationRecord
  has_secure_password
  has_many :user_tasks
  has_many :tasks, through: :user_tasks

  validates :email, uniqueness: true
  validates :email, format: { with: /\A[a-zA-Z0-9]+@[a-zA-Z]+[.][a-zA-Z]+\z/,
    message: 'invalid email' }
  validates :username, uniqueness: true
  validates :password, confirmation: true
  validates :password_confirmation, presence: true

  def as_json(_options={})
    { :id => self.id, :name => self.name, :username => self.username }
  end
end
