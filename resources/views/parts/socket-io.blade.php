@if(env('NODEJS') === 'true')
  <script>
      var SocketIoConnection = new SocketIoConnection();
      SocketIoConnection.ident(getCookie('token'));
  </script>
@endif