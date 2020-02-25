function capitalize(str) {
    return  (str).toLowerCase().charAt(0).toUpperCase() + (str).toLowerCase().substring(1)
};

export { capitalize };