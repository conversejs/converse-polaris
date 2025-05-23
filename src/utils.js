export function getAutoCompleteItem(_converse, text, input) {
    const { u, html } = _converse.env;
    input = input.trim();
    const regex = new RegExp('(' + u.autocomplete.regExpEscape(input) + ')', 'ig');
    const parts = input ? text.split(regex) : [text];
    const data = text.data;
    return html`
        <li aria-selected="false" class="${data.chat_status === 0 ? 'text-danger' : ''}">
            ${parts.map((txt) => (input && txt.match(regex) ? html`<mark>${txt}</mark>` : txt))}
        </li>
    `;
};
