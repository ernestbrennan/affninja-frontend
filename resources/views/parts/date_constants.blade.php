<script>
    DATE_FROM_DEFAULT = moment().tz(App.user.timezone).subtract(7, 'days').format('YYYY-MM-DD');
    DATE_TO_DEFAULT = moment().tz(App.user.timezone).format('YYYY-MM-DD');
    DATE_TIME_TO_DEFAULT = moment().tz(App.user.timezone).format('YYYY-MM-DD HH:mm:ss');
</script>