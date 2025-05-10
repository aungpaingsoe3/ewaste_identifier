export function escapeHTML(input: string): string {
    return input.replace(/[&<>"'`=/\"]/g, function(s) {
        return ({
            "&": "&amp",
            "<": "&lt",
            ">": "&gt",
            '"': "&quot",
            "'": "&#39;",
            "`": "&#x60;",
            "=": "&#x3D;",
            "/": "&#x2F;"
        } as Record<string, string>)[s];
    });
}