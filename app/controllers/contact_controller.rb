class ContactController < ApplicationController
  before_action :resume_session
  allow_unauthenticated_access

  def show
    @art = Art.first
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      redirect_to contact_path, notice: "Thank you for your message. We'll get back to you as soon as possible."
    else
      redirect_back fallback_location: contact_path, alert: "There was an error sending your message. Please try again."
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :body)
  end
end
