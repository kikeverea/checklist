class TasksController < ApplicationController
  before_action :set_task, only: %i[ show update share destroy ]
  before_action :user_has_modify_permission, only: %i[ update share destroy ]

  # GET /tasks or /tasks.json
  def index
    render json: @user.tasks.includes(:user_tasks)
  end

  # GET /tasks/1 or /tasks/1.json
  def show
  end

  # POST /tasks or /tasks.json
  def create
    @task = Task.new(create_params.merge(:created_by => @user.id))
    @user.tasks << @task

    respond_to do |format|
      if @task.save
        format.html { redirect_to task_url(@task), notice: "Task was successfully created." }
        format.json { render :show, status: :created, location: @task }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1 or /tasks/1.json
  def update    
    respond_to do |format|
      if @task.update(update_params)
        format.html { redirect_to task_url(@task), notice: "Task was successfully updated." }
        format.json { render :show, status: :ok, location: @task }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /tasks/1/share or /tasks/1/share.json
  def share
    user = User.find_by(id: share_params[:id])
    user.tasks << @task
    render json: { :result => "Task #{params[:id]} shared with user #{share_params[:id]}" }, status: :accepted
  end

  # DELETE /tasks/1 or /tasks/1.json
  def destroy
    @task.destroy!

    respond_to do |format|
      format.html { redirect_to tasks_url, notice: "Task was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # ensures only users that share/own this task can modify it
    def user_has_modify_permission
      task_owners = @task.users.map { |user| user.id }
      has_modify_permission = task_owners.include? @user.id

      unless has_modify_permission
        respond_to do |format|
          format.html { render :edit, status: :forbidden }
          format.json { render json: { error: 'User not allowed to modify this task'}, status: :forbidden }
        end
      end
    end

    # Only allow a list of trusted parameters through.
    def create_params
      params.require(:task).permit(:description)
    end

    # Only allow a list of trusted parameters through.
    def update_params
      params.require(:task).permit(:description, :completed)
    end

    # Only allow a list of trusted parameters through.
    def share_params
      params.require(:user).permit(:id)
    end
end
