module.exports = {
    paths: {
        public: "../public/app"
    },
    files: {
        javascripts: {
            joinTo: {
                'vendor.js': /^(?!app)/,
                'app.js': /^app/
            }
        },
        stylesheets: {
            joinTo: 'app.css'
        }
    },

    plugins: {
        babel: {presets: ['es2015', 'react']},
        sass: {
            mode: "native"
        }
    }
};
