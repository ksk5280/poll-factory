class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:success] = "Your account has been successfully created #{@user.email}!"
      session[:user_id] = @user.id
      redirect_to "/polls"
    else
      flash.now[:error] = @user.errors.full_messages.join(', ')
      render :new
    end
  end

  private
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
