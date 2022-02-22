<div id="change_password_tab" class="tab-pane">
  <div class="settings_tab_wrapper" id="change_password_wrapper">
    <form id="change_password_form">
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div class="form-group">
            <label class="control-label" for="password">
              {{ trans('users.password') }}:
            </label>
            <input class="form-control"
                   id="password"
                   name="password"
                   type="password">
          </div>

          <div class="form-group">
            <label class="control-label" for="new_password">
              {{ trans('users.new_password') }}:
            </label>
            <input type="password"
                   id="new_password"
                   class="form-control"
                   name="new_password">
          </div>

          <div class="form-group">
            <label class="control-label" for="new_password_confirmation">
              {{ trans('users.password_confirmation') }}:
            </label>
            <input type="password"
                   id="new_password_confirmation"
                   class="form-control"
                   name="new_password_confirmation">
          </div>

          <div class="form-group">
            <button type="button"
                    class="btn btn-success btn-sm ladda-button"
                    data-style="zoom-out"
                    id="change_password_submit">
              <span class="ladda-label">
                {{ trans('messages.save') }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
