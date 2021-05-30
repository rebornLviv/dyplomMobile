export default {
    store: null,

    setStore: function(store) {
        this.store = store;
    },

    getStore: function() {
        return this.store;
    },

    getState: function(...path) {
        let resolvedPath = this.store.getState();

        for (let key of path) {
            if (typeof resolvedPath[key] === 'undefined') {
                return undefined;
            }

            resolvedPath = resolvedPath[key];
        }

        return resolvedPath;
    },
};
