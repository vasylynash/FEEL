function parseToJson(response) {
    if (!response.ok) {
        throw "Can't retrieve data";
    }
    return response.json();
}