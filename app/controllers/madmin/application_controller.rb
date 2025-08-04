module Madmin
  class ApplicationController < Madmin::BaseController
    # include Authentication

    before_action :require_authentication
    before_action :authenticate_admin_user

    def authenticate_admin_user
      redirect_to "/", alert: "Not authorized." unless Current.user.admin?
    end

    def require_authentication
      resume_session || request_authentication
    end

    def resume_session
      Current.session ||= find_session_by_cookie
    end

    def find_session_by_cookie
      Session.find_by(id: cookies.signed[:session_id]) if cookies.signed[:session_id]
    end

    def request_authentication
      session[:return_to_after_authenticating] = request.url
      redirect_to "/session/new"
    end
  end
end
