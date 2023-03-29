module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-nested": {},
        ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
    },
}
