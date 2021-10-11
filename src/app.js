import { writable } from 'svelte/store';

export const app = {
    name: 'EPITA ALED',
    version: '2.0.0',
    repository: 'https://github.com/Litarvan/epita-aled'
};

export const api = 'https://api.epita.litarvan.com';
export const links = [
    { label: 'ALED', to: '/', withClass: 'logo' },
    { label: 'Accueil', to: '/a/aled' },
    { label: 'Pegasus (Prépa)', to: 'https://prepa-epita.helvetius.net/pegasus/', large: true },
    { label: 'Pegasus (ING)', to: 'https://inge-etud.epita.net/pegasus/', large: true },
    { label: 'GitHub', to: app.repository },
    // { label: 'À Propos', to: '/about' } (En vrai pas besoin)
];

export const isDark = writable(loadDarkState());
export const hasSidemenu = writable(false);

export function title(page) {
    return `${app.name} — ${page}`;
}

function loadDarkState() {
    return false;

    const { dark } = window.localStorage || {}; // TODO: Use cookies or some shit ?
    if (dark) {
        return dark;
    }

    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
