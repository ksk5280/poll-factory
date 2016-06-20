class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)

    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      flash[:success] = "Welcome #{user.email}!"
      redirect_to polls_path
    else
      flash.now[:danger] = "Invalid login details"
      render :new
    end
  end

  def destroy
    session.clear
    flash[:success] = "You have logged out"
    redirect_to "/"
  end
end
