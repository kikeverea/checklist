class User < ApplicationRecord
  has_secure_password
  has_many :user_tasks, dependent: :destroy
  has_many :tasks, through: :user_tasks

  validates :email, uniqueness: true
  validates :email, format: { with: /\A[a-zA-Z0-9]+@[a-zA-Z]+[.][a-zA-Z]+\z/,
    message: 'invalid email' }
  validates :username, uniqueness: true
  validates :password, confirmation: true
  validates :password_confirmation, presence: true

  before_save :username_downcase

  def as_json(_options={})
    { :id => self.id, :name => self.name, :username => self.username, :tasks => self.tasks }
  end

  def show_all
    { :id => self.id, :name => self.name, :username => self.username, :email => self.email, :created_at => self.created_at }
  end

  private

  def username_downcase
    self.username = username.downcase
    self.email = email.downcase
  end
end
