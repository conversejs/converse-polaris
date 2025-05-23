# Converse Polaris Customizations

Contains customizations in order to better integrate Converse with Polaris webmail.

## Customizations

- Extends the base `AddContactModal` class
  - Shows a warning messages when a contact doesn't have a chat account (`chat_status !== 1`)
  - Adds the `text-danger` class to contact search results where the contact doesn't have a chat account.

## Installation

```bash
npm install converse-add-contact-plugin
```

## Usage

```javascript
converse.initialize({
    whitelisted_plugins: ['converse-polaris']
});
```

## Development

```bash
# Install dependencies
npm install

# Build bundle
npm run build
```

In your HTML, add:

```html
    <script type="module" src="path/to/converse-polaris/dist/plugin.js"></script>
```
