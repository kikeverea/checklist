require "application_system_test_case"

class UserTasksTest < ApplicationSystemTestCase
  setup do
    @user_task = user_tasks(:one)
  end

  test "visiting the index" do
    visit user_tasks_url
    assert_selector "h1", text: "User tasks"
  end

  test "should create user task" do
    visit user_tasks_url
    click_on "New user task"

    fill_in "Task", with: @user_task.task_id
    fill_in "User", with: @user_task.user_id
    click_on "Create User task"

    assert_text "User task was successfully created"
    click_on "Back"
  end

  test "should update User task" do
    visit user_task_url(@user_task)
    click_on "Edit this user task", match: :first

    fill_in "Task", with: @user_task.task_id
    fill_in "User", with: @user_task.user_id
    click_on "Update User task"

    assert_text "User task was successfully updated"
    click_on "Back"
  end

  test "should destroy User task" do
    visit user_task_url(@user_task)
    click_on "Destroy this user task", match: :first

    assert_text "User task was successfully destroyed"
  end
end
