function getEmbedDiv(url, height, width){
    height = height || '100%';
    width = width || '100%';

    var content = '';
    var vimeoID = url.match(/^https?:\/\/(www\.)?vimeo\.com\/(clip\:)?(\d+).*$/);
    var youTubeID = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);

    var style = `border:none; position:absolute; top:0; left:0; width:${width}; height:${height}`;

    if (youTubeID) {
        content = `<iframe style="${style}" src="https://www.youtube.com/embed/${youTubeID[1]}?rel=0" frameborder="0" allowfullscreen>`;
    } else if(vimeoID) {
        content = `<iframe style="${style}" src="https://player.vimeo.com/video/${vimeoID[3]} frameborder="0"></iframe>`;
    } else {
        content = '<p>No video url found—both vimeo and youtube are supported</p>';
    }
    return `<div style="position: relative; padding-bottom: 56.25%; padding-top: 25px; height: 0;">${content}</div>`;
}

module.exports = {
    // Extend website resources and html
    website: {
        assets: "./book",
        js: [
            "nio.js"
        ],
        css: [
            "style.css", "header.css", "footer.css"
        ],
        html: {
            "html:start": function() {
                return "<!-- Start book "+this.options.title+" -->"
            },
            "html:end": function() {
                return "<!-- End of book "+this.options.title+" -->"
            },

            "head:start": "<!-- head:start -->",
            "head:end": "<!-- head:end -->",

            "body:start": "<!-- body:start -->",
            "body:end": "<!-- body:end -->"
        }
    },

    // Extend ebook resources and html
    ebook: {
        assets: "./book",
        js: [
            "nio.js"
        ],
        css: [
            "style.css"
        ],
        html: {
            "html:start": function() {
                return "<!-- Start book "+this.options.title+" -->"
            },
            "html:end": function() {
                return "<!-- End of book "+this.options.title+" -->"
            },

            "head:start": "<!-- head:start -->",
            "head:end": "<!-- head:end -->",

            "body:start": "<!-- body:start -->",
            "body:end": "<!-- body:end -->"
        }
    },

    // Extend templating blocks
    blocks: {
        // Author will be able to write "{% myTag %}World{% endMyTag %}"
        myTag: {
            process: function(blk) {
                return "Hello "+blk.body;
            }
        },
        video: {
            process: function(block) {
                return getEmbedDiv(block.body);
            }
        }
    },

    // Extend templating filters
    filters: {
        // Author will be able to write "{{ 'test'|myFilter }}"
        myFilter: function(s) {
            return "Hello "+s;
        }
    },

    // Hook process during build
    hooks: {
        // For all the hooks, this represent the current generator

        // This is called before the book is generated
        "init": function() {
            console.log("init!");
        },
        // This is called after the book generation
        "finish": function() {
            console.log("finish!");
        },
        "config": function(config) {
            config.styles = config.styles || config.pluginsConfig['theme-nio'].styles;
            return config;
        }
    }
};
