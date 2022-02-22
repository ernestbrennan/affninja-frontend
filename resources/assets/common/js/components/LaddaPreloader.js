let LaddaPreloader = {
    start(selector, options) {
        if (!selector) {
            throw "Incorrect selector";
        }

        let handler = Ladda.create(nativeGetEl(selector));
        handler.start();

        return handler;

    },
    stop(handler) {
        handler.stop();
    }
};