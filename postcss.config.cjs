module.exports = {
    plugins: [
        require('postcss-discard-unused')({
            removeAll: true 
        })
    ]
};
