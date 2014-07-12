define([
    "hr/hr",
    "hr/promise",
    "text!resources/langs/en.json",
    "text!resources/langs/fr.json"
], function(hr, Q) {
    hr.Resources.addNamespace("templates", {
        loader: "text"
    });

    hr.Resources.addNamespace("i18n", {
        loader: "require",
        base: "resources/langs/",
        extension: ".json"
    });

    return function() {
        return hr.I18n.loadLocale([
            "en", "fr"
        ]);
    };
});