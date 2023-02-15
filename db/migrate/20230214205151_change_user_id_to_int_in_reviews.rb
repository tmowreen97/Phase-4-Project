class ChangeUserIdToIntInReviews < ActiveRecord::Migration[6.1]
  def change
    # change_column :people, :company_id, :integer, using: 'company_id::integer'
    change_column :reviews, :user_id, :integer, using: 'user_id::integer'

  end
end
