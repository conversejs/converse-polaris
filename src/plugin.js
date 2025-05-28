import tplAddContactModal from './templates/add-contact.js';

const pluginName = 'converse-polaris';

const plugin = {
    initialize() {
        const { _converse } = this;
        const { __, api } = _converse;
        const { AddContactModal: BaseAddContactModal } = _converse.exports;
        class AddContactModal extends BaseAddContactModal {
            initialize() {
                this._converse = _converse;
                super.initialize();
                this.addEventListener('autocomplete-select', ({ detail }) => {
                    if (!api.settings.get('xhr_user_search_url')) {
                        return;
                    }
                    const { suggestion } = detail;
                    const has_chat_account = suggestion.data.chat_status === 1;
                    if (has_chat_account) {
                        this.model.set('alert', undefined);
                    } else {
                        this.model.set('alert', {
                            type: 'warning',
                            message: __('Contact not available'),
                            is_ephemeral: false,
                        });
                    }
                    this.requestUpdate();
                });
            }

            renderModal() {
                return tplAddContactModal(this);
            }
        }
        api.elements.define("converse-add-contact-modal", AddContactModal);
    },
};

/**
 * @typedef {Window & globalThis & {converse: any} } WindowWithConverse
 */
let converse = /** @type {WindowWithConverse} */ (window).converse;

if (typeof converse === 'undefined') {
    window.addEventListener(
        'converse-loaded',
        /** @param {CustomEvent} ev */ (ev) => {
            converse = ev.detail?.converse;
            converse.plugins.add(pluginName, plugin);
        }
    );
} else {
    converse.plugins.add(pluginName, plugin);
}
